"use client";

import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListItem,
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronsUpDown } from "lucide-react";
import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type * as React from "react";
import { CheckIcon } from "../internal-icons";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

type SelectContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | null;
  setValue: (value: string) => void;
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
  selectedIndex: number | null;
  setSelectedIndex: (i: number | null) => void;
  selectedLabel: string | null;
  setSelectedLabel: (label: string | null) => void;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  context: ReturnType<typeof useFloating>["context"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
};

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext(): SelectContextValue {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select subcomponents must be used inside <Select>");
  return ctx;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: SelectProps): React.ReactElement {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(
    defaultValue ?? null,
  );
  const value = controlledValue ?? uncontrolledValue;
  const setValue = useCallback(
    (next: string) => {
      if (controlledValue === undefined) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [controlledValue, onValueChange],
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    transform: false,
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${Math.min(availableHeight - 8, 360)}px`,
          });
        },
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "select" });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: open ? setActiveIndex : setSelectedIndex,
    onTypingChange: () => {},
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation, typeahead],
  );

  const ctxValue: SelectContextValue = {
    open,
    setOpen,
    value,
    setValue,
    activeIndex,
    setActiveIndex,
    selectedIndex,
    setSelectedIndex,
    selectedLabel,
    setSelectedLabel,
    refs,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
  };

  return (
    <SelectContext.Provider value={ctxValue}>
      <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
        {children}
      </FloatingList>
    </SelectContext.Provider>
  );
}

/* --------------------------- Trigger --------------------------- */

export const selectTriggerVariants = cva(
  `relative inline-flex h-10 w-full min-w-36 select-none items-center justify-between gap-2 rounded-[var(--radius-6)] bg-background-100 px-3.5 text-left text-label-13 tracking-[-0.005em] text-gray-1000 border border-[var(--input-border)] hover:border border-[var(--gray-alpha-500)] focus-visible:border border-[var(--gray-alpha-600)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer ${colorTransition} ${focusRing}`,
  {
    defaultVariants: { size: "md" },
    variants: {
      size: {
        md: "",
        lg: "h-11",
        sm: "h-8 gap-1.5 px-3 text-label-12",
      },
    },
  },
);

const selectTriggerIconClassName =
  "-me-1 size-4 text-gray-800 shrink-0";

export interface SelectTriggerProps
  extends VariantProps<typeof selectTriggerVariants> {
  className?: string;
  /** Render-prop polymorphism: pass `render={<Button />}` to use a styled element. */
  render?: React.ReactElement;
  children?: React.ReactNode;
  disabled?: boolean;
}

export function SelectTrigger({
  className,
  size: sizeVariant,
  render,
  children,
  disabled,
  ...rest
}: SelectTriggerProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">): React.ReactElement {
  const { open, refs, getReferenceProps } = useSelectContext();

  const triggerProps = getReferenceProps({
    ref: refs.setReference,
    disabled,
    "aria-expanded": open,
    ...rest,
  });

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      ...triggerProps,
      "data-slot": "select-trigger",
      "data-state": open ? "open" : "closed",
      children: (
        <>
          {(render.props as { children?: React.ReactNode }).children ?? children}
          <ChevronsUpDown className={selectTriggerIconClassName} />
        </>
      ),
    } as React.HTMLAttributes<HTMLElement>);
  }
  return (
    <button
      type="button"
      data-slot="select-trigger"
      data-state={open ? "open" : "closed"}
      className={cn(selectTriggerVariants({ size: sizeVariant }), className)}
      {...triggerProps}
    >
      {children}
      <ChevronsUpDown className={selectTriggerIconClassName} />
    </button>
  );
}

// Back-compat alias — SelectButton was the prior name.
export const SelectButton = SelectTrigger;

/* --------------------------- Value --------------------------- */

export interface SelectValueProps {
  placeholder?: React.ReactNode;
  className?: string;
}

export function SelectValue({
  placeholder,
  className,
}: SelectValueProps): React.ReactElement {
  const { value, selectedLabel } = useSelectContext();
  const hasValue = value != null;
  return (
    <span
      data-slot="select-value"
      data-placeholder={!hasValue ? "" : undefined}
      className={cn(
        "flex-1 truncate text-start",
        !hasValue && "text-gray-800",
        className,
      )}
    >
      {hasValue ? selectedLabel ?? value : placeholder}
    </span>
  );
}

/* --------------------------- Popup --------------------------- */

export interface SelectPopupProps {
  className?: string;
  children: React.ReactNode;
}

export function SelectPopup({
  className,
  children,
}: SelectPopupProps): React.ReactElement | null {
  const { open, context, refs, floatingStyles, getFloatingProps } =
    useSelectContext();
  const setFloating = useCallback(
    (node: HTMLElement | null) => refs.setFloating(node),
    [refs],
  );
  const reduceMotion = useReducedMotion();

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <FloatingFocusManager context={context} modal={false}>
            <motion.div
              ref={setFloating}
              data-slot="select-popup"
              {...getFloatingProps()}
              style={{
                ...floatingStyles,
                transformOrigin: "top center",
              }}
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
                "z-[80] flex flex-col rounded-[var(--radius-6)] bg-background-100 border border-[var(--gray-alpha-400)] shadow-menu outline-none focus:outline-none overflow-hidden",
                className,
              )}
            >
              <div
                role="listbox"
                className="max-h-full w-full overflow-y-auto p-1"
              >
                {children}
              </div>
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

// Back-compat alias.
export const SelectContent = SelectPopup;

/* --------------------------- Item --------------------------- */

export interface SelectItemProps {
  value: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  children?: React.ReactNode;
}

export function SelectItem({
  value,
  className,
  disabled,
  label,
  children,
}: SelectItemProps): React.ReactElement {
  const {
    activeIndex,
    setOpen,
    setValue,
    value: currentValue,
    selectedIndex,
    setSelectedIndex,
    setSelectedLabel,
    getItemProps,
  } = useSelectContext();

  const itemLabel = label ?? (typeof children === "string" ? children : value);
  const { ref, index } = useListItem({ label: itemLabel });
  const isActive = activeIndex === index;
  const isSelected = currentValue === value;

  // When this item's value matches the controlled value, sync the
  // selectedIndex / label so the listbox knows the initial selection and
  // the trigger displays the correct label.
  if (isSelected && selectedIndex !== index) {
    // Schedule update outside render to avoid setState-during-render warnings.
    queueMicrotask(() => {
      setSelectedIndex(index);
      setSelectedLabel(itemLabel);
    });
  }

  const handleSelect = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled) return;
    setValue(value);
    setSelectedIndex(index);
    setSelectedLabel(itemLabel);
    setOpen(false);
    e.preventDefault();
  };

  return (
    <div
      role="option"
      tabIndex={isActive ? 0 : -1}
      ref={ref}
      data-slot="select-item"
      data-state={isSelected ? "checked" : "unchecked"}
      data-active={isActive ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      className={cn(
        "grid min-h-7 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-[var(--radius-6)] px-2 py-1.5 text-label-13 outline-none transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] data-[active]:bg-[var(--menu-item-hover)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...getItemProps({
        onClick: handleSelect,
        onKeyDown(e: React.KeyboardEvent) {
          if (e.key === "Enter" || e.key === " ") handleSelect(e);
        },
      })}
    >
      <span className="col-start-1 flex items-center justify-center">
        {isSelected && <CheckIcon className="size-4" />}
      </span>
      <span className="col-start-2 min-w-0 truncate">{children}</span>
    </div>
  );
}

/* --------------------------- Misc subcomponents --------------------------- */

export function SelectSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      role="separator"
      data-slot="select-separator"
      className={cn("mx-1 my-1 h-px bg-[var(--separator-color)]", className)}
      {...props}
    />
  );
}

export function SelectGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      role="group"
      data-slot="select-group"
      className={className}
      {...props}
    />
  );
}

export function SelectLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLLabelElement>): React.ReactElement {
  return (
    <label
      data-slot="select-label"
      className={cn(
        "not-in-data-[slot=field]:mb-2 inline-flex cursor-default items-center gap-2 text-xs font-medium text-gray-800",
        className,
      )}
      {...(props as React.LabelHTMLAttributes<HTMLLabelElement>)}
    />
  );
}

export function SelectGroupLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      data-slot="select-group-label"
      className={cn(
        "px-2 py-1.5 font-medium uppercase text-label-12 tracking-tight text-gray-800",
        className,
      )}
      {...props}
    />
  );
}
