"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

export const spinnerVariants = cva("inline-flex items-center justify-center", {
  defaultVariants: { size: "md", variant: "ring" },
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
    variant: {
      ring: "",
      spinner: "",
      dots: "",
      bars: "",
      "ring-fill": "",
    },
  },
});

export interface SpinnerProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label. Use for context — "Saving", "Uploading 3 of 12". */
  label?: string;
}

export function Spinner({
  className,
  size,
  variant = "ring",
  label = "Loading",
  ...props
}: SpinnerProps): React.ReactElement {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size, variant, className }))}
      data-slot="spinner"
      {...props}
    >
      {variant === "ring" && <RingSpinner />}
      {variant === "spinner" && <BarSpinner />}
      {variant === "dots" && <DotsSpinner />}
      {variant === "bars" && <BarsSpinner />}
      {variant === "ring-fill" && <RingFillSpinner />}
      <span className="sr-only">{label}</span>
    </span>
  );
}

function RingSpinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-full animate-spin"
      style={{ animationDuration: "900ms" }}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32 63" />
    </svg>
  );
}

function BarSpinner() {
  return (
    <span className="relative size-full">
      {Array.from({ length: 8 }, (_, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-0 h-full"
          style={{
            width: "12.5%",
            marginLeft: "-6.25%",
            transform: `rotate(${i * 45}deg)`,
            animation: "patch-spinner-fade 800ms linear infinite",
            animationDelay: `${-((8 - i) / 8) * 800}ms`,
          }}
        >
          <span className="block h-[30%] w-full rounded-full bg-current" />
        </span>
      ))}
    </span>
  );
}

function DotsSpinner() {
  return (
    <span className="flex size-full items-center justify-center gap-[20%]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-[30%] w-[30%] rounded-full bg-current"
          style={{
            animation: "patch-dots-pulse 1s ease-in-out infinite",
            animationDelay: `${i * 160}ms`,
          }}
        />
      ))}
    </span>
  );
}

function BarsSpinner() {
  return (
    <span className="flex size-full items-center justify-center gap-[12%]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-full w-[18%] rounded-full bg-current"
          style={{
            animation: "patch-bars-scale 1s ease-in-out infinite",
            animationDelay: `${i * 150}ms`,
            transformOrigin: "center",
          }}
        />
      ))}
    </span>
  );
}

function RingFillSpinner() {
  // Circumference = 2πr = 2 × π × 10 ≈ 62.83
  const C = 62.83;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-full"
      style={{ animation: "patch-ring-fill-rotate 1.4s linear infinite" }}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.15" />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          strokeDasharray: C,
          animation: "patch-ring-fill-stroke 1.4s linear infinite",
          transformOrigin: "center",
        }}
      />
    </svg>
  );
}
