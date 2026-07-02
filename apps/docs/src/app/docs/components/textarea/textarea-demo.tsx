"use client";

import { useState } from "react";
import { Textarea , SectionLabel } from "@patchui/react";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";


export function TextareaDemo() {
  const [errValue, setErrValue] = useState("too short");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Sizes</SectionLabel>
        <div className="flex flex-col gap-3 max-w-sm">
          <Textarea size="sm" defaultValue={LOREM} />
          <Textarea size="md" defaultValue={LOREM} />
          <Textarea size="lg" defaultValue={LOREM} />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Placeholder</SectionLabel>
        <div className="max-w-sm">
          <Textarea placeholder="Write something…" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Fixed rows</SectionLabel>
        <div className="max-w-sm">
          <Textarea placeholder="Textarea with fixed 5 rows" rows={5} />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Label + error message</SectionLabel>
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

      <div className="space-y-3">
        <SectionLabel>Read only</SectionLabel>
        <div className="max-w-sm">
          <Textarea defaultValue={LOREM} readOnly />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Disabled</SectionLabel>
        <div className="max-w-sm">
          <Textarea placeholder="Disabled textarea" disabled />
        </div>
      </div>
    </div>
  );
}
