"use client";

import { Button, EmptyState } from "@patchui/react";
import { MagnifyingGlassMinus } from "@phosphor-icons/react/dist/ssr";

export function EmptyStateDemo() {
  return (
    <EmptyState
      title="No results match your filters"
      description="Try removing a filter to see more results."
      icon={<MagnifyingGlassMinus />}
      action={<Button variant="secondary">Clear Filters</Button>}
    />
  );
}
