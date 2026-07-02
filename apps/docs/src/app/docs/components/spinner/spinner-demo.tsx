"use client";

import { Spinner } from "@patchui/react";

const VARIANTS = ["ring", "spinner", "dots", "bars", "ring-fill"] as const;
const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export function SpinnerDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Variants</p>
        <div className="flex flex-wrap items-center gap-8">
          {VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <Spinner variant={variant} size="lg" />
              <span className="text-label-12 text-gray-900">{variant}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Sizes</p>
        <div className="flex flex-wrap items-center gap-6">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Spinner size={size} />
              <span className="text-label-12 text-gray-900">{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Color inheritance</p>
        <div className="flex flex-wrap items-center gap-6 text-copy-14">
          <div className="flex items-center gap-2 text-gray-1000">
            <Spinner size="md" />
            <span>Default</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Spinner size="md" />
            <span>Muted</span>
          </div>
          <div className="flex items-center gap-2 text-error">
            <Spinner size="md" />
            <span>Error</span>
          </div>
          <div className="flex items-center gap-2 text-success">
            <Spinner size="md" />
            <span>Success</span>
          </div>
        </div>
      </div>
    </div>
  );
}
