"use client";

import type * as React from "react";
import { cn } from "../utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Horizontal (default) or vertical. */
  orientation?: "horizontal" | "vertical";
  /**
   * Optional label rendered inline. Adds the "OR" / "AND" separator pattern
   * with the hairline split around it. Horizontal only.
   */
  label?: React.ReactNode;
  /**
   * When true, the separator is purely decorative — the role is removed
   * so screen readers don't announce it. Default false.
   */
  decorative?: boolean;
}

/**
 * Separator — a hairline divider. Horizontal or vertical, with optional
 * inline label for "OR" / "AND" patterns. Uses `--patch-border` for the
 * hairline and `--separator-color` semantically when appropriate.
 */
export function Separator({
  orientation = "horizontal",
  label,
  decorative = false,
  className,
  ...props
}: SeparatorProps): React.ReactElement {
  const role = decorative ? "none" : "separator";
  const ariaOrientation =
    orientation === "vertical" ? "vertical" : "horizontal";

  if (label && orientation === "horizontal") {
    return (
      <div
        role={role}
        aria-orientation={ariaOrientation}
        data-slot="separator"
        data-orientation={orientation}
        className={cn(
          "flex w-full items-center gap-3 text-label-12 font-medium uppercase tracking-tight text-gray-800",
          className,
        )}
        {...props}
      >
        <span className="h-px flex-1 bg-gray-alpha-400" aria-hidden />
        <span>{label}</span>
        <span className="h-px flex-1 bg-gray-alpha-400" aria-hidden />
      </div>
    );
  }

  return (
    <div
      role={role}
      aria-orientation={ariaOrientation}
      data-slot="separator"
      data-orientation={orientation}
      className={cn(
        "bg-gray-alpha-400 shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
