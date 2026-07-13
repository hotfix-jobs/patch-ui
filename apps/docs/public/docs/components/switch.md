# Switch

A binary setting control for changes that take effect immediately.

Use Switch for immediate on or off settings. Use Checkbox when values are collected and submitted together.

```tsx
"use client";

import { Switch } from "@patchui/react";
import { useState } from "react";

export function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Switch
        aria-label="Enable notifications"
        checked={checked}
        onCheckedChange={(value) => setChecked(value)}
      />
      <span className="text-small text-ink">Notifications {checked ? "on" : "off"}</span>
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/switch
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/switch.json). The canonical implementation lives in [packages/react/src/components/switch.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/switch.tsx).

## Usage

```tsx
<Switch aria-label="Enable notifications" />
```

The on state uses the monochrome ink token. Use Toggle for toolbar controls represented through `aria-pressed`.

## Examples

### Size, icons, and disabled state

Keep the setting label stable while switch semantics communicate whether it is on or off.

```tsx
"use client";

import { Switch } from "@patchui/react";
import { Check, X } from "@phosphor-icons/react/dist/ssr";

export function SwitchStatesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch aria-label="Enable compact mode" size="sm" defaultChecked />
        <span className="text-small text-ink">Compact mode</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          aria-label="Enable availability"
          defaultChecked
          icon={{ checked: <Check />, unchecked: <X /> }}
        />
        <span className="text-small text-ink">Availability</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch aria-label="Enable archived setting" disabled />
        <span className="text-small text-ink-muted">Archived setting</span>
      </div>
    </div>
  );
}

```

## API reference

Switch accepts the underlying Base UI switch props. These fields add Patch UI behavior.

| Prop                      | Type                                           | Default | Description                                 |
| ------------------------- | ---------------------------------------------- | ------- | ------------------------------------------- |
| checked / onCheckedChange | boolean / (checked: boolean, details) => void  | -       | Controls the active state.                  |
| defaultChecked            | boolean                                        | false   | Sets the initial uncontrolled state.        |
| size                      | "sm" \| "md" \| "lg"                           | "md"    | Selects a track and thumb size preset.      |
| icon                      | { checked?: ReactNode; unchecked?: ReactNode } | -       | Adds state-specific icons inside the thumb. |

## Accessibility

* Give every Switch a visible label or `aria-label` describing the setting.
* The label should describe the setting, while switch semantics announce its current state.
* Do not use Switch for destructive actions that require confirmation.
