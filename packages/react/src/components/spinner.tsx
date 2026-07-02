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

/**
 * Border thickness scales with diameter (~1/8 of the size). Tailwind's
 * border-N picks up here for standard values, otherwise we drop to an
 * arbitrary border-[Npx].
 */
const ringBySize: Record<SpinnerSize, string> = {
  xs: "border-2",
  sm: "border-2",
  md: "border-[3px]",
  lg: "border-[3px]",
  xl: "border-4",
  "2xl": "border-[5px]",
  "3xl": "border-[6px]",
  "4xl": "border-[8px]",
};

/** Dot diameter (in px) per size preset for `variant="dots"`. */
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
  /** Accessible label. Use for context: "Saving", "Uploading 3 of 12". */
  label?: string;
  /**
   * Visual style. `ring` is a spinning circle (icon-sized waits, buttons);
   * `dots` is three pulsing dots for inline copy ("Saving…", "Deploying…").
   * Default `ring`.
   */
  variant?: "ring" | "dots";
  /** Custom dot diameter in px, overriding the size preset. Only affects `variant="dots"`. */
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

  return (
    <span
      role="status"
      aria-label={label}
      data-slot="spinner"
      data-variant="ring"
      className={cn(ringWrapper({ size }), className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-full rounded-full border-solid border-current border-e-transparent",
          "animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]",
          ringBySize[resolvedSize],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
