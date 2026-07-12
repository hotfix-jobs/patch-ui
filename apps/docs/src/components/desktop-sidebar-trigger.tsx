"use client";

import { SidebarTrigger, useSidebar } from "@patchui/react";
import { SidebarSimple } from "@phosphor-icons/react/dist/ssr";

export function DesktopSidebarTrigger() {
  const { open } = useSidebar();
  if (open) return null;

  return (
    <SidebarTrigger
      title="Open sidebar (⌘B)"
      className="fixed left-3 top-3 z-20 hidden bg-layer-1 shadow-tooltip lg:inline-flex"
    >
      <SidebarSimple className="size-4" aria-hidden />
    </SidebarTrigger>
  );
}
