"use client";

import { LoadingDots } from "@patchui/react";

export function LoadingDotsDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Sizes</p>
        <div className="flex flex-col items-start gap-4">
          <LoadingDots size="sm" />
          <LoadingDots size="md" />
          <LoadingDots size="lg" />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">With text</p>
        <div className="flex flex-col gap-3 text-copy-14 text-gray-900">
          <LoadingDots size="md">Saving</LoadingDots>
          <LoadingDots size="md">Deploying</LoadingDots>
          <LoadingDots size="md">Uploading</LoadingDots>
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Inline in copy</p>
        <p className="text-copy-14 text-gray-1000">
          Your changes are being applied <LoadingDots />
        </p>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Custom color (inherits currentColor)</p>
        <div className="flex flex-col gap-3">
          <div className="text-blue-700"><LoadingDots size="md" /></div>
          <div className="text-green-700"><LoadingDots size="md" /></div>
        </div>
      </div>
    </div>
  );
}
