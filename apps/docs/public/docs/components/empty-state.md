# EmptyState

A quiet placeholder that explains missing content and offers an appropriate next step.

Use EmptyState when a collection has no data, no filtered results, or no content yet. Its parent owns the surrounding surface.

```tsx
"use client";

import { Button, EmptyState } from "@patchui/react";
import { MagnifyingGlassMinus } from "@phosphor-icons/react/dist/ssr";

export function EmptyStateDemo() {
  return (
    <EmptyState
      title="No results match your filters"
      description="Try removing a filter to see more results."
      icon={<MagnifyingGlassMinus />}
      action={<Button variant="secondary">Clear Filters</Button>}
    />
  );
}

```

## Installation

```bash
npx shadcn add @patchui/empty-state
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/empty-state.json). The canonical implementation lives in [packages/react/src/components/empty-state.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/empty-state.tsx).

## Usage

```tsx
<EmptyState
  title="No results match your filters"
  description="Try removing a filter to see more results."
  icon={<MagnifyingGlassMinus />}
  action={<Button variant="secondary">Clear Filters</Button>}
/>
```

Explain why content is absent, then offer the most direct recovery or creation action. Do not restate the title in the description.

## Examples

### First-use state

For an empty collection, describe the value of adding the first item and provide one clear creation action.

```tsx
"use client";

import { Button, EmptyState } from "@patchui/react";
import { FolderPlus } from "@phosphor-icons/react/dist/ssr";

export function EmptyStateCreateDemo() {
  return (
    <EmptyState
      title="No projects yet"
      description="Create a project to organize files and invite collaborators."
      icon={<FolderPlus />}
      action={<Button>Create Project</Button>}
    />
  );
}

```

## API reference

| Prop        | Type      | Default | Description                                                |
| ----------- | --------- | ------- | ---------------------------------------------------------- |
| title       | ReactNode | -       | Names the empty condition.                                 |
| description | ReactNode | -       | Explains the condition or the next useful step.            |
| icon        | ReactNode | -       | Adds a muted decorative icon above the title.              |
| action      | ReactNode | -       | Adds the primary recovery or creation action.              |
| children    | ReactNode | -       | Adds optional supporting content below the primary action. |

## Content guidance

* Describe the state specifically, such as `No results match your filters` or `No projects yet`.
* Keep the description to one or two short sentences that add information.
* Prefer one primary action. Use children only for genuinely useful supporting content or a secondary link.
* Match the action to the state, such as `Clear Filters`, `Create Project`, or `Browse Templates`.

## Accessibility

* EmptyState renders a heading and description but does not add a landmark or live region automatically.
* When filtering updates the empty state asynchronously, place the changing results region in `aria-live="polite"`.
* The icon is decorative and hidden from assistive technology. Do not encode unique information in it.
* Buttons and links supplied through `action` or `children` retain their own semantics and accessible names.
