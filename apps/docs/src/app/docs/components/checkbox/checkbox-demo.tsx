"use client";

import { Checkbox } from "@patchui/react";

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox defaultChecked>Send weekly digest</Checkbox>
      <Checkbox>Notify on new comments</Checkbox>
      <Checkbox defaultChecked>Notify on mentions</Checkbox>
    </div>
  );
}
