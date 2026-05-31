"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

export interface AppHeaderProps extends useRender.ComponentProps<"header"> {}

export function AppHeader({
  className,
  render,
  children,
  ...props
}: AppHeaderProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative bg-patch-surface border-b-[0.5px] border-[var(--patch-border)]",
      className,
    ),
    "data-slot": "app-header",
    children: (
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-3.5 sm:gap-10 sm:px-8">
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

export interface AppHeaderBrandProps extends useRender.ComponentProps<"div"> {}

export function AppHeaderBrand({
  className,
  render,
  ...props
}: AppHeaderBrandProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex-shrink-0 font-semibold text-[length:var(--text-patch-lead)] tracking-[-0.025em] text-patch-text",
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

export interface AppHeaderNavProps extends useRender.ComponentProps<"nav"> {}

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
      "text-[length:var(--text-patch-control)] font-medium tracking-[-0.005em] transition-colors duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)]",
      active
        ? "text-patch-text"
        : "text-patch-text-secondary hover:text-patch-text",
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

export interface AppHeaderRightProps extends useRender.ComponentProps<"div"> {}

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
