"use client";

import { useState } from "react";
import { Textarea } from "@patchui/react";

/** Showcases Textarea variants, error state, custom rows, and disabled. */
export function TextareaDemo() {
  const [invalidValue, setInvalidValue] = useState("too short");

  return (
    <div className="flex flex-col gap-8">
      {/* Variants */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Variants
        </p>
        <div className="flex flex-col gap-3 max-w-sm">
          <Textarea variant="outlined" placeholder="Outlined (default)" />
          <Textarea variant="ghost" placeholder="Ghost" />
          <Textarea variant="underline" placeholder="Underline" />
        </div>
      </div>

      {/* Custom Rows */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Custom Rows
        </p>
        <div className="max-w-sm">
          <Textarea placeholder="This textarea has 6 rows" rows={6} />
        </div>
      </div>

      {/* Invalid */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Invalid state
        </p>
        <div className="max-w-sm">
          <Textarea
            invalid
            value={invalidValue}
            onChange={(e) => setInvalidValue(e.target.value)}
          />
        </div>
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Disabled
        </p>
        <div className="max-w-sm">
          <Textarea placeholder="Disabled textarea" disabled />
        </div>
      </div>
    </div>
  );
}
