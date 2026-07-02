"use client";

import type * as React from "react";
import { cn } from "../utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** `sm` for inline within body text, `md` for shortcut hints. */
  size?: "sm" | "md";
}

export function Kbd({
  size = "md",
  className,
  children,
  ...props
}: KbdProps): React.ReactElement {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex items-center justify-center font-sans font-medium tabular-nums text-gray-900",
        "rounded-[var(--radius-6)] bg-background-100",
        "border border-gray-alpha-400 shadow-[inset_0_-1px_0_0_var(--gray-alpha-400)]",
        "text-label-12",
        size === "sm" && "h-[18px] min-w-[18px] px-1",
        size === "md" && "h-5 min-w-5 px-1.5",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
