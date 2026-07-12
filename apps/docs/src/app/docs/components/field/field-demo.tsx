"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
  Input,
} from "@patchui/react";

export function FieldDemo() {
  return (
    <Field name="username" className="w-full max-w-sm">
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="ada_lovelace" />
      <FieldDescription>Choose a unique username.</FieldDescription>
    </Field>
  );
}
