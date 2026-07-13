# Card

A composable surface for a discrete content object with optional header, content, and footer structure.

Use Card when content represents one object that benefits from a visible boundary or elevation. Use Section for a borderless group of related settings or controls.

```tsx
"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@patchui/react";

export function CardDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div>
          <CardTitle>Workspace activity</CardTitle>
          <CardDescription>Changes from the last seven days.</CardDescription>
        </div>
        <Button variant="tertiary" size="sm">
          View
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-small text-ink">
          Three updates were published during the last seven days.
        </p>
      </CardContent>
      <CardFooter divided>
        <span className="text-mini text-ink-muted">Updated recently</span>
      </CardFooter>
    </Card>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/card
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/card.json). The canonical implementation lives in [packages/react/src/components/card.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/card.tsx).

## Usage

```tsx
<Card>
  <CardHeader>
    <div>
      <CardTitle>Workspace activity</CardTitle>
      <CardDescription>Changes from the last seven days.</CardDescription>
    </div>
  </CardHeader>
  <CardContent>Three updates were published.</CardContent>
</Card>
```

Card defaults to `variant="outlined"`. Its structural parts are independent, so omit any slot the content does not need.

## Composition

```text
Card
├── CardHeader
│   ├── CardTitle
│   └── CardDescription
├── CardContent
└── CardFooter
```

## Examples

### Surface variants

Use outlined for a clear object boundary, surface for quiet grouping, and elevated when an object must sit above surrounding content.

```tsx
"use client";

import { Card, CardContent, CardTitle } from "@patchui/react";

export function CardVariantsDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <Card variant="surface">
        <CardContent>
          <CardTitle render={<h4 />}>Surface</CardTitle>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <CardTitle render={<h4 />}>Outlined</CardTitle>
        </CardContent>
      </Card>
      <Card variant="elevated">
        <CardContent>
          <CardTitle render={<h4 />}>Elevated</CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}

```

### Actionable card

`actionable` adds visual interaction states only. Render the complete Card as a link or button to supply the correct semantics.

```tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@patchui/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function CardActionableDemo() {
  return (
    <Card
      actionable
      render={<a href="#api-reference" />}
      className="block w-full max-w-md"
    >
      <CardContent className="flex items-center justify-between gap-4">
        <div>
          <CardTitle render={<span />}>Browse resources</CardTitle>
          <CardDescription>Open the complete collection.</CardDescription>
        </div>
        <ArrowRight aria-hidden className="size-4 shrink-0 text-ink-muted" />
      </CardContent>
    </Card>
  );
}

```

## API reference

| Prop       | Type                                  | Default    | Description                                                                                  |
| ---------- | ------------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| variant    | "surface" \| "outlined" \| "elevated" | "outlined" | Selects quiet, bounded, or elevated presentation.                                            |
| actionable | boolean                               | false      | Adds hover, active, disabled, and keyboard-focus presentation for a semantic link or button. |
| selected   | boolean                               | false      | Adds selected presentation and data-selected without choosing an ARIA selection model.       |
| render     | RenderProp<"div">                     | -          | Changes the semantic root while retaining Card presentation.                                 |

All structural parts support `render` when their semantic element needs to change. CardFooter adds a top boundary with `divided`.

## Accessibility

* A plain Card is a visual grouping and does not add landmark semantics automatically.
* Choose a CardTitle heading level that fits the surrounding document hierarchy.
* When the whole card is interactive, render it as one link or button. Do not nest other interactive controls inside it.
* `selected` is visual state only. Add `aria-selected`, `aria-pressed`, or another state required by the parent interaction pattern.
* Keep a visible text label when an icon appears in the header or footer as an action.
