"use client";

import {
  Form,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldValidity,
  Input,
  Button,
} from "@patchui/react";
import { useState } from "react";

/** Showcases Form with Field-based validation and submission. */
export function FormDemo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Basic Form */}
      <div>
        <p className="mb-3 text-xs font-medium text-ink-muted">
          Contact Form
        </p>
        <Form
          className="max-w-sm"
          onFormSubmit={() => {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
          }}
        >
          <Field name="name">
            <FieldLabel>Name</FieldLabel>
            <Input placeholder="Ada Lovelace" required />
            <FieldError />
          </Field>

          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <FieldDescription>We&apos;ll never share your email.</FieldDescription>
            <Input type="email" placeholder="jane@example.com" required />
            <FieldError />
          </Field>

          <Field name="message">
            <FieldLabel>Message</FieldLabel>
            <Input placeholder="Your message..." />
          </Field>

          <Button type="submit" className="mt-2 self-start">
            {submitted ? "Submitted ✓" : "Submit"}
          </Button>
        </Form>
      </div>

      {/* Form with Custom Validation */}
      <div>
        <p className="mb-3 text-xs font-medium text-ink-muted">
          With Custom Validation
        </p>
        <Form className="max-w-sm">
          <Field
            name="username"
            validate={(value) => {
              const v = String(value ?? "");
              if (v.length > 0 && v.length < 3) {
                return "Username must be at least 3 characters.";
              }
              return null;
            }}
            validationMode="onChange"
            validationDebounceTime={300}
          >
            <FieldLabel>Username</FieldLabel>
            <FieldDescription>At least 3 characters required.</FieldDescription>
            <Input placeholder="e.g. janedoe" required />
            <FieldError />
          </Field>

          <Field name="password">
            <FieldLabel>Password</FieldLabel>
            <Input type="password" placeholder="••••••••" required />
            <FieldValidity>
              {(state) =>
                state.validity.valueMissing ? (
                  <p className="text-xs text-ink-muted">
                    Password is required.
                  </p>
                ) : null
              }
            </FieldValidity>
            <FieldError />
          </Field>

          <Button type="submit" className="mt-2 self-start">
            Create Account
          </Button>
        </Form>
      </div>
    </div>
  );
}
