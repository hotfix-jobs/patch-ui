"use client";

import type * as React from "react";
import { cn } from "../utils";

export type ProgressVariant = "default" | "success" | "warning" | "error";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value (0-max). Pass null for indeterminate. */
  value?: number | null;
  /** Maximum value. Default 100. */
  max?: number;
  /** Intent variant. */
  variant?: ProgressVariant;
  /** Height preset: `sm` (4px), `md` (6px), `lg` (10px). Ignored when `height` is set. */
  size?: ProgressSize;
  /** Exact bar height in pixels. Overrides `size`. */
  height?: number;
  /** Exact bar width in pixels or CSS length. Defaults to 100%. */
  width?: number | string;
  /** Accessible label for the progress bar. */
  label?: string;
}

// Status variants use the semantic role tokens (--success / --warning /
// --error) instead of the -700 accent step. The accent scale inverts in
// dark mode (e.g. green-700 becomes a light green), which would flip the
// "danger vs. thriving" reading of a progress bar. The semantic roles are
// fixed hex values that read identically in both themes.
const fillByVariant: Record<ProgressVariant, string> = {
  default: "bg-gray-1000",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

const heightBySize: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2.5",
};

export function Progress({
  value = 0,
  max = 100,
  variant = "default",
  size = "md",
  height,
  width,
  label = "Progress",
  className,
  style,
  ...props
}: ProgressProps): React.ReactElement {
  const indeterminate = value == null;
  const pct = indeterminate
    ? 0
    : Math.max(0, Math.min(100, ((value as number) / max) * 100));

  const trackStyle: React.CSSProperties = {
    ...(height != null ? { height } : {}),
    ...(width != null ? { width: typeof width === "number" ? `${width}px` : width } : {}),
    ...style,
  };

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={indeterminate ? undefined : (value as number)}
      data-slot="progress"
      data-state={indeterminate ? "indeterminate" : "determinate"}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-gray-alpha-200",
        height == null && heightBySize[size],
        className,
      )}
      style={trackStyle}
      {...props}
    >
      {indeterminate ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-y-0 w-1/3 rounded-full animate-[patch-progress-indeterminate_1.4s_ease-in-out_infinite]",
            "motion-reduce:animate-none",
            fillByVariant[variant],
          )}
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "block h-full rounded-full",
            "transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            fillByVariant[variant],
          )}
          style={{ width: `${pct}%` }}
        />
      )}
    </div>
  );
}
