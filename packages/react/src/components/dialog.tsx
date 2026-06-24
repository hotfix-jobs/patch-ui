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
  useContext,
  useId,
  useState,
} from "react";
import type * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { cn } from "../utils";
import { focusRing } from "../recipes";

type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

const SIZE_CLASSES: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-none",
};

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  context: ReturnType<typeof useFloating>["context"];
  refs: ReturnType<typeof useFloating>["refs"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  titleId: string;
  descriptionId: string;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog subcomponents must be used inside <Dialog>");
  return ctx;
}

export interface DialogProps {
  /** Controlled open state. */
  open?: boolean;
  /** Called when the open state should change. */
  onOpenChange?: (open: boolean) => void;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  children: React.ReactNode;
}

/**
 * Root component managing open/close state and ARIA wiring. Built on
 * `@floating-ui/react`'s composable primitives with `motion`-driven
 * enter/exit animations via AnimatePresence (true exit animations, unlike
 * the Base UI integration which couldn't coordinate JS-driven exits with
 * CSS transitionend listeners).
 */
export function Dialog({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: DialogProps): React.ReactElement {
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
    <DialogContext.Provider
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
    </DialogContext.Provider>
  );
}

export interface DialogTriggerProps {
  /** Element to render as the trigger (preserves the polymorphic pattern). */
  render?: React.ReactElement;
  children?: React.ReactNode;
}

/**
 * Renders an element that opens the dialog on click. Pass `render={<Button />}`
 * to use a styled button as the trigger; otherwise wraps `children` in a
 * native button.
 */
export function DialogTrigger({
  render,
  children,
  ...rest
}: DialogTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { refs, getReferenceProps } = useDialogContext();
  const triggerProps = getReferenceProps({
    ref: refs.setReference,
    ...rest,
  });

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      ...triggerProps,
      "data-slot": "dialog-trigger",
      // Merge children: if the render element has its own children, prefer them.
      children: (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }
  return (
    <button type="button" data-slot="dialog-trigger" {...triggerProps}>
      {children}
    </button>
  );
}

export interface DialogContentProps {
  children?: React.ReactNode;
  showCloseButton?: boolean;
  size?: DialogSize;
  className?: string;
}

export function DialogContent({
  children,
  showCloseButton = true,
  size = "md",
  className,
}: DialogContentProps): React.ReactElement {
  const { context, refs, open, titleId, descriptionId, getFloatingProps } =
    useDialogContext();
  const reduceMotion = useReducedMotion();

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <FloatingOverlay
            lockScroll={false}
            className="fixed inset-0 z-50"
            data-slot="dialog-overlay"
          >
            {/* noIsolation: react-remove-scroll's default pointer-event
                lockout blocks portaled popups (Menu, Select, Tooltip)
                inside the dialog. The dismissable layer + backdrop already
                handle outside-click — the isolation is duplicative. */}
            <RemoveScroll noIsolation>
              <motion.div
                aria-hidden="true"
                data-slot="dialog-backdrop"
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
              <div className="absolute inset-0 flex items-center justify-center p-4 max-sm:items-start max-sm:p-0 max-sm:pt-12">
                <FloatingFocusManager context={context}>
                  <motion.div
                    ref={refs.setFloating}
                    aria-labelledby={titleId}
                    aria-describedby={descriptionId}
                    data-slot="dialog-popup"
                    {...getFloatingProps()}
                    className={cn(
                      "relative flex max-h-[calc(100vh-2rem)] min-h-0 w-full min-w-0 origin-center flex-col rounded-[var(--radius-patch-sm)] bg-patch-surface text-patch-text border-[0.5px] border-[var(--patch-border)] shadow-patch-overlay max-sm:max-w-none max-sm:rounded-none max-sm:border-0 max-sm:max-h-[calc(100vh-3rem)]",
                      SIZE_CLASSES[size],
                      className,
                    )}
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
                            damping: 35,
                            mass: 0.6,
                          }
                    }
                  >
                    {children}
                    {showCloseButton && <DialogClose />}
                  </motion.div>
                </FloatingFocusManager>
              </div>
            </RemoveScroll>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

export interface DialogCloseProps {
  render?: React.ReactElement;
  children?: React.ReactNode;
}

/**
 * Closes the dialog when clicked. Pass `render={<Button />}` for polymorphism.
 * When called with no render and no children, renders a default × icon in
 * the popup's top-right corner.
 */
export function DialogClose({
  render,
  children,
  ...rest
}: DialogCloseProps & React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  const { setOpen } = useDialogContext();
  const onClick = () => setOpen(false);

  if (render && isValidElement(render)) {
    return cloneElement(render, {
      onClick,
      "data-slot": "dialog-close",
      ...rest,
      children: (render.props as { children?: React.ReactNode }).children ?? children,
    } as React.HTMLAttributes<HTMLElement>);
  }
  if (children) {
    return (
      <button
        type="button"
        onClick={onClick}
        data-slot="dialog-close"
        {...rest}
      >
        {children}
      </button>
    );
  }
  // Default: corner × button used when DialogContent.showCloseButton is true.
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      data-slot="dialog-close"
      className={cn(
        "absolute end-3 top-3 flex h-7 w-7 items-center justify-center rounded-[var(--radius-patch-sm)] text-patch-text-tertiary transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] hover:bg-patch-surface-hover hover:text-patch-text",
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

export function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  // pr-12 reserves space for the absolute-positioned X close button
  // (end-3 top-3, h-7 w-7) so titles never overlap it.
  return (
    <div
      className={cn("flex flex-col gap-2 p-4 pr-12", className)}
      data-slot="dialog-header"
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 px-4 py-3 sm:flex-row sm:justify-end",
        className,
      )}
      data-slot="dialog-footer"
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: React.ComponentProps<"h2">): React.ReactElement {
  const { titleId } = useDialogContext();
  return (
    <h2
      id={titleId}
      className={cn(
        "font-semibold text-[length:var(--text-patch-body)] leading-none text-patch-text",
        className,
      )}
      data-slot="dialog-title"
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  const { descriptionId } = useDialogContext();
  return (
    <p
      id={descriptionId}
      className={cn(
        "text-patch-text-tertiary text-[length:var(--text-patch-mini)]",
        className,
      )}
      data-slot="dialog-description"
      {...props}
    />
  );
}

export function DialogPanel({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex-1 overflow-y-auto p-4", className)}
      data-slot="dialog-panel"
      {...props}
    />
  );
}
