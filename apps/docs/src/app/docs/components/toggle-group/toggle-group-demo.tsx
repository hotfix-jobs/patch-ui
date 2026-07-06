"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem , SectionLabel } from "@patchui/react";
import { Rows, SquaresFour, TextAlignCenter, TextAlignLeft, TextAlignRight } from "@phosphor-icons/react/dist/ssr";
export function ToggleGroupDemo() {
  const [view, setView] = useState<string>("grid");
  const [align, setAlign] = useState("center");
  const [sort, setSort] = useState<string>("newest");
  const [smView, setSmView] = useState("grid");
  const [lgView, setLgView] = useState("grid");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Icon-only view toggle</SectionLabel>
        <ToggleGroup value={view} onValueChange={setView} aria-label="View">
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <SquaresFour />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <Rows />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-3">
        <SectionLabel>Three options (alignment)</SectionLabel>
        <ToggleGroup value={align} onValueChange={setAlign} aria-label="Alignment">
          <ToggleGroupItem value="left" aria-label="Align left">
            <TextAlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <TextAlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <TextAlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-3">
        <SectionLabel>Text labels (sort)</SectionLabel>
        <ToggleGroup value={sort} onValueChange={setSort} aria-label="Sort">
          <ToggleGroupItem value="newest">Newest</ToggleGroupItem>
          <ToggleGroupItem value="oldest">Oldest</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-3">
        <SectionLabel>Sizes</SectionLabel>
        <div className="flex flex-col gap-3">
          <ToggleGroup value={smView} onValueChange={setSmView} size="sm" aria-label="View">
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <SquaresFour />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <Rows />
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup value={view} onValueChange={setView} aria-label="View">
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <SquaresFour />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <Rows />
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup value={lgView} onValueChange={setLgView} size="lg" aria-label="View">
            <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
            <ToggleGroupItem value="list">List</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}
