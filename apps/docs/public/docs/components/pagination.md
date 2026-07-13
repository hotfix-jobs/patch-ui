# Pagination

A controlled page range with previous, next, current-page, and ellipsis navigation.

Use Pagination to divide a large ordered collection into addressable pages. Prefer a single continuous view when the complete collection remains manageable.

```tsx
"use client";

import { useState } from "react";
import { Pagination } from "@patchui/react";

export function PaginationDemo() {
  const [page, setPage] = useState(4);

  return (
    <Pagination
      page={page}
      totalPages={12}
      onPageChange={setPage}
    />
  );
}

```

## Installation

```bash
npx shadcn add @patchui/pagination
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/pagination.json). The canonical implementation lives in [packages/react/src/components/pagination.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/pagination.tsx).

## Usage

```tsx
const [page, setPage] = useState(1);

<Pagination
  page={page}
  totalPages={12}
  onPageChange={setPage}
/>
```

`page` is one-indexed and controlled by the application. Pagination renders nothing when `totalPages` is one or less.

## Examples

### Long range and loading

Long ranges retain the first and last page and collapse gaps into ellipses. Loading disables every control and marks the navigation landmark busy.

```tsx
"use client";

import { Pagination } from "@patchui/react";

export function PaginationStatesDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Pagination page={18} totalPages={42} onPageChange={() => {}} />
      <Pagination
        page={18}
        totalPages={42}
        onPageChange={() => {}}
        loading
      />
    </div>
  );
}

```

## API reference

| Prop         | Type                     | Default | Description                                                                 |
| ------------ | ------------------------ | ------- | --------------------------------------------------------------------------- |
| page         | number                   | -       | Sets the current one-indexed page.                                          |
| totalPages   | number                   | -       | Sets the total number of available pages.                                   |
| onPageChange | (page: number) => void   | -       | Handles client-side navigation when href is absent.                         |
| href         | (page: number) => string | -       | Renders page controls as crawlable anchors using generated URLs.            |
| siblingCount | number                   | 1       | Sets how many page numbers remain visible on each side of the current page. |
| loading      | boolean                  | false   | Disables navigation and exposes aria-busy during a page transition.         |

## Indexable pages

Use `href` for catalogs, directories, archives, and other server-rendered collections. Return the canonical bare route for page one and a stable page URL for every later page. Use `onPageChange` for client-only views where the URL does not represent an indexable collection.

## Accessibility

* Pagination renders a navigation landmark named `Pagination`.
* The current page receives `aria-current="page"`.
* Previous, next, and numeric controls have specific accessible names.
* Tab moves between controls. Enter activates links, while Enter or Space activates buttons.
* Arrow keys are intentionally unbound, so Pagination remains compatible with horizontal scrolling containers.
