"use client";

import { Scroller } from "@patchui/react";
import { SectionLabel } from "@patchui/react";

const CARDS = [
  { title: "Design system", meta: "12 members · Active" },
  { title: "Q4 planning", meta: "8 members · Active" },
  { title: "Marketing site", meta: "5 members · Draft" },
  { title: "Onboarding revamp", meta: "4 members · Active" },
  { title: "Billing migration", meta: "3 members · Active" },
  { title: "Analytics rollout", meta: "6 members · Active" },
  { title: "Mobile app v2", meta: "9 members · Draft" },
  { title: "Docs refresh", meta: "2 members · Archived" },
  { title: "API cleanup", meta: "4 members · Active" },
];

const FEED = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `Update #${i + 1}`,
  body: "Short summary of what changed here.",
}));

export function ScrollerDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Horizontal rail with buttons */}
      <div className="space-y-3">
        <SectionLabel>Horizontal rail (with buttons)</SectionLabel>
        <Scroller
          overflow="x"
          withButtons
          childrenContainerClassName="gap-3 p-1"
          ariaLabel="Featured projects"
        >
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="w-52 shrink-0 rounded-[var(--radius-12)] border border-hairline-strong bg-canvas p-4"
            >
              <p className="text-button-14 text-ink">
                {c.title}
              </p>
              <p className="mt-1 text-body-13 text-ink-muted">{c.meta}</p>
            </div>
          ))}
        </Scroller>
      </div>

      {/* Horizontal rail without buttons: touch / trackpad scroll only */}
      <div className="space-y-3">
        <SectionLabel>Horizontal rail (no buttons)</SectionLabel>
        <Scroller
          overflow="x"
          childrenContainerClassName="gap-2 p-1"
          ariaLabel="Categories"
        >
          {["All", "Latest", "Popular", "Featured", "Trending", "Recent", "Recommended", "Beta", "Coming soon"].map(
            (label) => (
              <button
                key={label}
                type="button"
                className="shrink-0 rounded-full border border-hairline-strong bg-canvas px-4 py-1.5 text-body-13 text-ink hover:bg-surface-1"
              >
                {label}
              </button>
            ),
          )}
        </Scroller>
      </div>

      {/* Vertical feed */}
      <div className="space-y-3">
        <SectionLabel>Vertical feed</SectionLabel>
        <Scroller
          overflow="y"
          height={280}
          withButtons
          childrenContainerClassName="p-3"
          ariaLabel="Activity feed"
          className="rounded-[var(--radius-12)] border border-hairline-strong bg-canvas"
        >
          {FEED.map((item) => (
            <div
              key={item.id}
              className="border-b border-hairline-strong py-2 last:border-b-0"
            >
              <p className="text-button-14 text-ink">
                {item.title}
              </p>
              <p className="mt-0.5 text-body-13 text-ink-muted">{item.body}</p>
            </div>
          ))}
        </Scroller>
      </div>
    </div>
  );
}
