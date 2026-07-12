"use client";

import { Field, FieldLabel, Textarea } from "@patchui/react";

export function TextareaDemo() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Release notes</FieldLabel>
      <Textarea id="release-notes-preview" placeholder="Describe what changed" />
    </Field>
  );
}
