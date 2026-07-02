"use client";

import { Skeleton } from "@patchui/react";

/** Showcases Skeleton shapes and layout patterns. */
export function SkeletonDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Text Lines */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Text Lines
        </p>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>

      {/* Circle */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Circle
        </p>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>

      {/* Card */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Card Layout
        </p>
        <div className="flex items-start gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
