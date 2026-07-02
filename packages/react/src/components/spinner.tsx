"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

const wrapperVariants = cva("relative inline-flex shrink-0 items-center justify-center", {
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
});

/**
 * Border thickness scales with diameter (~1/8 of the size). Tailwind's
 * border-N picks up here for standard values, otherwise we drop to an
 * arbitrary border-[Npx].
 */
const ringBySize: Record<
  NonNullable<VariantProps<typeof wrapperVariants>["size"]>,
  string
> = {
  xs: "border-2",
  sm: "border-2",
  md: "border-[3px]",
  lg: "border-[3px]",
  xl: "border-4",
  "2xl": "border-[5px]",
  "3xl": "border-[6px]",
  "4xl": "border-[8px]",
};

export interface SpinnerProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof wrapperVariants> {
  /** Accessible label. Use for context — "Saving", "Uploading 3 of 12". */
  label?: string;
}

export function Spinner({
  className,
  size = "md",
  label = "Loading",
  ...props
}: SpinnerProps): React.ReactElement {
  return (
    <span
      role="status"
      aria-label={label}
      data-slot="spinner"
      className={cn(wrapperVariants({ size, className }))}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-full rounded-full border-solid border-current border-e-transparent",
          "animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]",
          ringBySize[size ?? "md"],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
