"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@patchui/react";

/**
 * Sidebar — the docs navigation column, built with the @patchui/sidebar
 * primitives. State (open/closed on desktop, open/closed on mobile
 * drawer) lives in the SidebarProvider in the root layout.
 */
export function Sidebar() {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  return (
    <SidebarRoot>
      <SidebarHeader className="border-b-[0.5px] border-gray-alpha-400">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-[var(--radius-6)] px-2 py-1.5 text-heading-16 text-gray-1000 hover:bg-gray-alpha-100"
        >
          <span
            className="flex size-6 items-center justify-center rounded-[var(--radius-6)] bg-gray-1000 text-background-100 text-heading-14"
            aria-hidden
          >
            P
          </span>
          Patch UI
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group, gi) => (
          <SidebarGroup key={group.title} className={gi > 0 ? "mt-2 border-t border-gray-alpha-400 pt-4" : ""}>
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
