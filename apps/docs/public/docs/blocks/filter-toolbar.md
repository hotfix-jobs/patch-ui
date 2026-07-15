# Filter Toolbar

A responsive rail for filters, result metadata, clear-all behavior, and pinned trailing actions.

Use Filter Toolbar to organize application-owned filters without coupling their values, popups, or data fetching to the layout block.

```tsx
"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Eye,
  Folder,
  SortAscending,
  SquaresFour,
  Tag,
  User,
} from "@phosphor-icons/react/dist/ssr";
import {
  FilterToolbar,
  FilterToolbarPicker,
  FilterToolbarTrigger,
  type FilterToolbarPickerOption,
} from "@patchui/react/blocks/filter-toolbar";
import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  MenuPopup,
  MenuTrigger,
  Toggle,
} from "@patchui/react";

const statusOptions = ["Active", "Paused"];
const ownerOptions = ["Ada Lovelace", "Alan Turing"];
const sortOptions = ["Recently updated", "Name", "Created date"];
const categoryOptions: FilterToolbarPickerOption[] = [
  { id: "design", value: "design", label: "Design", description: "8 items", icon: <SquaresFour /> },
  { id: "engineering", value: "engineering", label: "Engineering", description: "12 items", icon: <Folder /> },
  { id: "research", value: "research", label: "Research", description: "5 items", icon: <SquaresFour /> },
  { id: "operations", value: "operations", label: "Operations", description: "7 items", icon: <Folder /> },
];

export function FilterToolbarDemo() {
  const [status, setStatus] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [tagged, setTagged] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sort, setSort] = useState("Recently updated");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryQuery, setCategoryQuery] = useState("");

  const visibleCategories = categoryOptions.filter((option) =>
    String(option.label).toLowerCase().includes(categoryQuery.toLowerCase()),
  );

  const activeCount = useMemo(
    () =>
      Number(status != null) +
      Number(owner != null) +
      Number(categories.length > 0) +
      Number(tagged) +
      Number(visible),
    [status, owner, categories, tagged, visible],
  );

  const clearAll = () => {
    setStatus(null);
    setOwner(null);
    setCategories([]);
    setTagged(false);
    setVisible(false);
  };

  return (
    <div className="w-full py-2">
      <FilterToolbar
        activeCount={activeCount}
        onClearAll={clearAll}
        count={activeCount > 0 ? `${24 - activeCount * 3} results` : "24 results"}
        countVisibility="always"
        trailing={<SortControl value={sort} onChange={setSort} />}
      >
        <FilterMenu
          label="Status"
          value={status}
          icon={<Check />}
          options={statusOptions}
          onChange={setStatus}
        />
        <FilterMenu
          label="Owner"
          value={owner}
          icon={<User />}
          options={ownerOptions}
          onChange={setOwner}
        />
        <FilterToolbarPicker
          label="Category"
          icon={<SquaresFour />}
          selected={categories}
          onSelectionChange={setCategories}
          query={categoryQuery}
          onQueryChange={setCategoryQuery}
          sections={[
            {
              id: "categories",
              label: categoryQuery ? "Results" : "Categories",
              options: visibleCategories,
            },
          ]}
        />
        <Toggle
          variant="secondary"
          size="md"
          pressed={tagged}
          onPressedChange={setTagged}
        >
          <Tag aria-hidden />
          Tagged
        </Toggle>
        <Toggle
          variant="secondary"
          size="md"
          pressed={visible}
          onPressedChange={setVisible}
        >
          <Eye aria-hidden />
          Visible
        </Toggle>
      </FilterToolbar>
    </div>
  );
}

function FilterMenu({
  label,
  value,
  icon,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  icon?: React.ReactNode;
  options: string[];
  onChange: (value: string | null) => void;
}) {
  const active = value != null;

  return (
    <Menu>
      <MenuTrigger
        render={
          <FilterToolbarTrigger
            label={label}
            value={active ? value : undefined}
            icon={icon}
          />
        }
      />
      <MenuPopup>
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </MenuItem>
        ))}
        {active && (
          <>
            <MenuDivider />
            <MenuItem onClick={() => onChange(null)}>Clear filter</MenuItem>
          </>
        )}
      </MenuPopup>
    </Menu>
  );
}

function SortControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Menu>
      <MenuTrigger
        render={
          <Button
            variant="tertiary"
            size="md"
            aria-label={`Sort: ${value}`}
            icon={<SortAscending />}
          />
        }
      />
      <MenuPopup align="end">
        {sortOptions.map((option) => (
          <MenuItem
            key={option}
            selected={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/filter-toolbar
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/filter-toolbar.json). The canonical implementation lives in [packages/react/src/blocks/filter-toolbar/index.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/blocks/filter-toolbar/index.tsx).

## Usage

```tsx
<FilterToolbar
  activeCount={activeCount}
  onClearAll={clearFilters}
  count="128 results"
  countVisibility="always"
  trailing={<SortMenu />}
