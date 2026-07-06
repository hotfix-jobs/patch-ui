"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition, iconMuted } from "../recipes";

export const toggleVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    focusRing,
    colorTransition,
  ].join(" "),
  {
    defaultVariants: { size: "md", variant: "tertiary", shape: "square" },
    variants: {
      size: {
        sm: "h-6 min-w-6 px-2.5 text-button-12 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-8 min-w-8 px-3.5 text-button-14 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 min-w-10 px-4 text-button-16 [&_svg:not([class*='size-'])]:size-5",
      },
      shape: {
        square: "rounded-[var(--radius-6)]",
        pill: "rounded-full",
        circle: "rounded-full aspect-square !px-0",
      },
      variant: {
        tertiary:
          "bg-transparent text-ink-muted hover:bg-surface-1 hover:text-ink data-[pressed]:bg-surface-2 data-[pressed]:text-ink " +
          iconMuted,
        secondary:
          "bg-transparent text-ink-muted border border-hairline hover:bg-surface-1 hover:text-ink hover:border-hairline-strong data-[pressed]:bg-surface-2 data-[pressed]:text-ink data-[pressed]:border-hairline-strong " +
          iconMuted,
      },
    },
  },
);

export interface ToggleProps
  extends Omit<
      React.ComponentProps<typeof TogglePrimitive>,
      "value" | "defaultValue" | "className"
    >,
    VariantProps<typeof toggleVariants> {
  className?: string;
  value?: string;
}

/** Press-to-toggle button with persistent on/off state. */
export function Toggle({
  variant,
  size,
  shape,
  className,
  ...props
}: ToggleProps): React.ReactElement {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, shape }), className)}
      {...props}
    />
  );
}

export { TogglePrimitive };
