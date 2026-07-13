"use client";

import { Toggle } from "@patchui/react";
import { PushPin } from "@phosphor-icons/react/dist/ssr";

export function ToggleSizesDemo() {
  return (
    <div className="flex items-center gap-3">
      <Toggle size="sm" aria-label="Pin, small">
        <PushPin />
      </Toggle>
      <Toggle size="md" aria-label="Pin, medium">
        <PushPin />
      </Toggle>
      <Toggle size="lg" aria-label="Pin, large">
        <PushPin />
      </Toggle>
    </div>
  );
}
