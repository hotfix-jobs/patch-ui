"use client";

import { Field, FieldLabel, Input } from "@patchui/react";

export function InputStatesDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Field>
        <FieldLabel>Compact input</FieldLabel>
        <Input size="sm" defaultValue="Small" />
      </Field>
      <Field>
        <FieldLabel>Saving project</FieldLabel>
        <Input loading value="Saving" readOnly />
      </Field>
      <Field>
        <FieldLabel>Workspace ID</FieldLabel>
        <Input value="workspace_01" disabled readOnly />
      </Field>
    </div>
  );
}
