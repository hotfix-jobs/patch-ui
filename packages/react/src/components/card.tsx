"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export interface CardProps extends useRender.ComponentProps<"div"> {
  /** Show a visible border. */
  border?: boolean;
  /** Add a subtle hover state (bg shift + optional border darken). */
  hoverable?: boolean;
  /** Add an elevation shadow. */
  shadow?: boolean;
  /** Use the tonal secondary surface (gray-100) instead of background-100. */
  secondary?: boolean;
  /** Render dividers between direct children. */
  borderBetween?: boolean;
  /** Layout direction. */
  direction?: "column" | "row";
  /**
   * When true, switches the border to `gray-1000` for a stronger highlight
   * (multi-pick galleries, plan comparison). Also sets `aria-selected`.
   */
  selected?: boolean;
}

export function Card({
  className,
  border,
  hoverable,
  shadow,
  secondary,
  borderBetween,
  direction = "column",
  selected,
  render,
  ...props
}: CardProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative flex rounded-[var(--radius-12)] text-gray-1000",
      direction === "column" ? "flex-col" : "flex-row",
      secondary ? "bg-gray-100" : "bg-background-100",
      border && "border border-gray-alpha-400",
      shadow && "shadow-card",
      hoverable && [
        "cursor-pointer",
        secondary ? "hover:bg-gray-200" : "hover:bg-gray-100",
        border && "hover:border-gray-alpha-500",
        focusRing,
      ],
      borderBetween &&
        (direction === "column"
          ? "[&>*+*]:border-t [&>*+*]:border-gray-alpha-400"
          : "[&>*+*]:border-l [&>*+*]:border-gray-alpha-400"),
      selected && "!border-gray-1000",
      colorTransition,
      className,
    ),
    "data-slot": "card",
    "data-selected": selected || undefined,
    "aria-selected": selected || undefined,
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-5 py-4 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
      className,
    ),
    "data-slot": "card-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("text-copy-18 font-medium leading-tight tracking-tight text-gray-1000", className),
    "data-slot": "card-title",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardDescription({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("text-copy-14 text-gray-900", className),
    "data-slot": "card-description",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "col-start-2 row-span-2 row-start-1 inline-flex self-start justify-self-end",
      className,
    ),
    "data-slot": "card-action",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("flex-1 px-5 pb-5", className),
    "data-slot": "card-content",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardFooter({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("flex items-center px-5 py-4 border-t border-gray-alpha-400", className),
    "data-slot": "card-footer",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export interface CardMetaProps extends useRender.ComponentProps<"div"> {
  icon: React.ReactNode;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  action?: React.ReactNode;
}

export function CardMeta({
  className,
  icon,
  primary,
  secondary,
  action,
  render,
  ...props
}: CardMetaProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex items-center justify-between gap-3 border-t border-gray-alpha-400 px-5 py-4",
      className,
    ),
    "data-slot": "card-meta",
    children: (
      <>
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">{icon}</div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-label-13 font-medium text-gray-1000 leading-tight">
              {primary}
            </span>
            {secondary && (
              <span className="truncate text-label-12 text-gray-800 leading-tight">
                {secondary}
              </span>
            )}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </>
    ),
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
