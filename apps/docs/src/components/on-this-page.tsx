"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn, Select, SelectItem } from "@patchui/react";

interface HeadingLink {
  id: string;
  label: string;
  depth: 2 | 3;
}

function usePageHeadings() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<HeadingLink[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const article = document.querySelector('[data-slot="docs-article"]');
    const scrollRoot = document.querySelector('[data-slot="docs-scroll"]');
    if (!article || !scrollRoot) return;

    const elements = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
    );
    const nextHeadings = elements.map((heading) => ({
      id: heading.id,
      label: heading.textContent?.trim() ?? heading.id,
      depth: Number(heading.tagName.slice(1)) as 2 | 3,
    }));
    setHeadings(nextHeadings);
    setActiveId(nextHeadings[0]?.id ?? "");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { root: scrollRoot, rootMargin: "-16px 0px -70% 0px" },
    );
    elements.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [pathname]);

  return { headings, activeId };
}

export function MobileOnThisPage() {
  const { headings, activeId } = usePageHeadings();
  if (headings.length < 2) return null;

  return (
    <div className="mt-5 xl:hidden">
      <label htmlFor="mobile-on-this-page" className="mb-2 block text-mini font-medium text-ink-muted">
        On this page
      </label>
      <Select
        id="mobile-on-this-page"
        size="md"
        value={activeId || headings[0]?.id}
        onValueChange={(id) => {
          const heading = document.getElementById(id);
          if (!heading) return;
          window.history.replaceState(null, "", `#${id}`);
          heading.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        renderValue={(id) => headings.find((heading) => heading.id === id)?.label}
      >
        {headings.map((heading) => (
          <SelectItem key={heading.id} value={heading.id}>
            {heading.depth === 3 ? `↳ ${heading.label}` : heading.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export function OnThisPage() {
  const { headings, activeId } = usePageHeadings();
  if (headings.length < 2) return null;

  return (
    <aside className="sticky top-6 hidden max-h-[calc(100vh-5rem)] self-start overflow-y-auto xl:block">
      <nav aria-label="On this page">
        <p className="mb-3 text-mini font-medium text-ink">On this page</p>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? "location" : undefined}
                className={cn(
                  "block rounded-[var(--radius-8)] py-1 text-mini transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:text-ink",
                  heading.depth === 3 ? "ps-3 pe-2" : "px-2",
                  activeId === heading.id
                    ? "bg-layer-hover text-ink"
                    : "text-ink-muted",
                )}
              >
                {heading.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
