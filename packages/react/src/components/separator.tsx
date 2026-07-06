"use client";

import type * as React from "react";
import { cn } from "../utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Horizontal (default) or vertical. */
  orientation?: "horizontal" | "vertical";
  /** Optional inline label (horizontal only) for "OR"/"AND" split patterns. */
  label?: React.ReactNode;
  /** Decorative separators are hidden from screen readers. */
  decorative?: boolean;
}

export function Separator({
  orientation = "horizontal",
  label,
  decorative = false,
  className,
  ...props
}: SeparatorProps): React.ReactElement {
  const role = decorative ? "none" : "separator";
  const ariaOrientation = orientation === "vertical" ? "vertical" : "horizontal";

  if (label && orientation === "horizontal") {
    return (
      <div
        role={role}
        aria-orientation={ariaOrientation}
        data-slot="separator"
        data-orientation={orientation}
        className={cn(
          "flex w-full items-center gap-3 text-caption-12 text-ink-muted",
          className,
        )}
        {...props}
      >
        <span className="h-px flex-1 bg-hairline" aria-hidden />
        <span>{label}</span>
        <span className="h-px flex-1 bg-hairline" aria-hidden />
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
        "shrink-0 bg-hairline",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
