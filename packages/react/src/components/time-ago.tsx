"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type * as React from "react";
import { cn } from "../utils";

// Pin timezone so server and client produce the same string during hydration.
const absoluteFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

// Average month / year lengths in seconds (Gregorian). Used to roll up
// older deltas into "Xmo" / "Xy" rather than `52w`.
const MIN = 60;
const HOUR = 60 * 60;
const DAY = 24 * 60 * 60;
const WEEK = 7 * DAY;
const MONTH = 30.4375 * DAY; // 86400 × 30.4375 ≈ 2,629,800
const YEAR = 365.25 * DAY; // 86400 × 365.25 = 31,557,600

function formatTimeAgo(dateStr: string): string {
  const deltaMs = new Date(dateStr).getTime() - Date.now();
  const future = deltaMs > 0;
  const seconds = Math.abs(deltaMs) / 1000;

  if (seconds < MIN) return future ? "Soon" : "Just now";

  let value: string;
  if (seconds < HOUR) value = `${Math.floor(seconds / MIN)}m`;
  else if (seconds < DAY) value = `${Math.floor(seconds / HOUR)}h`;
  else if (seconds < WEEK) value = `${Math.floor(seconds / DAY)}d`;
  else if (seconds < MONTH) value = `${Math.floor(seconds / WEEK)}w`;
  else if (seconds < YEAR) value = `${Math.floor(seconds / MONTH)}mo`;
  else value = `${Math.floor(seconds / YEAR)}y`;

  return future ? `in ${value}` : `${value} ago`;
}

/**
 * Pick a refresh interval that matches the precision of the current
 * label. Goal: never lag more than one "tick" of the current unit. For
 * months and years, the label changes so slowly that scheduling a
 * refresh would just churn: return null to stop.
 */
function nextRefreshDelay(dateStr: string): number | null {
  const seconds = Math.abs((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < MIN) return 10_000; // < 1m → refresh every 10s ("Just now" → "1m ago")
  if (seconds < HOUR) return 30_000; // < 1h → every 30s
  if (seconds < DAY) return 60_000; // < 1d → every minute
  if (seconds < WEEK) return 60 * 60 * 1000; // < 1w → every hour
  return null;
}

// useSyncExternalStore is the idiomatic "has hydrated" probe - returns false
// during SSR via getServerSnapshot, true post-mount via getSnapshot. No
// external store to subscribe to, so subscribe is a no-op.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export interface TimeAgoProps
  extends Omit<React.TimeHTMLAttributes<HTMLTimeElement>, "dateTime"> {
  /** ISO date string. Past or future. */
  dateStr: string;
  /** Fallback rendered during SSR / initial hydration. Defaults to formatted absolute date. */
  fallback?: string;
  /**
   * Typography variant. "mono" (default) applies tabular numerals with a
   * tightened tracking, since timestamps are always numeric and benefit
   * from column alignment in lists. "sans" inherits the parent's typography
   * with no overrides. The variant name is retained for backwards compat
   * across consumers; the rendering uses the body sans (Geist Sans) in
   * both modes: only `font-variant-numeric` differs.
   */
  variant?: "mono" | "sans";
  /**
   * Re-render the relative label on a smart interval so "Just now" doesn't
   * stick around for 30 minutes. Default true. Refresh frequency scales
   * with age: 10s under a minute, 30s under an hour, every minute under a
   * day, every hour under a week. Above a week the label rolls over too
   * slowly to bother scheduling.
   */
  liveUpdate?: boolean;
}

/**
 * TimeAgo - renders an absolute date during SSR / initial hydration and
 * swaps to a relative "N ago" / "in N" string after mount. Supports past
 * AND future dates. Stays current via smart-interval live updates.
 */
export function TimeAgo({
  dateStr,
  fallback,
  variant = "mono",
  liveUpdate = true,
  className,
  ...props
}: TimeAgoProps): React.ReactElement {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Tick state forces a re-render on each scheduled refresh. The effect
  // re-runs because `tick` is in its deps, which lets it schedule the
  // *next* refresh based on the now-current age.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!liveUpdate || !mounted) return;
    const delay = nextRefreshDelay(dateStr);
    if (delay == null) return;
    const id = window.setTimeout(() => setTick((t) => t + 1), delay);
    return () => window.clearTimeout(id);
  }, [liveUpdate, mounted, dateStr, tick]);

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
