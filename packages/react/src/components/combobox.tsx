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
  useRef,
  useState,
} from "react";
import type * as React from "react";
import { cn } from "../utils";
import { Input, type InputProps } from "./input";
import { Button } from "./button";
import { ChevronDown, Search, X } from "lucide-react";

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

/**
 * Combobox - an Input paired with a floating popup that shows arbitrary
 * filterable content (suggestions, recent searches, custom rows). Built on
 * `@floating-ui/react` with virtual focus (input keeps focus, items
 * highlighted via aria-activedescendant) and motion-driven open/close.
 *
 * Unlike `Command`, the popup is anchored to an input and opens on focus.
 * Unlike `Menu`, the trigger is an input: typing filters externally;
 * Combobox doesn't manage filtering, it manages the popup + keyboard
 * navigation + ARIA wiring. You compose the items / content yourself.
 *
 * Usage:
 *   <Combobox value={query} onValueChange={setQuery} placeholder="Search...">
 *     <ComboboxInput prefix={<Search />} prefixStyling={false} />
 *     <ComboboxPopup>
 *       {results.map((r) => (
 *         <ComboboxItem key={r.id} onSelect={() => pick(r)}>
 *           {r.label}
 *         </ComboboxItem>
 *       ))}
 *     </ComboboxPopup>
 *   </Combobox>
 *
 * Below the md breakpoint the popup renders as a bottom-anchored fixed
 * panel with its own search input; desktop is unchanged. For multi-select
 * pickers, pass `closeOnSelect={false}` on ComboboxItem.
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
  // Query state lives on the root so the trigger input and the mobile panel's
  // own input can share it. Consumers may still override on ComboboxInput.
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
  /**
   * Current query string. Wired through context so the trigger input and the
   * mobile panel's own input share it. May still be overridden per-input.
   */
  value?: string;
  /** Called when the query should change. Receives the new string. */
  onValueChange?: (next: string) => void;
  /** Placeholder for the trigger input and the mobile panel input. */
  placeholder?: string;
  children: React.ReactNode;
}

