"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { useState } from "react";
import type * as React from "react";
import { cn } from "../utils";

export const alertVariants = cva(
  "relative grid grid-cols-[auto_1fr_auto] items-start gap-3 rounded-[var(--radius-6)] px-4 py-3 text-gray-1000",
  {
    defaultVariants: {
      variant: "info",
    },
    variants: {
      variant: {
        info: "bg-background-100 border border-[var(--gray-alpha-400)] [&_[data-slot=alert-icon]]:text-gray-900",
        success:
          "bg-[color-mix(in_oklab,var(--badge-success-text)_8%,var(--background-100))] border border-[var(--badge-success-text)]/30 [&_[data-slot=alert-icon]]:text-[var(--badge-success-text)]",
        warning:
          "bg-[color-mix(in_oklab,var(--badge-warning-text)_8%,var(--background-100))] border border-[var(--badge-warning-text)]/30 [&_[data-slot=alert-icon]]:text-[var(--badge-warning-text)]",
        danger:
          "bg-[color-mix(in_oklab,var(--badge-danger-text)_8%,var(--background-100))] border border-[var(--badge-danger-text)]/30 [&_[data-slot=alert-icon]]:text-[var(--badge-danger-text)]",
      },
    },
  },
);

const DEFAULT_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
} as const;

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>;

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  /** Override the default lucide icon for this variant. Pass `null` to hide. */
  icon?: React.ReactNode | null;
  /**
   * Renders a × close button on the right. Receives the dismiss callback;
   * Alert handles its own visibility unless `open`/`onOpenChange` are
   * controlled.
   */
  dismissible?: boolean;
  /** Controlled visibility. */
  open?: boolean;
  /** Called when the user dismisses via the close button. */
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

/**
 * Alert — inline banner for info / success / warning / danger messages.
 * Hairline border, tinted background per variant, optional icon, title,
 * description, and dismiss × button. Animates in/out with motion when
 * dismissible.
 */
export function Alert({
  variant = "info",
  title,
  icon,
  dismissible = false,
  open: controlledOpen,
  onOpenChange,
  className,
  children,
  ...props
}: AlertProps): React.ReactElement | null {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(true);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };
  const reduceMotion = useReducedMotion();

  const resolvedVariant = (variant ?? "info") as AlertVariant;
  const Icon = DEFAULT_ICONS[resolvedVariant];
  const renderedIcon =
    icon === null
      ? null
      : icon !== undefined
        ? icon
        : <Icon className="size-4" />;

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          role="alert"
          data-slot="alert"
          data-variant={resolvedVariant}
          initial={reduceMotion ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.18, ease: [0.16, 1, 0.3, 1] }
          }
          className={cn(alertVariants({ variant }), className)}
          {...(props as React.ComponentProps<typeof motion.div>)}
        >
          {renderedIcon && (
            <span
              data-slot="alert-icon"
              className="mt-px flex shrink-0 items-center"
            >
              {renderedIcon}
            </span>
          )}
          <div className="min-w-0">
            {title && (
              <div
                data-slot="alert-title"
                className="text-label-13 font-semibold leading-tight text-gray-1000"
              >
                {title}
              </div>
            )}
            {children && (
              <div
                data-slot="alert-description"
                className={cn(
                  "text-label-12 leading-relaxed text-gray-900",
                  title && "mt-1",
                )}
              >
                {children}
              </div>
            )}
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Dismiss"
              data-slot="alert-close"
              className="-me-1 inline-flex size-6 shrink-0 items-center justify-center rounded-[var(--radius-6)] text-gray-800 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-gray-200 hover:text-gray-1000 active:scale-90"
            >
              <X className="size-3.5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
