"use client";

import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export interface KbdProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  /** `sm` for inline body text, `md` for shortcut hints. */
  size?: "sm" | "md";
  /**
   * When provided, Kbd renders as a `<button>` with hover state.
   * Use for keys that represent an actual action the user can click.
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Kbd({
  size = "md",
  className,
  children,
  onClick,
  ...props
}: KbdProps): React.ReactElement {
  const interactive = typeof onClick === "function";

  const cls = cn(
    "inline-flex items-center justify-center font-sans font-medium tabular-nums text-gray-900",
    "rounded-[var(--radius-6)] bg-background-100",
    "border border-gray-alpha-400 shadow-[inset_0_-1px_0_0_var(--gray-alpha-400)]",
    "text-label-12",
    size === "sm" && "h-[18px] min-w-[18px] px-1",
    size === "md" && "h-5 min-w-5 px-1.5",
    interactive && [
      "cursor-pointer hover:bg-gray-100 hover:text-gray-1000",
      focusRing,
      colorTransition,
    ],
    className,
  );

  if (interactive) {
    return (
      <button
        type="button"
        data-slot="kbd"
        className={cls}
        onClick={onClick}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }

  return (
    <kbd data-slot="kbd" className={cls} {...props}>
      {children}
    </kbd>
  );
}
