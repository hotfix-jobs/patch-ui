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
