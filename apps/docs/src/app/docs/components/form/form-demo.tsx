"use client";

import { useState } from "react";
import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
  Input,
} from "@patchui/react";

export function FormDemo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Form
      className="w-full max-w-sm"
      onFormSubmit={() => setSubmitted(true)}
    >
      <Field name="email">
        <FieldLabel required>Email</FieldLabel>
        <Input type="email" placeholder="ada@example.com" required />
        <FieldDescription>We will send a confirmation message.</FieldDescription>
        <FieldError />
      </Field>
      <Button type="submit" className="self-start">
        Save Email
      </Button>
      {submitted && (
        <p role="status" className="text-mini text-ink-muted">
          Email saved.
        </p>
      )}
    </Form>
  );
}
