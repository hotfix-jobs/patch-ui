# Button

An action control with intent-based variants, three sizes, optional icons, and loading behavior.

Use Button for actions that change application state. Render it as a link when the interaction navigates to another location.

```tsx
"use client";

import { Button } from "@patchui/react";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/button
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/button.json). The canonical implementation lives in [packages/react/src/components/button.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/button.tsx).

## Usage

```tsx
<Button>Deploy Project</Button>
```

Button defaults to `variant="primary"`, `size="md"`, and `shape="rounded"`.

## Choosing a variant

* Use `primary` for the most important action in a view.
* Use `secondary` for ordinary filled actions and `tertiary` for quiet toolbar or adjacent actions.
* Use `outlined` when a transparent action needs an explicit boundary.
* Use `soft` for a lower-emphasis action that still carries the primary color.
* Reserve `warning` and `destructive` for actions with matching semantic consequences.

## Examples

### Size and shape

Use the shared size scale for control density. Pill shape is explicit, including for icon-only buttons that should be circular.

```tsx
"use client";

import { Button } from "@patchui/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export function ButtonSizingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button shape="pill">Pill</Button>
      <Button
        variant="secondary"
        shape="pill"
        aria-label="Add item"
        icon={<Plus />}
      />
    </div>
  );
}

```

### Icons and states

Icons reinforce an action label. Loading and disabled states prevent interaction while preserving the control's footprint.

```tsx
"use client";

import { Button } from "@patchui/react";
import { Download, Envelope, Trash } from "@phosphor-icons/react/dist/ssr";

export function ButtonIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button icon={<Envelope />}>Send Email</Button>
      <Button variant="secondary" icon={<Download />}>
        Download
      </Button>
      <Button variant="destructive" icon={<Trash />}>
        Delete Member
      </Button>
      <Button loading>Saving</Button>
      <Button disabled>Unavailable</Button>
    </div>
  );
}

```

## API reference

The wrapper accepts native button attributes. The entries below cover behavior added by Patch UI. See the [canonical source](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/button.tsx) for exhaustive TypeScript definitions.

| Prop                | Type                                                                                         | Default    | Description                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| variant             | "primary" \| "secondary" \| "outlined" \| "soft" \| "tertiary" \| "warning" \| "destructive" | "primary"  | Selects the action hierarchy or semantic treatment.                                          |
| size                | "sm" \| "md" \| "lg"                                                                         | "md"       | Uses the shared 24, 32, or 40 pixel control heights.                                         |
| shape               | "rounded" \| "pill"                                                                          | "rounded"  | Uses radius-8 or a full pill radius. Icon-only buttons respect the selected shape.           |
| icon / iconPosition | ReactNode / "left" \| "right"                                                                | - / "left" | Adds an icon beside the label. Passing an icon without children creates an icon-only button. |
| loading             | boolean                                                                                      | false      | Replaces the content with a spinner and disables interaction.                                |
| render              | RenderProp<"button">                                                                         | -          | Changes the semantic element while retaining Button styling and behavior.                    |

## Accessibility

* Give every icon-only Button an `aria-label`. Development builds warn when it is missing.
* Render navigation as an anchor through `render={<a href="..." />}` rather than attaching navigation behavior to a button.
* Loading buttons are disabled so repeated activation cannot submit an action twice.
* Small visual sizes retain a 44 by 44 pixel touch target on coarse pointers.
* Use action labels that describe the outcome, such as `Deploy Project` or `Delete Member`.
