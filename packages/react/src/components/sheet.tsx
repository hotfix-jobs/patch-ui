"use client";

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import type * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { cn } from "../utils";
import { focusRing } from "../recipes";

type SheetSide = "right" | "left" | "top" | "bottom";

type SheetContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  context: ReturnType<typeof useFloating>["context"];
  refs: ReturnType<typeof useFloating>["refs"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  titleId: string;
  descriptionId: string;
};

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext(): SheetContextValue {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("Sheet subcomponents must be used inside <Sheet>");
  return ctx;
}

export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

/**
 * Root component managing open/close state and ARIA wiring. Built on
 * `@floating-ui/react` + `motion` with true bidirectional slide animations
 * coordinated through AnimatePresence.
 */
export function Sheet({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: SheetProps): React.ReactElement {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const { refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const titleId = useId();
  const descriptionId = useId();

  return (
    <SheetContext.Provider
      value={{
        open,
        setOpen,
        context,
        refs,
        getReferenceProps,
        getFloatingProps,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </SheetContext.Provider>
  );
}

export interface SheetTriggerProps {
  render?: React.ReactElement;
  children?: React.ReactNode;
}

export function SheetTrigger({
  render,
  children,
  ...rest
}: SheetTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { refs, getReferenceProps } = useSheetContext();
  const triggerProps = getReferenceProps({
    ref: refs.setReference,
    ...rest,
  });

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      ...triggerProps,
      "data-slot": "sheet-trigger",
      children: (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }
  return (
    <button type="button" data-slot="sheet-trigger" {...triggerProps}>
      {children}
    </button>
  );
}

/**
 * Motion enter/exit variants by edge.
 */
function getSlideVariants(side: SheetSide) {
  switch (side) {
    case "right":
      return {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
      };
    case "left":
      return {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
      };
    case "top":
      return {
        initial: { y: "-100%" },
        animate: { y: 0 },
        exit: { y: "-100%" },
      };
    case "bottom":
      return {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
      };
  }
}

export interface SheetContentProps {
  children?: React.ReactNode;
  side?: SheetSide;
  showCloseButton?: boolean;
  className?: string;
}

export function SheetContent({
  children,
  side = "right",
  showCloseButton = true,
  className,
}: SheetContentProps): React.ReactElement {
  const { context, refs, open, titleId, descriptionId, getFloatingProps } =
    useSheetContext();
  const reduceMotion = useReducedMotion();
  const variants = getSlideVariants(side);
  // Mirror the floating element ref locally so FloatingFocusManager can
  // receive a real RefObject (the floating-ui callback ref isn't one).
  const popupRef = useRef<HTMLDivElement | null>(null);
  const setPopupRef = useCallback(
    (node: HTMLDivElement | null) => {
      popupRef.current = node;
      refs.setFloating(node);
    },
    [refs],
  );

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <FloatingOverlay
            lockScroll={false}
            className="fixed inset-0 z-70"
            data-slot="sheet-overlay"
          >
            <RemoveScroll noIsolation>
              <motion.div
                aria-hidden="true"
                data-slot="sheet-backdrop"
                className="absolute inset-0 bg-black/5 backdrop-blur-xs"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                }
              />
              <FloatingFocusManager
                context={context}
                // Focus the popup root rather than the first focusable
                // child — focusing an Input or focusable element inside
                // can trigger a scrollIntoView that hijacks the slide
                // animation. Focusing the container keeps the trap
                // working without disturbing layout.
                initialFocus={popupRef as React.RefObject<HTMLElement>}
              >
                <motion.div
                  ref={setPopupRef}
                  tabIndex={-1}
                  aria-labelledby={titleId}
                  aria-describedby={descriptionId}
                  data-slot="sheet-popup"
                  {...getFloatingProps()}
                  initial={reduceMotion ? false : variants.initial}
                  animate={variants.animate}
                  exit={reduceMotion ? undefined : variants.exit}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 380,
                          damping: 38,
                          mass: 0.8,
                        }
                  }
                  className={cn(
                    "absolute z-70 flex flex-col bg-patch-surface text-patch-text border-[0.5px] border-[var(--dialog-border)] shadow-patch-overlay",
                    side === "right" &&
                      "inset-y-0 right-0 h-full w-full max-w-md rounded-l-[var(--radius-patch-sm)]",
                    side === "left" &&
                      "inset-y-0 left-0 h-full w-full max-w-md rounded-r-[var(--radius-patch-sm)]",
                    side === "top" &&
                      "inset-x-0 top-0 w-full rounded-b-[var(--radius-patch-sm)]",
                    side === "bottom" &&
                      "inset-x-0 bottom-0 w-full rounded-t-[var(--radius-patch-sm)]",
                    className,
                  )}
                >
                  {children}
                  {showCloseButton && <SheetClose />}
                </motion.div>
              </FloatingFocusManager>
            </RemoveScroll>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

export interface SheetCloseProps {
  render?: React.ReactElement;
  children?: React.ReactNode;
}

export function SheetClose({
  render,
  children,
  ...rest
}: SheetCloseProps & React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { setOpen } = useSheetContext();
  const onClick = () => setOpen(false);

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      onClick,
      "data-slot": "sheet-close",
      ...rest,
      children: (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }
  if (children) {
    return (
      <button
        type="button"
        onClick={onClick}
        data-slot="sheet-close"
        {...rest}
      >
        {children}
      </button>
    );
  }
  // Default: corner × button used when SheetContent.showCloseButton is true.
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      data-slot="sheet-close"
      className={cn(
        "absolute end-3 top-5 flex h-7 w-7 items-center justify-center rounded-[var(--radius-patch-sm)] text-patch-text-tertiary transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] hover:bg-patch-surface-hover hover:text-patch-text",
        focusRing,
      )}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  // pr-12 reserves space for the absolute-positioned X close button
  // (end-3 top-5, h-7 w-7) so titles never overlap it.
  return (
    <div
      className={cn("flex flex-col gap-2 p-6 pr-12", className)}
      data-slot="sheet-header"
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<"h2">): React.ReactElement {
  const { titleId } = useSheetContext();
  return (
    <h2
      id={titleId}
      className={cn(
        "font-semibold text-lg leading-none text-patch-text",
        className,
      )}
      data-slot="sheet-title"
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  const { descriptionId } = useSheetContext();
  return (
    <p
      id={descriptionId}
      className={cn("text-patch-text-secondary text-sm", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

export function SheetPanel({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex-1 overflow-y-auto p-6", className)}
      data-slot="sheet-panel"
      {...props}
    />
  );
}

export function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t-[0.5px] border-patch-border px-6 py-4 sm:flex-row sm:justify-end",
        className,
      )}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

export function SheetHandle({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex justify-center pt-2 pb-1", className)}
      data-slot="sheet-handle"
      {...props}
    >
      <div className="h-1 w-8 rounded-full bg-[#333]" />
    </div>
  );
}
