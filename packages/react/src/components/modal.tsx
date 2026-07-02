"use client";

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import type * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { cn } from "../utils";
import { Button, type ButtonProps } from "./button";

/**
 * Modal — floating dialog surface for content that requires user attention.
 * Controlled externally via `active`. On mobile viewports the modal anchors
 * to the bottom of the screen and slides up as a sheet; on tablet+ it centers
 * and scales in.
 */

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  full: "sm:max-w-none",
};

type ModalContextValue = {
  titleId: string;
  subtitleId: string;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error("Modal subcomponents must be used inside <Modal>");
  return ctx;
}

/** Detect if we're rendering to a viewport at or below Tailwind's `sm` breakpoint (640px). */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export interface ModalProps {
  /** Whether the modal is visible. Controlled by the consumer. */
  active: boolean;
  /** Called when the user presses Escape or clicks the backdrop. */
  onClickOutside?: () => void;
  /** Element to focus when the modal opens. Default: the first focusable element. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Max-width. Only applies on tablet+; mobile is always full-width. Default `md`. */
  size?: ModalSize;
  className?: string;
  children: React.ReactNode;
}

export function Modal({
  active,
  onClickOutside,
  initialFocusRef,
  size = "md",
  className,
  children,
}: ModalProps): React.ReactElement {
  const setOpen = useCallback(
    (next: boolean) => {
      if (!next) onClickOutside?.();
    },
    [onClickOutside],
  );

  const { refs, context } = useFloating({
    open: active,
    onOpenChange: setOpen,
  });

  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });

  const { getFloatingProps } = useInteractions([dismiss, role]);

  const titleId = useId();
  const subtitleId = useId();
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const setFloating = useCallback(
    (node: HTMLElement | null) => refs.setFloating(node),
    [refs],
  );

  // Mobile: slide up from below. Desktop: subtle scale + fade.
  const initial = reduceMotion
    ? false
    : isMobile
      ? { y: "100%", opacity: 1 }
      : { opacity: 0, scale: 0.97 };
  const animate = isMobile ? { y: 0, opacity: 1 } : { opacity: 1, scale: 1 };
  const exit = reduceMotion
    ? undefined
    : isMobile
      ? { y: "100%", opacity: 1 }
      : { opacity: 0, scale: 0.97 };
  const transition = reduceMotion
    ? { duration: 0 }
    : isMobile
      ? { type: "spring" as const, stiffness: 420, damping: 40, mass: 0.7 }
      : { type: "spring" as const, stiffness: 400, damping: 35, mass: 0.6 };

  return (
    <ModalContext.Provider value={{ titleId, subtitleId }}>
      <FloatingPortal>
        <AnimatePresence>
          {active && (
            <FloatingOverlay
              lockScroll={false}
              className="fixed inset-0 z-50"
              data-slot="modal-overlay"
            >
              <RemoveScroll noIsolation>
                <motion.div
                  aria-hidden="true"
                  data-slot="modal-backdrop"
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
                <div className="absolute inset-0 flex items-end justify-center sm:items-center sm:p-4">
                  <FloatingFocusManager
                    context={context}
                    initialFocus={initialFocusRef ?? undefined}
                  >
                    <motion.div
                      ref={setFloating}
                      aria-labelledby={titleId}
                      aria-describedby={subtitleId}
                      data-slot="modal-popup"
                      {...getFloatingProps()}
                      className={cn(
                        // Base container: full-width bottom sheet on mobile, centered popup on desktop.
                        "relative flex w-full min-w-0 min-h-0 flex-col overflow-hidden bg-background-100 text-gray-1000 border border-gray-alpha-400 shadow-modal",
                        // Rounded only at top on mobile (sheet), fully rounded on desktop.
                        "rounded-t-[var(--radius-12)] sm:rounded-[var(--radius-12)]",
                        // Height: cap at 85vh on mobile, calc(100vh-2rem) on desktop.
                        "max-h-[85vh] sm:max-h-[calc(100vh-2rem)]",
                        SIZE_CLASSES[size],
                        className,
                      )}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={transition}
                    >
                      {children}
                    </motion.div>
                  </FloatingFocusManager>
                </div>
              </RemoveScroll>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </ModalContext.Provider>
  );
}

/* ------------------------------- Header ------------------------------ */

export function ModalHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="modal-header"
      className={cn(
        "flex flex-col gap-1 border-b border-gray-alpha-400 px-5 py-4",
        className,
      )}
      {...props}
    />
  );
}

export function ModalTitle({
  className,
  ...props
}: React.ComponentProps<"h2">): React.ReactElement {
  const { titleId } = useModalContext();
  return (
    <h2
      id={titleId}
      data-slot="modal-title"
      className={cn("text-heading-16 text-gray-1000", className)}
      {...props}
    />
  );
}

export function ModalSubtitle({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  const { subtitleId } = useModalContext();
  return (
    <p
      id={subtitleId}
      data-slot="modal-subtitle"
      className={cn("text-copy-14 text-gray-800", className)}
      {...props}
    />
  );
}

/* -------------------------------- Body ------------------------------- */

export function ModalBody({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="modal-body"
      className={cn(
        "flex flex-col gap-4 p-5 flex-1 min-h-0 overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------- Inset ------------------------------ */

/**
 * ModalInset — a visually distinct block inside the body. Use for previews,
 * code, or "here's what will change" summaries.
 */
export function ModalInset({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="modal-inset"
      className={cn(
        "rounded-[var(--radius-6)] border border-gray-alpha-400 bg-background-200 p-4",
        className,
      )}
      {...props}
    />
  );
}

/* ------------------------------ Actions ------------------------------ */

export interface ModalActionsProps extends React.ComponentProps<"div"> {
  /** Stack actions vertically full-width. Useful on very narrow mobile modals. */
  stacked?: boolean;
}

export function ModalActions({
  className,
  stacked = false,
  ...props
}: ModalActionsProps): React.ReactElement {
  return (
    <div
      data-slot="modal-actions"
      className={cn(
        "flex gap-2 border-t border-gray-alpha-400 px-5 py-3",
        stacked ? "flex-col" : "flex-row justify-between",
        className,
      )}
      {...props}
    />
  );
}

export interface ModalActionProps extends Omit<ButtonProps, "variant"> {
  /** Match Button variants. Default `secondary`. */
  variant?: ButtonProps["variant"];
  /** Full-width in the actions row. Useful for stacked mobile actions. */
  fullWidth?: boolean;
}

/**
 * ModalAction — a Button inside <ModalActions>. Thin passthrough so consumers
 * get consistent sizing and a familiar API surface for common cases.
 */
export function ModalAction({
  variant = "secondary",
  fullWidth,
  className,
  ...props
}: ModalActionProps): React.ReactElement {
  return (
    <Button
      variant={variant}
      data-slot="modal-action"
      className={cn(fullWidth && "w-full", className)}
      {...props}
    />
  );
}
