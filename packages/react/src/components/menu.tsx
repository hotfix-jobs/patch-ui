"use client";

import {
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type * as React from "react";
import { CheckIcon } from "../internal-icons";
import { cn } from "../utils";

type Density = "compact" | "comfortable";

const MenuDensityContext = createContext<Density>("compact");

type MenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  context: ReturnType<typeof useFloating>["context"];
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  isNested: boolean;
  parent: MenuContextValue | null;
};

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("Menu subcomponents must be used inside <Menu>");
  return ctx;
}

export interface MenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  /** Internal — set on sub-menus to enable hover-open. */
  modal?: boolean;
  children: React.ReactNode;
}

function MenuInner({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: MenuProps): React.ReactElement {
  const parent = useContext(MenuContext);
  const isNested = parent != null;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const nodeId = useFloatingNodeId();
  const parentNodeId = useFloatingParentNodeId();

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open,
    onOpenChange: setOpen,
    placement: isNested ? "right-start" : "bottom-start",
    // Disable floating-ui's transform-based positioning so motion's
    // animate transform (scale, etc.) doesn't fight the position transform.
    transform: false,
    // 4px gap from trigger; shift away from edges; flip to opposite side
    // when there isn't room. Sub-menus offset along the cross axis to keep
    // their first item aligned with the trigger.
    middleware: [
      offset({ mainAxis: 4, alignmentAxis: isNested ? -4 : 0 }),
      flip(),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, {
    event: "mousedown",
    toggle: !isNested,
    ignoreMouse: isNested,
  });
  const hover = useHover(context, {
    enabled: isNested,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const dismiss = useDismiss(context, { bubbles: true });
  const role = useRole(context, { role: "menu" });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: open ? setActiveIndex : undefined,
    activeIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, hover, dismiss, role, listNavigation, typeahead],
  );

  // Close all parent menus when an action item runs (so the whole tree
  // collapses after click). Tracked via tree events.
  const tree = useFloatingTree();
  useEffect(() => {
    if (!tree) return;
    function handleTreeClick() {
      setOpen(false);
    }
    function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentNodeId) {
        setOpen(false);
      }
    }
    tree.events.on("click", handleTreeClick);
    tree.events.on("menuopen", onSubMenuOpen);
    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("menuopen", onSubMenuOpen);
    };
  }, [tree, nodeId, parentNodeId, setOpen]);

  useEffect(() => {
    if (open && tree) {
      tree.events.emit("menuopen", { parentId: parentNodeId, nodeId });
    }
  }, [tree, open, nodeId, parentNodeId]);

  const value: MenuContextValue = {
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    getItemProps,
    context,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    isNested,
    parent,
  };

  return (
    <FloatingNode id={nodeId}>
      <MenuContext.Provider value={value}>
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          {children}
        </FloatingList>
      </MenuContext.Provider>
    </FloatingNode>
  );
}

export function Menu(props: MenuProps): React.ReactElement {
  const parentId = useFloatingParentNodeId();
  if (parentId == null) {
    // Top-level menu — wrap in FloatingTree so nested sub-menus can register.
    return (
      <FloatingTree>
        <MenuInner {...props} />
      </FloatingTree>
    );
  }
  return <MenuInner {...props} />;
}

/* --------------------------- Trigger --------------------------- */

export interface MenuTriggerProps {
  render?: React.ReactElement;
  children?: React.ReactNode;
}

export function MenuTrigger({
  render,
  children,
  ...rest
}: MenuTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { refs, getReferenceProps } = useMenuContext();
  const triggerProps = getReferenceProps({
    ref: refs.setReference,
    ...rest,
  });

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      ...triggerProps,
      "data-slot": "menu-trigger",
      children:
        (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }
  return (
    <button type="button" data-slot="menu-trigger" {...triggerProps}>
      {children}
    </button>
  );
}

/* --------------------------- Popup --------------------------- */

export interface MenuPopupProps {
  className?: string;
  density?: Density;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  children: React.ReactNode;
}

