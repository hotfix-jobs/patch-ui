"use client";

import { useMemo, useState } from "react";
import { Toggle } from "@patchui/react";
import { FilterToolbar } from "@patchui/react/blocks/filter-toolbar";

const filters = ["Remote", "Full time", "Entry level", "Recently posted"];

export function FilterToolbarWrapDemo() {
  const [active, setActive] = useState<string[]>(["Remote"]);
  const activeCount = active.length;
  const results = useMemo(() => 128 - activeCount * 17, [activeCount]);

  return (
    <FilterToolbar
      overflow="wrap"
      activeCount={activeCount}
      onClearAll={() => setActive([])}
      count={`${results} results`}
      countVisibility="always"
    >
      {filters.map((filter) => (
        <Toggle
          key={filter}
          variant="secondary"
          pressed={active.includes(filter)}
          onPressedChange={(pressed) =>
            setActive((current) =>
              pressed
                ? [...current, filter]
                : current.filter((value) => value !== filter),
            )
          }
        >
          {filter}
        </Toggle>
      ))}
    </FilterToolbar>
  );
}
