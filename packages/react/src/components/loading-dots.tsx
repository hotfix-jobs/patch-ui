"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

const wrapperVariants = cva(
  "inline-flex items-center gap-1 align-middle",
  {
    defaultVariants: { size: "md" },
    variants: {
      size: {
        sm: "[--dot:4px]",
        md: "[--dot:6px]",
        lg: "[--dot:8px]",
      },
    },
  },
);

export interface LoadingDotsProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof wrapperVariants> {
  /** Trailing text label rendered before the dots (e.g. "Saving"). */
  children?: React.ReactNode;
  /** Custom dot diameter in px, overriding the size preset. */
  dotSize?: number;
}

/**
 * LoadingDots — three dots pulsing in sequence, used inline in copy for
 * indeterminate short waits ("Saving...", "Deploying..."). For icon-sized
 * waits, use `Spinner`. For layout placeholders, use `Skeleton`.
 */
export function LoadingDots({
  className,
  size,
  children,
  dotSize,
  ...props
}: LoadingDotsProps): React.ReactElement {
  const style = dotSize
    ? ({ "--dot": `${dotSize}px` } as React.CSSProperties)
    : undefined;

  return (
    <span
      aria-live="polite"
      className={cn(wrapperVariants({ size }), className)}
      style={style}
      data-slot="loading-dots"
      {...props}
    >
      {children}
      <span className="inline-flex items-center gap-[calc(var(--dot)*0.4)]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block rounded-full bg-current"
            style={{
              width: "var(--dot)",
              height: "var(--dot)",
              animation: "patch-dots-pulse 1.2s ease-in-out infinite",
              animationDelay: `${i * 160}ms`,
            }}
          />
        ))}
      </span>
    </span>
  );
}
