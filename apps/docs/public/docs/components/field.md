# Field

A semantic wrapper that coordinates a form control with its label, description, validation, and error message.

Use Field whenever a control needs supporting text or validation. The control owns its editable UI; Field owns the surrounding form relationship.

```tsx
"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
  Input,
} from "@patchui/react";

export function FieldDemo() {
  return (
    <Field name="username" className="w-full max-w-sm">
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="ada_lovelace" />
      <FieldDescription>Choose a unique username.</FieldDescription>
    </Field>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/field
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/field.json). The canonical implementation lives in [packages/react/src/components/field.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/field.tsx).

## Usage

```tsx
<Field name="username">
  <FieldLabel>Username</FieldLabel>
  <Input placeholder="ada_lovelace" />
  <FieldDescription>Choose a unique username.</FieldDescription>
</Field>
```

FieldLabel and FieldDescription coordinate accessible labeling and description through the underlying Base UI Field primitive.

## Composition

```text
Field
├── FieldLabel
├── control, such as Input or FieldControl
├── FieldDescription
├── FieldError
└── FieldValidity (optional)
```

Use FieldItem when a Field groups multiple checkbox or radio rows.

## Examples

### Invalid field

Set Field `invalid` when application state owns validation, and mirror that state on the control with `aria-invalid`.

```tsx
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

```

## API reference

| Prop                   | Type                                               | Default    | Description                                                   |
| ---------------------- | -------------------------------------------------- | ---------- | ------------------------------------------------------------- |
| name                   | string                                             | -          | Identifies the field in form values and validation.           |
| invalid                | boolean                                            | false      | Marks externally controlled field state as invalid.           |
| disabled               | boolean                                            | false      | Disables the field and its registered control.                |
| validate               | (value, formValues) => string \| string\[] \| null | -          | Returns custom synchronous or asynchronous validation errors. |
| validationMode         | "onSubmit" \| "onBlur" \| "onChange"               | "onSubmit" | Overrides when the surrounding Form validates this field.     |
| validationDebounceTime | number                                             | 0          | Debounces on-change custom validation in milliseconds.        |

FieldLabel supports `required` and `optional` visual markers. The required marker does not enforce validation, so the underlying control still needs its native `required` attribute. FieldError displays the current validation message, or custom content supplied through `match` or children.

Use FieldControl for the unstyled Base UI control, and FieldValidity when custom UI needs the complete validity state. These escape hatches expose their underlying Base UI contracts directly.

## Accessibility

* Keep one visible FieldLabel for each control. A placeholder is not a label.
* FieldDescription and FieldError participate in the control’s accessible description through the Field primitive.
* Apply native constraints such as `required`, `type`, `minLength`, and `aria-invalid` to the control itself.
* Required and optional markers are visual annotations and are hidden from assistive technology.
* Keep validation messages specific and explain how to correct the value.
