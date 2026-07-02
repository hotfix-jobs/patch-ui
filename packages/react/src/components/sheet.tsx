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
 * Sheet — an edge-anchored panel that slides in from the top/right/bottom/left
 * of the viewport. Non-modal by default (page underneath stays interactive);
 * pass `modal` to darken the backdrop and block the page.
 *
 * Structure mirrors Modal — SheetHeader / SheetBody / SheetFooter as top-level
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
  const dismiss = useDismiss(context, {
    // Vercel Sheet spec: outside click doesn't dismiss by default;
    // only escape + explicit close.
    outsidePress: false,
    escapeKey: true,
  });
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
  /** When true (default), renders a darkening backdrop and blocks page interaction. Pass `modal={false}` for a persistent inspector that keeps the page interactive. */
  modal?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function SheetContent({
  side = "right",
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
          // Floating rounded card, small inset from the viewport edges so
          // the backdrop peeks around it and all four corners can be seen.
          "fixed z-70 flex flex-col overflow-hidden bg-background-100 text-gray-1000 border border-gray-alpha-400 shadow-modal rounded-[var(--radius-12)]",
          // Mobile: span across with left-4 + right-4 (fills width minus 16px per side).
          // sm+: release the opposite-side anchor and cap width via max-w-md.
          side === "right" &&
            "top-4 bottom-4 right-4 left-4 sm:left-auto sm:w-full sm:max-w-md",
          side === "left" &&
            "top-4 bottom-4 left-4 right-4 sm:right-auto sm:w-full sm:max-w-md",
          side === "top" && "top-4 left-4 right-4",
          side === "bottom" && "bottom-4 left-4 right-4",
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
 * SheetClose — wraps a consumer-provided element to close the sheet on click.
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
