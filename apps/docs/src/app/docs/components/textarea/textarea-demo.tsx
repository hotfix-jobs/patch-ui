"use client";

import { Textarea } from "@patchui/react";

/** Showcases Textarea with placeholder, custom rows, and disabled state. */
export function TextareaDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Basic */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Basic
        </p>
        <div className="max-w-sm">
          <Textarea placeholder="Write something…" />
        </div>
      </div>

      {/* Custom Rows */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Custom Rows
        </p>
        <div className="max-w-sm">
          <Textarea placeholder="This textarea has 6 rows" rows={6} />
        </div>
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Disabled
        </p>
        <div className="max-w-sm">
          <Textarea placeholder="Disabled textarea" disabled />
        </div>
      </div>
    </div>
  );
}
