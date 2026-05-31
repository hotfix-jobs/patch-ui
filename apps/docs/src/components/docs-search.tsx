"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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
  const miniRef = useRef<MiniSearch | null>(null);
  const [indexReady, setIndexReady] = useState(false);

  // Lazily load the full-text index the first time search is opened.
  useEffect(() => {
    if (!open || miniRef.current) return;
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
        miniRef.current = ms;
        setIndexReady(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [open]);

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
    if (miniRef.current && indexReady) {
      return miniRef.current
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
  }, [query, indexReady]);

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
        className="hidden md:inline-flex items-center gap-2 rounded-[var(--radius-patch-sm)] border border-patch-border bg-patch-surface px-3 py-1.5 text-sm text-patch-text-tertiary transition-colors hover:border-patch-border-hover hover:text-patch-text-secondary"
      >
        <SearchIcon size={14} />
        <span>Search docs...</span>
        <kbd className="pointer-events-none ml-4 inline-flex h-5 select-none items-center gap-0.5 rounded border border-patch-border bg-patch-bg px-1.5 font-mono text-[10px] font-medium text-patch-text-quaternary">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex md:hidden h-8 w-8 items-center justify-center rounded-[var(--radius-patch-sm)] text-patch-text-secondary transition-colors hover:bg-patch-surface-hover hover:text-patch-text"
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
                <span className="shrink-0 text-[length:var(--text-patch-micro)] text-patch-text-tertiary">
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
      className="shrink-0 text-patch-text-tertiary"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
