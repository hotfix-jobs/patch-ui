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
import { selectionFocus } from "../recipes";
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
  side?: "left" | "right";
  /** Toggle shortcut, e.g. `mod+b`. Set `null` to disable. */
  shortcut?: string | null;
  children: React.ReactNode;
}

/** Provides sidebar open state and toggle shortcut. */
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
  collapsible?: "offcanvas" | "none";
  /** Round the desktop sidebar surface. */
  rounded?: boolean;
  /** Add a hairline boundary around the desktop sidebar surface. */
  bordered?: boolean;
  /** Fixed pixel width. */
  width?: number;
  /** Offset from top of viewport, in pixels. */
  topOffset?: number;
}

/** Fixed-position column on desktop, slide-out drawer on mobile. */
export function Sidebar({
  collapsible = "offcanvas",
  rounded = false,
  bordered = false,
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
        <div
          className={cn(
            "relative h-svh w-[var(--sidebar-width)] transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            collapsed && "w-0",
          )}
        />
        <aside
          data-slot="sidebar"
          className={cn(
            "fixed inset-y-0 z-30 flex w-[var(--sidebar-width)] flex-col bg-layer-1 transition-[transform,left,right] duration-[var(--duration-overlay)] ease-[var(--ease-standard)]",
            "top-[var(--sidebar-top)] h-[calc(100svh-var(--sidebar-top))]",
            side === "left" ? "left-0" : "right-0",
            rounded && "overflow-hidden rounded-[var(--radius-12)]",
            bordered && "border border-hairline",
            collapsed &&
              (side === "left" ? "-translate-x-full" : "translate-x-full"),
            className,
          )}
          {...props}
        >
          {children}
        </aside>
      </div>

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

export type SidebarInsetProps = React.HTMLAttributes<HTMLElement>;

/** Main content column that sits alongside the sidebar. */
export function SidebarInset({
  className,
  ...props
}: SidebarInsetProps): React.ReactElement {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex min-h-svh w-full flex-1 flex-col bg-base",
        className,
      )}
      {...props}
    />
  );
}

/* --------------------------- Compound slots --------------------------- */

export type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>;

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

export type SidebarContentProps = React.HTMLAttributes<HTMLDivElement>;

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

export type SidebarFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarFooter({
  className,
  ...props
}: SidebarFooterProps): React.ReactElement {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "flex shrink-0 flex-col gap-2 p-3",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------- Group ------------------------------- */

export type SidebarGroupProps = React.HTMLAttributes<HTMLDivElement>;

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

export type SidebarGroupLabelProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarGroupLabel({
  className,
  ...props
}: SidebarGroupLabelProps): React.ReactElement {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn("px-2 pt-2 text-mini font-medium text-ink-muted", className)}
      {...props}
    />
  );
}

/* -------------------------------- Menu -------------------------------- */

export type SidebarMenuProps = React.HTMLAttributes<HTMLUListElement>;

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

export type SidebarMenuItemProps = React.LiHTMLAttributes<HTMLLIElement>;

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
      "flex w-full items-center gap-2 rounded-[var(--radius-8)] px-2 py-1.5 text-small transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
      active
        ? "bg-layer-selected font-medium text-ink"
        : "text-ink-muted hover:bg-layer-hover hover:text-ink",
      "active:bg-layer-selected disabled:pointer-events-none disabled:opacity-50",
      selectionFocus,
      className,
    ),
  };
  return useRender({
    render: render ?? <button type="button" />,
    props: mergeProps<"button">(defaultProps, props),
  });
}

/* ------------------------------- Trigger ------------------------------ */

export type SidebarTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

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
        "inline-flex size-9 items-center justify-center rounded-[var(--radius-8)] text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover active:bg-layer-selected disabled:pointer-events-none disabled:opacity-50",
        selectionFocus,
        className,
      )}
      {...props}
    />
  );
}
