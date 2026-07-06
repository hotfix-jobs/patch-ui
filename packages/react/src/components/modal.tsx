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

import { X } from "@phosphor-icons/react/dist/ssr";
/** Floating dialog surface; slides up as a sheet on mobile, centers on tablet+. */
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
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error("Modal subcomponents must be used inside <Modal>");
  return ctx;
}

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

export type ModalMobileLayout = "sheet" | "centered";

export interface ModalProps {
  active: boolean;
  onClickOutside?: () => void;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Max-width on tablet+; mobile is full-width. Default `md`. */
  size?: ModalSize;
  /** Mobile positioning: `sheet` slides up from the bottom, `centered` fades and scales. Default `sheet`. */
  mobileLayout?: ModalMobileLayout;
  className?: string;
  children: React.ReactNode;
}

export function Modal({
  active,
  onClickOutside,
  initialFocusRef,
  size = "md",
  mobileLayout = "sheet",
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

  const isMobileSheet = isMobile && mobileLayout === "sheet";
  const initial = reduceMotion
    ? false
    : isMobileSheet
      ? { y: "100%", opacity: 1 }
      : { opacity: 0, scale: 0.97 };
  const animate = isMobileSheet ? { y: 0, opacity: 1 } : { opacity: 1, scale: 1 };
  const exit = reduceMotion
    ? undefined
    : isMobileSheet
      ? { y: "100%", opacity: 1 }
      : { opacity: 0, scale: 0.97 };
  const transition = reduceMotion
    ? { duration: 0 }
    : isMobileSheet
      ? { type: "spring" as const, stiffness: 420, damping: 40, mass: 0.7 }
      : { type: "spring" as const, stiffness: 400, damping: 35, mass: 0.6 };

  const close = useCallback(() => onClickOutside?.(), [onClickOutside]);

  return (
    <ModalContext.Provider value={{ titleId, subtitleId, close }}>
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
                <div
                  className={cn(
                    "absolute inset-0 flex justify-center sm:items-center sm:p-4",
                    mobileLayout === "sheet" ? "items-end" : "items-center p-4",
                  )}
                >
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
                        "relative flex w-full min-w-0 min-h-0 flex-col overflow-hidden bg-surface-elevated text-ink border border-hairline shadow-modal",
                        mobileLayout === "sheet"
                          ? "rounded-t-[var(--radius-12)] sm:rounded-[var(--radius-12)]"
                          : "rounded-[var(--radius-12)]",
                        mobileLayout === "sheet"
                          ? "max-h-[85vh] sm:max-h-[calc(100vh-2rem)]"
                          : "max-h-[calc(100dvh-2rem)]",
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

export function ModalHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="modal-header"
      className={cn(
        "flex flex-col gap-1 border-b border-hairline px-5 py-4",
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
      className={cn("text-button-16 text-ink", className)}
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
      className={cn("text-body-14 text-ink-muted", className)}
      {...props}
    />
  );
}

export function ModalClose({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">): React.ReactElement {
  const { close } = useModalContext();
  return (
    <button
      type="button"
      aria-label="Close"
      data-slot="modal-close"
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) close();
      }}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        className,
      )}
      {...props}
    >
      <X aria-hidden className="size-4" />
    </button>
  );
}

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

export function ModalInset({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="modal-inset"
      className={cn(
        // surface-2 (not surface-1) stays visible on the elevated modal in dark mode,
        // where surface-1 and surface-elevated both resolve to the same value.
        "rounded-[var(--radius-6)] border border-hairline bg-surface-2 p-4",
        className,
      )}
      {...props}
    />
  );
}

export interface ModalActionsProps extends React.ComponentProps<"div"> {
  /** Stack actions vertically full-width. */
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
        "flex gap-2 border-t border-hairline px-5 py-3",
        stacked ? "flex-col" : "flex-row justify-between",
        className,
      )}
      {...props}
    />
  );
}

export interface ModalActionProps extends Omit<ButtonProps, "variant"> {
  /** Default `secondary`. */
  variant?: ButtonProps["variant"];
  fullWidth?: boolean;
}

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
