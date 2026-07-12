"use client";

import { Separator } from "@patchui/react";

export function SeparatorVerticalDemo() {
  return (
    <div className="flex h-8 items-center gap-4 text-small text-ink">
      <span>12 drafts</span>
      <Separator orientation="vertical" decorative />
      <span>8 published</span>
      <Separator orientation="vertical" decorative />
      <span>3 archived</span>
    </div>
  );
}
