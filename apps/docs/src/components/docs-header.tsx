"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, SidebarTrigger } from "@patchui/react";
import { ThemeToggle } from "./theme-toggle";
import { SearchTrigger } from "./docs-search";
import { navigation } from "@/lib/navigation";

import { GithubLogo, SidebarSimple } from "@phosphor-icons/react/dist/ssr";

function breadcrumbFromPath(pathname: string): { name: string; href?: string }[] {
  const items: { name: string; href?: string }[] = [
    { name: "Docs", href: "/docs" },
  ];

  for (const group of navigation) {
    for (const item of group.items) {
      if (item.href === pathname) {
        items.push({ name: group.title });
        items.push({ name: item.title });
        return items;
      }
    }
  }

  const segs = pathname.split("/").filter(Boolean).slice(1);
  for (let i = 0; i < segs.length; i++) {
    const isLast = i === segs.length - 1;
    const title = segs[i]
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
    items.push({
      name: title,
      href: isLast ? undefined : "/docs/" + segs.slice(0, i + 1).join("/"),
    });
  }
  return items;
}

export function DocsHeader() {
  const pathname = usePathname();
  const crumbs = breadcrumbFromPath(pathname);

  return (
    <header
      data-slot="docs-header"
      className="flex h-14 shrink-0 items-center gap-3 border-b border-hairline bg-canvas px-4"
    >
      <SidebarTrigger
        title="Toggle sidebar (⌘B)"
        className="lg:hidden"
      >
        <SidebarSimple className="size-4" aria-hidden />
      </SidebarTrigger>

      <Breadcrumb items={crumbs} className="min-w-0 flex-1 truncate" />

      <div className="ms-auto flex shrink-0 items-center gap-2">
        <SearchTrigger className="lg:hidden" />
        <a
          href="https://github.com/hotfix-jobs/patch-ui"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="inline-flex size-8 items-center justify-center rounded-full text-ink-muted transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-surface-1 hover:text-ink"
        >
          <GithubLogo className="size-4" aria-hidden />
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
