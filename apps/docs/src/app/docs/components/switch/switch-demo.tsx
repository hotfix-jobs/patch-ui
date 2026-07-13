"use client";

import { Switch } from "@patchui/react";
import { useState } from "react";

export function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Switch
        aria-label="Enable notifications"
        checked={checked}
        onCheckedChange={(value) => setChecked(value)}
      />
      <span className="text-small text-ink">Notifications {checked ? "on" : "off"}</span>
    </div>
  );
}
