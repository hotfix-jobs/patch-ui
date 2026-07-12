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
