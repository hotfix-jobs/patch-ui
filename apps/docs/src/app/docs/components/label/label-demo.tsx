"use client";

import { Input, Label } from "@patchui/react";

export function LabelDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label htmlFor="label-email-preview">Email</Label>
      <Input
        id="label-email-preview"
        type="email"
        placeholder="ada@example.com"
      />
    </div>
  );
}
