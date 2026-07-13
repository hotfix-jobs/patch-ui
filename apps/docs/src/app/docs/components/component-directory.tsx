"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, Input } from "@patchui/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import groups from "@/lib/component-directory.json";

export function ComponentDirectory() {
  const [query, setQuery] = useState("");
  const visibleGroups = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(([title, , description]) =>
          `${title} ${description}`.toLowerCase().includes(normalized),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <div className="mt-6">
      <Input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search components"
        aria-label="Search components"
        className="max-w-md"
        prefix={<MagnifyingGlass />}
        suffix={query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="inline-flex size-5 items-center justify-center rounded-[var(--radius-8)] text-ink-muted outline-none hover:bg-layer-hover hover:text-ink focus-visible:text-ink"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        ) : undefined}
      />
      <div className="mt-8 space-y-10">
        {visibleGroups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-4 text-title2 text-ink">{group.title}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.items.map(([title, slug, description]) => (
                <Card
                  key={slug}
                  actionable
                  className="p-4"
                  render={<Link href={`/docs/components/${slug}`} />}
                >
                  <p className="text-small font-medium text-ink">{title}</p>
                  <p className="mt-1 text-small text-ink-muted">{description}</p>
                </Card>
              ))}
            </div>
          </section>
        ))}
        {visibleGroups.length === 0 && (
          <p className="rounded-[var(--radius-12)] bg-layer-1 p-6 text-small text-ink-muted">
            No components match “{query}”.
          </p>
        )}
      </div>
    </div>
  );
}
