# Table

Native table primitives for structured data, sorting, selection, density, and responsive overflow.

Use Table for data whose row and column relationships are meaningful. Use layout primitives rather than a table when content does not have tabular semantics.

```tsx
"use client";

import { useState } from "react";
import {
  Button,
  EmptyState,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  TableSortButton,
} from "@patchui/react";
import { Users } from "@phosphor-icons/react/dist/ssr";

const MEMBERS = [
  { name: "Ada Lovelace", role: "Owner", status: "Active", updated: "2m ago" },
  { name: "Alan Turing", role: "Admin", status: "Active", updated: "12m ago" },
  { name: "Grace Hopper", role: "Member", status: "Invited", updated: "1h ago" },
  { name: "Katherine Johnson", role: "Member", status: "Active", updated: "3h ago" },
  { name: "Linus Torvalds", role: "Member", status: "Paused", updated: "5d ago" },
];

type SortDirection = "asc" | "desc";

function Status({ value }: { value: string }) {
  return (
    <span className={value === "Active" ? "text-ink" : "text-ink-muted"}>
      {value}
    </span>
  );
}

function MemberRows({ members = MEMBERS }: { members?: typeof MEMBERS }) {
  return members.map((member) => (
    <TableRow key={member.name}>
      <TableCell className="font-medium">{member.name}</TableCell>
      <TableCell>{member.role}</TableCell>
      <TableCell><Status value={member.status} /></TableCell>
      <TableCell align="right" className="text-ink-muted">{member.updated}</TableCell>
    </TableRow>
  ));
}

export function TableDemo() {
  const [direction, setDirection] = useState<SortDirection>("asc");
  const members = [...MEMBERS].sort((a, b) =>
    direction === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name),
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-3">
        <p className="text-small font-medium text-ink">Default</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead aria-sort={direction === "asc" ? "ascending" : "descending"}>
                <TableSortButton
                  direction={direction}
                  onClick={() => setDirection(direction === "asc" ? "desc" : "asc")}
                >
                  Name
                </TableSortButton>
              </TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <MemberRows members={members} />
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <p className="text-small font-medium text-ink">Bordered container</p>
        <Table bordered>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <MemberRows members={MEMBERS.slice(0, 3)} />
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <p className="text-small font-medium text-ink">Compact</p>
        <Table size="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <MemberRows members={MEMBERS.slice(0, 3)} />
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <p className="text-small font-medium text-ink">Empty</p>
        <Table bordered>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty colSpan={4}>
              <EmptyState
                icon={<Users />}
                title="No entries yet"
                description="Add an entry to see it here."
                action={<Button size="md">Add entry</Button>}
              />
            </TableEmpty>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/table
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/table.json). The canonical implementation lives in [packages/react/src/components/table.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/table.tsx).

## Usage

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Plan</TableHead>
      <TableHead align="right">Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Team</TableCell>
      <TableCell align="right">$49</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

Every part renders its corresponding native table element, so browser table semantics and native attributes are preserved.

## Structural behavior

* The header provides the primary column divider. Body rows use quiet horizontal dividers.
* Numeric cells should use `align="right"`, which also enables tabular numerals.
* Sorting state belongs on `aria-sort` on `TableHead`; `TableSortButton` provides the interactive control and direction icon.
* Selected rows expose `aria-selected`. Use `interactive` on the root when rows are actionable.
* `TableEmpty` must span the visible columns through `colSpan`.

## API reference

The primitives accept their corresponding native table attributes. The entries below cover behavior added by Patch UI. See the [canonical source](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/table.tsx) for exhaustive TypeScript definitions.

| Prop                      | Type                      | Default | Description                                                                         |
| ------------------------- | ------------------------- | ------- | ----------------------------------------------------------------------------------- |
| Table.bordered            | boolean                   | false   | Adds a radius-12 layer surface with an outer hairline.                              |
| Table.size                | "sm" \| "md"              | "md"    | Selects compact or standard row density.                                            |
| Table.interactive         | boolean                   | false   | Adds the shared hover treatment to actionable body rows.                            |
| Table.scrollable          | boolean                   | true    | Provides horizontal overflow. Disable it when an external container owns scrolling. |
| Table.stickyHeader        | boolean                   | false   | Pins header cells inside a fixed-height scrolling container.                        |
| TableRow\.selected        | boolean                   | false   | Applies the selected treatment and sets aria-selected.                              |
| TableSortButton.direction | "asc" \| "desc" \| "none" | "none"  | Controls the direction icon. Sorting state remains application-owned.               |

## Accessibility

* Keep `TableHead`, `TableBody`, `TableRow`, and cell parts in valid native table order.
* Add a `TableCaption` when surrounding content does not already identify the table.
* Put `aria-sort="ascending"` or `aria-sort="descending"` on the sorted `TableHead`, not on the sort button.
* Do not add row click behavior without an accessible interactive control or an established composite-widget keyboard model.
* Preserve horizontal scrolling on narrow screens rather than compressing columns until content becomes unreadable.

## Responsive behavior

Table scrolls horizontally by default. Set `scrollable={false}` only when a parent owns overflow, such as a fixed-height container used with `stickyHeader`.
