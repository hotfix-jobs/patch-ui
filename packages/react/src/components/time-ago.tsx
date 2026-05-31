"use client";

import { useSyncExternalStore } from "react";
import type * as React from "react";
import { cn } from "../utils";

// Pin timezone so server and client produce the same string during hydration.
const absoluteFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function formatTimeAgo(dateStr: string): string {
  const seconds = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 604800)}w ago`;
}

// useSyncExternalStore is the idiomatic "has hydrated" probe - returns false
// during SSR via getServerSnapshot, true post-mount via getSnapshot. No
// external store to subscribe to, so subscribe is a no-op.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export interface TimeAgoProps extends Omit<React.TimeHTMLAttributes<HTMLTimeElement>, "dateTime"> {
  /** ISO date string. */
  dateStr: string;
  /** Fallback rendered during SSR / initial hydration. Defaults to formatted absolute date. */
  fallback?: string;
  /**
   * Typography variant. "mono" (default) applies tabular numerals with a
   * tightened tracking, since timestamps are always numeric and benefit
   * from column alignment in lists. "sans" inherits the parent's typography
   * with no overrides. The variant name is retained for backwards compat
   * across consumers; the rendering uses the body sans (Geist Sans) in
   * both modes — only `font-variant-numeric` differs.
   */
  variant?: "mono" | "sans";
}

/**
 * TimeAgo - renders an absolute date during SSR / initial hydration and
 * swaps to a relative "N ago" string after mount.
 *
 * Avoids the Date.now()-induced hydration mismatch without resorting to
 * suppressHydrationWarning. Defaults to tabular numerals since timestamps
 * are always numeric data.
 */
export function TimeAgo({
  dateStr,
  fallback,
  variant = "mono",
  className,
  ...props
}: TimeAgoProps): React.ReactElement {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const absolute = absoluteFmt.format(new Date(dateStr));
  return (
    <time
      dateTime={dateStr}
      data-slot="time-ago"
      className={cn(
        variant === "mono" && "tabular-nums tracking-[-0.01em]",
        className,
      )}
      {...props}
    >
      {mounted ? formatTimeAgo(dateStr) : (fallback ?? absolute)}
    </time>
  );
}
