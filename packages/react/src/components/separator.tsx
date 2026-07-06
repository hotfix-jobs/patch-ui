"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import type * as React from "react";
import { cn } from "../utils";

export interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive> {
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
  if (label && orientation === "horizontal") {
    return (
      <div
        role={decorative ? "none" : "separator"}
        aria-orientation="horizontal"
        data-slot="separator"
        data-orientation="horizontal"
        className={cn(
          "flex w-full items-center gap-3 text-mini text-ink-muted",
          className,
        )}
      >
        <span className="h-px flex-1 bg-hairline" aria-hidden />
        <span>{label}</span>
        <span className="h-px flex-1 bg-hairline" aria-hidden />
      </div>
    );
  }

  return (
    <SeparatorPrimitive
      orientation={orientation}
      role={decorative ? "none" : undefined}
      data-slot="separator"
      className={cn(
        "shrink-0 bg-hairline",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}

export { SeparatorPrimitive };
