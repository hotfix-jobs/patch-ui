# Radio

A grouped control for choosing exactly one option from a small visible set.

Use Radio when seeing every option helps comparison and only one may be selected. Use Select or Combobox for longer lists.

```tsx
"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@patchui/react";

export function RadioDemo() {
  const [plan, setPlan] = useState("standard");

  return (
    <div className="flex flex-col gap-3">
      <p id="radio-plan-label" className="text-small font-medium text-ink">
        Plan
      </p>
      <RadioGroup
        aria-labelledby="radio-plan-label"
        value={plan}
        onValueChange={(value) => setPlan(value as string)}
      >
        <Radio value="starter">Starter</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="pro">Professional</Radio>
      </RadioGroup>
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/radio
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/radio.json). The canonical implementation lives in [packages/react/src/components/radio.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/radio.tsx).

## Usage

```tsx
<RadioGroup aria-label="Billing cycle" defaultValue="monthly">
  <Radio value="monthly">Monthly</Radio>
  <Radio value="yearly">Yearly</Radio>
</RadioGroup>
```

Pass label text as Radio children to make the complete row selectable. Every value must be unique within its RadioGroup.

## Composition

```text
RadioGroup
└── Radio
```

## Examples

### Unavailable option

Disable an individual Radio when the option remains useful context but cannot currently be selected. Disable the group when no choices are available.

```tsx
"use client";

import { Radio, RadioGroup } from "@patchui/react";

export function RadioStatesDemo() {
  return (
    <div className="flex flex-col gap-3">
      <p id="radio-region-label" className="text-small font-medium text-ink">
        Data region
      </p>
      <RadioGroup aria-labelledby="radio-region-label" defaultValue="central">
        <Radio value="east">East</Radio>
        <Radio value="central">Central</Radio>
        <Radio value="west" disabled>
          West, unavailable
        </Radio>
      </RadioGroup>
    </div>
  );
}

```

## API reference

| Prop                             | Type                              | Default | Description                                             |
| -------------------------------- | --------------------------------- | ------- | ------------------------------------------------------- |
| RadioGroup.value / onValueChange | string / (value, details) => void | -       | Controls the selected value.                            |
| RadioGroup.defaultValue          | string                            | -       | Sets the initial uncontrolled selection.                |
| RadioGroup.name                  | string                            | -       | Names the submitted form value.                         |
| RadioGroup.required              | boolean                           | false   | Requires one option before form submission.             |
| RadioGroup.disabled              | boolean                           | false   | Disables every option in the group.                     |
| Radio.value                      | string                            | -       | Identifies the option within its group.                 |
| Radio.children                   | ReactNode                         | -       | Adds a visible label and expands the selectable target. |

Radio also accepts `disabled` for one unavailable option. Bare radios are supported for custom layouts but require a specific accessible name.

## Accessibility

* Give every RadioGroup an accessible name with visible labeling through `aria-labelledby` or a concise `aria-label`.
* Use Radio children for visible option labels. Do not rely on color or position alone.
* Tab enters or leaves the group. Arrow keys move selection between enabled options.
* Preselect the safest reasonable default. Omit a default when the decision must be deliberate.
* Keep the visible list small enough to compare without excessive keyboard movement.
