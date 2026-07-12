"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from "@patchui/react";

export function FieldErrorDemo() {
  return (
    <Field name="email" invalid className="w-full max-w-sm">
      <FieldLabel required>Email</FieldLabel>
      <Input type="email" defaultValue="ada@" aria-invalid required />
      <FieldDescription>Enter the address used for notifications.</FieldDescription>
      <FieldError match>Enter a complete email address.</FieldError>
    </Field>
  );
}
