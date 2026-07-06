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

const MIN = 60;
const HOUR = 60 * 60;
const DAY = 24 * 60 * 60;
const WEEK = 7 * DAY;
const MONTH = 30.4375 * DAY;
const YEAR = 365.25 * DAY;

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

// Returns null once the label rolls over slowly enough that scheduling refreshes would just churn.
function nextRefreshDelay(dateStr: string): number | null {
  const seconds = Math.abs((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < MIN) return 10_000;
  if (seconds < HOUR) return 30_000;
  if (seconds < DAY) return 60_000;
  if (seconds < WEEK) return 60 * 60 * 1000;
  return null;
}

// useSyncExternalStore as a "has hydrated" probe: false via getServerSnapshot, true post-mount.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export interface TimeAgoProps
  extends Omit<React.TimeHTMLAttributes<HTMLTimeElement>, "dateTime"> {
  /** ISO date string. Past or future. */
  dateStr: string;
  /** Fallback rendered during SSR / initial hydration. Defaults to formatted absolute date. */
  fallback?: string;
  /** "mono" applies tabular numerals with tightened tracking; "sans" inherits parent typography. */
  variant?: "mono" | "sans";
  /** Re-render on a smart interval so the label stays current. */
  liveUpdate?: boolean;
}

/** Renders an absolute date during SSR and swaps to a relative label after mount. */
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

  // `tick` in the effect's deps lets it schedule the next refresh based on the now-current age.
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
