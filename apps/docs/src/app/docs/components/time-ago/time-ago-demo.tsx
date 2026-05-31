"use client";

import { useEffect, useState } from "react";
import { TimeAgo } from "@patchui/react";

interface DemoDates {
  now: string;
  fiveMinAgo: string;
  threeHoursAgo: string;
  twoDaysAgo: string;
  lastWeek: string;
}

export function TimeAgoDemo() {
  // Compute relative dates only after mount. Doing this during render would
  // produce different timestamps on the server vs the client (Date.now drifts
  // by milliseconds between the two), causing a hydration mismatch.
  const [dates, setDates] = useState<DemoDates | null>(null);

  useEffect(() => {
    const t = Date.now();
    const iso = (msAgo: number) => new Date(t - msAgo).toISOString();
    setDates({
      now: iso(0),
      fiveMinAgo: iso(5 * 60 * 1000),
      threeHoursAgo: iso(3 * 60 * 60 * 1000),
      twoDaysAgo: iso(2 * 24 * 60 * 60 * 1000),
      lastWeek: iso(9 * 24 * 60 * 60 * 1000),
    });
  }, []);

  const placeholder = <span className="text-patch-text-quaternary">…</span>;

  return (
    <div className="space-y-2 text-[length:var(--text-patch-control)]">
      <div>Just now: {dates ? <TimeAgo dateStr={dates.now} /> : placeholder}</div>
      <div>5 min ago: {dates ? <TimeAgo dateStr={dates.fiveMinAgo} /> : placeholder}</div>
      <div>3 hours ago: {dates ? <TimeAgo dateStr={dates.threeHoursAgo} /> : placeholder}</div>
      <div>2 days ago: {dates ? <TimeAgo dateStr={dates.twoDaysAgo} /> : placeholder}</div>
      <div>Last week: {dates ? <TimeAgo dateStr={dates.lastWeek} /> : placeholder}</div>
      <div className="pt-3 border-t border-patch-border-subtle">
        Sans variant: {dates ? <TimeAgo dateStr={dates.twoDaysAgo} variant="sans" /> : placeholder}
      </div>
    </div>
  );
}
