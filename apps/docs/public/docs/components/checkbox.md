# Checkbox

A checked, unchecked, or indeterminate control for selection and acknowledgment.

Use Checkbox when people can select zero or more options or affirm a statement. Use Switch for a setting that takes effect immediately.

```tsx
"use client";

import { Checkbox } from "@patchui/react";

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox defaultChecked>Send weekly digest</Checkbox>
      <Checkbox>Notify on new comments</Checkbox>
      <Checkbox defaultChecked>Notify on mentions</Checkbox>
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/checkbox
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/checkbox.json). The canonical implementation lives in [packages/react/src/components/checkbox.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/checkbox.tsx).

## Usage

```tsx
<Checkbox>Send weekly digest</Checkbox>
```

Passing children creates a clickable label. Bare checkboxes require an accessible name.

## Examples

### Selection states

Indeterminate communicates partial collection selection. Application state still determines what happens on the next change.

```tsx
"use client";

import { Checkbox } from "@patchui/react";

export function CheckboxStatesDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox indeterminate>Partially selected</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
    </div>
  );
}

```

## API reference

Checkbox accepts the underlying Base UI checkbox props. These fields coordinate Patch UI behavior.

| Prop                      | Type                                          | Default | Description                                                               |
| ------------------------- | --------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| children                  | ReactNode                                     | -       | Adds a visible label and expands the click target.                        |
| checked / onCheckedChange | boolean / (checked: boolean, details) => void | -       | Controls checked state.                                                   |
| defaultChecked            | boolean                                       | false   | Sets the initial uncontrolled state.                                      |
| indeterminate             | boolean                                       | false   | Displays partial selection while application state remains authoritative. |
| wrapperClassName          | string                                        | -       | Styles the generated label wrapper when children are present.             |

## Accessibility

* Give every bare Checkbox a specific `aria-label`, such as `Select Ada Lovelace`.
* Group related checkboxes with `fieldset` and `legend`.
* Clear indeterminate state when the controlled collection becomes fully selected or unselected.
