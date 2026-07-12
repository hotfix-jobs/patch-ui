"use client";

import { Toggle } from "@patchui/react";
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react/dist/ssr";

export function ToggleSecondaryDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="secondary" defaultPressed aria-label="Bold">
        <TextB />
      </Toggle>
      <Toggle variant="secondary" aria-label="Italic">
        <TextItalic />
      </Toggle>
      <Toggle variant="secondary" aria-label="Underline">
        <TextUnderline />
      </Toggle>
    </div>
  );
}
