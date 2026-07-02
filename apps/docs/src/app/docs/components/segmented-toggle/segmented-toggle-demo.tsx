"use client";

import { useState } from "react";
import { SegmentedToggle, SegmentedToggleItem } from "@patchui/react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  LayoutGrid,
  Rows3,
} from "lucide-react";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function SegmentedToggleDemo() {
  const [view, setView] = useState<string>("grid");
  const [align, setAlign] = useState("center");
  const [sort, setSort] = useState<string>("newest");
  const [smView, setSmView] = useState("grid");
  const [lgView, setLgView] = useState("grid");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label>Icon-only view toggle</Label>
        <SegmentedToggle value={view} onValueChange={setView} aria-label="View">
          <SegmentedToggleItem value="grid" aria-label="Grid view">
            <LayoutGrid />
          </SegmentedToggleItem>
          <SegmentedToggleItem value="list" aria-label="List view">
            <Rows3 />
          </SegmentedToggleItem>
        </SegmentedToggle>
      </div>

      <div>
        <Label>Three options (alignment)</Label>
        <SegmentedToggle value={align} onValueChange={setAlign} aria-label="Alignment">
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

      <div>
        <Label>Text labels (sort)</Label>
        <SegmentedToggle value={sort} onValueChange={setSort} aria-label="Sort">
          <SegmentedToggleItem value="newest">Newest</SegmentedToggleItem>
          <SegmentedToggleItem value="oldest">Oldest</SegmentedToggleItem>
        </SegmentedToggle>
      </div>

      <div>
        <Label>Sizes</Label>
        <div className="flex flex-col gap-3">
          <SegmentedToggle value={smView} onValueChange={setSmView} size="sm" aria-label="View">
            <SegmentedToggleItem value="grid" aria-label="Grid view">
              <LayoutGrid />
            </SegmentedToggleItem>
            <SegmentedToggleItem value="list" aria-label="List view">
              <Rows3 />
            </SegmentedToggleItem>
          </SegmentedToggle>
          <SegmentedToggle value={view} onValueChange={setView} aria-label="View">
            <SegmentedToggleItem value="grid" aria-label="Grid view">
              <LayoutGrid />
            </SegmentedToggleItem>
            <SegmentedToggleItem value="list" aria-label="List view">
              <Rows3 />
            </SegmentedToggleItem>
          </SegmentedToggle>
          <SegmentedToggle value={lgView} onValueChange={setLgView} size="lg" aria-label="View">
            <SegmentedToggleItem value="grid">Grid</SegmentedToggleItem>
            <SegmentedToggleItem value="list">List</SegmentedToggleItem>
          </SegmentedToggle>
        </div>
      </div>
    </div>
  );
}
