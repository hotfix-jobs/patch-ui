"use client";

import { Switch } from "@patchui/react";
import { Check, X } from "@phosphor-icons/react/dist/ssr";

export function SwitchStatesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch aria-label="Enable compact mode" size="sm" defaultChecked />
        <span className="text-small text-ink">Compact mode</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          aria-label="Enable availability"
          defaultChecked
          icon={{ checked: <Check />, unchecked: <X /> }}
        />
        <span className="text-small text-ink">Availability</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch aria-label="Enable archived setting" disabled />
        <span className="text-small text-ink-muted">Archived setting</span>
      </div>
    </div>
  );
}
