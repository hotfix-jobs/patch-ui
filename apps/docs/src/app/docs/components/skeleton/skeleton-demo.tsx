"use client";

import { Skeleton } from "@patchui/react";

export function SkeletonDemo() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading profile"
      className="flex w-full max-w-md items-start gap-4"
    >
      <Skeleton shape="pill" width={48} height={48} />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton height={16} width="35%" />
        <Skeleton height={16} width="70%" />
        <Skeleton height={16} width="55%" />
      </div>
    </div>
  );
}
