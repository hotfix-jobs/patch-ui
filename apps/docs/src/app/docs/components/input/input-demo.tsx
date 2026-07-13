"use client";

import { Field, FieldLabel, Input } from "@patchui/react";

export function InputDemo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>Email</FieldLabel>
      <Input id="email-preview" type="email" placeholder="ada@example.com" />
    </Field>
  );
}
