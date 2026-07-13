# Input

A single-line text control with three sizes and optional inline prefix and suffix content.

Compose Input with Field for labels, descriptions, validation, and error messaging. Use Textarea when the value can contain line breaks.

```tsx
"use client";

import { Field, FieldLabel, Input } from "@patchui/react";

export function InputDemo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>Email</FieldLabel>
      <Input id="email-preview" type="email" placeholder="ada@example.com" />
    </Field>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/input
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/input.json). The canonical implementation lives in [packages/react/src/components/input.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/input.tsx).

## Usage

```tsx
<Field>
  <FieldLabel>Email</FieldLabel>
  <Input id="email" type="email" />
</Field>
```

For search, compose Input with a search icon in `prefix` and an optional clear action in `suffix`.

## Examples

### Prefix and suffix

Use affixes for supplemental context that is not part of the editable value.

```tsx
"use client";

import { Field, FieldLabel, Input } from "@patchui/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export function InputAffixesDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Field>
        <FieldLabel>Project domain</FieldLabel>
        <Input prefix="https://" suffix=".com" placeholder="project" />
      </Field>
      <Field>
        <FieldLabel>Search projects</FieldLabel>
        <Input prefix={<MagnifyingGlass />} placeholder="Project name" />
      </Field>
    </div>
  );
}

```

### Sizes and states

Size controls density. Loading and disabled states preserve the field’s label and value context.

```tsx
"use client";

import { Field, FieldLabel, Input } from "@patchui/react";

export function InputStatesDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Field>
        <FieldLabel>Compact input</FieldLabel>
        <Input size="sm" defaultValue="Small" />
      </Field>
      <Field>
        <FieldLabel>Saving project</FieldLabel>
        <Input loading value="Saving" readOnly />
      </Field>
      <Field>
        <FieldLabel>Workspace ID</FieldLabel>
        <Input value="workspace_01" disabled readOnly />
      </Field>
    </div>
  );
}

```

## API reference

Input accepts native input attributes. These props add Patch UI behavior.

| Prop            | Type                    | Default   | Description                                                     |
| --------------- | ----------------------- | --------- | --------------------------------------------------------------- |
| size            | "sm" \| "md" \| "lg"    | "md"      | Uses the shared 24, 32, or 40 pixel control heights.            |
| variant         | "default" \| "unstyled" | "default" | Removes control chrome when another component owns the surface. |
| prefix / suffix | ReactNode / ReactNode   | -         | Adds muted inline content before or after the editable value.   |
| loading         | boolean                 | false     | Disables the input and replaces the suffix with a spinner.      |

## Accessibility

* Associate every Input with a visible label. A placeholder is not a label.
* Connect descriptions and errors through Field or `aria-describedby`.
* Use prefixes and suffixes for supplemental information, not required instructions.
