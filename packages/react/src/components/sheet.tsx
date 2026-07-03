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

/**
 * Sheet: an edge-anchored panel that slides in from the top/right/bottom/left
 * of the viewport. Non-modal by default (page underneath stays interactive);
 * pass `modal` to darken the backdrop and block the page.
 *
 * Structure mirrors Modal: SheetHeader / SheetBody / SheetFooter as top-level
 * children of SheetContent, separated by hairlines.
 */

export type SheetSide = "top" | "right" | "bottom" | "left";
export type SheetVariant = "floating" | "drawer";

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
  /**
   * Layout treatment:
   * - `floating` (default): rounded card inset 16px from every viewport edge so the
   *   backdrop peeks around it. Right for editorial preview / inspector panels.
   * - `drawer`: flush with the anchored edge, full length along the perpendicular
   *   axis (top/bottom for side="right", left/right for side="top"), single
   *   inward-facing border, inward-facing corners rounded to match floating.
   *   Right for mobile navigation and app-shell drawers.
   *
   * If you find yourself piling `!important` overrides on `className` for the floating
   * variant, you probably want `variant="drawer"` instead — floating is designed to
   * fill the mobile viewport with 16px insets and won't cede its both-side anchors.
   */
  variant?: SheetVariant;
  /** When true (default), renders a darkening backdrop and blocks page interaction. Pass `modal={false}` for a persistent inspector that keeps the page interactive. */
  modal?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function SheetContent({
  side = "right",
  variant = "floating",
  modal = true,
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
      modal={modal}
    >
      <motion.div
        ref={setPopupRef}
        tabIndex={-1}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-slot="sheet-popup"
        data-side={side}
        data-variant={variant}
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
          "fixed z-70 flex flex-col overflow-hidden bg-background-100 text-gray-1000 shadow-modal",
          // Floating: rounded card, 16px inset from every edge so the backdrop
          // peeks around all four corners.
          variant === "floating" &&
            "border border-gray-alpha-400 rounded-[var(--radius-12)]",
          variant === "floating" &&
            side === "right" &&
            "top-4 bottom-4 right-4 left-4 sm:left-auto sm:w-full sm:max-w-md",
          variant === "floating" &&
            side === "left" &&
            "top-4 bottom-4 left-4 right-4 sm:right-auto sm:w-full sm:max-w-md",
          variant === "floating" && side === "top" && "top-4 left-4 right-4",
          variant === "floating" && side === "bottom" && "bottom-4 left-4 right-4",
          // Drawer: flush with the anchored edge, single inward-facing hairline.
          // The two inward-facing corners are rounded (radius-12, matching
          // floating); the two edge-flush corners stay square. Sensible width
          // cap on side="right"/"left"; consumers can shrink via className.
          variant === "drawer" &&
            side === "right" &&
            "top-0 bottom-0 right-0 w-[85vw] max-w-md border-l border-gray-alpha-400 rounded-l-[var(--radius-12)]",
          variant === "drawer" &&
            side === "left" &&
            "top-0 bottom-0 left-0 w-[85vw] max-w-md border-r border-gray-alpha-400 rounded-r-[var(--radius-12)]",
          variant === "drawer" &&
            side === "top" &&
            "top-0 left-0 right-0 border-b border-gray-alpha-400 rounded-b-[var(--radius-12)]",
          variant === "drawer" &&
            side === "bottom" &&
            "bottom-0 left-0 right-0 border-t border-gray-alpha-400 rounded-t-[var(--radius-12)]",
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
          <>
            {modal ? (
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
            ) : (
              panel
            )}
          </>
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
 * SheetClose: wraps a consumer-provided element to close the sheet on click.
 * Use with `render={<Button />}` inside SheetFooter, or as children of any
 * element that should dismiss the sheet.
 */
export function SheetClose({
  render,
  children,
  ...rest
}: SheetCloseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { setOpen } = useSheetContext();
  const onClick = () => setOpen(false);

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      onClick,
      "data-slot": "sheet-close",
      ...rest,
      children:
        (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }
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

/* ------------------------------- Header ------------------------------ */

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1 border-b border-gray-alpha-400 px-5 py-4",
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
      className={cn("text-heading-16 text-gray-1000", className)}
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
      className={cn("text-copy-14 text-gray-800", className)}
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
        "flex gap-2 border-t border-gray-alpha-400 bg-background-200 px-5 py-3",
        stacked ? "flex-col" : "flex-row justify-between",
        className,
      )}
      {...props}
    />
  );
}
