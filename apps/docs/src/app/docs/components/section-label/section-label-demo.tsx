"use client";

import { SectionLabel } from "@patchui/react";

export function SectionLabelDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div>
        <SectionLabel>Overview</SectionLabel>
        <p className="text-[length:var(--text-patch-control)] text-patch-text-secondary">
          A small uppercase label for grouping content under a heading.
        </p>
      </div>
      <div>
        <SectionLabel variant="divided" action="View all">
          Recent activity
        </SectionLabel>
        <p className="text-[length:var(--text-patch-control)] text-patch-text-secondary">
          The divided variant adds a hairline rule and an optional trailing action.
        </p>
      </div>
    </div>
  );
}
