"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { SearchTrigger } from "./docs-search";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@patchui/react";
import { ThemeToggle } from "./theme-toggle";
import { GithubLogo, SidebarSimple } from "@phosphor-icons/react/dist/ssr";

export function Sidebar() {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <SidebarRoot rounded>
      <SidebarHeader className="h-14 flex-row items-center gap-2 px-3">
        <Link
          href="/"
          className="rounded-[var(--radius-8)] px-2 py-1 text-regular font-medium text-ink hover:bg-layer-hover active:bg-layer-hover"
        >
          Patch UI
        </Link>
        <div className="ms-auto">
          <SearchTrigger className="hidden lg:inline-flex" />
        </div>
        <SidebarTrigger
          title="Collapse sidebar (⌘B)"
          className="hidden lg:inline-flex"
        >
          <SidebarSimple className="size-4" aria-hidden />
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((group, gi) => (
          <SidebarGroup
            key={group.title}
            className={gi > 0 ? "pt-4 mt-2" : ""}
          >
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      active={isActive}
                      render={
                        <Link
                          ref={isActive ? activeRef : undefined}
                          href={item.href}
                        />
                      }
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="flex-row items-center justify-end gap-2 px-3">
        <a
          href="https://github.com/hotfix-jobs/patch-ui"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="inline-flex size-8 items-center justify-center rounded-[var(--radius-8)] text-ink-muted outline-none transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover hover:text-ink active:bg-layer-hover focus-visible:shadow-[inset_0_-2px_0_var(--focus-ring-color)]"
        >
          <GithubLogo className="size-4" aria-hidden />
        </a>
        <ThemeToggle className="hidden lg:inline-flex" />
      </SidebarFooter>
    </SidebarRoot>
  );
}