export function MenuPopup({
  className,
  density = "compact",
  children,
}: MenuPopupProps): React.ReactElement | null {
  const { open, context, refs, floatingStyles, getFloatingProps, isNested } =
    useMenuContext();
  const setFloating = useCallback(
    (node: HTMLElement | null) => refs.setFloating(node),
    [refs],
  );
  const reduceMotion = useReducedMotion();

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={isNested ? -1 : 0}
            returnFocus={!isNested}
          >
            <motion.div
              ref={setFloating}
              data-slot="menu-popup"
              {...getFloatingProps()}
              style={{
                ...floatingStyles,
                transformOrigin: "var(--transform-origin, top left)",
              }}
              initial={
                reduceMotion ? false : { opacity: 0, scale: 0.97 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.6,
                    }
              }
              className={cn(
                "z-[80] flex flex-col rounded-[var(--radius-patch-sm)] bg-patch-surface border border-[var(--patch-border)] shadow-patch-popup outline-none focus:outline-none",
                density === "compact"
                  ? "not-[class*='w-']:min-w-32"
                  : "not-[class*='w-']:min-w-56",
                className,
              )}
            >
              <MenuDensityContext.Provider value={density}>
                <div className="max-h-[var(--available-height,400px)] w-full overflow-y-auto p-1">
                  {children}
                </div>
              </MenuDensityContext.Provider>
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

/* --------------------------- Item --------------------------- */

export interface MenuItemProps {
  className?: string;
  variant?: "default" | "destructive";
  inset?: boolean;
  /** Trailing check indicating "currently chosen". */
  selected?: boolean;
  /** Secondary line below the title for two-line items. */
  description?: React.ReactNode;
  disabled?: boolean;
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

export function MenuItem({
  className,
  variant = "default",
  inset,
  selected,
  description,
  disabled,
  label,
  onClick,
  children,
}: MenuItemProps): React.ReactElement {
  const { activeIndex, getItemProps, setOpen } = useMenuContext();
  const density = useContext(MenuDensityContext);
  const tree = useFloatingTree();

  const itemLabel = label ?? (typeof children === "string" ? children : "");
  const { ref, index } = useListItem({ label: itemLabel });
  const isActive = activeIndex === index;

  const trailingCheck = selected && (
    <CheckIcon
      className="ms-auto size-3.5 shrink-0 text-patch-text-tertiary"
      strokeWidth={2.25}
    />
  );

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(event);
    setOpen(false);
    // Tell the whole tree to close (parent menus collapse too).
    tree?.events.emit("click");
  };

  return (
    <div
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      ref={ref}
      data-slot="menu-item"
      data-variant={variant}
      data-active={isActive ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "cursor-default select-none rounded-[var(--radius-patch-xs)] text-patch-text outline-none transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] data-[active]:bg-[var(--menu-item-hover)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        density === "compact"
          ? "min-h-7 px-2 py-1.5 text-[length:var(--text-patch-control)]"
          : "min-h-11 px-3 py-2.5 text-[length:var(--text-patch-body)] [&_svg:not([class*='size-'])]:size-[18px]",
        variant === "destructive" &&
          "text-patch-error data-[active]:text-patch-error",
        inset && "ps-8",
        className,
      )}
      {...getItemProps({
        onClick: handleClick,
      })}
    >
      {description != null ? (
        <span className="flex w-full flex-col">
          <span className="flex items-center gap-2">
            {children}
            {trailingCheck}
          </span>
          <span className="mt-0.5 truncate text-[length:var(--text-patch-mini)] font-normal text-patch-text-tertiary">
            {description}
          </span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {children}
          {trailingCheck}
        </span>
      )}
    </div>
  );
}

/* --------------------------- CheckboxItem --------------------------- */

export interface MenuCheckboxItemProps {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  children?: React.ReactNode;
}

export function MenuCheckboxItem({
  className,
  checked = false,
  onCheckedChange,
  disabled,
  label,
  children,
}: MenuCheckboxItemProps): React.ReactElement {
  const { activeIndex, getItemProps } = useMenuContext();
  const density = useContext(MenuDensityContext);

  const itemLabel = label ?? (typeof children === "string" ? children : "");
  const { ref, index } = useListItem({ label: itemLabel });
  const isActive = activeIndex === index;

  return (
    <div
      role="menuitemcheckbox"
      aria-checked={checked}
      tabIndex={isActive ? 0 : -1}
      ref={ref}
      data-slot="menu-checkbox-item"
      data-state={checked ? "checked" : "unchecked"}
      data-active={isActive ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "grid cursor-default grid-cols-[.75rem_1fr] items-center gap-2 rounded-[var(--radius-patch-xs)] text-patch-text outline-none transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] data-[active]:bg-[var(--menu-item-hover)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        density === "compact"
          ? "min-h-7 py-1.5 ps-2 pe-4 text-[length:var(--text-patch-control)]"
          : "min-h-11 py-2.5 ps-3 pe-5 text-[length:var(--text-patch-body)]",
        className,
      )}
      {...getItemProps({
        onClick: (e: React.MouseEvent) => {
          if (disabled) return;
          onCheckedChange?.(!checked);
          e.preventDefault();
        },
      })}
    >
      <span className="col-start-1 -ms-0.5 flex items-center justify-center">
        {checked && <CheckIcon className="size-4" />}
      </span>
      <span className="col-start-2">{children}</span>
    </div>
  );
}

/* --------------------------- RadioGroup / RadioItem --------------------------- */

type RadioGroupContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface MenuRadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function MenuRadioGroup({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  children,
}: MenuRadioGroupProps): React.ReactElement {
  const [uncontrolled, setUncontrolled] = useState<string>(defaultValue);
  const value = controlledValue ?? uncontrolled;
  const setValue = (next: string) => {
    if (controlledValue === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };
  return (
    <div role="group" data-slot="menu-radio-group">
      <RadioGroupContext.Provider value={{ value, setValue }}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}

export interface MenuRadioItemProps {
  className?: string;
  value: string;
  disabled?: boolean;
  label?: string;
  children?: React.ReactNode;
}

export function MenuRadioItem({
  className,
  value,
  disabled,
  label,
  children,
}: MenuRadioItemProps): React.ReactElement {
  const group = useContext(RadioGroupContext);
  if (!group) throw new Error("MenuRadioItem must be inside MenuRadioGroup");
  const { activeIndex, getItemProps } = useMenuContext();
  const density = useContext(MenuDensityContext);

  const checked = group.value === value;
  const itemLabel = label ?? (typeof children === "string" ? children : "");
  const { ref, index } = useListItem({ label: itemLabel });
  const isActive = activeIndex === index;

  return (
    <div
      role="menuitemradio"
      aria-checked={checked}
      tabIndex={isActive ? 0 : -1}
      ref={ref}
      data-slot="menu-radio-item"
      data-state={checked ? "checked" : "unchecked"}
      data-active={isActive ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "grid cursor-default grid-cols-[.75rem_1fr] items-center gap-2 rounded-[var(--radius-patch-xs)] text-patch-text outline-none transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] data-[active]:bg-[var(--menu-item-hover)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        density === "compact"
          ? "min-h-7 py-1.5 ps-2 pe-4 text-[length:var(--text-patch-control)]"
          : "min-h-11 py-2.5 ps-3 pe-5 text-[length:var(--text-patch-body)]",
        className,
      )}
      {...getItemProps({
        onClick: (e: React.MouseEvent) => {
          if (disabled) return;
          group.setValue(value);
          e.preventDefault();
        },
      })}
    >
      <span className="col-start-1 -ms-0.5 flex items-center justify-center">
        {checked && <CheckIcon className="size-4" />}
      </span>
      <span className="col-start-2">{children}</span>
    </div>
  );
}

/* --------------------------- Group / Section / Label --------------------------- */

export function MenuGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      role="group"
      data-slot="menu-group"
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export function MenuSection({
  label,
  className,
  children,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  label?: React.ReactNode;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div
      role="group"
      data-slot="menu-section"
      className={cn("py-1 first:pt-0 last:pb-0", className)}
      {...props}
    >
      {label != null && <MenuGroupLabel>{label}</MenuGroupLabel>}
      {children}
    </div>
  );
}

export function MenuGroupLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
}): React.ReactElement {
  return (
    <div
      data-slot="menu-label"
      className={cn(
        "px-2 py-1.5 font-medium uppercase text-[length:var(--text-patch-micro)] tracking-[var(--tracking-patch-label)] text-patch-text-tertiary",
        inset && "ps-8",
        className,
      )}
      {...props}
    />
  );
}

export function MenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      role="separator"
      data-slot="menu-separator"
      className={cn("mx-1 my-1 h-px bg-[var(--separator-color)]", className)}
      {...props}
    />
  );
}

export function MenuShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={cn(
        "ms-auto font-medium font-sans text-patch-text-tertiary text-xs tracking-widest",
        className,
      )}
      data-slot="menu-shortcut"
      {...props}
    />
  );
}

/* --------------------------- Sub-menu --------------------------- */

export function MenuSub({ children }: { children: React.ReactNode }): React.ReactElement {
  return <Menu>{children}</Menu>;
}

export interface MenuSubTriggerProps {
  className?: string;
  inset?: boolean;
  disabled?: boolean;
  label?: string;
  children?: React.ReactNode;
}

export function MenuSubTrigger({
  className,
  inset,
  disabled,
  label,
  children,
}: MenuSubTriggerProps): React.ReactElement {
  const { refs, getReferenceProps, open } = useMenuContext();
  const parent = useMenuContext().parent;
  if (!parent) throw new Error("MenuSubTrigger must be inside <MenuSub>");
  const density = useContext(MenuDensityContext);

  // SubTrigger is BOTH an item in the parent's list AND a reference for
  // the sub-menu's floating popup. Merge refs from parent's useListItem
  // and the sub-menu's useFloating.
  const itemLabel = label ?? (typeof children === "string" ? children : "");
  const { ref: listItemRef, index } = useListItem({ label: itemLabel });
  const isActive = parent.activeIndex === index;

  const mergedRef = useMergeRefs([refs.setReference, listItemRef]);

  return (
    <div
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      ref={mergedRef}
      data-slot="menu-sub-trigger"
      data-active={isActive ? "" : undefined}
      data-popup-open={open ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-[var(--radius-patch-xs)] text-patch-text outline-none transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] data-[active]:bg-[var(--menu-item-hover)] data-[popup-open]:bg-[var(--menu-item-hover)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none",
        density === "compact"
          ? "min-h-7 px-2 py-1.5 text-[length:var(--text-patch-control)] [&_svg:not([class*='size-'])]:size-4"
          : "min-h-11 px-3 py-2.5 text-[length:var(--text-patch-body)] [&_svg:not([class*='size-'])]:size-[18px]",
        inset && "ps-8",
        className,
      )}
      {...parent.getItemProps(getReferenceProps())}
    >
      {children}
      <svg
        className="ms-auto -me-0.5 size-4 opacity-80"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </div>
  );
}

export const MenuSubPopup = MenuPopup;

/* --------------------------- Aliases for back-compat --------------------------- */

export const MenuPortal = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
