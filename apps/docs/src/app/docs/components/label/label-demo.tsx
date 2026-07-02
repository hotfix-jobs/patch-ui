"use client";

import { Input, Label } from "@patchui/react";

export function LabelDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Standalone</p>
        <Label>Email address</Label>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">With input</p>
        <div className="flex flex-col gap-1.5 max-w-xs">
          <Label htmlFor="demo-email">Email</Label>
          <Input id="demo-email" type="email" placeholder="you@example.com" />
        </div>
      </div>
    </div>
  );
}
