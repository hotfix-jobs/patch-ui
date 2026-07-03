"use client";
import { Separator } from "@patchui/react";

export function SeparatorDemo() {
  return (
    <div className="flex flex-col gap-8 max-w-md">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Horizontal</p>
        <Separator />
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">With label</p>
        <Separator label="or" />
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Vertical</p>
        <div className="flex h-8 items-center gap-4 text-copy-14 text-gray-1000">
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
