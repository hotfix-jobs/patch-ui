"use client";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  Input,
} from "@patchui/react";

/** Showcases Field compound: required, optional, error, disabled. */
export function FieldDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      {/* Basic Field */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Basic Field
        </p>
        <Field className="max-w-sm">
          <FieldLabel>Username</FieldLabel>
          <FieldDescription>Choose a unique username for your account.</FieldDescription>
          <Input placeholder="e.g. jane_doe" />
        </Field>
      </div>

      {/* Required */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Required label
        </p>
        <Field className="max-w-sm">
          <FieldLabel required>Email</FieldLabel>
          <FieldDescription>We&apos;ll use this to send notifications.</FieldDescription>
          <Input type="email" placeholder="you@example.com" required />
          <FieldError />
        </Field>
      </div>

      {/* Optional */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Optional label
        </p>
        <Field className="max-w-sm">
          <FieldLabel optional>Phone</FieldLabel>
          <FieldDescription>Used for SMS notifications only.</FieldDescription>
          <Input type="tel" placeholder="+1 (555) 555-5555" />
        </Field>
      </div>

      {/* Invalid / Error State */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Error State
        </p>
        <Field invalid className="max-w-sm">
          <FieldLabel required>Password</FieldLabel>
          <FieldDescription>Must be at least 8 characters.</FieldDescription>
          <Input type="password" defaultValue="abc" invalid />
          <FieldError>Password must be at least 8 characters long.</FieldError>
        </Field>
      </div>

      {/* Disabled Field */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Disabled
        </p>
        <Field disabled className="max-w-sm">
          <FieldLabel>Organization</FieldLabel>
          <FieldDescription>This field cannot be changed.</FieldDescription>
          <Input defaultValue="Acme Corp" />
        </Field>
      </div>
    </div>
  );
}
