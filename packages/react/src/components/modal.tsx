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
  useId,
} from "react";
import type * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { cn } from "../utils";
import { focusRing } from "../recipes";
import { Button, type ButtonProps } from "./button";

/**
 * Modal — floating dialog surface for content that requires user
 * attention. Controlled externally via `active`.
 *
 * Compound:
 *   <Modal active={open} onClickOutside={() => setOpen(false)}>
 *     <ModalBody>
 *       <ModalHeader>
 *         <ModalTitle>Update Project</ModalTitle>
 *         <ModalSubtitle>Bumping the framework to the latest major.</ModalSubtitle>
 *       </ModalHeader>
 *       <p>...</p>
 *       <ModalInset>...distinct block...</ModalInset>
 *     </ModalBody>
 *     <ModalActions>
 *       <ModalAction variant="secondary" onClick={cancel}>Cancel</ModalAction>
 *       <ModalAction variant="primary" onClick={confirm}>Update</ModalAction>
 *     </ModalActions>
 *   </Modal>
 */

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-none",
};

type ModalContextValue = {
  titleId: string;
  subtitleId: string;
  setOpen: (open: boolean) => void;
  sticky: boolean;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error("Modal subcomponents must be used inside <Modal>");
  return ctx;
}

export interface ModalProps {
  /** Whether the modal is visible. Controlled by the consumer. */
  active: boolean;
  /** Called when the user presses Escape or clicks the backdrop. */
  onClickOutside?: () => void;
  /** Locks the header and footer while the body scrolls. Useful for long forms. */
  sticky?: boolean;
  /** Element to focus when the modal opens. Default: the first focusable element. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Max-width class name. `sm` (max-w-sm) through `full` (no cap). Default `md`. */
  size?: ModalSize;
  /** Show the default × close button in the top-right corner. Default true. */
  showCloseButton?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Modal({
  active,
  onClickOutside,
  sticky = false,
  initialFocusRef,
  size = "md",
  showCloseButton = true,
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

  const setFloating = useCallback(
    (node: HTMLElement | null) => refs.setFloating(node),
    [refs],
  );

  return (
    <ModalContext.Provider
      value={{ titleId, subtitleId, setOpen: () => onClickOutside?.(), sticky }}
    >
      <FloatingPortal>
        <AnimatePresence>
          {active && (
            <FloatingOverlay
              lockScroll={false}
              className="fixed inset-0 z-50"
              data-slot="modal-overlay"
            >
              {/* noIsolation: react-remove-scroll's default pointer-event
                  lockout blocks portaled popups (Menu, Select, Tooltip)
                  inside the modal. */}
              <RemoveScroll noIsolation>
                <motion.div
                  aria-hidden="true"
                  data-slot="modal-backdrop"
                  className="absolute inset-0 bg-black/40"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                  }
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
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
                        "relative flex max-h-[calc(100vh-2rem)] min-h-0 w-full min-w-0 origin-center flex-col rounded-[var(--radius-12)] bg-background-100 text-gray-1000 border border-gray-alpha-400 shadow-modal",
                        SIZE_CLASSES[size],
                        className,
                      )}
                      initial={
                        reduceMotion ? false : { opacity: 0, scale: 0.97 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={
                        reduceMotion ? undefined : { opacity: 0, scale: 0.97 }
                      }
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
                      {showCloseButton && (
                        <button
                          type="button"
                          aria-label="Close"
                          onClick={() => onClickOutside?.()}
                          data-slot="modal-close"
                          className={cn(
                            "absolute end-3 top-3 flex h-7 w-7 items-center justify-center rounded-[var(--radius-6)] text-gray-800 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-gray-alpha-200 hover:text-gray-1000",
                            focusRing,
                          )}
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
                      )}
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

/* ------------------------------- Body -------------------------------- */

export function ModalBody({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  const { sticky } = useModalContext();
  return (
    <div
      data-slot="modal-body"
      className={cn(
        "flex flex-col gap-4 p-5 pr-12",
        sticky && "flex-1 overflow-y-auto",
        className,
      )}
      {...props}
    />
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
      className={cn("flex flex-col gap-1", className)}
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

/* ------------------------------- Inset ------------------------------- */

/**
 * ModalInset — a visually distinct content block inside the body.
 * Use for previews, code blocks, or a "here's what will change" summary.
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
  /** Layout stacks actions vertically full-width. Useful on narrow mobile modals. */
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
        "flex gap-2 border-t border-gray-alpha-400 bg-background-200 px-5 py-3",
        stacked
          ? "flex-col"
          : "flex-col-reverse sm:flex-row sm:justify-end",
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
 * ModalAction — a Button inside <ModalActions>. Thin passthrough so
 * consumers get consistent sizing and a familiar API surface for
 * common cases (variant, onClick, disabled, prefix).
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
