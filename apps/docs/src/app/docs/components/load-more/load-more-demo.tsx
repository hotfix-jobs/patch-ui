"use client";

import { useState } from "react";
import { Card, LoadMore } from "@patchui/react";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

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
      <div>
        <Label>Default</Label>
        <LoadMore>Load More</LoadMore>
      </div>

      <div>
        <Label>Custom label</Label>
        <LoadMore>Show more results</LoadMore>
      </div>

      <div>
        <Label>Loading state</Label>
        <LoadMore loading>Loading…</LoadMore>
      </div>

      <div>
        <Label>Attached to a list (noGap + noBorderRadius)</Label>
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

      <div>
        <Label>Disabled (no more results)</Label>
        <LoadMore disabled>No more results</LoadMore>
      </div>
    </div>
  );
}
