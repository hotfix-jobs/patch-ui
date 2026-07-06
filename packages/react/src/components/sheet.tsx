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
import { X } from "lucide-react";
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

/**
 * Sheet: an edge-anchored panel that slides in from the top/right/bottom/left
 * of the viewport. Non-modal by default (page underneath stays interactive);
 * pass `modal` to darken the backdrop and block the page.
 *
 * Structure mirrors Modal: SheetHeader / SheetBody / SheetFooter as top-level
 * children of SheetContent, separated by hairlines.
 */

export type SheetSide = "top" | "right" | "bottom" | "left";

type SheetContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refs: ReturnType<typeof useFloating>["refs"];
  context: ReturnType<typeof useFloating>["context"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  titleId: string;
  descriptionId: string;
};

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext(): SheetContextValue {
  const ctx = useContext(SheetContext);
  if (!ctx)
    throw new Error("Sheet subcomponents must be used inside <Sheet>");
  return ctx;
}

export interface SheetProps {
  /** Controlled open state. */
  open?: boolean;
  /** Called when the open state should change. */
  onOpenChange?: (open: boolean) => void;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Sheet({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: SheetProps): React.ReactElement {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

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
        refs,
        context,
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

/* ------------------------------ Trigger ------------------------------ */

export interface SheetTriggerProps {
  render?: React.ReactElement;
  children?: React.ReactNode;
}

export function SheetTrigger({
  render,
  children,
  ...rest
}: SheetTriggerProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { refs, getReferenceProps } = useSheetContext();
  const triggerProps = getReferenceProps({
    ref: refs.setReference,
    ...rest,
  });

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      ...triggerProps,
      "data-slot": "sheet-trigger",
      children:
        (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }
  return (
    <button type="button" data-slot="sheet-trigger" {...triggerProps}>
      {children}
    </button>
  );
}

/* ------------------------------ Content ------------------------------ */

function getSlideVariants(side: SheetSide) {
  switch (side) {
    case "right":
      return { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };
    case "left":
      return { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } };
    case "top":
      return { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } };
    case "bottom":
      return { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
  }
}

export interface SheetContentProps {
  side?: SheetSide;
  className?: string;
  children?: React.ReactNode;
}

export function SheetContent({
  side = "right",
  className,
  children,
}: SheetContentProps): React.ReactElement {
  const { context, open, titleId, descriptionId, getFloatingProps, refs } =
    useSheetContext();
  const reduceMotion = useReducedMotion();
  const variants = getSlideVariants(side);

  const popupRef = useRef<HTMLDivElement | null>(null);
  const setPopupRef = useCallback(
    (node: HTMLDivElement | null) => {
      popupRef.current = node;
      refs.setFloating(node);
    },
    [refs],
  );

  const panel = (
    <FloatingFocusManager
      context={context}
      initialFocus={popupRef as React.RefObject<HTMLElement>}
      modal
    >
      <motion.div
        ref={setPopupRef}
        tabIndex={-1}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-slot="sheet-popup"
        data-side={side}
        {...getFloatingProps()}
        initial={reduceMotion ? false : variants.initial}
        animate={variants.animate}
        exit={reduceMotion ? undefined : variants.exit}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 380, damping: 38, mass: 0.8 }
        }
        className={cn(
          // Canonical drawer: flush with the anchored edge, single
          // inward-facing hairline border, inward-facing corners
          // rounded (radius-12). Sensible width cap on side="right"
          // / "left"; consumers can shrink via className.
          "fixed z-70 flex flex-col overflow-hidden bg-surface-elevated text-ink shadow-modal",
          side === "right" &&
            "top-0 bottom-0 right-0 w-[85vw] max-w-md border-l border-hairline rounded-l-[var(--radius-12)]",
          side === "left" &&
            "top-0 bottom-0 left-0 w-[85vw] max-w-md border-r border-hairline rounded-r-[var(--radius-12)]",
          side === "top" &&
            "top-0 left-0 right-0 border-b border-hairline rounded-b-[var(--radius-12)]",
          side === "bottom" &&
            "bottom-0 left-0 right-0 border-t border-hairline rounded-t-[var(--radius-12)]",
          className,
        )}
      >
        {children}
      </motion.div>
    </FloatingFocusManager>
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
                className="absolute inset-0 bg-white/60 dark:bg-black/60"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                }
              />
              {panel}
            </RemoveScroll>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

/* ------------------------------- Close ------------------------------- */

export interface SheetCloseProps {
  render?: React.ReactElement;
  children?: React.ReactNode;
}

/**
 * SheetClose: dismisses the sheet on click. Two modes:
 *
 * 1. **Bare** (`<SheetClose />`): renders the styled X icon button
 *    typically placed in the top-right of a SheetHeader. 32px circle,
 *    ink-muted at rest, lifts to ink on hover with a surface-2 fill.
 *
 * 2. **Passthrough** (`<SheetClose render={<Button>Cancel</Button>} />`):
 *    wraps the consumer's element with the close-onClick handler. Use
 *    for footer "Cancel" buttons, custom dismiss triggers, etc.
 */
export function SheetClose({
  render,
  children,
  className,
  ...rest
}: SheetCloseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { setOpen } = useSheetContext();
  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    rest.onClick?.(e as React.MouseEvent<HTMLButtonElement>);
    if (!e.defaultPrevented) setOpen(false);
  };

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      onClick: handleClick,
      "data-slot": "sheet-close",
      ...rest,
      children:
        (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }

  // Bare mode: styled X icon button. If children are provided (e.g.
  // a custom label), wrap them in a plain button instead so consumers
  // aren't forced into the icon-only shape.
  if (children != null) {
    return (
      <button
        type="button"
        onClick={handleClick}
        data-slot="sheet-close"
        className={className}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label="Close"
      onClick={handleClick}
      data-slot="sheet-close"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        className,
      )}
      {...rest}
    >
      <X aria-hidden className="size-4" />
    </button>
  );
}

/* ------------------------------- Header ------------------------------ */

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1 border-b border-hairline px-5 py-4",
        className,
      )}
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
      data-slot="sheet-title"
      className={cn("text-button-16 text-ink", className)}
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
      data-slot="sheet-description"
      className={cn("text-body-14 text-ink-muted", className)}
      {...props}
    />
  );
}

/* -------------------------------- Body ------------------------------- */

export function SheetBody({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="sheet-body"
      className={cn(
        "flex flex-col gap-4 p-5 flex-1 min-h-0 overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

/* ------------------------------- Footer ------------------------------ */

export interface SheetFooterProps extends React.ComponentProps<"div"> {
  /** Stack actions vertically full-width. */
  stacked?: boolean;
}

export function SheetFooter({
  className,
  stacked = false,
  ...props
}: SheetFooterProps): React.ReactElement {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        // Softer top border; no bg fill. bg-surface-1 was invisible on
        // the elevated sheet in dark mode. Divider alone carries the
        // region separation.
        "flex gap-2 border-t border-hairline px-5 py-3",
        stacked ? "flex-col" : "flex-row justify-between",
        className,
      )}
      {...props}
    />
  );
}
