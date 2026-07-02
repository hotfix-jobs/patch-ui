"use client";

import { useState } from "react";
import { SegmentedToggle, SegmentedToggleItem , SectionLabel } from "@patchui/react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  LayoutGrid,
  Rows3,
} from "lucide-react";


export function SegmentedToggleDemo() {
  const [view, setView] = useState<string>("grid");
  const [align, setAlign] = useState("center");
  const [sort, setSort] = useState<string>("newest");
  const [smView, setSmView] = useState("grid");
  const [lgView, setLgView] = useState("grid");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Icon-only view toggle</SectionLabel>
        <SegmentedToggle value={view} onValueChange={setView} aria-label="View">
          <SegmentedToggleItem value="grid" aria-label="Grid view">
            <LayoutGrid />
          </SegmentedToggleItem>
          <SegmentedToggleItem value="list" aria-label="List view">
            <Rows3 />
          </SegmentedToggleItem>
        </SegmentedToggle>
      </div>

      <div className="space-y-3">
        <SectionLabel>Three options (alignment)</SectionLabel>
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

      <div className="space-y-3">
        <SectionLabel>Text labels (sort)</SectionLabel>
        <SegmentedToggle value={sort} onValueChange={setSort} aria-label="Sort">
          <SegmentedToggleItem value="newest">Newest</SegmentedToggleItem>
          <SegmentedToggleItem value="oldest">Oldest</SegmentedToggleItem>
        </SegmentedToggle>
      </div>

      <div className="space-y-3">
        <SectionLabel>Sizes</SectionLabel>
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
