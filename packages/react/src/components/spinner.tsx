"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

const sizeVariants = cva("inline-flex shrink-0 items-center justify-center", {
  defaultVariants: { size: "md" },
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
  },
});

export interface SpinnerProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof sizeVariants> {
  /** Accessible label. Use for context — "Saving", "Uploading 3 of 12". */
  label?: string;
}

const BAR_COUNT = 12;
const CYCLE_MS = 1200;

export function Spinner({
  className,
  size,
  label = "Loading",
  ...props
}: SpinnerProps): React.ReactElement {
  return (
    <span
      role="status"
      aria-label={label}
      data-slot="spinner"
      className={cn(sizeVariants({ size, className }))}
      {...props}
    >
      <span className="relative size-full">
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-0 h-full"
            style={{
              width: "8%",
              marginLeft: "-4%",
              transform: `rotate(${(i * 360) / BAR_COUNT}deg)`,
              animation: `patch-spinner-fade ${CYCLE_MS}ms linear infinite`,
              animationDelay: `${-((BAR_COUNT - i) / BAR_COUNT) * CYCLE_MS}ms`,
            }}
          >
            <span className="block h-[26%] w-full rounded-full bg-current" />
          </span>
        ))}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
