"use client";

import { Spinner } from "@patchui/react";

const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;

export function SpinnerDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Sizes (ring)</p>
        <div className="flex flex-wrap items-center gap-6">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Spinner size={size} />
              <span className="text-label-12 text-gray-800">{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">
          Dots variant — inline for copy waits
        </p>
        <div className="flex flex-col gap-3 text-copy-14 text-gray-1000">
          <p className="inline-flex items-center gap-1.5">
            Saving <Spinner variant="dots" size="sm" />
          </p>
          <p className="inline-flex items-center gap-1.5">
            Deploying <Spinner variant="dots" />
          </p>
          <p className="inline-flex items-center gap-1.5">
            Building <Spinner variant="dots" size="lg" />
          </p>
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Color inheritance</p>
        <div className="flex flex-wrap items-center gap-6 text-copy-14">
          <div className="flex items-center gap-2 text-gray-1000">
            <Spinner />
            <span>Default</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Spinner />
            <span>Muted</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--error)]">
            <Spinner />
            <span>Error</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--success)]">
            <Spinner />
            <span>Success</span>
          </div>
        </div>
      </div>
    </div>
  );
}
