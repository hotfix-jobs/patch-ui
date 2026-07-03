"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";
import { Sheet, SheetContent } from "./sheet";

/* --------------------------- Context / hook --------------------------- */

interface SidebarContextValue {
  /** Desktop (lg+) open/closed. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Mobile drawer open/closed. Tracked separately from desktop. */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  /** Toggles the appropriate state based on current viewport. */
  toggle: () => void;
  /** `left` (default) or `right`. */
  side: "left" | "right";
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return ctx;
}

export interface SidebarProviderProps {
  /** Initial open state. Default true (visible on desktop). */
  defaultOpen?: boolean;
  /** Controlled open state (desktop). */
  open?: boolean;
  /** Called when the desktop open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Which side of the viewport the sidebar occupies. Default `left`. */
  side?: "left" | "right";
  /**
   * Global keyboard shortcut that toggles the sidebar. `mod+b` = Cmd+B on
   * Mac, Ctrl+B on Windows/Linux. Set `null` to disable.
   */
  shortcut?: string | null;
  children: React.ReactNode;
}

/**
 * SidebarProvider — wraps the section of your app that contains a Sidebar
 * plus its trigger and content. Owns the open/closed state so triggers
 * and rails can toggle from anywhere in the subtree.
 *
 * A single Cmd+B / Ctrl+B keyboard shortcut is wired by default; pass
 * `shortcut={null}` to disable, or a different key like `"mod+i"`.
 */
export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  side = "left",
  shortcut = "mod+b",
  children,
}: SidebarProviderProps): React.ReactElement {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = openProp ?? uncontrolled;
  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const [openMobile, setOpenMobile] = useState(false);

  const toggle = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setOpenMobile((v) => !v);
    } else {
      setOpen(!open);
    }
  }, [open, setOpen]);

  // Cmd/Ctrl + <key> keyboard shortcut. `mod+b` is the widely-recognized
  // toggle (VS Code, Notion, Linear). Pass a custom key or `null` to disable.
  useEffect(() => {
    if (!shortcut) return;
    const match = /^mod\+(.+)$/i.exec(shortcut);
    if (!match) return;
    const key = match[1].toLowerCase();
    const handler = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key.toLowerCase() !== key) return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcut, toggle]);

  const value = useMemo<SidebarContextValue>(
    () => ({ open, setOpen, openMobile, setOpenMobile, toggle, side }),
    [open, setOpen, openMobile, toggle, side],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        className="flex min-h-svh w-full"
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

/* ------------------------------ Sidebar ------------------------------ */

export interface SidebarProps extends useRender.ComponentProps<"aside"> {
  /**
   * How the sidebar behaves when closed:
   * - `offcanvas` (default): slides out of view, drawer-style on mobile
   * - `none`: no collapse behavior, always visible on desktop
   */
  collapsible?: "offcanvas" | "none";
  /** Fixed pixel width. Default 256. */
  width?: number;
  /** Offset from the top of the viewport, in pixels. Default 0. Use to sit below a fixed header (e.g. 56). */
  topOffset?: number;
}

/**
 * Sidebar — the actual panel. Fixed-position column on desktop, slide-out
 * drawer on mobile. Compose child slots (SidebarHeader, SidebarContent,
 * SidebarFooter) to structure the content inside.
 *
 *   <SidebarProvider>
 *     <Sidebar>
 *       <SidebarHeader>Brand</SidebarHeader>
 *       <SidebarContent>{navItems}</SidebarContent>
 *       <SidebarFooter>User menu</SidebarFooter>
 *     </Sidebar>
 *     <main>{content}</main>
 *   </SidebarProvider>
 */
export function Sidebar({
  collapsible = "offcanvas",
  width = 256,
  topOffset = 0,
  className,
  children,
  ...props
}: SidebarProps): React.ReactElement {
  const { open, openMobile, setOpenMobile, side } = useSidebar();
  const collapsed = collapsible === "offcanvas" && !open;

  const dimensionVars = {
    ["--sidebar-width" as string]: `${width}px`,
    ["--sidebar-top" as string]: `${topOffset}px`,
  } as React.CSSProperties;

  return (
    <>
      {/* Desktop: sidebar renders as TWO divs — a spacer that reserves
          width in flex flow so SidebarInset flows to its right without
          manual padding, and a fixed-position visual column. This is the
          same trick shadcn/ui uses. */}
      <div
        data-slot="sidebar-container"
        data-state={open ? "open" : "closed"}
        data-side={side}
        style={dimensionVars}
        className={cn(
          "group peer hidden lg:block",
          collapsed && "lg:w-0",
        )}
      >
        {/* Spacer: reserves width in the parent flex row. */}
        <div
          className={cn(
            "relative h-svh w-[var(--sidebar-width)] transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            collapsed && "w-0",
          )}
        />
        {/* Visual: fixed positioning so the sidebar always sits pinned to
            its side of the viewport, regardless of page scroll. */}
        <aside
          data-slot="sidebar"
          className={cn(
            "fixed inset-y-0 z-30 flex w-[var(--sidebar-width)] flex-col bg-background-100 transition-[transform,left,right] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "top-[var(--sidebar-top)] h-[calc(100svh-var(--sidebar-top))]",
            side === "left"
              ? "left-0 border-r border-gray-alpha-400"
              : "right-0 border-l border-gray-alpha-400",
            collapsed &&
              (side === "left" ? "-translate-x-full" : "translate-x-full"),
            className,
          )}
          {...props}
        >
          {children}
        </aside>
      </div>

      {/* Mobile drawer — delegates to <Sheet>. This gives us focus trap,
          escape-to-close, portal rendering, and role="dialog" aria for
          free instead of hand-rolling those on top of a fixed <aside>. */}
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side={side} className="w-64 p-0 lg:hidden">
          <div
            data-slot="sidebar-mobile"
            style={dimensionVars}
            className="flex h-full w-full flex-col"
          >
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

/* ------------------------------- Inset ------------------------------- */

export interface SidebarInsetProps
  extends React.HTMLAttributes<HTMLElement> {}

/**
 * SidebarInset — the main content column that sits alongside the sidebar.
 * Use as `<main>`; flex-1 so it grows to fill the space next to the
 * sidebar's fixed-width column. Matches shadcn's SidebarInset shape.
 *
 *   <SidebarProvider>
 *     <Sidebar>…</Sidebar>
 *     <SidebarInset>
 *       <header>…</header>
 *       <div>{children}</div>
 *     </SidebarInset>
 *   </SidebarProvider>
 */
export function SidebarInset({
  className,
  ...props
}: SidebarInsetProps): React.ReactElement {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex min-h-svh w-full flex-1 flex-col bg-background-100",
        className,
      )}
      {...props}
    />
  );
}

