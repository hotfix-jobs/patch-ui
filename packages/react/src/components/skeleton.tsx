import type * as React from "react";
import { cn } from "../utils";

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Number → px; string passed through. */
  width?: number | string;
  /** Number → px; string passed through. */
  height?: number | string;
  shape?: "rounded" | "pill" | "squared";
  animated?: boolean;
  /** When false, render `children` instead of the skeleton. */
  show?: boolean;
  children?: React.ReactNode;
}

/** Placeholder for async content. */
export function Skeleton({
  className,
  width,
  height,
  shape = "rounded",
  animated = true,
  show = true,
  children,
  style,
  ...props
}: SkeletonProps): React.ReactElement {
  if (!show) return <>{children}</> as unknown as React.ReactElement;

  const dimStyle: React.CSSProperties = {
    ...(width != null && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height != null && { height: typeof height === "number" ? `${height}px` : height }),
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn(
        "bg-fill-2",
        shape === "rounded" && "rounded-[var(--radius-6)]",
        shape === "squared" && "rounded-none",
        shape === "pill" && "rounded-full",
        animated &&
          "animate-[patch-skeleton-pulse_1.8s_ease-in-out_infinite] motion-reduce:animate-none",
        className,
      )}
      style={dimStyle}
      {...props}
    />
  );
}
