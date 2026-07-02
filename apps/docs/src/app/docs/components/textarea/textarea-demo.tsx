"use client";

import { useState } from "react";
import { Textarea } from "@patchui/react";

export function TextareaDemo() {
  const [invalidValue, setInvalidValue] = useState("too short");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-label-12 text-gray-800">Default</p>
        <div className="max-w-sm">
          <Textarea placeholder="Write something…" />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Custom rows</p>
        <div className="max-w-sm">
          <Textarea placeholder="This textarea has 6 rows" rows={6} />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Invalid</p>
        <div className="max-w-sm">
          <Textarea
            invalid
            value={invalidValue}
            onChange={(e) => setInvalidValue(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="mb-3 text-label-12 text-gray-800">Disabled</p>
        <div className="max-w-sm">
          <Textarea placeholder="Disabled textarea" disabled />
        </div>
      </div>
    </div>
  );
}
