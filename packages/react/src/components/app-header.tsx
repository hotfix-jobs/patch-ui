"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

/**
 * AppHeader — patch-ui extension for consistent top-of-page chrome.
 *
 * Compound: AppHeader / AppHeaderBrand / AppHeaderNav / AppHeaderNavItem
 * / AppHeaderRight. Matches Vercel Geist header dimensions and typography
 * so headers across dashboards feel consistent (hairline bottom border,
 * compact vertical rhythm, muted-to-primary text on hover, and an
 * underline indicator for the active nav item).
 */

export interface AppHeaderProps extends useRender.ComponentProps<"header"> {
  /** Hairline bottom border. Default true. */
  bordered?: boolean;
  /** Pin the header to the top of its scroll container. Default false. */
  sticky?: boolean;
}

export function AppHeader({
  className,
  bordered = true,
  sticky = false,
  render,
  children,
  ...props
}: AppHeaderProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "bg-background-100",
      bordered && "border-b border-gray-alpha-400",
      sticky ? "sticky top-0 z-50" : "relative",
      className,
    ),
    "data-slot": "app-header",
    children: (
      // Compact Vercel-style rhythm: 56px total (py-3 = 12px each side + 32px content).
      // Horizontal padding scales with breakpoint; nav gap is tight so items sit
      // close together like a real product header.
      <div className="flex w-full items-center gap-6 px-4 py-3 md:px-6 md:gap-8">
        {children}
      </div>
    ),
  };

  return useRender({
    defaultTagName: "header",
    props: mergeProps<"header">(defaultProps, props),
    render,
  });
}

/* ------------------------------ Brand -------------------------------- */

export type AppHeaderBrandProps = useRender.ComponentProps<"div">;

export function AppHeaderBrand({
  className,
  render,
  ...props
}: AppHeaderBrandProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex shrink-0 items-center gap-2 text-heading-16 text-gray-1000",
      className,
    ),
    "data-slot": "app-header-brand",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

/* ------------------------------- Nav --------------------------------- */

export type AppHeaderNavProps = useRender.ComponentProps<"nav">;

export function AppHeaderNav({
  className,
  render,
  ...props
}: AppHeaderNavProps): React.ReactElement {
  const defaultProps = {
    className: cn("flex items-center gap-6", className),
    "data-slot": "app-header-nav",
  };

  return useRender({
    defaultTagName: "nav",
    props: mergeProps<"nav">(defaultProps, props),
    render,
  });
}

export interface AppHeaderNavItemProps extends useRender.ComponentProps<"a"> {
  /** Marks this item as the current page — draws a 2px gray-1000 underline. */
  active?: boolean;
}

export function AppHeaderNavItem({
  className,
  active,
  render,
  ...props
}: AppHeaderNavItemProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      // Underline active-state indicator sits at -bottom-3 to hit the
      // container's bottom border. Reserves the space via padding so
      // inactive items don't jump when the underline appears on hover.
      "relative py-4 -my-4 text-copy-14 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
      active
        ? "text-gray-1000 after:absolute after:-bottom-px after:left-0 after:right-0 after:h-[2px] after:bg-gray-1000"
        : "text-gray-800 hover:text-gray-1000",
      className,
    ),
    "data-slot": "app-header-nav-item",
    "data-active": active ? "" : undefined,
    "aria-current": active ? ("page" as const) : undefined,
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}

/* ------------------------------- Right ------------------------------- */

export type AppHeaderRightProps = useRender.ComponentProps<"div">;

export function AppHeaderRight({
  className,
  render,
  ...props
}: AppHeaderRightProps): React.ReactElement {
  const defaultProps = {
    className: cn("ms-auto flex items-center gap-2", className),
    "data-slot": "app-header-right",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
