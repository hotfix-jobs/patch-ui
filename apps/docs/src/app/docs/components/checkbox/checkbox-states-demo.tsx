"use client";

import { Checkbox } from "@patchui/react";

export function CheckboxStatesDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox indeterminate>Partially selected</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
    </div>
  );
}
