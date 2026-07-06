"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

const ringWrapper = cva(
  "relative inline-flex shrink-0 items-center justify-center",
  {
    defaultVariants: { size: "md" },
    variants: {
      size: {
        xs: "size-3",
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
        xl: "size-8",
        "2xl": "size-10",
        "3xl": "size-12",
        "4xl": "size-16",
      },
    },
  },
);

type SpinnerSize = NonNullable<VariantProps<typeof ringWrapper>["size"]>;

const dotSizeBySize: Record<SpinnerSize, number> = {
  xs: 3,
  sm: 4,
  md: 6,
  lg: 7,
  xl: 8,
  "2xl": 10,
  "3xl": 12,
  "4xl": 14,
};

export interface SpinnerProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof ringWrapper> {
  /** Accessible label. */
  label?: string;
  variant?: "ring" | "dots";
  /** Custom dot diameter in px (overrides size preset for `variant="dots"`). */
  dotSize?: number;
}

export function Spinner({
  className,
  size = "md",
  label = "Loading",
  variant = "ring",
  dotSize,
  ...props
}: SpinnerProps): React.ReactElement {
  const resolvedSize: SpinnerSize = size ?? "md";

  if (variant === "dots") {
    const px = dotSize ?? dotSizeBySize[resolvedSize];
    return (
      <span
        role="status"
        aria-label={label}
        data-slot="spinner"
        data-variant="dots"
        className={cn(
          "inline-flex items-center gap-[calc(var(--dot)*0.4)] align-middle",
          className,
        )}
        style={{ ["--dot" as string]: `${px}px` }}
        {...props}
      >
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
        <span className="sr-only">{label}</span>
      </span>
    );
  }

  const strokePx: Record<SpinnerSize, number> = {
    xs: 2.5,
    sm: 2.5,
    md: 2.75,
    lg: 3,
    xl: 3,
    "2xl": 3.5,
    "3xl": 4,
    "4xl": 5,
  };
  const stroke = strokePx[resolvedSize];
  const radius = (24 - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.28;

  return (
    <span
      role="status"
      aria-label={label}
      data-slot="spinner"
      data-variant="ring"
      className={cn(ringWrapper({ size }), className)}
      {...props}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={cn(
          "size-full animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]",
        )}
      >
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="opacity-20"
        />
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${circumference}`}
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
