# Tooltip

A compact popup that provides a short explanation on hover or keyboard focus.

Use Tooltip to clarify an unfamiliar icon, abbreviation, or compact control. Keep essential instructions visible in the interface instead of hiding them in a tooltip.

```tsx
"use client";

import { Button, Tooltip, TooltipProvider } from "@patchui/react";

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip content="Creates a new project">
        <Button variant="secondary">New project</Button>
      </Tooltip>
    </TooltipProvider>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/tooltip
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/tooltip.json). The canonical implementation lives in [packages/react/src/components/tooltip.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/tooltip.tsx).

## Usage

```tsx
<TooltipProvider>
  <Tooltip content="Creates a new project">
    <Button variant="secondary">New project</Button>
  </Tooltip>
</TooltipProvider>
```

Wrap related tooltips in Tooltip Provider to establish consistent timing. Tooltip uses its child as the interactive trigger, so pass one focusable element.

## Composition

```text
TooltipProvider
└── Tooltip
    └── Trigger element
```

## Examples

### Placement

Tooltip defaults to the top and can be placed on any side of its trigger. The popup adjusts when the requested side lacks room.

```tsx
"use client";

import { Button, Tooltip, TooltipProvider } from "@patchui/react";

export function TooltipPlacementDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side} content={`Opens on the ${side}`} side={side}>
            <Button variant="secondary">{side}</Button>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

```

### Icon toolbar

Tooltips can reinforce accessible names for compact icon controls, but the buttons still need their own labels.

```tsx
"use client";

import { Button, Tooltip, TooltipProvider } from "@patchui/react";
import { FloppyDisk, Plus, Trash } from "@phosphor-icons/react/dist/ssr";

export function TooltipToolbarDemo() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2" aria-label="Project actions">
        <Tooltip content="Save changes">
          <Button variant="secondary" icon={<FloppyDisk />} aria-label="Save changes" />
        </Tooltip>
        <Tooltip content="Add item">
          <Button variant="secondary" icon={<Plus />} aria-label="Add item" />
        </Tooltip>
        <Tooltip content="Delete project">
          <Button variant="destructive" icon={<Trash />} aria-label="Delete project" />
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

```

## API reference

| Prop                    | Type                                   | Default  | Description                                                        |
| ----------------------- | -------------------------------------- | -------- | ------------------------------------------------------------------ |
| content                 | ReactNode                              | -        | Provides the short explanatory content.                            |
| side                    | "top" \| "right" \| "bottom" \| "left" | "top"    | Requests a side of the trigger for placement.                      |
| align                   | "start" \| "center" \| "end"           | "center" | Aligns the popup along the selected side.                          |
| sideOffset              | number                                 | 4        | Sets the gap between trigger and popup in pixels.                  |
| delay / closeDelay      | number / number                        | 150 / 0  | Controls the opening and closing delay in milliseconds.            |
| TooltipProvider.timeout | number                                 | 500      | Keeps nearby tooltip interactions within the shared timing window. |

Use the exported Tooltip primitives only when the compact `content` API cannot express the required trigger or controlled behavior.

## Accessibility

* Tooltip opens for both pointer hover and keyboard focus.
* The trigger must remain focusable without relying on Tooltip to add semantics.
* Icon-only buttons need an accessible name even when the tooltip repeats that text.
* Keep content to a short phrase or sentence. Use Popover for interactive or longer content.
