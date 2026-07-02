"use client";

import { createContext, useContext, useState } from "react";
import type * as React from "react";

interface SidebarState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const SidebarStateContext = createContext<SidebarState | null>(null);

/**
 * SidebarStateProvider — hoists sidebar open/closed state above SiteHeader
 * and Sidebar so they can share it. Wrapped at the root layout so
 * SiteHeader (which knows nothing about docs) can render a mobile menu
 * button that opens the docs Sidebar (which is only mounted on /docs).
 */
export function SidebarStateProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SidebarStateContext.Provider
      value={{ open, setOpen, toggle: () => setOpen((v) => !v) }}
    >
      {children}
    </SidebarStateContext.Provider>
  );
}

export function useSidebarState(): SidebarState {
  const ctx = useContext(SidebarStateContext);
  if (!ctx) {
    // Called outside a docs page. Return a no-op so headers on marketing
    // pages don't crash. Menu button on those pages doesn't render anyway.
    return { open: false, setOpen: () => {}, toggle: () => {} };
  }
  return ctx;
}
