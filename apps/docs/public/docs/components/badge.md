# Badge

Compact, display-only metadata for status, plan, environment, or category.

Use Badge beside the content it describes. Use an interactive control when the value can be changed or removed.

```tsx
"use client";

import { Badge } from "@patchui/react";
export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge color="success">Active</Badge>
      <Badge color="warning">Pending</Badge>
      <Badge color="error">Failed</Badge>
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/badge
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/badge.json). The canonical implementation lives in [packages/react/src/components/badge.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/badge.tsx).

## Usage

```tsx
<Badge color="success">Active</Badge>
```

Keep labels short and meaningful without relying on color alone.

## Examples

### Treatment, size, and shape

Choose emphasis independently from density and shape. Icons should reinforce a text label.

```tsx
"use client";

import { Badge } from "@patchui/react";
import { Shield } from "@phosphor-icons/react/dist/ssr";

export function BadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="outlined">Outlined</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="lg">Large</Badge>
      <Badge shape="pill" icon={<Shield />}>
        Verified
      </Badge>
    </div>
  );
}

```

## API reference

| Prop    | Type                                           | Default   | Description                                           |
| ------- | ---------------------------------------------- | --------- | ----------------------------------------------------- |
| color   | "default" \| "success" \| "warning" \| "error" | "default" | Selects the neutral or semantic color role.           |
| variant | "solid" \| "soft" \| "outlined"                | "soft"    | Selects saturated, tinted, or boundary-only emphasis. |
| size    | "sm" \| "md" \| "lg"                           | "md"      | Sets the metadata density.                            |
| shape   | "rounded" \| "pill"                            | "rounded" | Uses radius-6 or an explicit pill shape.              |
| render  | RenderProp<"span">                             | -         | Changes the display-only semantic element.            |

## Accessibility

* Badge is display-only and must not look interactive.
* Text must communicate the state without color.
* Avoid icon-only badges. If terse content needs clarification, provide an accessible name or nearby explanation.
