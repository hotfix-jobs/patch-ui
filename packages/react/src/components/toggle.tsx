"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useCallback, useState } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export const toggleVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap",
    "rounded-[var(--radius-6)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    focusRing,
    colorTransition,
  ].join(" "),
  {
    defaultVariants: { size: "md", variant: "tertiary" },
    variants: {
      size: {
        sm: "h-7 min-w-7 px-2 text-label-12 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-9 min-w-9 px-3 text-label-13 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-11 min-w-11 px-4 text-copy-14 [&_svg:not([class*='size-'])]:size-5",
      },
      variant: {
        // Vocabulary aligned with Button: `tertiary` = transparent resting,
        // `secondary` = bordered resting. Same chrome distinction, same
        // words as Button so consumers don't have to memorize per-component
        // variant names.
        tertiary:
          "bg-transparent text-gray-900 hover:bg-gray-alpha-100 hover:text-gray-1000 data-[state=on]:bg-gray-1000 data-[state=on]:text-background-100",
        secondary:
          "bg-transparent text-gray-900 border border-gray-alpha-400 hover:bg-gray-alpha-100 hover:text-gray-1000 data-[state=on]:bg-gray-1000 data-[state=on]:text-background-100 data-[state=on]:border-gray-1000",
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

/**
 * Toggle: press-to-toggle button with persistent on/off state.
 *
 * Use for actions with binary state: `Bold`/`Italic` in a rich text
 * toolbar, `Star`/`Unstar`, `Mute`/`Unmute`, `Pin`/`Unpin`. Renders with
 * `role="button"` + `aria-pressed` so screen readers announce the state.
 *
 * NOTE: This is a different pattern than Vercel Geist's `Toggle`. What
 * Geist calls `Toggle` is what we call `Switch` (the slider). Our Toggle
 * has no direct Geist equivalent: it's a toolbar-style button.
 */
export function Toggle({
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  variant,
  size,
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
      className={cn(toggleVariants({ variant, size }), className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setPressed(!pressed);
      }}
      {...props}
    />
  );
}
