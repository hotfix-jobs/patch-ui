# Popover

An anchored floating panel for arbitrary supporting content and compact interactions.

Use Popover for mini-forms, filters, or supporting details related to a trigger. Use Menu for a list of actions, Tooltip for brief non-interactive help, and Modal for blocking tasks.

```tsx
"use client";

import { useState } from "react";
import {
  Button,
  Field,
  FieldLabel,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@patchui/react";

export function PopoverDemo() {
  const [width, setWidth] = useState("480");

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" />}>
        Edit Width
      </PopoverTrigger>
      <PopoverContent className="p-4 md:w-72">
        <p className="text-small font-medium text-ink">Dimensions</p>
        <p className="mt-1 text-small text-ink-muted">
          Set the project width in pixels.
        </p>
        <Field name="width" className="mt-4">
          <FieldLabel>Width</FieldLabel>
          <Input
            inputMode="numeric"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
            suffix="px"
          />
        </Field>
        <div className="mt-4 flex justify-end gap-2">
          <PopoverClose render={<Button variant="tertiary" size="sm" />}>
            Cancel
          </PopoverClose>
          <PopoverClose render={<Button size="sm" />}>
            Save
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/popover
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/popover.json). The canonical implementation lives in [packages/react/src/components/popover.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/popover.tsx).

## Usage

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="secondary" />}>
    Edit Width
  </PopoverTrigger>
  <PopoverContent className="p-4 md:w-72">
    <p className="text-small font-medium text-ink">Dimensions</p>
    <PopoverClose render={<Button size="sm" />}>Done</PopoverClose>
  </PopoverContent>
</Popover>
```

Popover can be controlled with `open` and `onOpenChange` or initialized with `defaultOpen`. Set `modal` when the surrounding page should become inert while the panel is open.

## Composition

```text
Popover
├── PopoverTrigger
└── PopoverContent
    └── PopoverClose (optional)
```

PopoverContent owns the floating surface but no internal padding. Apply spacing appropriate to the content.

## Examples

### Placement and arrow

Adjust desktop placement relative to the trigger and add an arrow only when the visual connection needs reinforcement.

```tsx
"use client";

import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@patchui/react";

export function PopoverPlacementDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" />}>
        View Details
      </PopoverTrigger>
      <PopoverContent side="right" align="start" arrow className="p-4 md:w-64">
        <p className="text-small font-medium text-ink">Project access</p>
        <p className="mt-1 text-small text-ink-muted">
          Workspace members can view this project.
        </p>
        <PopoverClose render={<Button size="sm" className="mt-4" />}>
          Done
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

```

## API reference

| Prop       | Type                                   | Default  | Description                                                  |
| ---------- | -------------------------------------- | -------- | ------------------------------------------------------------ |
| side       | "top" \| "bottom" \| "left" \| "right" | "bottom" | Selects the preferred desktop side of the trigger.           |
| align      | "start" \| "center" \| "end"           | "center" | Aligns the desktop popup along the trigger axis.             |
| sideOffset | number                                 | 6        | Sets the desktop distance from the trigger in pixels.        |
| anchor     | Element \| RefObject\<Element>         | trigger  | Positions against another element instead of PopoverTrigger. |
| arrow      | boolean                                | false    | Adds a desktop arrow pointing toward the anchor.             |

The root exposes the underlying Base UI Popover state and interaction props. PopoverTrigger and PopoverClose use `render` to compose Patch UI Button or another semantic control.

## Accessibility

* PopoverTrigger exposes the open relationship through Base UI and remains the control used to toggle the panel.
* Escape closes the panel. PopoverClose provides an explicit in-panel dismissal action when the task needs one.
* Keep interactive content keyboard reachable in a logical order and give every form control a visible label.
* Use `modal` only when interaction outside the popover must be blocked.
* Do not use Popover for critical confirmation that requires an explicit decision.

## Mobile behavior

Below the `md` breakpoint, PopoverContent becomes a centered panel with narrow viewport gutters, a backdrop, and locked body scrolling. Desktop `side`, `align`, `sideOffset`, `anchor`, and arrow presentation do not control the centered mobile layout.
