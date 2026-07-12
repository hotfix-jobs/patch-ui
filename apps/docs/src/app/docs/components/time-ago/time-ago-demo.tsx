"use client";

import { useMemo, useSyncExternalStore } from "react";
import { TimeAgo } from "@patchui/react";

interface DemoDates {
  now: string;
  fiveMinAgo: string;
  threeHoursAgo: string;
  twoDaysAgo: string;
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
    };
  }, [now]);

  const placeholder = <span className="text-ink-subtle">…</span>;

  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-3 text-small">
      <span className="text-ink">Status updated</span>
      {dates ? <TimeAgo dateStr={dates.now} /> : placeholder}
      <span className="text-ink">Comment added</span>
      {dates ? <TimeAgo dateStr={dates.fiveMinAgo} /> : placeholder}
      <span className="text-ink">Build completed</span>
      {dates ? <TimeAgo dateStr={dates.threeHoursAgo} /> : placeholder}
      <span className="text-ink">Project created</span>
      {dates ? <TimeAgo dateStr={dates.twoDaysAgo} /> : placeholder}
    </div>
  );
}
