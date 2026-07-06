"use client";

import { useMemo, useSyncExternalStore } from "react";
import { TimeAgo } from "@patchui/react";

interface DemoDates {
  now: string;
  fiveMinAgo: string;
  threeHoursAgo: string;
  twoDaysAgo: string;
  lastWeek: string;
}

// Server snapshot is null so SSR renders placeholders, avoiding a hydration mismatch from server/client timestamp drift.
let cachedClientNow: number | null = null;
const noopSubscribe = () => () => {};
function getClientNow(): number {
  if (cachedClientNow == null) cachedClientNow = Date.now();
  return cachedClientNow;
}
function useClientNow(): number | null {
  return useSyncExternalStore(noopSubscribe, getClientNow, () => null);
}

export function TimeAgoDemo() {
  const now = useClientNow();
  const dates = useMemo<DemoDates | null>(() => {
    if (now == null) return null;
    const iso = (msAgo: number) => new Date(now - msAgo).toISOString();
    return {
      now: iso(0),
      fiveMinAgo: iso(5 * 60 * 1000),
      threeHoursAgo: iso(3 * 60 * 60 * 1000),
      twoDaysAgo: iso(2 * 24 * 60 * 60 * 1000),
      lastWeek: iso(9 * 24 * 60 * 60 * 1000),
    };
  }, [now]);

  const placeholder = <span className="text-ink-subtle">…</span>;

  return (
    <div className="space-y-2 text-small">
      <div>Just now: {dates ? <TimeAgo dateStr={dates.now} /> : placeholder}</div>
      <div>5 min ago: {dates ? <TimeAgo dateStr={dates.fiveMinAgo} /> : placeholder}</div>
      <div>3 hours ago: {dates ? <TimeAgo dateStr={dates.threeHoursAgo} /> : placeholder}</div>
      <div>2 days ago: {dates ? <TimeAgo dateStr={dates.twoDaysAgo} /> : placeholder}</div>
      <div>Last week: {dates ? <TimeAgo dateStr={dates.lastWeek} /> : placeholder}</div>
      <div className="pt-3 border-t border-hairline">
        Sans variant: {dates ? <TimeAgo dateStr={dates.twoDaysAgo} variant="sans" /> : placeholder}
      </div>
    </div>
  );
}
