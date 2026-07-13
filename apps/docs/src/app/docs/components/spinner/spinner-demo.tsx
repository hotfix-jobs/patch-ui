"use client";

import { Spinner } from "@patchui/react";

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-2 text-ink-muted">
      <Spinner size="sm" label="Loading recent activity" />
      <span className="text-small">Loading recent activity</span>
    </div>
  );
}
