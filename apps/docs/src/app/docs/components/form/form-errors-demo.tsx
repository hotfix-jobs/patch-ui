"use client";

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Form,
  Input,
} from "@patchui/react";

export function FormErrorsDemo() {
  return (
    <Form
      className="w-full max-w-sm"
      errors={{ email: "That email address is already registered." }}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" defaultValue="ada@example.com" aria-invalid />
        <FieldError />
      </Field>
      <Button type="submit" className="self-start">
        Create Account
      </Button>
    </Form>
  );
}
