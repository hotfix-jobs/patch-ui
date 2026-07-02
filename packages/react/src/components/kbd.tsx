"use client";

import type * as React from "react";
import { cn } from "../utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual size. `sm` for inline within body text, `md` for shortcut hints. */
  size?: "sm" | "md";
}

/**
 * Kbd — keyboard key display. Renders a small key-cap-styled element for
 * keyboard shortcuts and hints. Compose multiple for combos:
 *
 *   <Kbd>⌘</Kbd> <Kbd>K</Kbd>
 *   <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>
 */
export function Kbd({
  size = "md",
  className,
  children,
  ...props
}: KbdProps): React.ReactElement {
  return (
    <kbd
      data-slot="kbd"
      data-size={size}
      className={cn(
        "inline-flex items-center justify-center font-sans font-medium tabular-nums text-gray-900",
        "rounded-[var(--radius-6)] bg-background-100",
        "border border-gray-alpha-400 shadow-[inset_0_-1px_0_0_var(--gray-alpha-400)]",
        size === "sm" &&
          "h-[18px] min-w-[18px] px-1 text-label-12",
        size === "md" &&
          "h-5 min-w-[20px] px-1.5 text-label-12",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
