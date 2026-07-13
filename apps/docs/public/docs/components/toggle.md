# Toggle

A button with a persistent pressed state for actions such as starring, pinning, or formatting.

Use Toggle when activating an action changes whether that action remains applied. Use Button for a one-time action, Switch for a setting, and Toggle Group for a related set of choices.

```tsx
"use client";

import { useState } from "react";
import { Toggle } from "@patchui/react";
import { Star } from "@phosphor-icons/react/dist/ssr";

export function ToggleDemo() {
  const [starred, setStarred] = useState(false);

  return (
    <Toggle
      pressed={starred}
      onPressedChange={setStarred}
      aria-label="Star project"
    >
      <Star className={starred ? "fill-current" : ""} />
      Star
    </Toggle>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/toggle
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/toggle.json). The canonical implementation lives in [packages/react/src/components/toggle.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/toggle.tsx).

## Usage

```tsx
<Toggle
  pressed={starred}
  onPressedChange={setStarred}
  aria-label="Star project"
>
  <Star />
</Toggle>
```

Use `pressed` with `onPressedChange` for controlled state, or `defaultPressed` when the toggle can manage its own state.

## Examples

### Secondary variant

The secondary variant keeps a neutral fill at rest, making a compact group of formatting actions easier to locate.

```tsx
"use client";

import { Toggle } from "@patchui/react";
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react/dist/ssr";

export function ToggleSecondaryDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="secondary" defaultPressed aria-label="Bold">
        <TextB />
      </Toggle>
      <Toggle variant="secondary" aria-label="Italic">
        <TextItalic />
      </Toggle>
      <Toggle variant="secondary" aria-label="Underline">
        <TextUnderline />
      </Toggle>
    </div>
  );
}

```

### Sizes

Match Toggle to adjacent controls using the shared control size scale.

```tsx
"use client";

import { Toggle } from "@patchui/react";
import { PushPin } from "@phosphor-icons/react/dist/ssr";

export function ToggleSizesDemo() {
  return (
    <div className="flex items-center gap-3">
      <Toggle size="sm" aria-label="Pin, small">
        <PushPin />
      </Toggle>
      <Toggle size="md" aria-label="Pin, medium">
        <PushPin />
      </Toggle>
      <Toggle size="lg" aria-label="Pin, large">
        <PushPin />
      </Toggle>
    </div>
  );
}

```

## API reference

| Prop                      | Type                                 | Default    | Description                                                         |
| ------------------------- | ------------------------------------ | ---------- | ------------------------------------------------------------------- |
| pressed / onPressedChange | boolean / (pressed: boolean) => void | -          | Controls the persistent pressed state.                              |
| defaultPressed            | boolean                              | false      | Sets the initial uncontrolled pressed state.                        |
| variant                   | "tertiary" \| "secondary"            | "tertiary" | Uses a transparent interaction surface or a neutral filled surface. |
| size                      | "sm" \| "md" \| "lg"                 | "md"       | Matches the shared 24, 32, or 40 pixel control height.              |

Toggle has one rounded shape. Use Button for circular icon actions that do not retain state.

## Accessibility

* Toggle renders a button with `aria-pressed`, so its state is announced automatically.
* Give an icon-only Toggle an `aria-label` that names the action.
* Use a visible label when the icon may be unfamiliar or ambiguous.
* Do not use Toggle for a setting that is better understood as on or off. Use Switch instead.
