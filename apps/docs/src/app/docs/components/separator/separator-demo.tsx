"use client";
import { Separator } from "@patchui/react";

export function SeparatorDemo() {
  return (
    <div className="flex flex-col gap-8 max-w-md">
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Horizontal
        </p>
        <Separator />
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          With label
        </p>
        <Separator label="or" />
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Vertical
        </p>
        <div className="flex h-12 items-center gap-4">
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
