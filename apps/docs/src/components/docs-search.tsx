"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import MiniSearch from "minisearch";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandCollection,
  CommandItem,
} from "@patchui/react";
import { navigation } from "@/lib/navigation";

type FlatItem = { title: string; href: string; group: string };

const FLAT_ITEMS: FlatItem[] = navigation.flatMap((g) =>
  g.items.map((i) => ({ title: i.title, href: i.href, group: g.title })),
);

const HREF_TO_GROUP: Record<string, string> = Object.fromEntries(
  navigation.flatMap((g) => g.items.map((i) => [i.href, g.title])),
);

export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [mini, setMini] = useState<MiniSearch | null>(null);

  // Lazily load the full-text index the first time search is opened.
  useEffect(() => {
    if (!open || mini) return;
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((docs) => {
        if (cancelled) return;
        const ms = new MiniSearch({
          fields: ["title", "content"],
          storeFields: ["title", "href"],
          searchOptions: {
            boost: { title: 3 },
            prefix: true,
            fuzzy: 0.2,
            combineWith: "AND",
          },
        });
        ms.addAll(docs);
        setMini(ms);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [open, mini]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Empty query shows everything; otherwise fuzzy-match via MiniSearch.
  const results = useMemo<FlatItem[]>(() => {
    const q = query.trim();
    if (!q) return FLAT_ITEMS;
    if (mini) {
      return mini
        .search(q)
        .slice(0, 24)
        .map((r) => ({
          title: r.title as string,
          href: r.href as string,
          group: HREF_TO_GROUP[r.href as string] ?? "Docs",
        }));
    }
    const lq = q.toLowerCase();
    return FLAT_ITEMS.filter(
      (it) =>
        it.title.toLowerCase().includes(lq) ||
        it.group.toLowerCase().includes(lq),
    );
  }, [query, mini]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-6)] border-[0.5px] border-gray-alpha-400 bg-background-100 px-3 py-1.5 text-label-13 text-gray-800 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-gray-alpha-100 hover:text-gray-1000 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
      >
        <SearchIcon size={14} />
        <span>Search docs</span>
        <kbd className="pointer-events-none ml-4 inline-flex h-5 select-none items-center gap-0.5 rounded border-[0.5px] border-gray-alpha-400 bg-background-100 px-1.5 font-mono text-[10px] font-medium text-gray-700">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex md:hidden cursor-pointer size-9 items-center justify-center rounded-full text-gray-900 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-gray-alpha-100 hover:text-gray-1000 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
        aria-label="Search docs"
      >
        <SearchIcon size={16} />
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        value={query}
        onValueChange={setQuery}
        filteredItems={results}
      >
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandCollection>
            {(item: FlatItem) => (
              <CommandItem
                key={item.href}
                value={item.href}
                onClick={() => go(item.href)}
                className="justify-between gap-3"
              >
                <span className="truncate">{item.title}</span>
                <span className="shrink-0 text-label-12 text-gray-800">
                  {item.group}
                </span>
              </CommandItem>
            )}
          </CommandCollection>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function SearchIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-gray-800"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
