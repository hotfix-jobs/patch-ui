"use client";

import { useState } from "react";
import { Badge } from "@patchui/react";

const INITIAL_FILTERS = ["Design", "Remote", "Full-time"];

/** Showcases Badge variants, sizes, and the dismissible (onRemove) pattern. */
export function BadgeDemo() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  return (
    <div className="flex flex-col gap-8">
      {/* Variants */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Variants
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </div>

      {/* Outline variants */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Outline variants
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="successOutline">Success</Badge>
          <Badge variant="warningOutline">Warning</Badge>
          <Badge variant="dangerOutline">Danger</Badge>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Sizes
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="xs">Extra Small</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      {/* Shape */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Shape
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge shape="rounded">Rounded</Badge>
          <Badge shape="pill">Pill</Badge>
          <Badge variant="success" shape="pill">Active</Badge>
          <Badge variant="warning" shape="pill">Pending</Badge>
          <Badge variant="danger" shape="pill">Error</Badge>
        </div>
      </div>

      {/* Dismissible - pass onRemove to get a trailing × (e.g. applied filters) */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Dismissible (onRemove)
        </p>
        <div className="flex min-h-7 flex-wrap items-center gap-2">
          {filters.length === 0 ? (
            <button
              type="button"
              onClick={() => setFilters(INITIAL_FILTERS)}
              className="text-xs text-gray-800 underline underline-offset-2"
            >
              Reset
            </button>
          ) : (
            filters.map((f) => (
              <Badge
                key={f}
                variant="secondary"
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
