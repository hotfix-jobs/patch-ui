"use client";

import { Progress } from "@patchui/react";

export function ProgressDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-small font-medium text-ink">Uploading files</span>
        <span className="text-mini tabular-nums text-ink-muted">12 of 20</span>
      </div>
      <Progress value={12} max={20} label="Uploading files" />
    </div>
  );
}
