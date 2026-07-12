# Avatar

A visual identity for a person or team with image, monogram, and placeholder fallbacks.

Use Avatar to reinforce an identity that is already available in nearby text or an accessible image label. Use AvatarGroup for a compact summary of multiple members.

```tsx
"use client";

import { Avatar } from "@patchui/react";

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar letter="AL" size="lg" />
      <Avatar letter="AT" size="lg" />
      <Avatar letter="GH" size="lg" />
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/avatar
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/avatar.json). The canonical implementation lives in [packages/react/src/components/avatar.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/avatar.tsx).

## Usage

```tsx
<Avatar>
  <AvatarImage src="/people/ada.jpg" alt="Ada Lovelace" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>
```

Always provide fallback initials when an image may fail to load. The `letter` prop creates a deterministic monogram without requiring an image request.

## Composition

```text
Avatar
├── AvatarImage
└── AvatarFallback

AvatarGroup
└── Avatar or members[]
```

## Examples

### Size and shape

Prefer the named size scale. Numeric pixel sizes are available when Avatar must align to fixed external geometry.

```tsx
"use client";

import { Avatar } from "@patchui/react";

export function AvatarSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar letter="AL" placeholder size="xs" />
      <Avatar letter="AT" placeholder size="sm" />
      <Avatar letter="GH" placeholder size="md" />
      <Avatar letter="KJ" placeholder size="lg" />
      <Avatar letter="LT" placeholder size="xl" />
      <Avatar letter="AL" placeholder shape="square" size="lg" />
    </div>
  );
}

```

### Group and overflow

Pass `members` for data-driven lists. Use children when individual avatars need custom content or behavior.

```tsx
"use client";

import { AvatarGroup } from "@patchui/react";

const members = [
  { id: "ada", letter: "AL", alt: "Ada Lovelace" },
  { id: "alan", letter: "AT", alt: "Alan Turing" },
  { id: "grace", letter: "GH", alt: "Grace Hopper" },
  { id: "katherine", letter: "KJ", alt: "Katherine Johnson" },
  { id: "linus", letter: "LT", alt: "Linus Torvalds" },
];

export function AvatarGroupDemo() {
  return <AvatarGroup members={members} limit={4} size="md" />;
}

```

## API reference

### Avatar

| Prop                  | Type                                           | Default  | Description                                                                   |
| --------------------- | ---------------------------------------------- | -------- | ----------------------------------------------------------------------------- |
| size                  | "xs" \| "sm" \| "md" \| "lg" \| "xl" \| number | "md"     | Sets a 24, 28, 36, 44, or 56 pixel preset, or an exact pixel size.            |
| shape                 | "circle" \| "square"                           | "circle" | Selects a circular or radius-6 container.                                     |
| letter                | string                                         | -        | Adds a monogram fallback without composing AvatarFallback.                    |
| placeholder           | boolean                                        | false    | Uses a neutral fill and renders a person icon when no other body is supplied. |
| icon / iconBackground | ReactNode / boolean                            | - / true | Adds a small badge at the lower edge and selects its fill treatment.          |

### AvatarGroup

| Prop         | Type                     | Default         | Description                                                               |
| ------------ | ------------------------ | --------------- | ------------------------------------------------------------------------- |
| members      | AvatarGroupMember\[]     | -               | Renders a data-driven collection as an alternative to children.           |
| limit        | number                   | 5               | Limits visible members and adds a +N summary. Set 0 to disable the limit. |
| size / shape | AvatarSize / AvatarShape | "md" / "circle" | Applies shared presentation to members and the overflow summary.          |
| overlap      | "auto" \| number         | "auto"          | Scales overlap with avatar size or uses an exact pixel value.             |
| reverse      | boolean                  | false           | Reverses stacking order without changing visual member order.             |

## Accessibility

* Use meaningful `alt` text when the avatar image communicates identity. Use an empty `alt` when adjacent text already names the same person.
* Do not rely on initials, color, or a status badge as the only source of important information.
* Avatar is display-only. Wrap it in an appropriately named Button or link when it initiates an action.
* Preserve stable member order when using AvatarGroup. Visual overlap must not imply a ranking that the data does not have.