/* --------------------------- Compound slots --------------------------- */

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** SidebarHeader — sticky region at the top of the sidebar. Brand and search. */
export function SidebarHeader({
  className,
  ...props
}: SidebarHeaderProps): React.ReactElement {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex shrink-0 flex-col gap-2 p-3", className)}
      {...props}
    />
  );
}

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** SidebarContent — scrollable middle region. Wrap SidebarGroup(s). */
export function SidebarContent({
  className,
  ...props
}: SidebarContentProps): React.ReactElement {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3",
        className,
      )}
      {...props}
    />
  );
}

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** SidebarFooter — sticky region at the bottom of the sidebar. User menu, attribution. */
export function SidebarFooter({
  className,
  ...props
}: SidebarFooterProps): React.ReactElement {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "flex shrink-0 flex-col gap-2 border-t-[0.5px] border-gray-alpha-400 p-3",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------- Group ------------------------------- */

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/** SidebarGroup — a titled cluster of menu items. */
export function SidebarGroup({
  className,
  ...props
}: SidebarGroupProps): React.ReactElement {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

/** SidebarGroupLabel — small label above a group. Uses the button-12 recipe for a medium 12px caption. */
export function SidebarGroupLabel({
  className,
  ...props
}: SidebarGroupLabelProps): React.ReactElement {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn("px-2 pt-2 text-button-12 text-gray-800", className)}
      {...props}
    />
  );
}

/* -------------------------------- Menu -------------------------------- */

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

/** SidebarMenu — semantic <ul> wrapper for menu items. */
export function SidebarMenu({
  className,
  ...props
}: SidebarMenuProps): React.ReactElement {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  );
}

export interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

/** SidebarMenuItem — <li> wrapper for a single menu button/link. */
export function SidebarMenuItem({
  className,
  ...props
}: SidebarMenuItemProps): React.ReactElement {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("", className)}
      {...props}
    />
  );
}

export interface SidebarMenuButtonProps
  extends useRender.ComponentProps<"button"> {
  /** Currently active nav item. Sets aria-current="page" and highlights. */
  active?: boolean;
}

/**
 * SidebarMenuButton — the styled link/button used inside menu items.
 * Consumers pair with a Link/anchor via the `render` prop.
 */
export function SidebarMenuButton({
  active,
  className,
  render,
  ...props
}: SidebarMenuButtonProps): React.ReactElement {
  const defaultProps = {
    "data-slot": "sidebar-menu-button",
    "data-active": active || undefined,
    "aria-current": active ? ("page" as const) : undefined,
    className: cn(
      "flex w-full items-center gap-2 rounded-[var(--radius-6)] px-2 py-1.5 text-label-13 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
      active
        ? "bg-gray-alpha-100 font-medium text-gray-1000"
        : "text-gray-800 hover:bg-gray-alpha-100 hover:text-gray-1000",
      focusRing,
      className,
    ),
  };
  return useRender({
    render: render ?? <button type="button" />,
    props: mergeProps<"button">(defaultProps, props),
  });
}

/* ------------------------------- Trigger ------------------------------ */

export interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * SidebarTrigger — button that toggles the sidebar. Reads viewport size
 * (via useSidebar's toggle) to open the drawer on mobile or collapse/
 * expand on desktop.
 */
export function SidebarTrigger({
  className,
  onClick,
  ...props
}: SidebarTriggerProps): React.ReactElement {
  const { toggle } = useSidebar();
  return (
    <button
      type="button"
      data-slot="sidebar-trigger"
      aria-label="Toggle sidebar"
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggle();
      }}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-gray-1000 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-gray-alpha-100",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}
