"use client";

import { useMemo, useSyncExternalStore } from "react";
import { TimeAgo } from "@patchui/react";

let cachedClientNow: number | null = null;
const noopSubscribe = () => () => {};

function useClientNow(): number | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => (cachedClientNow ??= Date.now()),
    () => null,
  );
}

export function TimeAgoFutureDemo() {
  const now = useClientNow();
  const startsAt = useMemo(
    () => (now == null ? null : new Date(now + 3 * 60 * 60 * 1000).toISOString()),
    [now],
  );

  return (
    <p className="text-small text-ink">
      Maintenance starts {startsAt ? <TimeAgo dateStr={startsAt} /> : <span className="text-ink-subtle">…</span>}
    </p>
  );
}
