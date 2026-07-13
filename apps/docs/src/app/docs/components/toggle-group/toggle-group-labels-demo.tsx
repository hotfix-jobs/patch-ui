"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@patchui/react";

export function ToggleGroupLabelsDemo() {
  const [sort, setSort] = useState("newest");

  return (
    <ToggleGroup value={sort} onValueChange={setSort} aria-label="Sort projects">
      <ToggleGroupItem value="newest">Newest</ToggleGroupItem>
      <ToggleGroupItem value="oldest">Oldest</ToggleGroupItem>
    </ToggleGroup>
  );
}
