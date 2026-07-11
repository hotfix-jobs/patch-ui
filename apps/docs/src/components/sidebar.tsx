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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@patchui/react";

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
          className="rounded-[var(--radius-8)] px-2 py-1 text-regular font-medium text-ink hover:bg-layer-hover active:bg-layer-selected"
        >
          Patch UI
        </Link>
        <div className="ms-auto">
          <SearchTrigger className="hidden lg:inline-flex" />
        </div>
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
    </SidebarRoot>
  );
}