>
  <StatusFilter />
  <OwnerFilter />
  <CategoryFilter />
</FilterToolbar>
```

Pass Menu, Popover, Toggle, or other Patch UI controls as children. Filter Toolbar owns rail layout and stable trailing placement while the application owns filter state. On narrow screens, the filter rail stays on the first row while result metadata and trailing actions move to a second row. Set `countVisibility="always"` when the result count should remain visible on that row. The regions recombine at the large breakpoint.

## Composition

```text
FilterToolbar
├── Filter controls
├── Clear all
├── Result count
└── Trailing actions
```

## Examples

### Wrapping filters

Use wrap on spacious directory or management pages where filters can occupy more than one row. The default scroll behavior is better for headers and narrow screens.

```tsx
"use client";

import { useMemo, useState } from "react";
import { Toggle } from "@patchui/react";
import { FilterToolbar } from "@patchui/react/blocks/filter-toolbar";

const filters = ["Remote", "Full time", "Entry level", "Recently posted"];

export function FilterToolbarWrapDemo() {
  const [active, setActive] = useState<string[]>(["Remote"]);
  const activeCount = active.length;
  const results = useMemo(() => 128 - activeCount * 17, [activeCount]);

  return (
    <FilterToolbar
      overflow="wrap"
      activeCount={activeCount}
      onClearAll={() => setActive([])}
      count={`${results} results`}
      countVisibility="always"
    >
      {filters.map((filter) => (
        <Toggle
          key={filter}
          variant="secondary"
          pressed={active.includes(filter)}
          onPressedChange={(pressed) =>
            setActive((current) =>
              pressed
                ? [...current, filter]
                : current.filter((value) => value !== filter),
            )
          }
        >
          {filter}
        </Toggle>
      ))}
    </FilterToolbar>
  );
}

```

## Searchable picker

Filter Toolbar Picker provides the repeated high-cardinality pattern: a searchable, grouped, multi-select Popover. Keep its selection and query controlled so options can be filtered locally or loaded asynchronously.

The trigger summarizes one selection by label and several selections by count. Use `summary` when the product needs different wording.

## API reference

| Prop                                             | Type                                      | Default       | Description                                                         |
| ------------------------------------------------ | ----------------------------------------- | ------------- | ------------------------------------------------------------------- |
| overflow                                         | "scroll" \| "wrap"                        | "scroll"      | Keeps one horizontal rail or allows additional rows.                |
| activeCount / onClearAll                         | number / () => void                       | 0 / undefined | Shows and handles the clear-all action.                             |
| count                                            | ReactNode                                 | -             | Adds preformatted result metadata to the trailing region.           |
| countVisibility                                  | "always" \| "responsive"                  | "responsive"  | Controls whether count metadata hides below the small breakpoint.   |
| trailing                                         | ReactNode                                 | -             | Pins sorting, view selection, or another action after the rail.     |
| FilterToolbarTrigger.value                       | ReactNode                                 | -             | Displays an active summary and applies the selected fill.           |
| FilterToolbarPicker.selected / onSelectionChange | string\[] / (selected: string\[]) => void | -             | Controls the picker’s multi-selection.                              |
| FilterToolbarPicker.query / onQueryChange        | string / (query: string) => void          | -             | Controls local or remote option filtering.                          |
| FilterToolbarPicker.sections                     | FilterToolbarPickerSection\[]             | -             | Provides grouped options with optional metadata and disabled state. |

Avoid placeholder choices such as “Any” or “All.” Clear an active filter from its popup, and reserve Clear all for resetting the complete toolbar.

## Accessibility

* Give the toolbar an `ariaLabel` that describes the filter set when “Filters” is too generic.
* Keep result count updates concise because the count uses a polite live region.
* Preserve a visible category label when showing an active filter summary.
* Ensure every custom child control exposes its own name, state, and keyboard behavior.
