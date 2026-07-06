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
  type Placement,
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
import { cn } from "../utils";
import { iconMuted, itemGroupLabel, itemRow, popupDivider, popupSurface } from "../recipes";
import { Checkbox } from "./checkbox";

import { CaretRight, Check } from "@phosphor-icons/react/dist/ssr";
type Density = "compact" | "comfortable";

const MenuDensityContext = createContext<Density>("comfortable");

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

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
  /** Placement of the popup relative to the trigger. Default `bottom-start` (`right-start` for sub-menus). */
  position?: Placement;
  modal?: boolean;
  /** On open, pre-activate the first row so Space toggles it without an arrow-down first. */
  autoFocusFirst?: boolean;
  children: React.ReactNode;
}

function MenuInner({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  position,
  autoFocusFirst = false,
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
    placement: position ?? (isNested ? "right-start" : "bottom-start"),
    // Disable floating-ui's transform positioning so motion's animate transform doesn't fight it.
    transform: false,
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
    // Skipping auto-focus on hover-open prevents a sub-menu's first item from lingering
    // active when the mouse moves back to the parent (safePolygon keeps the sub-menu open).
    focusItemOnOpen: autoFocusFirst,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: open ? setActiveIndex : undefined,
    activeIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, hover, dismiss, role, listNavigation, typeahead],
  );

  // Gated on autoFocusFirst so nested sub-menus keep letting useListNavigation own activeIndex;
  // a blanket reset caused sub-menu hover state to fight with the parent when moving between rows.
  useEffect(() => {
    if (!autoFocusFirst) return;
    if (open) setActiveIndex(0);
    else setActiveIndex(null);
  }, [open, autoFocusFirst]);

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
    return (
      <FloatingTree>
        <MenuInner {...props} />
      </FloatingTree>
    );
  }
  return <MenuInner {...props} />;
}

export interface MenuTriggerProps {
  render?: React.ReactElement;
  children?: React.ReactNode;
}

export function MenuTrigger({
  render,
  children,
  ...rest
}: MenuTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { refs, getReferenceProps, open } = useMenuContext();
  const triggerProps = getReferenceProps({
    ref: refs.setReference,
    ...rest,
  });
  const stateAttrs = {
    "data-slot": "menu-trigger",
    "data-popup-open": open ? "" : undefined,
    "aria-expanded": open,
  };

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      ...triggerProps,
      ...stateAttrs,
      children:
        (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }
  return (
    <button type="button" {...stateAttrs} {...triggerProps}>
      {children}
    </button>
  );
}

export interface MenuPopupProps {
  className?: string;
  density?: Density;
  children: React.ReactNode;
}

export function MenuPopup({
  className,
  density,
  children,
}: MenuPopupProps): React.ReactElement | null {
  const { open, context, refs, floatingStyles, getFloatingProps, isNested } =
    useMenuContext();
  const setFloating = useCallback(
    (node: HTMLElement | null) => refs.setFloating(node),
    [refs],
  );
  const reduceMotion = useReducedMotion();
  // Below md, top-level menus render as a centered fixed panel; submenus stay as popovers.
  const isMobile = useMediaQuery("(max-width: 767px)");
  const asPanel = isMobile && !isNested;

  const effectiveDensity: Density = density ?? (asPanel ? "comfortable" : "compact");

  const popup = (
    <motion.div
      ref={setFloating}
      data-slot="menu-popup"
      {...getFloatingProps()}
      style={
        asPanel
          ? undefined
          : {
              ...floatingStyles,
              transformOrigin: "var(--transform-origin, top left)",
            }
      }
      initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
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
        "flex flex-col",
        popupSurface,
        asPanel
          ? "pointer-events-auto w-full max-w-md max-h-[calc(100dvh-2rem)]"
          : [
              "z-[80]",
              effectiveDensity === "compact"
                ? "not-[class*='w-']:min-w-32"
                : "not-[class*='w-']:min-w-56",
            ],
        className,
      )}
    >
      <MenuDensityContext.Provider value={effectiveDensity}>
        <div
          className={cn(
            "w-full overflow-y-auto p-1",
            asPanel
              ? "max-h-full"
              : "max-h-[var(--available-height,400px)]",
          )}
        >
          {children}
        </div>
      </MenuDensityContext.Provider>
    </motion.div>
  );

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
            {asPanel ? (
              // Outer wrapper is pointer-events-none so useDismiss can catch scrim clicks;
              // the motion.div re-enables pointer events on the panel itself.
              <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 pointer-events-none">
                {popup}
              </div>
            ) : (
              popup
            )}
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

export interface MenuItemProps {
  className?: string;
  /** `error` renders in red for destructive actions. */
  type?: "default" | "error";
  /** @deprecated Use `type="error"`. */
  variant?: "default" | "destructive";
  inset?: boolean;
  selected?: boolean;
  description?: React.ReactNode;
  disabled?: boolean;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** When set, renders as an anchor tag instead of a div. */
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
}

