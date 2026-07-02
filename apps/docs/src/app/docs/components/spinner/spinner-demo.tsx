"use client";

import { Spinner } from "@patchui/react";

export function SpinnerDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Variants */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Variants
        </p>
        <div className="flex flex-wrap items-center gap-8">
          {(["ring", "spinner", "dots", "bars", "ring-fill"] as const).map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <Spinner variant={variant} size="lg" />
              <span className="text-xs text-gray-900">{variant}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Sizes
        </p>
        <div className="flex flex-wrap items-center gap-6">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Spinner size={size} />
              <span className="text-xs text-gray-900">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes with spinner variant */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          iOS-style at all sizes
        </p>
        <div className="flex flex-wrap items-center gap-6">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Spinner variant="spinner" size={size} />
              <span className="text-xs text-gray-900">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Color inheritance */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Color Inheritance
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-gray-1000">
            <Spinner size="md" />
            <span className="text-sm">Default</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Spinner size="md" />
            <span className="text-sm">Muted</span>
          </div>
          <div className="flex items-center gap-2 text-error">
            <Spinner size="md" />
            <span className="text-sm">Error</span>
          </div>
          <div className="flex items-center gap-2 text-success">
            <Spinner size="md" />
            <span className="text-sm">Success</span>
          </div>
        </div>
      </div>
    </div>
  );
}
