"use client";

import { SectionLabel } from "@patchui/react";

export function SectionLabelDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Basic</SectionLabel>
        <p className="text-copy-14 text-gray-900">
          The content immediately below is anchored by the label above.
        </p>
      </div>

      <div className="space-y-3">
        <SectionLabel>Inside a bordered surface</SectionLabel>
        <div className="rounded-[var(--radius-12)] border-[0.5px] border-gray-alpha-400 bg-background-200 p-4">
          <p className="text-copy-14 text-gray-900">
            Reads without competing against surrounding chrome. The label
            weight is heavy enough to anchor without shouting.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>With a description</SectionLabel>
        <p className="text-copy-13 text-gray-800">
          You can pair the label with a smaller copy-13 description line
          before your content. The parent controls spacing.
        </p>
        <div className="rounded-[var(--radius-6)] border-[0.5px] border-gray-alpha-400 bg-background-100 p-3 text-copy-14 text-gray-1000">
          Card content
        </div>
      </div>
    </div>
  );
}
