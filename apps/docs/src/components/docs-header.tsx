"use client";

import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";
import { Breadcrumb, SidebarTrigger } from "@patchui/react";
import { ThemeToggle } from "./theme-toggle";
import { SearchTrigger } from "./docs-search";
import { navigation } from "@/lib/navigation";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.09 3.29 9.4 7.87 10.93.58.11.79-.25.79-.55 0-.27-.01-1.15-.02-2.08-3.2.7-3.87-1.4-3.87-1.4-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.5 3.18-1.18 3.18-1.18.63 1.59.23 2.77.12 3.06.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.42-5.27 5.7.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.53 11.53 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}

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
        <PanelLeft className="size-4" aria-hidden />
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
          <GithubIcon className="size-4" />
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
