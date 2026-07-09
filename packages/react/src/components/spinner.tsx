"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

const spinnerVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center",
  {
    defaultVariants: { size: "md" },
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
  },
);

type SpinnerSize = NonNullable<VariantProps<typeof spinnerVariants>["size"]>;

const strokePx: Record<SpinnerSize, number> = {
  sm: 2.5,
  md: 2.75,
  lg: 3,
};

export interface SpinnerProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label. */
  label?: string;
}

export function Spinner({
  className,
  size = "md",
  label = "Loading",
  ...props
}: SpinnerProps): React.ReactElement {
  const resolvedSize: SpinnerSize = size ?? "md";
  const stroke = strokePx[resolvedSize];
  const radius = (24 - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.28;

  return (
    <span
      role="status"
      aria-label={label}
      data-slot="spinner"
      className={cn(spinnerVariants({ size }), className)}
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
