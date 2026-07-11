"use client";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  Input,
  SectionLabel,
} from "@patchui/react";


export function FieldDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Basic Field</SectionLabel>
        <Field className="max-w-sm">
          <FieldLabel>Username</FieldLabel>
          <FieldDescription>Choose a unique username for your account.</FieldDescription>
          <Input placeholder="e.g. jane_doe" />
        </Field>
      </div>

      <div className="space-y-3">
        <SectionLabel>Required label</SectionLabel>
        <Field className="max-w-sm">
          <FieldLabel required>Email</FieldLabel>
          <FieldDescription>We&apos;ll use this to send notifications.</FieldDescription>
          <Input type="email" placeholder="you@example.com" required />
          <FieldError />
        </Field>
      </div>

      <div className="space-y-3">
        <SectionLabel>Optional label</SectionLabel>
        <Field className="max-w-sm">
          <FieldLabel optional>Phone</FieldLabel>
          <FieldDescription>Used for SMS notifications only.</FieldDescription>
          <Input type="tel" placeholder="+1 (555) 555-5555" />
        </Field>
      </div>

      <div className="space-y-3">
        <SectionLabel>Error state</SectionLabel>
        <Field invalid className="max-w-sm">
          <FieldLabel required>Password</FieldLabel>
          <FieldDescription>Must be at least 8 characters.</FieldDescription>
          <Input type="password" defaultValue="abc" />
          <FieldError match>Password must be at least 8 characters long.</FieldError>
        </Field>
      </div>

      <div className="space-y-3">
        <SectionLabel>Disabled</SectionLabel>
        <Field disabled className="max-w-sm">
          <FieldLabel>Organization</FieldLabel>
          <FieldDescription>This field cannot be changed.</FieldDescription>
          <Input defaultValue="Acme Corp" />
        </Field>
      </div>
    </div>
  );
}
