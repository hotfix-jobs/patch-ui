# Label

A styled native label for associating text with a form control in a custom layout.

Use Label when a control sits outside the Field composition. Use FieldLabel when the control also needs a description, validation, or an error message.

```tsx
"use client";

import { Input, Label } from "@patchui/react";

export function LabelDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label htmlFor="label-email-preview">Email</Label>
      <Input
        id="label-email-preview"
        type="email"
        placeholder="ada@example.com"
      />
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/label
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/label.json). The canonical implementation lives in [packages/react/src/components/label.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/label.tsx).

## Usage

```tsx
<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>
```

Match Label `htmlFor` to the control’s `id`. The component accepts native label attributes and supports `render` when another semantic element is intentionally required.

## Accessibility

* Every editable control needs a visible label. A placeholder is not a label.
* Keep `htmlFor` and `id` values unique within the page.
* Clicking a correctly associated Label moves focus to or activates its native labelable control.
* Do not render Label as a `span` when the text is responsible for naming a form control.
* Use the control component’s supported labeling pattern for button-based widgets such as Switch, Checkbox, and Radio.
