# Form

A native form wrapper that consolidates Field values, validation, and submission handling.

Use Form when multiple Field components should share validation timing, server errors, and a structured submit callback.

```tsx
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

```

## Installation

```bash
npx shadcn add @patchui/field
```

Form is installed with Field from the [field registry JSON](https://ui.hotfix.jobs/r/field.json). The canonical implementation lives in [packages/react/src/components/field.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/field.tsx).

## Usage

```tsx
<Form onFormSubmit={(values) => save(values)}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <Input type="email" required />
    <FieldError />
  </Field>
  <Button type="submit">Save</Button>
</Form>
```

`onFormSubmit` receives consolidated values keyed by each Field `name`. When supplied, it prevents the native submit event automatically.

## Composition

```text
Form
├── Field
│   ├── FieldLabel
│   ├── control
│   └── FieldError
└── submit Button
```

## Examples

### Server errors

Pass external validation errors by Field name. Matching FieldError components display those messages without duplicating server state inside each field.

```tsx
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

```

## API reference

| Prop           | Type                                 | Default    | Description                                                     |
| -------------- | ------------------------------------ | ---------- | --------------------------------------------------------------- |
| onFormSubmit   | (formValues, eventDetails) => void   | -          | Receives consolidated field values after successful validation. |
| validationMode | "onSubmit" \| "onBlur" \| "onChange" | "onSubmit" | Sets the default validation trigger for fields in the form.     |
| errors         | Record\<string, string \| string\[]> | -          | Maps external errors to matching Field names.                   |
| actionsRef     | RefObject\<Form.Actions \| null>     | -          | Exposes validate() for the complete form or one named field.    |

A Field-level `validationMode` overrides the Form default. In `onSubmit` mode, invalid fields revalidate on change after the first submission attempt.

## Accessibility

* Form renders a native `form` element and preserves browser submission and constraint-validation semantics.
* Give every Field a visible label and a stable `name` that matches submitted values and external errors.
* Keep FieldError adjacent to its control so validation messages participate in the Field relationship.
* Move focus to the first invalid field after a failed submission when application flow does not already do so.
* Announce asynchronous submission success or failure in an appropriate live region.
