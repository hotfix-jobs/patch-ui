"use client";

import { Switch } from "@patchui/react";
import { useState } from "react";

/** Showcases Switch in on/off and disabled states. */
export function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Controlled */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Controlled
        </p>
        <div className="flex items-center gap-3">
          <Switch
            checked={checked}
            onCheckedChange={(c) => setChecked(c)}
          />
          <span className="text-sm text-patch-text">
            {checked ? "On" : "Off"}
          </span>
        </div>
      </div>

      {/* Default Checked */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Default Checked
        </p>
        <div className="flex items-center gap-3">
          <Switch defaultChecked />
          <span className="text-sm text-patch-text">Starts on</span>
        </div>
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Disabled
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Switch disabled />
            <span className="text-sm text-patch-text">Disabled off</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch disabled defaultChecked />
            <span className="text-sm text-patch-text">Disabled on</span>
          </div>
        </div>
      </div>
    </div>
  );
}
