# Spinner

A compact indeterminate status indicator that inherits the surrounding text color.

Use Spinner for a short wait with no measurable total. Use Progress for measurable work and Skeleton when loaded content has a predictable shape.

```tsx
"use client";

import { Spinner } from "@patchui/react";

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-2 text-ink-muted">
      <Spinner size="sm" label="Loading recent activity" />
      <span className="text-small">Loading recent activity</span>
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/spinner
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/spinner.json). The canonical implementation lives in [packages/react/src/components/spinner.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/spinner.tsx).

## Usage

```tsx
<div className="flex items-center gap-2">
  <Spinner size="sm" label="Loading recent activity" />
  <span className="text-small text-ink-muted">Loading recent activity</span>
</div>
```

Spinner uses `currentColor`, so its context controls the visual tone. Prefer Button’s `loading` prop instead of manually inserting Spinner into a button.

## API reference

| Prop  | Type                 | Default   | Description                                          |
| ----- | -------------------- | --------- | ---------------------------------------------------- |
| size  | "sm" \| "md" \| "lg" | "md"      | Sets a 16, 20, or 24 pixel indicator.                |
| label | string               | "Loading" | Names the work in progress for assistive technology. |

Use `className` only when the indicator must align to geometry outside the shared size scale.

## Accessibility

* Replace the generic label with specific context such as `Saving project` or `Loading recent activity`.
* Keep visible status text when people need to understand what is waiting.
* Spinner uses status semantics, so avoid mounting several indicators for one loading region.
* Animation stops under reduced-motion preferences while the static indicator remains visible.
