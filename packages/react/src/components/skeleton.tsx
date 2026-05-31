import type React from "react";
import { cn } from "../utils";

export function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        // Calm, restrained placeholder: a solid subtle surface block with a
        // gentle opacity pulse (no border, no sweeping gradient).
        "rounded-[var(--radius-patch-sm)] bg-patch-surface-2 animate-[patch-skeleton-pulse_1.6s_ease-in-out_infinite] motion-reduce:animate-none",
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}
