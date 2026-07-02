"use client";

import { Label } from "@patchui/react";

/** Showcases Label usage with and without form inputs. */
export function LabelDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Basic */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Basic Label
        </p>
        <Label>Email address</Label>
      </div>

      {/* With Input */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          With Input
        </p>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="demo-email">Email</Label>
          <input
            id="demo-email"
            type="email"
            placeholder="you@example.com"
            className="h-9 rounded-md border border-[var(--gray-alpha-400)] bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--gray-alpha-600)]"
          />
        </div>
      </div>
    </div>
  );
}
