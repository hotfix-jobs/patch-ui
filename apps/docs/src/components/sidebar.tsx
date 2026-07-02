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
