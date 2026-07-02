"use client";

import { useState } from "react";
import { Card, LoadMore , SectionLabel } from "@patchui/react";


function Row({ n }: { n: number }) {
  return (
    <div className="px-4 py-3 text-copy-14 text-gray-1000">
      Job {n} · Company · Remote
    </div>
  );
}

export function LoadMoreDemo() {
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-8 max-w-md">
      <div className="space-y-3">
        <SectionLabel>Default</SectionLabel>
        <LoadMore>Load More</LoadMore>
      </div>

      <div className="space-y-3">
        <SectionLabel>Custom label</SectionLabel>
        <LoadMore>Show more results</LoadMore>
      </div>

      <div className="space-y-3">
        <SectionLabel>Loading state</SectionLabel>
        <LoadMore loading>Loading…</LoadMore>
      </div>

      <div className="space-y-3">
        <SectionLabel>Attached to a list (noGap + noBorderRadius)</SectionLabel>
        <Card border borderBetween>
          {Array.from({ length: count }, (_, i) => (
            <Row key={i} n={i + 1} />
          ))}
          <LoadMore
            noGap
            noBorderRadius
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setCount((c) => c + 3);
                setLoading(false);
              }, 700);
            }}
          >
            {loading ? "Loading…" : "Load More"}
          </LoadMore>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Disabled (no more results)</SectionLabel>
        <LoadMore disabled>No more results</LoadMore>
      </div>
    </div>
  );
}
