"use client";

import { useState } from "react";
import { Badge } from "@patchui/react";

const INITIAL_FILTERS = ["Design", "Remote", "Full-time"];

export function BadgeDemo() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Shape</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge shape="rounded">Rounded</Badge>
          <Badge shape="pill">Pill</Badge>
          <Badge variant="success" shape="pill">Active</Badge>
          <Badge variant="warning" shape="pill">Pending</Badge>
          <Badge variant="error" shape="pill">Failed</Badge>
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Dismissible</p>
        <div className="flex min-h-7 flex-wrap items-center gap-2">
          {filters.length === 0 ? (
            <button
              type="button"
              onClick={() => setFilters(INITIAL_FILTERS)}
              className="text-label-12 text-gray-800 underline underline-offset-2"
            >
              Reset
            </button>
          ) : (
            filters.map((f) => (
              <Badge
                key={f}
                onRemove={() => setFilters((prev) => prev.filter((x) => x !== f))}
              >
                {f}
              </Badge>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
