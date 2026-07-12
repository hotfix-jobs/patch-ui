"use client";

import { Scroller } from "@patchui/react";

const updates = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Update ${index + 1}`,
  description: "Project details and status changed.",
}));

export function ScrollerVerticalDemo() {
  return (
    <Scroller
      overflow="y"
      height={240}
      ariaLabel="Project activity"
      childrenContainerClassName="p-3"
      className="rounded-[var(--radius-12)] bg-layer-1"
    >
      {updates.map((update) => (
        <div
          key={update.id}
          className="border-b border-hairline py-3 last:border-b-0"
        >
          <p className="text-small font-medium text-ink">{update.title}</p>
          <p className="mt-0.5 text-small text-ink-muted">
            {update.description}
          </p>
        </div>
      ))}
    </Scroller>
  );
}
