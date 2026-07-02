"use client";

import { useState, useMemo } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxItem,
} from "@patchui/react";
import { Info, Search } from "lucide-react";

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

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function ComboboxDemo() {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [query2, setQuery2] = useState("");

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

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label>Basic — with search icon, chevron, and clearable</Label>
        <div className="max-w-sm">
          <Combobox>
            <ComboboxInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              prefix={<Search />}
              prefixStyling={false}
              placeholder="Search…"
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
                <div>
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

      <div>
        <Label>Custom content (recents section, banner)</Label>
        <div className="max-w-sm">
          <Combobox>
            <ComboboxInput
              value={query2}
              onChange={(e) => setQuery2(e.target.value)}
              prefix={<Search />}
              prefixStyling={false}
              placeholder="Search frameworks…"
              clearable
              onClear={() => setQuery2("")}
            />
            <ComboboxPopup>
              <div className="flex items-center gap-1.5 border-b border-gray-alpha-400 px-3 py-2 text-label-12 text-gray-800">
                <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>Recents shown first</span>
              </div>

              {needle2 === "" && RECENT.length > 0 && (
                <div className="border-b border-gray-alpha-400 py-1">
                  <div className="px-3 pb-1 pt-1 text-label-12 font-medium uppercase tracking-tight text-gray-800">
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

              <div className="p-1">
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
    </div>
  );
}
