"use client";

import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  autoUpdate,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type * as React from "react";
import { cn } from "../utils";
import { iconMuted, itemGroupLabel, itemRow, popupDivider, popupSurface } from "../recipes";
import { Input, type InputProps } from "./input";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { CaretDown, MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

function useIsMobileCombobox(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mql = window.matchMedia(MOBILE_MEDIA_QUERY);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isMobile;
}

/** Input paired with a floating popup for filterable content. */

type ComboboxContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  context: ReturnType<typeof useFloating>["context"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  elementsRef: React.MutableRefObject<Array<HTMLElement | null>>;
  baseId: string;
  value: string | undefined;
  onValueChange: ((next: string) => void) | undefined;
  placeholder: string | undefined;
  isMobile: boolean;
};

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

function useComboboxContext(): ComboboxContextValue {
  const ctx = useContext(ComboboxContext);
  if (!ctx)
    throw new Error("Combobox subcomponents must be used inside <Combobox>");
  return ctx;
}

export interface ComboboxProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string;
  onValueChange?: (next: string) => void;
  placeholder?: string;
  /** Pre-activate the first item on open. */
  autoFocusFirst?: boolean;
  children: React.ReactNode;
}

export function Combobox({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  value,
  onValueChange,
  placeholder,
  autoFocusFirst = false,
  children,
}: ComboboxProps): React.ReactElement {
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

  const isMobile = useIsMobileCombobox();

  const middleware = useMemo(
    () => [
      offset(8),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements, availableHeight }) {
          if (isMobile) return;
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${Math.max(120, Math.min(availableHeight - 8, 400))}px`,
          });
        },
        padding: 8,
      }),
    ],
    [isMobile],
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    transform: false,
    middleware,
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "listbox" });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, role, listNavigation],
  );

  const baseId = useId();

  // Adjusted during render (not in an effect) per React 19's "adjust state on prop change" idiom.
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (!open) setActiveIndex(null);
    else if (autoFocusFirst) setActiveIndex(0);
  }

  return (
    <ComboboxContext.Provider
      value={{
        open,
        setOpen,
        activeIndex,
        setActiveIndex,
        refs,
        floatingStyles,
        context,
        getReferenceProps,
        getFloatingProps,
        getItemProps,
        elementsRef,
        baseId,
        value,
        onValueChange,
        placeholder,
        isMobile,
      }}
    >
      <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
        {children}
      </FloatingList>
    </ComboboxContext.Provider>
  );
}

/* --------------------------- ComboboxInput --------------------------- */

function ChevronIndicator({ open }: { open: boolean }): React.ReactElement {
  return (
    <CaretDown
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 text-ink-muted transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        open ? "rotate-180" : "rotate-0",
      )}
    />
  );
}

export interface ComboboxInputProps extends InputProps {
  openOnFocus?: boolean;
  /** Hide the trailing chevron. */
  hideChevron?: boolean;
  /** Show a trailing × to clear the input. */
  clearable?: boolean;
  onClear?: () => void;
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput(
    {
      openOnFocus = true,
      onFocus,
      onKeyDown,
      onClick,
      onChange,
      hideChevron,
      clearable,
      onClear,
      value,
      placeholder,
      suffix: userSuffix,
      ...props
    },
    forwardedRef,
  ) {
    const {
      open,
      setOpen,
      refs,
      getReferenceProps,
      baseId,
      activeIndex,
      elementsRef,
      value: ctxValue,
      onValueChange,
      placeholder: ctxPlaceholder,
    } = useComboboxContext();

    const effectiveValue = value !== undefined ? value : ctxValue;
    const effectivePlaceholder =
      placeholder !== undefined ? placeholder : ctxPlaceholder;

    const hasValue =
      effectiveValue != null &&
      effectiveValue !== "" &&
      (typeof effectiveValue !== "number" || !Number.isNaN(effectiveValue));
    const showClear = clearable && hasValue && !props.disabled;

    const suffix = (userSuffix || showClear || !hideChevron) ? (
      <span className="inline-flex items-center gap-1.5">
        {userSuffix}
        {showClear ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear"
            onClick={(e) => {
              e.stopPropagation();
              onClear?.();
            }}
            className="inline-flex size-5 items-center justify-center rounded-full text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]"
          >
            <X className="size-3" />
          </button>
        ) : (
          !hideChevron && <ChevronIndicator open={open} />
        )}
      </span>
    ) : undefined;
    // Anchor to the wrapper span so the popup aligns with the full input chrome.
    const setReferenceToWrapper = useCallback(
      (node: HTMLInputElement | null) => {
        refs.setReference(node?.parentElement ?? node);
      },
      [refs],
    );
    const inputRef = useMergeRefs([
      forwardedRef,
      setReferenceToWrapper as React.Ref<HTMLInputElement>,
    ]);

    // False positive on getReferenceProps: react-hooks/refs flags Floating UI's
    // prop-getters as ref-during-render (see floating-ui/floating-ui#3405,
    // react/react#34775). The `refs` object is plain and no ref is read here.
    // eslint-disable-next-line react-hooks/refs
    const mergedProps = getReferenceProps({
      ...(props as React.HTMLProps<HTMLInputElement>),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange?.(e.target.value);
        onChange?.(e as Parameters<NonNullable<typeof onChange>>[0]);
      },
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e as Parameters<NonNullable<typeof onFocus>>[0]);
        if (openOnFocus && !e.defaultPrevented) setOpen(true);
      },
      onClick: (e: React.MouseEvent<HTMLInputElement>) => {
        onClick?.(e as Parameters<NonNullable<typeof onClick>>[0]);
        if (openOnFocus && !e.defaultPrevented) setOpen(true);
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(e as Parameters<NonNullable<typeof onKeyDown>>[0]);
        if (e.defaultPrevented) return;
        if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
          e.preventDefault();
          setOpen(true);
          return;
        }
        // Virtual focus keeps focus on the input; bridge Enter by clicking the active row.
        if (open && e.key === "Enter" && activeIndex != null) {
          const el = elementsRef.current[activeIndex];
          if (el) {
            e.preventDefault();
            el.click();
          }
        }
      },
    });

    return (
      <Input
        ref={inputRef}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={`${baseId}-popup`}
        aria-activedescendant={
          activeIndex != null ? `${baseId}-item-${activeIndex}` : undefined
        }
        autoComplete="off"
        value={effectiveValue}
        placeholder={effectivePlaceholder}
        suffix={suffix}
        {...mergedProps}
      />
    );
  },
);

/* --------------------------- ComboboxPopup --------------------------- */

export interface ComboboxPopupProps {
  className?: string;
  children: React.ReactNode;
}

export function ComboboxPopup({
  className,
  children,
}: ComboboxPopupProps): React.ReactElement | null {
  const {
    open,
    context,
    refs,
    floatingStyles,
    getFloatingProps,
    baseId,
    isMobile,
    setOpen,
    value: ctxValue,
    onValueChange,
    placeholder: ctxPlaceholder,
  } = useComboboxContext();
  const setFloating = useCallback(
    (node: HTMLElement | null) => refs.setFloating(node),
    [refs],
  );
  const reduceMotion = useReducedMotion();

  const popup = (
    <motion.div
      ref={setFloating}
      id={`${baseId}-popup`}
      data-slot="combobox-popup"
      data-variant={isMobile ? "mobile" : "desktop"}
      {...getFloatingProps()}
      style={
        isMobile
          ? undefined
          : {
              ...floatingStyles,
              transformOrigin: "top center",
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
        "flex flex-col overflow-hidden",
        popupSurface,
        isMobile
          ? "pointer-events-auto w-full max-w-md max-h-[calc(100dvh-2rem)]"
          : "z-[80]",
        className,
      )}
    >
      {isMobile && (
        <div
          data-slot="combobox-mobile-header"
          className="flex shrink-0 items-center gap-1 border-b border-hairline pe-2"
        >
          <Input
            variant="unstyled"
            size="lg"
            autoFocus
            autoComplete="off"
            prefix={<MagnifyingGlass />}
            value={ctxValue ?? ""}
            onChange={(e) => onValueChange?.(e.target.value)}
            placeholder={ctxPlaceholder}
            aria-label={ctxPlaceholder ?? "Search"}
          />
          <Button
            variant="tertiary"
            size="md"
            shape="circle"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="text-ink-muted"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto p-1">{children}</div>
    </motion.div>
  );

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={isMobile ? 0 : -1}
            // Refocusing the trigger would re-fire openOnFocus and re-open the popup after dismiss.
            returnFocus={false}
            visuallyHiddenDismiss
          >
            {isMobile ? (
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

/* --------------------------- ComboboxItem --------------------------- */

export interface ComboboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect?: () => void;
  label?: string;
  disabled?: boolean;
  /** Close the popup after selection. */
  closeOnSelect?: boolean;
}

export function ComboboxItem({
  className,
  children,
  onSelect,
  label,
  disabled,
  closeOnSelect = true,
  onClick,
  ...props
}: ComboboxItemProps): React.ReactElement {
  const { activeIndex, getItemProps, setOpen, baseId } = useComboboxContext();
  const itemLabel = label ?? (typeof children === "string" ? children : "");
  const { ref, index } = useListItem({ label: itemLabel });
  const isActive = activeIndex === index;

  const handleSelect = () => {
    if (disabled) return;
    onSelect?.();
    if (closeOnSelect) setOpen(false);
  };

  return (
    <div
      role="option"
      ref={ref}
      id={`${baseId}-item-${index}`}
      aria-selected={isActive}
      aria-disabled={disabled || undefined}
      data-slot="combobox-item"
      data-active={isActive ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        itemRow.base,
        "cursor-pointer gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-surface-2",
        iconMuted,
        itemRow.comfortable,
        "md:min-h-7 md:px-2 md:py-1.5 md:text-body-13",
        className,
      )}
      {...getItemProps({
        onClick: (e: React.MouseEvent<HTMLDivElement>) => {
          onClick?.(e);
          if (!e.defaultPrevented) handleSelect();
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSelect();
          }
        },
      })}
      {...props}
    >
      {children}
    </div>
  );
}

/* --------------------------- ComboboxCheckboxItem --------------------------- */

export interface ComboboxCheckboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect" | "prefix"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onSelect?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

/** Multi-select row inside a Combobox popup. */
export function ComboboxCheckboxItem({
  className,
  children,
  checked = false,
  onCheckedChange,
  onSelect,
  label,
  disabled,
  prefix,
  suffix,
  onClick,
  ...props
}: ComboboxCheckboxItemProps): React.ReactElement {
  const { activeIndex, getItemProps, baseId } = useComboboxContext();
  const itemLabel = label ?? (typeof children === "string" ? children : "");
  const { ref, index } = useListItem({ label: itemLabel });
  const isActive = activeIndex === index;

  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    onCheckedChange?.(next);
    onSelect?.(next);
  };

  return (
    <div
      role="option"
      ref={ref}
      id={`${baseId}-item-${index}`}
      aria-selected={isActive}
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      data-slot="combobox-checkbox-item"
      data-state={checked ? "checked" : "unchecked"}
      data-active={isActive ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        itemRow.base,
        "group/checkbox-item cursor-pointer gap-2 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-surface-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        iconMuted,
        itemRow.comfortable,
        "md:min-h-7 md:px-2 md:py-1.5 md:text-body-13",
        className,
      )}
      {...getItemProps({
        onClick: (e: React.MouseEvent<HTMLDivElement>) => {
          onClick?.(e);
          if (!e.defaultPrevented) toggle();
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        },
      })}
      {...props}
    >
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

/* --------------------------- ComboboxDivider --------------------------- */

export function ComboboxDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      role="separator"
      data-slot="combobox-divider"
      className={cn(popupDivider, className)}
      {...props}
    />
  );
}

/* --------------------------- ComboboxGroupLabel / Section --------------------------- */

export function ComboboxGroupLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      data-slot="combobox-group-label"
      className={cn(
        itemGroupLabel.base,
        itemGroupLabel.comfortable,
        "md:px-2",
        className,
      )}
      {...props}
    />
  );
}

export interface ComboboxSectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export function ComboboxSection({
  title,
  className,
  children,
  ...props
}: ComboboxSectionProps): React.ReactElement {
  return (
    <div
      role="group"
      data-slot="combobox-section"
      className={cn("py-1 first:pt-0 last:pb-0", className)}
      {...props}
    >
      {title != null && <ComboboxGroupLabel>{title}</ComboboxGroupLabel>}
      {children}
    </div>
  );
}