export function MenuItem({
  className,
  type,
  variant,
  inset,
  selected,
  description,
  disabled,
  label,
  prefix,
  suffix,
  href,
  target,
  rel,
  onClick,
  children,
}: MenuItemProps): React.ReactElement {
  const { activeIndex, getItemProps, setOpen } = useMenuContext();
  const density = useContext(MenuDensityContext);
  const tree = useFloatingTree();

  const isError = type === "error" || variant === "destructive";

  const itemLabel = label ?? (typeof children === "string" ? children : "");
  const { ref, index } = useListItem({ label: itemLabel });
  const isActive = activeIndex === index;

  const trailingCheck = selected && (
    <Check
      className="ms-auto size-3.5 shrink-0 text-ink-muted"
    />
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    onClick?.(event);
    setOpen(false);
    tree?.events.emit("click");
  };

  const Component = href ? "a" : "div";
  const commonProps = {
    role: "menuitem" as const,
    tabIndex: isActive ? 0 : -1,
    ref,
    "data-slot": "menu-item",
    "data-type": isError ? "error" : "default",
    "data-active": isActive ? "" : undefined,
    "data-disabled": disabled ? "" : undefined,
    "aria-disabled": disabled || undefined,
    className: cn(
      itemRow.base,
      "no-underline [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      iconMuted,
      density === "compact"
        ? itemRow.compact
        : cn(itemRow.comfortable, "[&_svg:not([class*='size-'])]:size-[18px]"),
      isError &&
        "text-error data-[active]:bg-error/10 data-[active]:text-error [&_svg]:!text-error",
      inset && "ps-8",
      className,
    ),
    ...getItemProps({
      onClick: handleClick,
      // div (and <a>) don't map Enter/Space to click natively, so wire it explicitly.
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLElement>);
        }
      },
    }),
  };

  const content =
    description != null ? (
      <span className="flex w-full flex-col">
        <span className="flex w-full items-center gap-2">
          {prefix}
          {children}
          {suffix && <span className="ms-auto flex items-center">{suffix}</span>}
          {trailingCheck}
        </span>
        <span className="mt-0.5 truncate text-caption-12 text-ink-muted">
          {description}
        </span>
      </span>
    ) : (
      <span className="flex w-full items-center gap-2">
        {prefix}
        {children}
        {suffix && <span className="ms-auto flex items-center">{suffix}</span>}
        {trailingCheck}
      </span>
    );

  if (Component === "a") {
    return (
      <a
        {...(commonProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        target={target}
        rel={rel}
      >
        {content}
      </a>
    );
  }
  return <div {...(commonProps as unknown as React.HTMLAttributes<HTMLDivElement>)}>{content}</div>;
}

export interface MenuCheckboxItemProps {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
}

export function MenuCheckboxItem({
  className,
  checked = false,
  onCheckedChange,
  disabled,
  label,
  prefix,
  suffix,
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
        itemRow.base,
        "group/checkbox-item gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        iconMuted,
        density === "compact" ? itemRow.compact : itemRow.comfortable,
        className,
      )}
      {...getItemProps({
        onClick: (e: React.MouseEvent) => {
          if (disabled) return;
          onCheckedChange?.(!checked);
          e.preventDefault();
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onCheckedChange?.(!checked);
          }
        },
      })}
    >
      {/* Row owns the click; pointer-events-none stops the checkbox from re-toggling.
          Opacity (not display) preserves layout when the checkbox appears on desktop. */}
      <Checkbox
        checked={checked}
        tabIndex={-1}
        aria-hidden
        className={cn(
          "pointer-events-none transition-opacity duration-[var(--duration-state)] ease-[var(--ease-standard)]",
          "md:opacity-0",
          "md:group-hover/checkbox-item:opacity-100 md:group-data-[active]/checkbox-item:opacity-100 md:group-data-[state=checked]/checkbox-item:opacity-100",
        )}
      />
      {prefix}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {suffix && <span className="ms-auto flex items-center">{suffix}</span>}
    </div>
  );
}

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
  const { activeIndex, getItemProps, setOpen } = useMenuContext();
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
        itemRow.base,
        "w-full gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        density === "compact" ? itemRow.compact : itemRow.comfortable,
        className,
      )}
      {...getItemProps({
        onClick: (e: React.MouseEvent) => {
          if (disabled) return;
          group.setValue(value);
          setOpen(false);
          e.preventDefault();
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            group.setValue(value);
            setOpen(false);
          }
        },
      })}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {checked && (
        <Check
          aria-hidden
          className="ms-auto size-3.5 shrink-0 text-ink-muted"
        />
      )}
    </div>
  );
}

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
  title,
  label,
  className,
  children,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> & {
  title?: React.ReactNode;
  /** @deprecated Use `title`. */
  label?: React.ReactNode;
  children: React.ReactNode;
}): React.ReactElement {
  const heading = title ?? label;
  return (
    <div
      role="group"
      data-slot="menu-section"
      className={cn("py-1 first:pt-0 last:pb-0", className)}
      {...props}
    >
      {heading != null && <MenuGroupLabel>{heading}</MenuGroupLabel>}
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
  const density = useContext(MenuDensityContext);
  return (
    <div
      data-slot="menu-label"
      className={cn(
        itemGroupLabel.base,
        density === "compact" ? itemGroupLabel.compact : itemGroupLabel.comfortable,
        inset && "ps-8",
        className,
      )}
      {...props}
    />
  );
}

export function MenuDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      role="separator"
      data-slot="menu-divider"
      className={cn(popupDivider, className)}
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
        "ms-auto font-medium font-sans text-ink-muted text-xs tracking-widest",
        className,
      )}
      data-slot="menu-shortcut"
      {...props}
    />
  );
}

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

  // SubTrigger is both an item in the parent's list and the reference for the sub-menu popup.
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
        itemRow.base,
        "gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] data-[popup-open]:bg-surface-2 [&_svg]:pointer-events-none",
        iconMuted,
        density === "compact"
          ? cn(itemRow.compact, "[&_svg:not([class*='size-'])]:size-4")
          : cn(itemRow.comfortable, "[&_svg:not([class*='size-'])]:size-[18px]"),
        inset && "ps-8",
        className,
      )}
      {...parent.getItemProps(getReferenceProps())}
    >
      {children}
      <CaretRight
        aria-hidden="true"
        className="ms-auto -me-0.5 size-4 opacity-80"
      />
    </div>
  );
}

export const MenuSubPopup = MenuPopup;

export const MenuPortal = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
