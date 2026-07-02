import type * as React from "react";
import { cn } from "../utils";

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Skeleton width. Number → px; string → passed through (e.g. "50%"). */
  width?: number | string;
  /** Skeleton height. Number → px; string → passed through (e.g. "1.5rem"). */
  height?: number | string;
  /** Corner treatment. Default `rounded`; `pill` for avatars; `squared` for code blocks. */
  shape?: "rounded" | "pill" | "squared";
  /** Shimmer animation. Default true; set false for a static block. */
  animated?: boolean;
  /**
   * When false, render `children` instead of the skeleton. Simplifies the
   * "show placeholder while loading" pattern to a single component.
   */
  show?: boolean;
  /** Content to reveal once `show` becomes false. */
  children?: React.ReactNode;
}

/**
 * Skeleton — placeholder for async content in a known layout.
 *
 * Match dimensions to the final content to prevent layout shift.
 * Use `shape="pill"` for avatars, `shape="rounded"` (default) for
 * buttons + text lines, `shape="squared"` for code blocks.
 *
 *   <Skeleton show={loading} width={200} height={20}>
 *     {data && <p>{data.name}</p>}
 *   </Skeleton>
 */
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
      role="status"
      aria-busy="true"
      aria-live="polite"
      data-slot="skeleton"
      className={cn(
        // Calm surface block: subtle bg + gentle opacity pulse, no
        // sweeping gradient or border.
        "bg-gray-100",
        shape === "rounded" && "rounded-[var(--radius-6)]",
        shape === "squared" && "rounded-none",
        shape === "pill" && "rounded-full",
        animated &&
          "animate-[patch-skeleton-pulse_1.6s_ease-in-out_infinite] motion-reduce:animate-none",
        className,
      )}
      style={dimStyle}
      {...props}
    />
  );
}
