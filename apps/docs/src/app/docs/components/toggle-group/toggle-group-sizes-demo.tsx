"use client";

import { ToggleGroup, ToggleGroupItem } from "@patchui/react";
import { Rows, SquaresFour } from "@phosphor-icons/react/dist/ssr";

function ViewGroup({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <ToggleGroup defaultValue="grid" size={size} aria-label={`${size} project view`}>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <SquaresFour />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <Rows />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ToggleGroupSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ViewGroup size="sm" />
      <ViewGroup size="md" />
      <ViewGroup size="lg" />
    </div>
  );
}
