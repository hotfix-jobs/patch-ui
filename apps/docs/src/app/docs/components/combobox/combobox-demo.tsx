"use client";

import { useState, useMemo } from "react";
import {
  Badge,
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxItem,
  ComboboxCheckboxItem,
  ComboboxDivider,
  ComboboxSection,
  SectionLabel,
} from "@patchui/react";
import { Info, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
const FRAMEWORKS = [
  "React",
  "Vue",
  "Svelte",
  "Angular",
  "Solid",
  "Preact",
  "Qwik",
  "Astro",
  "Lit",
  "Alpine",
];

const RECENT = ["React", "Vue"];

export function ComboboxDemo() {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [query2, setQuery2] = useState("");

  const [multiQuery, setMultiQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(["React"]);

  const needle = query.trim().toLowerCase();
  const matches = useMemo(
    () => FRAMEWORKS.filter((f) => f.toLowerCase().includes(needle)),
    [needle],
  );

  const needle2 = query2.trim().toLowerCase();
  const matches2 = useMemo(
    () => FRAMEWORKS.filter((f) => f.toLowerCase().includes(needle2)),
    [needle2],
  );

  const multiNeedle = multiQuery.trim().toLowerCase();
  const multiMatches = useMemo(
    () => FRAMEWORKS.filter((f) => f.toLowerCase().includes(multiNeedle)),
    [multiNeedle],
  );
  const toggle = (f: string) =>
    setSelected((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Basic: with search icon, chevron, and clearable</SectionLabel>
        <div className="max-w-sm">
          <Combobox value={query} onValueChange={setQuery} placeholder="Search…">
            <ComboboxInput
              prefix={<MagnifyingGlass />}

              clearable
              onClear={() => {
                setQuery("");
                setPicked(null);
              }}
            />
            <ComboboxPopup>
              {matches.length === 0 ? (
                <div className="px-3 py-6 text-center text-small text-ink-muted">
                  No matches.
                </div>
              ) : (
                <div className="py-1">
                  {matches.map((f) => (
                    <ComboboxItem
                      key={f}
                      onSelect={() => {
                        setPicked(f);
                        setQuery(f);
                      }}
                    >
                      {f}
                    </ComboboxItem>
                  ))}
                </div>
              )}
            </ComboboxPopup>
          </Combobox>
          {picked && (
            <p className="mt-2 text-mini text-ink-muted">Selected: {picked}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Custom content (recents section, banner)</SectionLabel>
        <div className="max-w-sm">
          <Combobox
            value={query2}
            onValueChange={setQuery2}
            placeholder="Search frameworks…"
          >
            <ComboboxInput
              prefix={<MagnifyingGlass />}

              clearable
              onClear={() => setQuery2("")}
            />
            <ComboboxPopup>
              {/* Banner: matches item padding so text lines up with rows below */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-mini text-ink-muted md:px-2">
                <Info className="size-3.5 shrink-0" aria-hidden />
                <span>Recents shown first</span>
              </div>
              <ComboboxDivider />

              {needle2 === "" && RECENT.length > 0 && (
                <>
                  <ComboboxSection title="Recent">
                    {RECENT.map((r) => (
                      <ComboboxItem
                        key={`recent-${r}`}
                        onSelect={() => setQuery2(r)}
                      >
                        {r}
                      </ComboboxItem>
                    ))}
                  </ComboboxSection>
                  <ComboboxDivider />
                </>
              )}

              <ComboboxSection title="All frameworks">
                {matches2.length === 0 ? (
                  <div className="px-2.5 py-4 text-center text-mini text-ink-muted md:px-2">
                    No matches.
                  </div>
                ) : (
                  matches2.map((f) => (
                    <ComboboxItem key={f} onSelect={() => setQuery2(f)}>
                      {f}
                    </ComboboxItem>
                  ))
                )}
              </ComboboxSection>
            </ComboboxPopup>
          </Combobox>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Multi-select filter</SectionLabel>
        <div className="max-w-sm">
          <Combobox
            value={multiQuery}
            onValueChange={setMultiQuery}
            placeholder="Filter by framework…"
          >
            <ComboboxInput prefix={<MagnifyingGlass />} />
            <ComboboxPopup>
              {multiMatches.length === 0 ? (
                <div className="px-2.5 py-4 text-center text-mini text-ink-muted md:px-2">
                  No matches.
                </div>
              ) : (
                multiMatches.map((f) => (
                  <ComboboxCheckboxItem
                    key={f}
                    checked={selected.includes(f)}
                    onCheckedChange={() => toggle(f)}
                  >
                    {f}
                  </ComboboxCheckboxItem>
                ))
              )}
            </ComboboxPopup>
          </Combobox>
          {selected.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selected.map((s) => (
                <Badge key={s} variant="default" contrast="low">
                  {s}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
