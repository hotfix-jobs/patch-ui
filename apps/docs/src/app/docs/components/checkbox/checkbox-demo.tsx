"use client";

import { Checkbox } from "@patchui/react";
import { useState } from "react";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label>Controlled with children label</Label>
        <Checkbox
          checked={checked}
          onCheckedChange={(c) => setChecked(c)}
        >
          {checked ? "Checked" : "Unchecked"}
        </Checkbox>
      </div>

      <div>
        <Label>Multi-select group</Label>
        <div className="flex flex-col gap-2">
          <Checkbox defaultChecked>Send weekly digest</Checkbox>
          <Checkbox>Notify on new comments</Checkbox>
          <Checkbox defaultChecked>Notify on mentions</Checkbox>
        </div>
      </div>

      <div>
        <Label>Acknowledgment</Label>
        <Checkbox>I agree to the Terms of Service.</Checkbox>
      </div>

      <div>
        <Label>Indeterminate</Label>
        <Checkbox
          checked={indeterminate ? false : true}
          indeterminate={indeterminate}
          onCheckedChange={() => setIndeterminate(false)}
        >
          {indeterminate ? "3 of 5 selected" : "All selected"}
        </Checkbox>
      </div>

      <div>
        <Label>Disabled</Label>
        <div className="flex flex-col gap-2">
          <Checkbox disabled>Disabled unchecked</Checkbox>
          <Checkbox disabled defaultChecked>Disabled checked</Checkbox>
          <Checkbox disabled indeterminate>Disabled indeterminate</Checkbox>
        </div>
      </div>

      <div>
        <Label>Bare (no label)</Label>
        <Checkbox aria-label="Select row" />
      </div>
    </div>
  );
}
