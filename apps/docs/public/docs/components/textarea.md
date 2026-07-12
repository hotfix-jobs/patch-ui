# Textarea

A multi-line text control that grows with its content and supports three density presets.

Use Textarea for values that can contain line breaks. Use Input for single-line values.

```tsx
"use client";

import { Field, FieldLabel, Textarea } from "@patchui/react";

export function TextareaDemo() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Release notes</FieldLabel>
      <Textarea id="release-notes-preview" placeholder="Describe what changed" />
    </Field>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/textarea
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/textarea.json). The canonical implementation lives in [packages/react/src/components/textarea.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/textarea.tsx).

## Usage

```tsx
<Field>
  <FieldLabel>Release notes</FieldLabel>
  <Textarea id="release-notes" />
</Field>
```

Textarea grows through CSS `field-sizing: content`. The `rows` attribute establishes a minimum height.

## Examples

### Size, rows, and states

Use `rows` to establish minimum space. Read-only content remains selectable, while disabled content is unavailable.

```tsx
"use client";

import { Field, FieldLabel, Textarea } from "@patchui/react";

export function TextareaStatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field>
        <FieldLabel>Short summary</FieldLabel>
        <Textarea size="sm" rows={2} placeholder="Summarize the release" />
      </Field>
      <Field>
        <FieldLabel>Published notes</FieldLabel>
        <Textarea defaultValue="Improved keyboard navigation and focus behavior." readOnly />
      </Field>
      <Field>
        <FieldLabel>Archived notes</FieldLabel>
        <Textarea value="Editing is unavailable." disabled readOnly />
      </Field>
    </div>
  );
}

```

## API reference

Textarea accepts native textarea attributes. These props select Patch UI presentation.

| Prop    | Type                    | Default   | Description                                                           |
| ------- | ----------------------- | --------- | --------------------------------------------------------------------- |
| size    | "sm" \| "md" \| "lg"    | "md"      | Sets text size and padding.                                           |
| variant | "default" \| "unstyled" | "default" | Removes control chrome when another component owns the surface.       |
| rows    | number                  | -         | Sets the minimum visible row count while preserving automatic growth. |

## Accessibility

* Associate every Textarea with a visible label.
* Connect helper text and errors with Field or `aria-describedby`.
* Read-only values remain selectable and copyable; disabled values do not.
