"use client";

import { Scroller } from "@patchui/react";
import { SectionLabel } from "@/components/demo/section-label";

const CARDS = [
  { title: "Frontend Engineer", meta: "Remote · Full-time" },
  { title: "Backend Engineer", meta: "SF · Full-time" },
  { title: "Design Engineer", meta: "Remote · Contract" },
  { title: "Product Designer", meta: "NYC · Full-time" },
  { title: "Data Engineer", meta: "Remote · Full-time" },
  { title: "Platform Engineer", meta: "Berlin · Full-time" },
  { title: "Growth Engineer", meta: "Remote · Full-time" },
  { title: "Mobile Engineer", meta: "London · Full-time" },
  { title: "DevOps Engineer", meta: "Remote · Full-time" },
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
      <div>
        <SectionLabel>Horizontal rail (with buttons)</SectionLabel>
        <Scroller
          overflow="x"
          withButtons
          childrenContainerClassName="gap-3 p-1"
          ariaLabel="Featured jobs"
        >
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="w-52 shrink-0 rounded-[var(--radius-12)] border border-gray-alpha-400 bg-background-100 p-4"
            >
              <p className="text-copy-14 font-medium text-gray-1000">
                {c.title}
              </p>
              <p className="mt-1 text-label-13 text-gray-800">{c.meta}</p>
            </div>
          ))}
        </Scroller>
      </div>

      {/* Horizontal rail without buttons — touch / trackpad scroll only */}
      <div>
        <SectionLabel>Horizontal rail (no buttons)</SectionLabel>
        <Scroller
          overflow="x"
          childrenContainerClassName="gap-2 p-1"
          ariaLabel="Categories"
        >
          {["Engineering", "Design", "Product", "Marketing", "Sales", "Operations", "Data", "Support", "Finance"].map(
            (label) => (
              <button
                key={label}
                type="button"
                className="shrink-0 rounded-full border border-gray-alpha-400 bg-background-100 px-4 py-1.5 text-label-13 text-gray-1000 hover:bg-gray-alpha-100"
              >
                {label}
              </button>
            ),
          )}
        </Scroller>
      </div>

      {/* Vertical feed */}
      <div>
        <SectionLabel>Vertical feed</SectionLabel>
        <Scroller
          overflow="y"
          height={280}
          withButtons
          childrenContainerClassName="p-3"
          ariaLabel="Activity feed"
          className="rounded-[var(--radius-12)] border border-gray-alpha-400 bg-background-100"
        >
          {FEED.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-alpha-400 py-2 last:border-b-0"
            >
              <p className="text-copy-14 font-medium text-gray-1000">
                {item.title}
              </p>
              <p className="mt-0.5 text-label-13 text-gray-800">{item.body}</p>
            </div>
          ))}
        </Scroller>
      </div>
    </div>
  );
}
