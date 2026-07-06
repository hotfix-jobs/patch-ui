"use client";

import { Checkbox, Input, Label, Switch } from "@patchui/react";

export function LabelDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">With Input (standalone)</p>
        <div className="flex flex-col gap-1.5 max-w-xs">
          <Label htmlFor="demo-email">Email</Label>
          <Input id="demo-email" type="email" placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">With Switch / Checkbox (wrapping)</p>
        <div className="flex flex-col gap-3">
          <Label className="cursor-pointer">
            <Switch />
            <span>Receive weekly digest</span>
          </Label>
          <Label className="cursor-pointer">
            <Checkbox />
            <span>I agree to the terms</span>
          </Label>
        </div>
      </div>

      <div>
        <p className="mb-3 text-caption-12 text-ink-muted">Standalone</p>
        <Label>Email address</Label>
      </div>
    </div>
  );
}
