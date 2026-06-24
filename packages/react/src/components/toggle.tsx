"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useCallback, useState } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

export const toggleVariants = cva(
  `relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-medium tracking-[-0.005em] rounded-[var(--radius-patch-sm)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 transition-[colors,transform] duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] active:scale-95 ${focusRing}`,
  {
    defaultVariants: {
      size: "md",
      variant: "ghost",
    },
    variants: {
      size: {
        sm: "h-7 min-w-7 px-2 text-[length:var(--text-patch-mini)] [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-9 min-w-9 px-3 text-[length:var(--text-patch-control)] [&_svg:not([class*='size-'])]:size-4",
        lg: "h-11 min-w-11 px-4 text-[length:var(--text-patch-body)] [&_svg:not([class*='size-'])]:size-5",
      },
      variant: {
        ghost:
          "bg-transparent text-patch-text-secondary hover:bg-patch-accent hover:text-patch-text data-[state=on]:bg-patch-text data-[state=on]:text-patch-bg",
        outline:
          "bg-transparent text-patch-text-secondary border-[0.5px] border-patch-border hover:bg-patch-accent hover:text-patch-text data-[state=on]:bg-patch-text data-[state=on]:text-patch-bg data-[state=on]:border-patch-text",
      },
    },
  },
);

export interface ToggleProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "value" | "defaultValue"
    >,
    VariantProps<typeof toggleVariants> {
  /** Controlled pressed state. */
  pressed?: boolean;
  /** Initial pressed state when uncontrolled. */
  defaultPressed?: boolean;
  /** Called when the pressed state changes. */
  onPressedChange?: (pressed: boolean) => void;
}

/**
 * Toggle — a press-to-toggle button with persistent on/off state. Use for
 * actions with state: star/unstar, pin/unpin, mute/unmute, bookmark.
 *
 * Distinct from `Switch` (a binary form-state control read as "setting")
 * and `Button` (a one-shot action). Toggle has `role="button"` +
 * `aria-pressed` and a visual "on" state that persists until toggled off.
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
