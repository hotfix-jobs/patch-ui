"use client";

import { useState } from "react";
import {
  SegmentedToggle,
  SegmentedToggleItem,
} from "@patchui/react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  LayoutGrid,
  Rows3,
} from "lucide-react";

/** Showcases SegmentedToggle: icon-only, text, sizes. */
export function SegmentedToggleDemo() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [align, setAlign] = useState("center");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [smallView, setSmallView] = useState("grid");

  return (
    <div className="flex flex-col gap-8">
      {/* Icon-only view toggle */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Icon-only (view toggle)
        </p>
        <SegmentedToggle
          value={view}
          onValueChange={(v) => setView(v as "grid" | "list")}
          aria-label="View"
        >
          <SegmentedToggleItem value="grid" aria-label="Grid view">
            <LayoutGrid />
          </SegmentedToggleItem>
          <SegmentedToggleItem value="list" aria-label="List view">
            <Rows3 />
          </SegmentedToggleItem>
        </SegmentedToggle>
      </div>

      {/* Three options */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Three options (alignment)
        </p>
        <SegmentedToggle
          value={align}
          onValueChange={setAlign}
          aria-label="Alignment"
        >
          <SegmentedToggleItem value="left" aria-label="Align left">
            <AlignLeft />
          </SegmentedToggleItem>
          <SegmentedToggleItem value="center" aria-label="Align center">
            <AlignCenter />
          </SegmentedToggleItem>
          <SegmentedToggleItem value="right" aria-label="Align right">
            <AlignRight />
          </SegmentedToggleItem>
        </SegmentedToggle>
      </div>

      {/* Text labels */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Text labels (sort)
        </p>
        <SegmentedToggle
          value={sort}
          onValueChange={(v) => setSort(v as "newest" | "oldest")}
          aria-label="Sort"
        >
          <SegmentedToggleItem value="newest">Newest</SegmentedToggleItem>
          <SegmentedToggleItem value="oldest">Oldest</SegmentedToggleItem>
        </SegmentedToggle>
      </div>

      {/* Small size */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Small size
        </p>
        <SegmentedToggle
          value={smallView}
          onValueChange={setSmallView}
          size="sm"
          aria-label="View"
        >
          <SegmentedToggleItem value="grid" aria-label="Grid view">
            <LayoutGrid />
          </SegmentedToggleItem>
          <SegmentedToggleItem value="list" aria-label="List view">
            <Rows3 />
          </SegmentedToggleItem>
        </SegmentedToggle>
      </div>
    </div>
  );
}
