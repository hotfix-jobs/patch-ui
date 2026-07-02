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
        <p className="mb-3 text-xs font-medium text-gray-800">
          Controlled
        </p>
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox
            checked={checked}
            onCheckedChange={(c) => setChecked(c)}
          />
          <span className="text-sm text-gray-1000">
            {checked ? "Checked" : "Unchecked"}
          </span>
        </label>
      </div>

      {/* Default Checked */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Default Checked
        </p>
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox defaultChecked />
          <span className="text-sm text-gray-1000">Starts checked</span>
        </label>
      </div>

      {/* Indeterminate */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Indeterminate
        </p>
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox
            checked={indeterminate ? false : true}
            indeterminate={indeterminate}
            onCheckedChange={() => setIndeterminate(false)}
          />
          <span className="text-sm text-gray-1000">
            {indeterminate ? "Mixed selection" : "Resolved"}
          </span>
        </label>
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Disabled
        </p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3">
            <Checkbox disabled />
            <span className="text-sm text-gray-1000">Disabled unchecked</span>
          </label>
          <label className="flex items-center gap-3">
            <Checkbox disabled defaultChecked />
            <span className="text-sm text-gray-1000">Disabled checked</span>
          </label>
        </div>
      </div>
    </div>
  );
}
