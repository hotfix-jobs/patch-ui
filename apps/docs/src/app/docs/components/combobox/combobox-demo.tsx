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

export function ComboboxDemo() {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string | null>(null);

  const needle = query.trim().toLowerCase();
  const matches = useMemo(
    () => FRAMEWORKS.filter((f) => f.toLowerCase().includes(needle)),
    [needle],
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Basic — filterable list */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Basic
        </p>
        <div className="max-w-sm">
          <Combobox>
            <ComboboxInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              icon={<Search />}
              placeholder="Pick a framework..."
            />
            <ComboboxPopup>
              {matches.length === 0 ? (
                <div className="px-3 py-6 text-center text-[length:var(--text-patch-control)] text-patch-text-tertiary">
                  No matches.
                </div>
              ) : (
                <div className="p-1">
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
            <p className="mt-2 text-[length:var(--text-patch-mini)] text-patch-text-tertiary">
              Selected: {picked}
            </p>
          )}
        </div>
      </div>

      {/* Custom content — recents + suggestions + info banner */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Custom content (recents, banner)
        </p>
        <div className="max-w-sm">
          <Combobox>
            <ComboboxInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              icon={<Search />}
              placeholder="Search frameworks..."
            />
            <ComboboxPopup>
              {/* Info banner — arbitrary JSX, not a ComboboxItem */}
              <div className="flex items-center gap-1.5 border-b-[0.5px] border-patch-border px-3 py-2 text-[length:var(--text-patch-mini)] text-patch-text-tertiary">
                <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>Recents shown first</span>
              </div>

              {/* Recents section */}
              {needle === "" && RECENT.length > 0 && (
                <div className="border-b-[0.5px] border-patch-border p-1">
                  <div className="px-2 pb-1 pt-1 text-[length:var(--text-patch-micro)] font-medium uppercase tracking-[var(--tracking-patch-label)] text-patch-text-tertiary">
                    Recent
                  </div>
                  {RECENT.map((r) => (
                    <ComboboxItem
                      key={`recent-${r}`}
                      onSelect={() => {
                        setPicked(r);
                        setQuery(r);
                      }}
                    >
                      {r}
                    </ComboboxItem>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              <div className="p-1">
                {matches.length === 0 ? (
                  <div className="px-3 py-4 text-center text-[length:var(--text-patch-mini)] text-patch-text-tertiary">
                    No matches.
                  </div>
                ) : (
                  matches.map((f) => (
                    <ComboboxItem
                      key={f}
                      onSelect={() => {
                        setPicked(f);
                        setQuery(f);
                      }}
                    >
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
