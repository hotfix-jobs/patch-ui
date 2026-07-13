# Accordion

A coordinated set of collapsible sections for progressively revealing content.

Use Accordion for related disclosures such as product details or frequently asked questions. A single item also supports a compact show-more pattern.

```tsx
"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@patchui/react";

export function AccordionDemo() {
  return (
    <Accordion className="w-full max-w-md" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Can multiple sections be open?</AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            Yes. Accordion allows multiple open items by default.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does collapsed content stay mounted?</AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            Yes. Collapsed panels remain available to find-in-page search.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can the indicator be changed?</AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            Pass a custom node to the trigger’s caret prop.
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/accordion
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/accordion.json). The canonical implementation lives in [packages/react/src/components/accordion.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/accordion.tsx).

## Usage

```tsx
<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Can multiple sections be open?</AccordionTrigger>
    <AccordionPanel>
      <p className="pb-3 text-small text-ink-muted">
        Yes. Accordion allows multiple open items by default.
      </p>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
```

Each item needs a unique `value`. Panel content stays mounted while collapsed, which preserves find-in-page behavior.

## Composition

```text
Accordion
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionPanel
```

## Examples

### Visual treatments

Use `flush` for content integrated into a page, `bordered` for a divided list, and `card` when each disclosure is a distinct content object.

```tsx
"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@patchui/react";

function Example({ variant }: { variant: "bordered" | "card" }) {
  return (
    <Accordion variant={variant} defaultValue={[`${variant}-1`]}>
      <AccordionItem value={`${variant}-1`}>
        <AccordionTrigger>Workspace access</AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            Members can view projects shared with their workspace.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value={`${variant}-2`}>
        <AccordionTrigger>Project permissions</AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            Project owners manage editing and sharing permissions.
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionVariantsDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-8 md:grid-cols-2">
      <Example variant="bordered" />
      <Example variant="card" />
    </div>
  );
}

```

### Custom indicator

Replace the default caret with any node, or pass `null` when another visual treatment communicates disclosure state.

```tsx
"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@patchui/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export function AccordionCaretDemo() {
  return (
    <Accordion className="w-full max-w-md">
      <AccordionItem value="details">
        <AccordionTrigger
          caret={
            <Plus
              aria-hidden
              className="size-4 shrink-0 text-ink-muted transition-transform duration-[var(--duration-state)] ease-[var(--ease-standard)] group-data-[panel-open]:rotate-45 group-data-[panel-open]:text-ink group-hover:text-ink"
            />
          }
        >
          Show project details
        </AccordionTrigger>
        <AccordionPanel>
          <p className="pb-3 text-small text-ink-muted">
            The plus rotates to communicate the panel’s open state.
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

```

## API reference

| Prop                  | Type                                   | Default | Description                                                               |
| --------------------- | -------------------------------------- | ------- | ------------------------------------------------------------------------- |
| variant               | "flush" \| "bordered" \| "card"        | "flush" | Selects integrated, divided, or discrete-card presentation.               |
| defaultValue          | string\[]                              | \[]     | Sets initially expanded items for uncontrolled state.                     |
| value / onValueChange | string\[] / (value: string\[]) => void | -       | Controls the expanded item values.                                        |
| openMultiple          | boolean                                | true    | Allows multiple panels to remain open. Set false for exclusive expansion. |

Every AccordionItem needs a unique `value`. AccordionTrigger renders a `CaretDown` by default; pass another node to `caret`, or `null` to hide it.

## Accessibility

* Triggers use buttons and expose expanded state through the underlying Base UI primitive.
* Enter or Space toggles the focused item. Arrow keys move between triggers, while Home and End move to the first or last trigger.
* Keep trigger labels concise and make panel content understandable when reached directly through find-in-page.
* Use `openMultiple={false}` only when simultaneous comparison is unnecessary.
