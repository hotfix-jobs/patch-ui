"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";
import { colorTransition, selectionFocus } from "../recipes";

export const toggleVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "rounded-[var(--radius-8)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    selectionFocus,
    colorTransition,
  ].join(" "),
  {
    defaultVariants: { size: "md", variant: "tertiary" },
    variants: {
      size: {
        sm: "h-6 min-w-6 gap-1.5 px-2.5 text-mini font-medium [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-8 min-w-8 gap-2 px-3.5 text-small font-medium [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 min-w-10 gap-2 px-4 text-regular font-medium [&_svg:not([class*='size-'])]:size-5",
      },
      variant: {
        tertiary:
          "bg-transparent text-ink-muted hover:bg-layer-hover hover:text-ink data-[pressed]:bg-layer-hover data-[pressed]:text-ink",
        secondary:
          "bg-fill-1 text-ink hover:bg-fill-2 data-[pressed]:bg-fill-2 data-[pressed]:text-ink",
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
  className,
  ...props
}: ToggleProps): React.ReactElement {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { TogglePrimitive };
