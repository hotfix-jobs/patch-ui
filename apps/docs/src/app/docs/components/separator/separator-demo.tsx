"use client";
import { Separator } from "@patchui/react";

export function SeparatorDemo() {
  return (
    <div className="flex flex-col gap-8 max-w-md">
      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">Horizontal</p>
        <Separator />
      </div>

      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">With label</p>
        <Separator label="or" />
      </div>

      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">Vertical</p>
        <div className="flex h-8 items-center gap-4 text-body-14 text-ink">
          <span>Drafts</span>
          <Separator orientation="vertical" />
          <span>Published</span>
          <Separator orientation="vertical" />
          <span>Archived</span>
        </div>
      </div>
    </div>
  );
}
