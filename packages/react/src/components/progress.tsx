"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import type * as React from "react";
import { cn } from "../utils";

export type ProgressVariant = "default" | "success" | "warning" | "error";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps
  extends Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "value"> {
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

const fillByVariant: Record<ProgressVariant, string> = {
  default: "bg-primary",
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
  const trackStyle: React.CSSProperties = {
    ...(height != null ? { height } : {}),
    ...(width != null
      ? { width: typeof width === "number" ? `${width}px` : width }
      : {}),
    ...style,
  };

  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      aria-label={label}
      data-slot="progress"
      className={cn("w-full", className)}
      {...props}
    >
      <ProgressPrimitive.Track
        data-slot="progress-track"
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-fill-2",
          height == null && heightBySize[size],
        )}
        style={trackStyle}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "block h-full rounded-full",
            "transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "data-[indeterminate]:absolute data-[indeterminate]:inset-y-0 data-[indeterminate]:w-1/3",
            "data-[indeterminate]:animate-[patch-progress-indeterminate_1.4s_ease-in-out_infinite]",
            "motion-reduce:data-[indeterminate]:animate-none",
            fillByVariant[variant],
          )}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export { ProgressPrimitive };
