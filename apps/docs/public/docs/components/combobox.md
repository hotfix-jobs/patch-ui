# Combobox

An editable input with a filterable popup for choosing one or more values.

Use Combobox when people need to type to narrow a list or when the popup needs custom rows. Use [Select](/docs/components/select) for a fixed list opened by a button, and [Command](/docs/components/command) for an application command palette.

```tsx
"use client";

import { useId, useMemo, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxPopup,
  Label,
} from "@patchui/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

const FRAMEWORKS = ["React", "Vue", "Svelte", "Angular", "Solid", "Astro"];

export function ComboboxDemo() {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return FRAMEWORKS.filter((framework) =>
      framework.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <div className="max-w-sm">
      <Label htmlFor={inputId} className="mb-2">Framework</Label>
      <Combobox value={query} onValueChange={setQuery} placeholder="Search frameworks">
        <ComboboxInput id={inputId} prefix={<MagnifyingGlass />} clearable onClear={() => setQuery("")} />
        <ComboboxPopup>
          {matches.length > 0 ? (
            matches.map((framework) => (
              <ComboboxItem key={framework} onSelect={() => setQuery(framework)}>
                {framework}
              </ComboboxItem>
            ))
          ) : (
            <div className="px-3 py-6 text-center text-small text-ink-muted">No matches.</div>
          )}
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/combobox
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/combobox.json). The canonical implementation lives in [packages/react/src/components/combobox.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/combobox.tsx).

## Usage

```tsx
<Label htmlFor="framework">Framework</Label>
<Combobox value={query} onValueChange={setQuery}>
  <ComboboxInput id="framework" />
  <ComboboxPopup>
    <ComboboxItem value="react">React</ComboboxItem>
  </ComboboxPopup>
</Combobox>
```

Combobox does not filter data. Keep the query on the root, filter in your application, and render the matching items.

## Composition

```text
Combobox
├── ComboboxInput
└── ComboboxPopup
    ├── ComboboxSection (optional)
    │   ├── ComboboxGroupLabel
    │   └── ComboboxItem
    └── ComboboxDivider (optional)
```

`ComboboxInput` and `ComboboxPopup` are the minimum useful relationship. Only `ComboboxItem` participates in option selection and keyboard navigation. Section labels, dividers, and arbitrary popup content are optional.

## Examples

### Custom content and sections

Add explanatory content directly to the popup, then group selectable items with `ComboboxSection`. Plain content is not part of keyboard navigation.

```tsx
"use client";

