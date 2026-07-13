"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";
import { selectionFocus } from "../recipes";

export interface CardProps extends useRender.ComponentProps<"div"> {
  /** Visual treatment for the content surface. */
  variant?: "surface" | "outlined" | "elevated";
  /** Adds visual states for cards rendered as a link or button. */
  actionable?: boolean;
  /** Marks the card visually selected. Consumers own selection semantics. */
  selected?: boolean;
}

/** Composable content surface. */
export function Card({
  className,
  variant = "outlined",
  actionable,
  selected,
  render,
  ...props
}: CardProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative rounded-[var(--radius-12)] text-ink",
      variant === "surface" && "bg-layer-1",
      variant === "outlined" && "border border-hairline-soft bg-layer-1",
      variant === "elevated" &&
        "bg-layer-1 shadow-card dark:shadow-none",
      actionable && [
        "hover:border-hairline-tertiary active:border-hairline-tertiary",
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        selectionFocus,
      ],
      selected && "bg-fill-2",
      "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
      className,
    ),
    "data-slot": "card",
    "data-selected": selected || undefined,
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export type CardHeaderProps = useRender.ComponentProps<"div">;

export function CardHeader({
  className,
  render,
  ...props
}: CardHeaderProps): React.ReactElement {
  const defaultProps = {
    className: cn("flex items-start justify-between gap-4 p-4 pb-0", className),
    "data-slot": "card-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export type CardTitleProps = useRender.ComponentProps<"h3">;

export function CardTitle({
  className,
  render,
  ...props
}: CardTitleProps): React.ReactElement {
  const defaultProps = {
    className: cn("text-regular font-medium text-ink", className),
    "data-slot": "card-title",
  };

  return useRender({
    defaultTagName: "h3",
    props: mergeProps<"h3">(defaultProps, props),
    render,
  });
}

export type CardDescriptionProps = useRender.ComponentProps<"p">;

export function CardDescription({
  className,
  render,
  ...props
}: CardDescriptionProps): React.ReactElement {
  const defaultProps = {
    className: cn("mt-1 text-small text-ink-muted", className),
    "data-slot": "card-description",
  };

  return useRender({
    defaultTagName: "p",
    props: mergeProps<"p">(defaultProps, props),
    render,
  });
}

export type CardContentProps = useRender.ComponentProps<"div">;

export function CardContent({
  className,
  render,
  ...props
}: CardContentProps): React.ReactElement {
  const defaultProps = {
    className: cn("p-4", className),
    "data-slot": "card-content",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export interface CardFooterProps extends useRender.ComponentProps<"div"> {
  divided?: boolean;
}

export function CardFooter({
  className,
  divided = false,
  render,
  ...props
}: CardFooterProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex items-center gap-2 px-4 py-3",
      divided && "border-t border-hairline-soft",
      className,
    ),
    "data-slot": "card-footer",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
