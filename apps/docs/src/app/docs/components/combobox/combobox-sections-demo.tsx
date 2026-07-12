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