export function Combobox({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  value,
  onValueChange,
  placeholder,
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

  // Ref-mirror of isMobile so the size middleware (which lives outside React)
  // can bail without triggering a `useFloating` re-init on breakpoint change.
  const isMobileRef = useRef(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    transform: false,
    // Combobox semantics: always anchor below the input. `size` constrains
    // maxHeight to whatever fits: popup scrolls internally rather than
    // flipping above the input (Google-search style, not menu-style). On the
    // mobile variant the popup owns its own fixed bottom-anchored geometry,
    // so bail out entirely to avoid clobbering our layout.
    middleware: [
      offset(8),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements, availableHeight }) {
          if (isMobileRef.current) return;
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
  const isMobile = useIsMobileCombobox();
  isMobileRef.current = isMobile;

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
    <ChevronDown
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 text-gray-800 transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        open ? "rotate-180" : "rotate-0",
      )}
    />
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
      onChange,
      hideChevron,
      clearable,
      onClear,
      value,
      placeholder,
      suffix: userSuffix,
      suffixStyling,
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
      value: ctxValue,
      onValueChange,
      placeholder: ctxPlaceholder,
    } = useComboboxContext();

    // Prefer the per-input override; fall back to root context. This keeps
    // simple callsites (state on <Combobox>) working while still supporting
    // advanced cases (a controlled override on a single input).
    const effectiveValue = value !== undefined ? value : ctxValue;
    const effectivePlaceholder =
      placeholder !== undefined ? placeholder : ctxPlaceholder;

    const hasValue =
      effectiveValue != null &&
      effectiveValue !== "" &&
      (typeof effectiveValue !== "number" || !Number.isNaN(effectiveValue));
    const showClear = clearable && hasValue && !props.disabled;

    // Build the combobox suffix: user-provided suffix + optional clear × + chevron.
    // Wrapped as a single node passed to Input's `suffix` slot with styling disabled
    // so it floats inline with the input area.
    // Vercel-style suffix: the clear × REPLACES the chevron when there is a value
    // to clear. Otherwise the chevron indicates open/close state. This keeps the
    // affordance space to a single glyph.
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
            className="inline-flex size-5 items-center justify-center rounded-full text-gray-800 hover:bg-gray-alpha-200 hover:text-gray-1000 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]"
          >
            <X className="size-3" strokeWidth={2.5} />
          </button>
        ) : (
          !hideChevron && <ChevronIndicator open={open} />
        )}
      </span>
    ) : undefined;
    // The Input component wraps the actual <input> in a <span> for icons /
    // suffix / clear button. The visible "field" box is the wrapper span,
    // not the inner input: so anchor floating-ui to the parent element so
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
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        // Root's onValueChange is the source of truth; any per-input onChange
        // still fires as a side-effect hook (analytics, etc.).
        onValueChange?.(e.target.value);
        onChange?.(e as Parameters<NonNullable<typeof onChange>>[0]);
      },
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
        value={effectiveValue}
        placeholder={effectivePlaceholder}
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

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          // Desktop uses virtual focus (initialFocus={-1}: input keeps real focus,
          // items highlight via aria-activedescendant). Mobile switches to real
          // focus on the panel's own input (initialFocus={0}) since the trigger
          // input is off-screen behind the panel.
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={isMobile ? 0 : -1}
            // Don't programmatically refocus the trigger input on close: the
            // input never lost focus on desktop (virtual focus), and refocusing
            // would fire a focus event that triggers openOnFocus, reopening the
            // popup right after dismiss closed it.
            returnFocus={false}
            visuallyHiddenDismiss
          >
            <motion.div
              ref={setFloating}
              id={`${baseId}-popup`}
              data-slot="combobox-popup"
              data-variant={isMobile ? "mobile" : "desktop"}
              {...getFloatingProps()}
              style={
                isMobile
                  ? {
                      // Skip floating-ui's anchored position. Bottom-anchored
                      // fixed panel with 8px inset on the horizontal + bottom
                      // edges; height capped so it can't touch the top edge.
                      position: "fixed",
                      left: 8,
                      right: 8,
                      bottom: 8,
                      maxHeight: "calc(100vh - 1rem)",
                    }
                  : {
                      ...floatingStyles,
                      transformOrigin: "top center",
                    }
              }
              initial={
                reduceMotion
                  ? false
                  : isMobile
                    ? { opacity: 0, y: 8 }
                    : { opacity: 0, scale: 0.97 }
              }
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
              exit={
                reduceMotion
                  ? undefined
                  : isMobile
                    ? { opacity: 0, y: 8 }
                    : { opacity: 0, scale: 0.97 }
              }
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
              {isMobile && (
                <div
                  data-slot="combobox-mobile-header"
                  className="flex shrink-0 items-center gap-1 border-b border-gray-alpha-400 pe-2"
                >
                  <Input
                    variant="unstyled"
                    autoFocus
                    autoComplete="off"
                    prefix={<Search />}
                    prefixStyling={false}
                    value={ctxValue ?? ""}
                    onChange={(e) => onValueChange?.(e.target.value)}
                    placeholder={ctxPlaceholder}
                    aria-label={ctxPlaceholder ?? "Search"}
                  />
                  <Button
                    variant="tertiary"
                    size="tiny"
                    shape="circle"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                    className="text-gray-800"
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              )}
              <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
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
  /**
   * Whether to close the popup after selection. Default true (single-select
   * combobox). Set false for multi-select pickers where the user is expected
   * to toggle several items before dismissing.
   */
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
        "mx-1 flex cursor-pointer items-center gap-2 rounded-[var(--radius-6)] px-3 py-2 text-copy-14 text-gray-1000 outline-none transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-gray-alpha-200 data-[active]:bg-gray-alpha-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
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
