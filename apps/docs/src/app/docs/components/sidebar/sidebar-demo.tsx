"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@patchui/react";
import { FileText, Home, LayoutDashboard, Settings, Users } from "lucide-react";

const NAV = [
  { icon: Home, label: "Overview", active: true },
  { icon: LayoutDashboard, label: "Projects" },
  { icon: Users, label: "Team" },
  { icon: FileText, label: "Docs" },
  { icon: Settings, label: "Settings" },
];

export function SidebarDemo() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-12)] border border-gray-alpha-400">
      <SidebarProvider defaultOpen>
        <Sidebar width={224}>
          <SidebarHeader className="border-b-[0.5px] border-gray-alpha-400">
            <div className="px-2 py-1 text-heading-16 text-gray-1000">
              Acme
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarMenu>
                {NAV.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton active={item.active}>
                      <item.icon className="size-4" aria-hidden />
                      {item.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b-[0.5px] border-gray-alpha-400 px-3">
            <SidebarTrigger title="Toggle sidebar (⌘B)" />
            <span className="text-copy-14 text-gray-800">Overview</span>
          </header>
          <div className="min-h-[220px] p-6 text-copy-14 text-gray-900">
            Main content flows here. Try the toggle in the header or press
            <span className="mx-1 font-mono text-label-12 text-gray-1000">⌘B</span>
            to collapse the sidebar.
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
