"use client";

import { useState, useMemo } from "react";
import {
  Badge,
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxItem,
  SectionLabel,
} from "@patchui/react";
import { Info, Search, Check } from "lucide-react";

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
              prefix={<Search />}
              prefixStyling={false}
              clearable
              onClear={() => {
                setQuery("");
                setPicked(null);
              }}
            />
            <ComboboxPopup>
              {matches.length === 0 ? (
                <div className="px-3 py-6 text-center text-label-13 text-gray-800">
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
            <p className="mt-2 text-label-12 text-gray-800">Selected: {picked}</p>
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
              prefix={<Search />}
              prefixStyling={false}
              clearable
              onClear={() => setQuery2("")}
            />
            <ComboboxPopup>
              {/* Banner spans edge-to-edge: no padding needed on the popup body */}
              <div className="flex items-center gap-1.5 border-b border-gray-alpha-400 px-3 py-2 text-label-12 text-gray-800">
                <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>Recents shown first</span>
              </div>

              {needle2 === "" && RECENT.length > 0 && (
                <div className="border-b border-gray-alpha-400 py-1">
                  <div className="px-3 pb-1 pt-1 text-button-12 text-gray-800">
                    Recent
                  </div>
                  {RECENT.map((r) => (
                    <ComboboxItem
                      key={`recent-${r}`}
                      onSelect={() => setQuery2(r)}
                    >
                      {r}
                    </ComboboxItem>
                  ))}
                </div>
              )}

              <div className="py-1">
                {matches2.length === 0 ? (
                  <div className="px-3 py-4 text-center text-label-12 text-gray-800">
                    No matches.
                  </div>
                ) : (
                  matches2.map((f) => (
                    <ComboboxItem key={f} onSelect={() => setQuery2(f)}>
                      {f}
                    </ComboboxItem>
                  ))
                )}
              </div>
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
            <ComboboxInput prefix={<Search />} prefixStyling={false} />
            <ComboboxPopup>
              <div className="py-1">
                {multiMatches.length === 0 ? (
                  <div className="px-3 py-4 text-center text-label-12 text-gray-800">
                    No matches.
                  </div>
                ) : (
                  multiMatches.map((f) => {
                    const isSelected = selected.includes(f);
                    return (
                      <ComboboxItem
                        key={f}
                        closeOnSelect={false}
                        onSelect={() => toggle(f)}
                      >
                        <span className="flex flex-1 items-center justify-between gap-2">
                          <span>{f}</span>
                          {isSelected && (
                            <Check className="size-4 text-gray-1000" aria-hidden />
                          )}
                        </span>
                      </ComboboxItem>
                    );
                  })
                )}
              </div>
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
