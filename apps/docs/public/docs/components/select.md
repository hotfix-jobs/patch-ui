# Select

A single-value picker with a styled trigger, rich options, grouping, and responsive popup behavior.

Use Select for a moderate list of known choices where only one value may be selected. Use Combobox when people need search or fuzzy matching.

```tsx
"use client";

import { useState } from "react";
import {
  Field,
  FieldLabel,
  Select,
  SelectItem,
} from "@patchui/react";

export function SelectDemo() {
  const [framework, setFramework] = useState("react");

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="select-framework-preview">Framework</FieldLabel>
      <Select
        id="select-framework-preview"
        value={framework}
        onValueChange={setFramework}
      >
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
        <SelectItem value="solid">Solid</SelectItem>
      </Select>
    </Field>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/select
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/select.json). The canonical implementation lives in [packages/react/src/components/select.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/select.tsx).

## Usage

```tsx
<Field>
  <FieldLabel htmlFor="framework">Framework</FieldLabel>
  <Select id="framework" defaultValue="react">
    <SelectItem value="react">React</SelectItem>
    <SelectItem value="vue">Vue</SelectItem>
    <SelectItem value="svelte">Svelte</SelectItem>
  </Select>
</Field>
```

Match FieldLabel `htmlFor` to Select `id`. Every SelectItem needs a unique string value.

## Composition

```text
Select
├── SelectItem
├── SelectGroup
│   ├── SelectGroupLabel
│   └── SelectItem
└── SelectSeparator (optional)
```

The trigger, selected-value display, popup, and responsive positioning are rendered internally.

## Examples

### Grouped options

Group longer lists when categories make options easier to scan. Group labels provide structure but are not selectable.

```tsx
"use client";

import {
  Field,
  FieldLabel,
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
} from "@patchui/react";

export function SelectGroupsDemo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="select-region-preview">Data region</FieldLabel>
      <Select id="select-region-preview" defaultValue="us-central">
        <SelectGroup>
          <SelectGroupLabel>United States</SelectGroupLabel>
          <SelectItem value="us-east">East</SelectItem>
          <SelectItem value="us-central">Central</SelectItem>
          <SelectItem value="us-west">West</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectGroupLabel>Europe</SelectGroupLabel>
          <SelectItem value="eu-west">West</SelectItem>
          <SelectItem value="eu-central">Central</SelectItem>
        </SelectGroup>
      </Select>
    </Field>
  );
}

```

## API reference

| Prop                  | Type                             | Default   | Description                                                     |
| --------------------- | -------------------------------- | --------- | --------------------------------------------------------------- |
| value / onValueChange | string / (value: string) => void | -         | Controls the selected value.                                    |
| defaultValue          | string                           | -         | Sets the initial uncontrolled selection.                        |
| size                  | "sm" \| "md" \| "lg"             | "md"      | Uses the shared 24, 32, or 40 pixel control heights.            |
| variant               | "default" \| "unstyled"          | "default" | Removes trigger chrome when another component owns the surface. |
| placeholder           | string                           | -         | Displays when no value is selected.                             |
| prefix / suffix       | ReactNode / ReactNode            | -         | Adds supporting content around the selected value.              |
| renderValue           | (value: string) => ReactNode     | -         | Maps stored values to a custom trigger display.                 |

Select also supports native `name`, `required`, and `disabled` form behavior. Set `invalid` and connect FieldError when application validation fails.

## Keyboard behavior

* Enter, Space, Arrow Down, or Arrow Up opens the picker from its trigger.
* Arrow keys move through enabled options. Typing moves to a matching option.
* Enter selects the highlighted option. Escape closes without changing selection.
* The selected option is indicated separately from temporary keyboard or pointer highlight.

## Mobile behavior

On desktop, the popup aligns to the trigger and matches its minimum width. Below the `md` breakpoint, it becomes a centered panel with a backdrop, comfortable option rows, narrow viewport gutters, and locked body scrolling.
