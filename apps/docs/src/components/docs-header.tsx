"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@patchui/react";
import { ThemeToggle } from "./theme-toggle";
import { SearchTrigger } from "./docs-search";
import { navigation } from "@/lib/navigation";

import { SidebarSimple } from "@phosphor-icons/react/dist/ssr";

function titleFromPath(pathname: string) {
  for (const group of navigation) {
    for (const item of group.items) {
      if (item.href === pathname) return item.title;
    }
  }

  const segment = pathname.split("/").filter(Boolean).at(-1) ?? "Docs";
  return segment
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
}

export function DocsHeader() {
  const pathname = usePathname();
  const title = titleFromPath(pathname);

  return (
    <header
      data-slot="docs-header"
      className="flex h-14 shrink-0 items-center gap-3 bg-base px-4 lg:hidden"
    >
      <SidebarTrigger
        title="Toggle sidebar (⌘B)"
        className="lg:hidden"
      >
        <SidebarSimple className="size-4" aria-hidden />
      </SidebarTrigger>

      <span className="min-w-0 flex-1 truncate text-small font-medium text-ink">
        {title}
      </span>

      <div className="ms-auto flex shrink-0 items-center gap-2">
        <SearchTrigger />
        <ThemeToggle />
      </div>
    </header>
  );
}
