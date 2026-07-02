"use client";
import { EmptyState, Button } from "@patchui/react";

export function EmptyStateDemo() {
  return (
    <div className="space-y-4">
      <EmptyState
        title="No results match those filters"
        description="Try removing a filter, or reset to see everything."
        icon={<span className="text-base">∅</span>}
      />
      <div className="border-t border-gray-alpha-300 pt-4">
        <EmptyState
          title="Your list is empty"
          description="Save items here to keep track of the things you care about."
          icon={<span className="text-base">♡</span>}
          action={<Button variant="primary" size="sm">Browse items</Button>}
        />
      </div>
    </div>
  );
}
