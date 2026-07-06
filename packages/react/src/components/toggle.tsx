"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useCallback, useState } from "react";
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
          "bg-transparent text-ink-muted hover:bg-surface-1 hover:text-ink data-[state=on]:bg-surface-2 data-[state=on]:text-ink " +
          iconMuted,
        secondary:
          "bg-transparent text-ink-muted border border-hairline hover:bg-surface-1 hover:text-ink hover:border-hairline-strong data-[state=on]:bg-surface-2 data-[state=on]:text-ink data-[state=on]:border-hairline-strong " +
          iconMuted,
      },
    },
  },
);

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue">,
    VariantProps<typeof toggleVariants> {
  /** Controlled pressed state. */
  pressed?: boolean;
  /** Initial pressed state when uncontrolled. */
  defaultPressed?: boolean;
  /** Called when the pressed state changes. */
  onPressedChange?: (pressed: boolean) => void;
}

/** Press-to-toggle button with persistent on/off state. */
export function Toggle({
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  variant,
  size,
  shape,
  className,
  onClick,
  disabled,
  ...props
}: ToggleProps): React.ReactElement {
  const [uncontrolled, setUncontrolled] = useState(defaultPressed);
  const pressed = controlledPressed ?? uncontrolled;
  const setPressed = useCallback(
    (next: boolean) => {
      if (controlledPressed === undefined) setUncontrolled(next);
      onPressedChange?.(next);
    },
    [controlledPressed, onPressedChange],
  );

  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      data-slot="toggle"
      data-state={pressed ? "on" : "off"}
      className={cn(toggleVariants({ variant, size, shape }), className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setPressed(!pressed);
      }}
      {...props}
    />
  );
}
