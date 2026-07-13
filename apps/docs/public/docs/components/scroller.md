# Scroller

A focusable overflow region for horizontal rails, vertical feeds, and bidirectional canvases.

Use Scroller when a bounded collection intentionally extends beyond its visible region. Use Pagination for discrete result pages and a virtualization system for very large feeds.

```tsx
"use client";

import { Card, CardContent, CardTitle, Scroller } from "@patchui/react";

const projects = [
  "Design System",
  "Planning",
  "Documentation",
  "Analytics",
  "Mobile App",
];

export function ScrollerDemo() {
  return (
    <Scroller
      overflow="x"
      ariaLabel="Featured projects"
      childrenContainerClassName="gap-3 p-1"
    >
      {projects.map((project) => (
        <Card key={project} className="w-52 shrink-0">
          <CardContent>
            <CardTitle render={<h3 />}>{project}</CardTitle>
            <p className="mt-1 text-small text-ink-muted">Active project</p>
          </CardContent>
        </Card>
      ))}
    </Scroller>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/scroller
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/scroller.json). The canonical implementation lives in [packages/react/src/components/scroller.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/scroller.tsx).

## Usage

```tsx
<Scroller
  overflow="x"
  ariaLabel="Featured projects"
  childrenContainerClassName="gap-3 p-1"
>
  {projects.map((project) => (
    <Card key={project.id} className="w-52 shrink-0">
      <CardContent>{project.name}</CardContent>
    </Card>
  ))}
</Scroller>
```

Horizontal children need a stable width and `shrink-0`. Apply rail gaps and padding through `childrenContainerClassName` so they move with the content.

## Examples

### Vertical feed

Vertical scrolling requires a bounded height. Its overlay scrollbar appears during hover or scrolling while edge fades indicate additional content.

```tsx
"use client";

import { Scroller } from "@patchui/react";

const updates = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Update ${index + 1}`,
  description: "Project details and status changed.",
}));

export function ScrollerVerticalDemo() {
  return (
    <Scroller
      overflow="y"
      height={240}
      ariaLabel="Project activity"
      childrenContainerClassName="p-3"
      className="rounded-[var(--radius-12)] bg-layer-1"
    >
      {updates.map((update) => (
        <div
          key={update.id}
          className="border-b border-hairline py-3 last:border-b-0"
        >
          <p className="text-small font-medium text-ink">{update.title}</p>
          <p className="mt-0.5 text-small text-ink-muted">
            {update.description}
          </p>
        </div>
      ))}
    </Scroller>
  );
}

```

## API reference

| Prop                       | Type                 | Default    | Description                                               |
| -------------------------- | -------------------- | ---------- | --------------------------------------------------------- |
| overflow                   | "x" \| "y" \| "both" | "x"        | Selects horizontal, vertical, or bidirectional scrolling. |
| height / width             | number \| string     | - / "100%" | Sets bounded dimensions using pixels or CSS lengths.      |
| fade / fadeWidth           | boolean / number     | true / 32  | Controls directional edge masks and their pixel width.    |
| childrenContainerClassName | string               | -          | Styles the moving inner content wrapper.                  |
| ariaLabel                  | string               | -          | Names the focusable scroll region.                        |

Horizontal mode hides its scrollbar and relies on edge fades plus native touch or trackpad movement. Vertical and bidirectional modes render an overlay vertical scrollbar. Fades are not applied in `both` mode.

## Accessibility

* Give every Scroller a concise `ariaLabel`, especially when no visible heading clearly identifies the region.
* The viewport is focusable. Arrow keys scroll it using native browser behavior.
* Interactive children retain normal DOM tab order even when some content begins outside the visible region.
* Do not hide essential actions exclusively beyond an unannounced horizontal edge.
* Preserve touch targets and enough spacing between interactive rail items.
