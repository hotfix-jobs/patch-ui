# Separator

A horizontal or vertical hairline that separates related content, with an optional inline label.

Use Separator when a visible boundary makes adjacent content groups easier to understand. Prefer spacing alone when the grouping is already clear.

```tsx
"use client";

import { Button, Separator } from "@patchui/react";

export function SeparatorDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Button variant="secondary">Continue with Email</Button>
      <Separator label="or" />
      <Button>Continue as Guest</Button>
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/separator
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/separator.json). The canonical implementation lives in [packages/react/src/components/separator.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/separator.tsx).

## Usage

```tsx
<Separator />
```

Horizontal is the default orientation. Add a label only when words such as `or` or `and` clarify the relationship between surrounding choices.

## Examples

### Vertical separator

A vertical separator inherits height from its parent, so place it in a row with an explicit or content-defined height.

```tsx
"use client";

import { Separator } from "@patchui/react";

export function SeparatorVerticalDemo() {
  return (
    <div className="flex h-8 items-center gap-4 text-small text-ink">
      <span>12 drafts</span>
      <Separator orientation="vertical" decorative />
      <span>8 published</span>
      <Separator orientation="vertical" decorative />
      <span>3 archived</span>
    </div>
  );
}

```

## API reference

| Prop        | Type                       | Default      | Description                                                       |
| ----------- | -------------------------- | ------------ | ----------------------------------------------------------------- |
| orientation | "horizontal" \| "vertical" | "horizontal" | Selects a full-width horizontal or full-height vertical hairline. |
| label       | ReactNode                  | -            | Splits a horizontal hairline around inline explanatory text.      |
| decorative  | boolean                    | false        | Removes separator semantics when the boundary is purely visual.   |

## Accessibility

* Leave `decorative={false}` when the boundary represents a meaningful change between content sections.
* Set `decorative` when spacing and document structure already communicate the relationship and the line is visual reinforcement only.
* Do not use a separator as a substitute for a heading, fieldset, list, or other semantic grouping.
* Labeled separators expose their visible label as content; keep it short and relevant.
