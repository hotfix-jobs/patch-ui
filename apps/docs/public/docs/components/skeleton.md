# Skeleton

A visual placeholder that preserves content shape while asynchronous data is loading.

Use Skeleton when loading content has a predictable final layout. Use Spinner when the eventual shape is unknown or the wait is tied to one compact action.

```tsx
"use client";

import { Skeleton } from "@patchui/react";

export function SkeletonDemo() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading profile"
      className="flex w-full max-w-md items-start gap-4"
    >
      <Skeleton shape="pill" width={48} height={48} />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton height={16} width="35%" />
        <Skeleton height={16} width="70%" />
        <Skeleton height={16} width="55%" />
      </div>
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/skeleton
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/skeleton.json). The canonical implementation lives in [packages/react/src/components/skeleton.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/skeleton.tsx).

## Usage

```tsx
<div aria-busy="true" aria-label="Loading profile">
  <div className="flex items-start gap-4">
    <Skeleton shape="pill" width={40} height={40} />
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton height={16} width="35%" />
      <Skeleton height={16} width="70%" />
    </div>
  </div>
</div>
```

Match placeholder dimensions closely to the final content so loading does not create avoidable layout shifts.

## Examples

### Reveal content

Use `show` when the same component boundary should switch from its placeholder to loaded children.

```tsx
"use client";

import { useState } from "react";
import { Avatar, Button, Skeleton } from "@patchui/react";

export function SkeletonRevealDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <div aria-busy={loading || undefined} className="flex items-center gap-3">
        <Skeleton show={loading} shape="pill" width={48} height={48}>
          <Avatar letter="AL" size="lg" />
        </Skeleton>
        <Skeleton show={loading} width={160} height={20}>
          <p className="text-small font-medium text-ink">Ada Lovelace</p>
        </Skeleton>
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="self-start"
        onClick={() => setLoading((value) => !value)}
      >
        {loading ? "Show Content" : "Reset Loading"}
      </Button>
    </div>
  );
}

```

## API reference

| Prop            | Type                             | Default   | Description                                                   |
| --------------- | -------------------------------- | --------- | ------------------------------------------------------------- |
| width / height  | number \| string                 | -         | Sets pixel or CSS-length dimensions.                          |
| shape           | "rounded" \| "pill" \| "squared" | "rounded" | Selects radius-6, full-radius, or square geometry.            |
| animated        | boolean                          | true      | Enables the token-based pulse animation.                      |
| show / children | boolean / ReactNode              | true / -  | Renders the skeleton while true and its children while false. |

Classes and inline style can further refine geometry, but explicit width, height, and shape keep common placeholders readable in source.

## Accessibility

* Skeleton is decorative and hidden from assistive technology.
* Put `aria-busy="true"` on the content region being updated, then remove it when loading completes.
* Add a concise status message when people need confirmation that loading is in progress; do not create one live region per placeholder.
* Pulse animation stops under reduced-motion preferences.
* Preserve the final reading and tab order when content replaces the placeholders.
