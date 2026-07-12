# Breadcrumb

An ancestor trail that locates the current page within a hierarchy.

Use Breadcrumb on nested pages where people may need to move back to a parent level. Do not use it as a replacement for primary navigation.

```tsx
"use client";

import { Breadcrumb } from "@patchui/react";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb
      items={[
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
        { name: "Enigma" },
      ]}
    />
  );
}

```

## Installation

```bash
npx shadcn add @patchui/breadcrumb
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/breadcrumb.json). The canonical implementation lives in [packages/react/src/components/breadcrumb.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/breadcrumb.tsx).

## Usage

```tsx
<Breadcrumb
  items={[
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Enigma" },
  ]}
/>
```

Order items from the root to the current page. The final item is always rendered as the current page, even when it has an `href`.

## Examples

### Long hierarchy

Trails longer than three items collapse their middle ancestors behind a disclosure button on small screens. Desktop keeps the full hierarchy visible.

```tsx
"use client";

import { Breadcrumb } from "@patchui/react";

export function BreadcrumbLongDemo() {
  return (
    <Breadcrumb
      items={[
        { name: "Home", href: "/" },
        { name: "Workspace", href: "/workspace" },
        { name: "Alan Turing", href: "/workspace/alan-turing" },
        { name: "Projects", href: "/workspace/alan-turing/projects" },
        { name: "Enigma" },
      ]}
    />
  );
}

```

## API reference

| Prop      | Type                    | Default | Description                                                                    |
| --------- | ----------------------- | ------- | ------------------------------------------------------------------------------ |
| items     | BreadcrumbItem\[]       | -       | Provides the trail in root-to-current-page order.                              |
| linkAs    | (props) => ReactElement | "\<a>"  | Renders ancestor links through a framework router component.                   |
| item.name | string                  | -       | Provides the visible label and the accessible name of the automatic Home icon. |
| item.href | string                  | -       | Links an ancestor. Omit it from the current page item.                         |
| item.icon | ReactNode               | -       | Adds a leading icon and overrides the automatic Home icon.                     |

## Accessibility

* The component renders a navigation landmark named `Breadcrumb` and an ordered list of items.
* The final item receives `aria-current="page"` and is not interactive.
* `{ name: "Home", href: "/" }` renders a compact house icon while preserving Home as its accessible name.
* The mobile disclosure button announces hidden breadcrumbs and exposes its expanded state.
* Long trails scroll horizontally instead of wrapping into an ambiguous multi-line sequence.

## Router links

Use `linkAs` to preserve client-side navigation with Next.js, React Router, or another router. Forward `href`, `children`, `className`, and the supplied ARIA attributes to the rendered link.
