"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@patchui/react";
import { Rows, SquaresFour } from "@phosphor-icons/react/dist/ssr";

export function ToggleGroupDemo() {
  const [view, setView] = useState("grid");

  return (
    <ToggleGroup value={view} onValueChange={setView} aria-label="Project view">
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <SquaresFour />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <Rows />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
