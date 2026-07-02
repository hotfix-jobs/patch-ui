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
  useId,
  useRef,
  useState,
} from "react";
import type * as React from "react";
import { cn } from "../utils";
import { Input, type InputProps } from "./input";
import { XIcon } from "../internal-icons";

/**
 * Combobox - an Input paired with a floating popup that shows arbitrary
 * filterable content (suggestions, recent searches, custom rows). Built on
 * `@floating-ui/react` with virtual focus (input keeps focus, items
 * highlighted via aria-activedescendant) and motion-driven open/close.
 *
 * Unlike `Command`, the popup is anchored to an input and opens on focus.
 * Unlike `Menu`, the trigger is an input — typing filters externally;
 * Combobox doesn't manage filtering, it manages the popup + keyboard
 * navigation + ARIA wiring. You compose the items / content yourself.
 *
 * Usage:
 *   <Combobox>
 *     <ComboboxInput
 *       value={query}
 *       onChange={(e) => setQuery(e.target.value)}
 *       icon={<Search />}
 *       placeholder="Search..."
 *     />
 *     <ComboboxPopup>
 *       {results.map((r) => (
 *         <ComboboxItem key={r.id} onSelect={() => pick(r)}>
 *           {r.label}
 *         </ComboboxItem>
 *       ))}
 *     </ComboboxPopup>
 *   </Combobox>
 */

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
  baseId: string;
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
  children: React.ReactNode;
}

export function Combobox({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
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

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    transform: false,
    // Combobox semantics: always anchor below the input. `size` constrains
    // maxHeight to whatever fits — popup scrolls internally rather than
    // flipping above the input (Google-search style, not menu-style).
    middleware: [
      offset(8),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${Math.max(120, Math.min(availableHeight - 8, 400))}px`,
          });
        },
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "listbox" });
  // Virtual focus: input keeps real focus, items get aria-activedescendant.
  // The proper ARIA combobox pattern.
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
        baseId,
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
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "size-4 text-gray-800 transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        open ? "rotate-180" : "rotate-0",
      )}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export interface ComboboxInputProps extends InputProps {
  /** Open the popup automatically when the input receives focus. Default true. */
  openOnFocus?: boolean;
  /** Hide the auto-added chevron suffix that indicates open/close state. */
  hideChevron?: boolean;
  /**
   * When true and the input has a non-empty value, renders a trailing × that
   * clears the input. Wire `onClear` to reset your value state.
   */
  clearable?: boolean;
  /** Fired when the user clicks the × to clear. */
  onClear?: () => void;
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput(
    {
      openOnFocus = true,
      onFocus,
      onKeyDown,
      onClick,
      hideChevron,
      clearable,
      onClear,
      value,
      suffix: userSuffix,
      suffixStyling,
      ...props
    },
    forwardedRef,
  ) {
    const { open, setOpen, refs, getReferenceProps, baseId, activeIndex } =
      useComboboxContext();

    const hasValue =
      value != null && value !== "" && (typeof value !== "number" || !Number.isNaN(value));
    const showClear = clearable && hasValue && !props.disabled;

    // Build the combobox suffix: user-provided suffix + optional clear × + chevron.
    // Wrapped as a single node passed to Input's `suffix` slot with styling disabled
    // so it floats inline with the input area.
    const suffix = (userSuffix || showClear || !hideChevron) ? (
      <span className="inline-flex items-center gap-1.5">
        {userSuffix}
        {showClear && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear"
            onClick={(e) => {
              e.stopPropagation();
              onClear?.();
            }}
            className="inline-flex size-5 items-center justify-center rounded-full text-gray-800 hover:bg-gray-alpha-200 hover:text-gray-1000 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]"
          >
            <XIcon className="size-3" />
          </button>
        )}
        {!hideChevron && <ChevronIndicator open={open} />}
      </span>
    ) : undefined;
    // The Input component wraps the actual <input> in a <span> for icons /
    // suffix / clear button. The visible "field" box is the wrapper span,
    // not the inner input — so anchor floating-ui to the parent element so
    // the popup aligns with the full input chrome (icon included).
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

    // Pass our handlers THROUGH getReferenceProps so floating-ui can merge
    // them with its own interaction handlers. Spreading getReferenceProps()
    // separately would clobber whichever handlers were declared first.
    const mergedProps = getReferenceProps({
      ...(props as React.HTMLProps<HTMLInputElement>),
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
        // Base UI's typings re-wrap event types; cast on the user-handler call.
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
        value={value}
        suffix={suffix}
        suffixStyling={suffixStyling ?? false}
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
  const { open, context, refs, floatingStyles, getFloatingProps, baseId } =
    useComboboxContext();
  const setFloating = useCallback(
    (node: HTMLElement | null) => refs.setFloating(node),
    [refs],
  );
  const reduceMotion = useReducedMotion();

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          // initialFocus={-1} keeps focus on the input (virtual focus model).
          // visuallyHiddenDismiss adds an accessible close for screen readers.
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            // Don't programmatically refocus the input on close — the input
            // never lost focus (virtual focus model), and refocusing would
            // fire a focus event that triggers openOnFocus, reopening the
            // popup right after dismiss closed it.
            returnFocus={false}
            visuallyHiddenDismiss
          >
            <motion.div
              ref={setFloating}
              id={`${baseId}-popup`}
              data-slot="combobox-popup"
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
                "z-[80] flex flex-col rounded-[var(--radius-12)] bg-background-100 border border-gray-alpha-400 shadow-menu outline-none overflow-hidden",
                className,
              )}
            >
              <div className="max-h-full overflow-y-auto">{children}</div>
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

/* --------------------------- ComboboxItem --------------------------- */

export interface ComboboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Fired when the user clicks or presses Enter while this item is active. */
  onSelect?: () => void;
  label?: string;
  disabled?: boolean;
}

export function ComboboxItem({
  className,
  children,
  onSelect,
  label,
  disabled,
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
    setOpen(false);
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
        "mx-1 flex cursor-default items-center gap-2 rounded-[var(--radius-6)] px-3 py-2 text-copy-14 text-gray-1000 outline-none transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] data-[active]:bg-gray-alpha-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
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
