"use client";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  Input,
} from "@patchui/react";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function FieldDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <Label>Basic Field</Label>
        <Field className="max-w-sm">
          <FieldLabel>Username</FieldLabel>
          <FieldDescription>Choose a unique username for your account.</FieldDescription>
          <Input placeholder="e.g. jane_doe" />
        </Field>
      </div>

      <div>
        <Label>Required label</Label>
        <Field className="max-w-sm">
          <FieldLabel required>Email</FieldLabel>
          <FieldDescription>We&apos;ll use this to send notifications.</FieldDescription>
          <Input type="email" placeholder="you@example.com" required />
          <FieldError />
        </Field>
      </div>

      <div>
        <Label>Optional label</Label>
        <Field className="max-w-sm">
          <FieldLabel optional>Phone</FieldLabel>
          <FieldDescription>Used for SMS notifications only.</FieldDescription>
          <Input type="tel" placeholder="+1 (555) 555-5555" />
        </Field>
      </div>

      <div>
        <Label>Error state</Label>
        <Field invalid className="max-w-sm">
          <FieldLabel required>Password</FieldLabel>
          <FieldDescription>Must be at least 8 characters.</FieldDescription>
          <Input type="password" defaultValue="abc" error />
          <FieldError>Password must be at least 8 characters long.</FieldError>
        </Field>
      </div>

      <div>
        <Label>Disabled</Label>
        <Field disabled className="max-w-sm">
          <FieldLabel>Organization</FieldLabel>
          <FieldDescription>This field cannot be changed.</FieldDescription>
          <Input defaultValue="Acme Corp" />
        </Field>
      </div>
    </div>
  );
}
