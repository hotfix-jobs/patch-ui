"use client";

import { Progress } from "@patchui/react";

export function ProgressStatesDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-small text-ink">Sync complete</span>
        <Progress value={100} variant="success" size="sm" label="Sync complete" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-small text-ink">Approaching storage limit</span>
        <Progress value={82} variant="warning" size="sm" label="Storage used" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-small text-ink">Preparing export</span>
        <Progress value={null} size="sm" label="Preparing export" />
      </div>
    </div>
  );
}
