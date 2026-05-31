"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export const cardVariants = cva(
  `relative flex flex-col rounded-[var(--radius-patch-lg)] text-patch-text ${colorTransition}`,
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "bg-patch-surface border-[0.5px] border-[var(--patch-border)]",
        // Tonal elevation (nested surface tone), not a shadow — surfaces stay flat.
        elevated: "bg-patch-surface-2 border-[0.5px] border-[var(--patch-border)]",
        interactive: cn(
          "bg-transparent border-[0.5px] border-[var(--patch-border)] hover:bg-patch-surface hover:border-[var(--patch-border-hover)] cursor-pointer",
          focusRing,
        ),
        ghost: "bg-transparent border-b-[0.5px] border-[var(--separator-color)]",
      },
    },
  },
);

export interface CardProps extends useRender.ComponentProps<"div"> {
  variant?: VariantProps<typeof cardVariants>["variant"];
}

export function Card({
  className,
  variant,
  render,
  ...props
}: CardProps): React.ReactElement {
  const defaultProps = {
    className: cn(cardVariants({ className, variant })),
    "data-slot": "card",
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
    className: cn("font-medium text-[length:var(--text-patch-lead)] leading-tight tracking-[var(--tracking-patch-title)] text-patch-text", className),
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
    className: cn("text-patch-text-secondary text-sm", className),
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
    className: cn("flex items-center px-5 py-4 border-t-[0.5px] border-[var(--patch-border)]", className),
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
      "flex items-center justify-between gap-3 border-t-[0.5px] border-[var(--patch-border)] px-5 py-4",
      className,
    ),
    "data-slot": "card-meta",
    children: (
      <>
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">{icon}</div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[length:var(--text-patch-control)] font-medium text-patch-text leading-tight">
              {primary}
            </span>
            {secondary && (
              <span className="truncate text-[length:var(--text-patch-mini)] text-patch-text-tertiary leading-tight">
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
