"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

export interface AppHeaderProps extends useRender.ComponentProps<"header"> {
  /**
   * When true (default), renders a hairline bottom border. Set false for
   * borderless headers (e.g. headers laid over a hero image).
   */
  bordered?: boolean;
  /**
   * When true, pins the header to the top of its scroll container via
   * `sticky top-0 z-50`. Default false (relative flow).
   */
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
      bordered && "border-b border-[var(--gray-alpha-400)]",
      sticky ? "sticky top-0 z-50" : "relative",
      className,
    ),
    "data-slot": "app-header",
    children: (
      <div className="flex w-full items-center gap-4 px-6 py-3.5 md:gap-10 md:px-12 lg:px-16">
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

export type AppHeaderBrandProps = useRender.ComponentProps<"div">;

export function AppHeaderBrand({
  className,
  render,
  ...props
}: AppHeaderBrandProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex-shrink-0 font-semibold text-copy-18 tracking-[-0.025em] text-gray-1000",
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

export type AppHeaderNavProps = useRender.ComponentProps<"nav">;

export function AppHeaderNav({
  className,
  render,
  ...props
}: AppHeaderNavProps): React.ReactElement {
  const defaultProps = {
    className: cn("flex items-center gap-7", className),
    "data-slot": "app-header-nav",
  };

  return useRender({
    defaultTagName: "nav",
    props: mergeProps<"nav">(defaultProps, props),
    render,
  });
}

export interface AppHeaderNavItemProps extends useRender.ComponentProps<"a"> {
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
      "text-label-13 font-medium tracking-[-0.005em] transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
      active
        ? "text-gray-1000"
        : "text-gray-900 hover:text-gray-1000",
      className,
    ),
    "data-slot": "app-header-nav-item",
    "data-active": active ? "" : undefined,
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}

export type AppHeaderRightProps = useRender.ComponentProps<"div">;

export function AppHeaderRight({
  className,
  render,
  ...props
}: AppHeaderRightProps): React.ReactElement {
  const defaultProps = {
    className: cn("ml-auto flex items-center gap-3", className),
    "data-slot": "app-header-right",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
