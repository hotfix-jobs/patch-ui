# Toggle Group

A compact single-selection control for switching between closely related options.

Use Toggle Group for two or three mutually exclusive choices such as grid or list view, sort direction, or content density. Use Tabs when each choice reveals a distinct panel.

```tsx
"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@patchui/react";
import { Rows, SquaresFour } from "@phosphor-icons/react/dist/ssr";

export function ToggleGroupDemo() {
  const [view, setView] = useState("grid");

  return (
    <ToggleGroup value={view} onValueChange={setView} aria-label="Project view">
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <SquaresFour />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <Rows />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/toggle-group
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/toggle-group.json). The canonical implementation lives in [packages/react/src/components/toggle-group.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/toggle-group.tsx).

## Usage

```tsx
<ToggleGroup value={view} onValueChange={setView} aria-label="Project view">
  <ToggleGroupItem value="grid" aria-label="Grid view">
    <SquaresFour />
  </ToggleGroupItem>
  <ToggleGroupItem value="list" aria-label="List view">
    <Rows />
  </ToggleGroupItem>
</ToggleGroup>
```

The group accepts a single string value. Each item needs a unique value, and the group needs an accessible name that describes what the selection controls.

## Composition

```text
ToggleGroup
└── ToggleGroupItem
```

## Examples

### Text labels

Prefer visible text when the choices cannot be represented by familiar icons.

```tsx
"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@patchui/react";

export function ToggleGroupLabelsDemo() {
  const [sort, setSort] = useState("newest");

  return (
    <ToggleGroup value={sort} onValueChange={setSort} aria-label="Sort projects">
      <ToggleGroupItem value="newest">Newest</ToggleGroupItem>
      <ToggleGroupItem value="oldest">Oldest</ToggleGroupItem>
    </ToggleGroup>
  );
}

```

### Sizes

Match the group to the height and density of adjacent controls.

```tsx
"use client";

import { ToggleGroup, ToggleGroupItem } from "@patchui/react";
import { Rows, SquaresFour } from "@phosphor-icons/react/dist/ssr";

function ViewGroup({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <ToggleGroup defaultValue="grid" size={size} aria-label={`${size} project view`}>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <SquaresFour />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <Rows />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ToggleGroupSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ViewGroup size="sm" />
      <ViewGroup size="md" />
      <ViewGroup size="lg" />
    </div>
  );
}

```

## API reference

| Prop                  | Type                             | Default | Description                                            |
| --------------------- | -------------------------------- | ------- | ------------------------------------------------------ |
| value / onValueChange | string / (value: string) => void | -       | Controls the selected item.                            |
| defaultValue          | string                           | -       | Sets the initial uncontrolled selection.               |
| size                  | "sm" \| "md" \| "lg"             | "md"    | Matches the shared 24, 32, or 40 pixel control height. |
| ToggleGroupItem.value | string                           | -       | Identifies an item within the group.                   |

Toggle Group intentionally supports one selected value. Use Checkbox controls when people may select several independent options.

## Keyboard behavior

* Tab moves focus into the group.
* Arrow keys move between enabled items.
* Home and End move to the first and last enabled items.
* Space activates the focused item.

## Accessibility

* Give the group an `aria-label` or `aria-labelledby` that names the choice.
* Give every icon-only item its own `aria-label`.
* Keep the selected option visually distinguishable without relying on icon color alone.
* Avoid using more than a few choices in this compact control.
