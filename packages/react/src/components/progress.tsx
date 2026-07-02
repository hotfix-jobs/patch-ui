"use client";

import { motion, useReducedMotion } from "motion/react";
import type * as React from "react";
import { cn } from "../utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value (0-max). Pass null for indeterminate. */
  value?: number | null;
  /** Maximum value. Default 100. */
  max?: number;
  /**
   * Visual variant. default = neutral; success/warning/danger use the
   * matching badge tokens.
   */
  variant?: "default" | "success" | "warning" | "danger";
  /** Size — `sm` is 4px tall, `md` is 6px, `lg` is 10px. */
  size?: "sm" | "md" | "lg";
  /** Accessible label for the progress bar. */
  label?: string;
}

const FILL_BY_VARIANT: Record<NonNullable<ProgressProps["variant"]>, string> = {
  default: "bg-patch-text",
  success: "bg-[var(--badge-success-text)]",
  warning: "bg-[var(--badge-warning-text)]",
  danger: "bg-[var(--badge-danger-text)]",
};

const HEIGHT_BY_SIZE: Record<NonNullable<ProgressProps["size"]>, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2.5",
};

/**
 * Progress — determinate or indeterminate progress bar. Pass `value` for
 * determinate (0-max); pass `value={null}` for an indeterminate sweep.
 */
export function Progress({
  value = 0,
  max = 100,
  variant = "default",
  size = "md",
  label = "Progress",
  className,
  ...props
}: ProgressProps): React.ReactElement {
  const reduceMotion = useReducedMotion();
  const indeterminate = value == null;
  const pct = indeterminate
    ? 0
    : Math.max(0, Math.min(100, ((value as number) / max) * 100));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={indeterminate ? undefined : (value as number)}
      data-slot="progress"
      data-variant={variant}
      data-state={indeterminate ? "indeterminate" : "determinate"}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-gray-alpha-400",
        HEIGHT_BY_SIZE[size],
        className,
      )}
      {...props}
    >
      {indeterminate ? (
        <motion.div
          className={cn("absolute inset-y-0 w-1/3 rounded-full", FILL_BY_VARIANT[variant])}
          initial={{ x: "-100%" }}
          animate={reduceMotion ? { x: "-100%" } : { x: ["-100%", "300%"] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.2, ease: "easeInOut", repeat: Infinity }
          }
        />
      ) : (
        <motion.div
          className={cn("h-full rounded-full", FILL_BY_VARIANT[variant])}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 200, damping: 25, mass: 0.5 }
          }
        />
      )}
    </div>
  );
}
