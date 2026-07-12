"use client";

import { Field, FieldLabel, Textarea } from "@patchui/react";

export function TextareaStatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field>
        <FieldLabel>Short summary</FieldLabel>
        <Textarea size="sm" rows={2} placeholder="Summarize the release" />
      </Field>
      <Field>
        <FieldLabel>Published notes</FieldLabel>
        <Textarea defaultValue="Improved keyboard navigation and focus behavior." readOnly />
      </Field>
      <Field>
        <FieldLabel>Archived notes</FieldLabel>
        <Textarea value="Editing is unavailable." disabled readOnly />
      </Field>
    </div>
  );
}
