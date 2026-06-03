"use client";

import { Checkbox } from "@patchui/react";
import { useState } from "react";

/** Showcases Checkbox in checked, indeterminate, and disabled states. */
export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      {/* Controlled */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Controlled
        </p>
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox
            checked={checked}
            onCheckedChange={(c) => setChecked(c)}
          />
          <span className="text-sm text-patch-text">
            {checked ? "Checked" : "Unchecked"}
          </span>
        </label>
      </div>

      {/* Default Checked */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Default Checked
        </p>
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox defaultChecked />
          <span className="text-sm text-patch-text">Starts checked</span>
        </label>
      </div>

      {/* Indeterminate */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Indeterminate
        </p>
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox
            checked={indeterminate ? false : true}
            indeterminate={indeterminate}
            onCheckedChange={() => setIndeterminate(false)}
          />
          <span className="text-sm text-patch-text">
            {indeterminate ? "Mixed selection" : "Resolved"}
          </span>
        </label>
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Disabled
        </p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3">
            <Checkbox disabled />
            <span className="text-sm text-patch-text">Disabled unchecked</span>
          </label>
          <label className="flex items-center gap-3">
            <Checkbox disabled defaultChecked />
            <span className="text-sm text-patch-text">Disabled checked</span>
          </label>
        </div>
      </div>
    </div>
  );
}
