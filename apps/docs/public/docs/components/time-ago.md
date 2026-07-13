# Time Ago

A hydration-safe time element that turns an absolute date into a compact relative label.

Use Time Ago for recent activity, comments, status changes, and scheduled events where the distance from now matters more than the calendar date.

```tsx
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

```

## Installation

```bash
npx shadcn add @patchui/time-ago
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/time-ago.json). The canonical implementation lives in [packages/react/src/components/time-ago.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/time-ago.tsx).

## Usage

```tsx
<TimeAgo dateStr={activity.createdAt} />
```

Pass an ISO date string. The component renders an absolute UTC date during server rendering, then replaces it with relative time after hydration.

## Examples

### Future time

Future dates use the same scale and render labels such as `Soon`, `in 5m`, or `in 3h`.

```tsx
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

```

## API reference

| Prop       | Type             | Default           | Description                                                       |
| ---------- | ---------------- | ----------------- | ----------------------------------------------------------------- |
| dateStr    | string           | -                 | Sets the past or future ISO date represented by the time element. |
| fallback   | string           | absolute UTC date | Overrides the stable label rendered before hydration.             |
| variant    | "mono" \| "sans" | "mono"            | Uses tabular numerals or inherits the surrounding typography.     |
| liveUpdate | boolean          | true              | Keeps recent labels current using age-based refresh intervals.    |

Labels progress from seconds through minutes, hours, days, weeks, months, and years. Set `liveUpdate={false}` for large archives where automatic refreshes are unnecessary.

## Accessibility

* The rendered `time` element retains the complete ISO value in `dateTime`.
* Keep enough surrounding text for a relative label to make sense on its own.
* Add a Tooltip with the localized absolute date when exact time is important.
* Do not rely on relative time alone for deadlines or other high-consequence dates.
