"use client";

import { useState } from "react";
import { Field, FieldError, FieldLabel, SectionLabel, Textarea } from "@patchui/react";

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
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea id="demo-desc" placeholder="Describe this project" />
          </Field>
          <Field invalid>
            <FieldLabel>Release Notes</FieldLabel>
            <Textarea
              id="demo-err"
              aria-invalid
              value={errValue}
              onChange={(e) => setErrValue(e.target.value)}
            />
            <FieldError match>Release notes are required.</FieldError>
          </Field>
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
