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
  cn,
} from "@patchui/react";
import { navigation } from "@/lib/navigation";

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
export const SEARCH_OPEN_EVENT = "docs-search:open";
export function requestSearchOpen() {
  window.dispatchEvent(new CustomEvent(SEARCH_OPEN_EVENT));
}

type FlatItem = { title: string; href: string; group: string };

const FLAT_ITEMS: FlatItem[] = navigation.flatMap((g) =>
  g.items.map((i) => ({ title: i.title, href: i.href, group: g.title })),
);

const HREF_TO_GROUP: Record<string, string> = Object.fromEntries(
  navigation.flatMap((g) => g.items.map((i) => [i.href, g.title])),
);

export function SearchTrigger({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={requestSearchOpen}
      aria-label="Search docs"
      title="Search docs (⌘K)"
      className={cn(
        "inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-surface-1 hover:text-ink",
        className,
      )}
    >
      <MagnifyingGlass className="size-4" aria-hidden />
    </button>
  );
}

export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [mini, setMini] = useState<MiniSearch | null>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener(SEARCH_OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(SEARCH_OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

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
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      value={query}
      onValueChange={setQuery}
      filteredItems={results}
    >
      <CommandInput placeholder="Search documentation..." prefix={<MagnifyingGlass />} />
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
              <span className="shrink-0 text-caption-12 text-ink-muted">
                {item.group}
              </span>
            </CommandItem>
          )}
        </CommandCollection>
      </CommandList>
    </CommandDialog>
  );
}
