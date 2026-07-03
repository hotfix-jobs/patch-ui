"use client";

import { Checkbox , SectionLabel } from "@patchui/react";
import { useState } from "react";


export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Controlled with children label</SectionLabel>
        <Checkbox
          checked={checked}
          onCheckedChange={(c) => setChecked(c)}
        >
          {checked ? "Checked" : "Unchecked"}
        </Checkbox>
      </div>

      <div className="space-y-3">
        <SectionLabel>Multi-select group</SectionLabel>
        <div className="flex flex-col gap-2">
          <Checkbox defaultChecked>Send weekly digest</Checkbox>
          <Checkbox>Notify on new comments</Checkbox>
          <Checkbox defaultChecked>Notify on mentions</Checkbox>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Acknowledgment</SectionLabel>
        <Checkbox>I agree to the Terms of Service.</Checkbox>
      </div>

      <div className="space-y-3">
        <SectionLabel>Indeterminate</SectionLabel>
        <Checkbox
          checked={indeterminate ? false : true}
          indeterminate={indeterminate}
          onCheckedChange={() => setIndeterminate(false)}
        >
          {indeterminate ? "3 of 5 selected" : "All selected"}
        </Checkbox>
      </div>

      <div className="space-y-3">
        <SectionLabel>Disabled</SectionLabel>
        <div className="flex flex-col gap-2">
          <Checkbox disabled>Disabled unchecked</Checkbox>
          <Checkbox disabled defaultChecked>Disabled checked</Checkbox>
          <Checkbox disabled indeterminate>Disabled indeterminate</Checkbox>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Bare (no label)</SectionLabel>
        <Checkbox aria-label="Select row" />
      </div>
    </div>
  );
}