import { useId, useMemo, useState } from "react";
import {
  Combobox,
  ComboboxDivider,
  ComboboxInput,
  ComboboxItem,
  ComboboxPopup,
  ComboboxSection,
  Label,
} from "@patchui/react";
import { Info, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

const FRAMEWORKS = ["React", "Vue", "Svelte", "Angular", "Solid", "Astro"];

export function ComboboxSectionsDemo() {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return FRAMEWORKS.filter((framework) =>
      framework.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <div className="max-w-sm">
      <Label htmlFor={inputId} className="mb-2">Framework</Label>
      <Combobox value={query} onValueChange={setQuery} placeholder="Search frameworks">
        <ComboboxInput id={inputId} prefix={<MagnifyingGlass />} />
        <ComboboxPopup>
          <div className="flex items-center gap-1.5 px-2.5 py-2 text-mini text-ink-muted md:px-2">
            <Info className="size-3.5 shrink-0" aria-hidden />
            Custom content is not keyboard-navigable.
          </div>
          <ComboboxDivider />
          <ComboboxSection title="Frameworks">
            {matches.map((framework) => (
              <ComboboxItem key={framework} onSelect={() => setQuery(framework)}>
                {framework}
              </ComboboxItem>
            ))}
          </ComboboxSection>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}

```

### Multiple selection

Set `multiple`, then control the selected values separately from the query. An item with `onRemove` exposes an explicit remove action for selected rows.

```tsx
"use client";

import { useId, useMemo, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxPopup,
  ComboboxSection,
  Label,
} from "@patchui/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

const FRAMEWORKS = ["React", "Vue", "Svelte", "Angular", "Solid", "Astro"];

export function ComboboxMultipleDemo() {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(["React", "Vue"]);
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return FRAMEWORKS.filter(
      (framework) =>
        framework.toLowerCase().includes(needle) &&
        !selected.includes(framework),
    );
  }, [query, selected]);

  return (
    <div className="max-w-sm">
      <Label htmlFor={inputId} className="mb-2">Frameworks</Label>
      <Combobox
        multiple
        value={query}
        onValueChange={setQuery}
        selectedValues={selected}
        onSelectedValuesChange={(next) => setSelected(next as string[])}
        placeholder="Choose frameworks"
      >
        <ComboboxInput
          id={inputId}
          prefix={<MagnifyingGlass />}
          clearable
          onClear={() => {
            setQuery("");
            setSelected([]);
          }}
        />
        <ComboboxPopup>
          {selected.length > 0 && query === "" && (
            <ComboboxSection title="Selected">
              {selected.map((framework) => (
                <ComboboxItem
                  key={framework}
                  value={framework}
                  onRemove={() =>
                    setSelected((items) =>
                      items.filter((item) => item !== framework),
                    )
                  }
                  removeLabel={`Remove ${framework}`}
                >
                  {framework}
                </ComboboxItem>
              ))}
            </ComboboxSection>
          )}
          {(query !== "" || selected.length === 0) &&
            matches.map((framework) => (
              <ComboboxItem key={framework} value={framework}>
                {framework}
              </ComboboxItem>
            ))}
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}

```

## API reference

The wrapper accepts the underlying Base UI and native element props. The entries below cover behavior added or coordinated by Patch UI. See the [canonical source](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/combobox.tsx) for exhaustive TypeScript definitions.

| Prop                                    | Type                                               | Default      | Description                                                                         |
| --------------------------------------- | -------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------- |
| value / onValueChange                   | string / (value: string) => void                   | -            | Controlled query shared by the desktop input and responsive mobile input.           |
| open / onOpenChange                     | boolean / (open: boolean) => void                  | -            | Controlled popup state.                                                             |
| autoHighlight                           | boolean \| "always"                                | false        | Determines whether an option is highlighted automatically on open or input change.  |
| multiple                                | boolean                                            | false        | Enables Base UI multiple-selection behavior.                                        |
| selectedValues / onSelectedValuesChange | readonly unknown\[] / (values: unknown\[]) => void | -            | Controlled selection array and its change handler.                                  |
| ComboboxInput.clearable / onClear       | boolean / () => void                               | false / -    | Shows the built-in clear action and lets the application reset related local state. |
| ComboboxItem.onRemove / removeLabel     | () => void / string                                | - / "Remove" | Adds an explicit, accessibly named remove action for selected rows.                 |

ComboboxInput also supports `variant="unstyled"` and `hideChevron` for composed input surfaces. ComboboxPopup exposes separate desktop and mobile class names when its responsive layouts need different sizing. Use `ComboboxPrimitive` when an advanced requirement needs a Base UI part that the Patch UI wrapper does not expose directly.

## Accessibility

* Keep a visible label associated with the input. A placeholder is not a label.
* Real focus remains on the input while the active option is announced through the combobox relationship.
* Arrow keys move through options. Enter selects the active option. Escape closes the popup. Arrow Down opens a closed popup.
* With the default `autoHighlight={false}`, opening the popup does not preselect an option. Move to an option before pressing Enter.
* Only `ComboboxItem` is selectable. Do not make plain popup content look like an option.
* Give each `onRemove` action a specific `removeLabel`, such as `Remove React`.

## Responsive behavior

On desktop, the popup is anchored to the input and matches its minimum width. Below the `md` breakpoint it becomes a centered panel with its own focused search input, narrow viewport gutters, and locked body scroll. Query and placeholder state are shared across both inputs. Token-based surfaces, text, boundaries, and focus styles adapt automatically in dark mode.
