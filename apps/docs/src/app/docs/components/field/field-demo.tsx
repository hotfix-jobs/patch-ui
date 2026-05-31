"use client";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldControl,
  Input,
} from "@patchui/react";

/** Showcases Field compound component with valid and error states. */
export function FieldDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      {/* Basic Field */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Basic Field
        </p>
        <Field className="max-w-sm">
          <FieldLabel>Username</FieldLabel>
          <FieldDescription>Choose a unique username for your account.</FieldDescription>
          <Input placeholder="e.g. jane_doe" />
        </Field>
      </div>

      {/* Required Field with FieldControl */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Required with FieldControl
        </p>
        <Field className="max-w-sm">
          <FieldLabel>Email</FieldLabel>
          <FieldDescription>We&apos;ll use this to send notifications.</FieldDescription>
          <FieldControl
            type="email"
            placeholder="you@example.com"
            required
            className="flex h-9 w-full rounded-md border border-patch-border bg-patch-bg px-3 py-1 text-sm text-patch-text shadow-sm transition-colors placeholder:text-patch-text-tertiary focus-visible:border-patch-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <FieldError />
        </Field>
      </div>

      {/* Invalid / Error State */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Error State
        </p>
        <Field invalid className="max-w-sm">
          <FieldLabel>Password</FieldLabel>
          <FieldDescription>Must be at least 8 characters.</FieldDescription>
          <Input type="password" defaultValue="abc" />
          <FieldError>Password must be at least 8 characters long.</FieldError>
        </Field>
      </div>

      {/* Disabled Field */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
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
