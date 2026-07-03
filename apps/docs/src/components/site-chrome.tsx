"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@patchui/react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

/**
 * SiteChrome — picks the right layout for the current route.
 *
 * - Docs routes: no global header at root. DocsLayout renders Sidebar +
 *   SidebarInset (which contains its own top bar). SidebarProvider owns
 *   the open state and the Cmd+B keyboard shortcut.
 * - Marketing routes: plain top-header + children + footer stack.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");

  if (isDocs) {
    return <SidebarProvider defaultOpen>{children}</SidebarProvider>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
