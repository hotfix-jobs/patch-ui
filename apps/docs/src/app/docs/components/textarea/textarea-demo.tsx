"use client";

import { useState } from "react";
import { Textarea } from "@patchui/react";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function TextareaDemo() {
  const [errValue, setErrValue] = useState("too short");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label>Sizes</Label>
        <div className="flex flex-col gap-3 max-w-sm">
          <Textarea size="sm" defaultValue={LOREM} />
          <Textarea size="md" defaultValue={LOREM} />
          <Textarea size="lg" defaultValue={LOREM} />
        </div>
      </div>

      <div>
        <Label>Placeholder</Label>
        <div className="max-w-sm">
          <Textarea placeholder="Write something…" />
        </div>
      </div>

      <div>
        <Label>Fixed rows</Label>
        <div className="max-w-sm">
          <Textarea placeholder="Textarea with fixed 5 rows" rows={5} />
        </div>
      </div>

      <div>
        <Label>Label + error message</Label>
        <div className="flex flex-col gap-3 max-w-sm">
          <Textarea
            id="demo-desc"
            label="Description"
            placeholder="Describe this project"
          />
          <Textarea
            id="demo-err"
            label="Release Notes"
            error="Release notes are required."
            value={errValue}
            onChange={(e) => setErrValue(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>Read only</Label>
        <div className="max-w-sm">
          <Textarea defaultValue={LOREM} readOnly />
        </div>
      </div>

      <div>
        <Label>Disabled</Label>
        <div className="max-w-sm">
          <Textarea placeholder="Disabled textarea" disabled />
        </div>
      </div>
    </div>
  );
}
