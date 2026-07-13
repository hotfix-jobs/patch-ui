"use client";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@patchui/react";
import {
  FileText,
  Gear,
  House,
  SquaresFour,
} from "@phosphor-icons/react/dist/ssr";

const items = [
  { label: "Overview", href: "/docs", icon: House, active: true },
  { label: "Projects", href: "/docs/components/card", icon: SquaresFour },
  { label: "Documentation", href: "/docs/getting-started", icon: FileText },
  { label: "Settings", href: "/docs/theme", icon: Gear },
];

export function SidebarDemo() {
  return (
    <aside className="flex h-96 w-64 flex-col overflow-hidden rounded-[var(--radius-12)] bg-layer-1">
      <SidebarHeader className="h-14 justify-center px-3">
        <span className="px-2 text-regular font-medium text-ink">Workspace</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    active={item.active}
                    render={<a href={item.href} />}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="px-2 text-mini text-ink-muted">Ada Lovelace</span>
      </SidebarFooter>
    </aside>
  );
}
