"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export const cardVariants = cva(
  `relative flex flex-col text-patch-text ${colorTransition}`,
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default:
          "rounded-[var(--radius-patch-lg)] bg-patch-surface border border-[var(--patch-border)]",
        // Tonal elevation (nested surface tone), not a shadow — surfaces stay flat.
        elevated:
          "rounded-[var(--radius-patch-lg)] bg-patch-surface-2 border border-[var(--patch-border)]",
        interactive: cn(
          "rounded-[var(--radius-patch-lg)] bg-transparent border border-[var(--patch-border)] hover:bg-patch-surface hover:border-[var(--patch-border)] cursor-pointer transition-[transform,background-color,border-color] duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] active:scale-[0.99]",
          focusRing,
        ),
        ghost:
          "rounded-[var(--radius-patch-lg)] bg-transparent border-b border-[var(--separator-color)]",
      },
    },
  },
);

export interface CardProps extends useRender.ComponentProps<"div"> {
  variant?: VariantProps<typeof cardVariants>["variant"];
  /**
   * When true, switches the border to `--patch-text` for a stronger
   * highlight. Useful for selectable card grids (multi-pick galleries,
   * job picker, plan comparison).
   */
  selected?: boolean;
}

export function Card({
  className,
  variant,
  selected,
  render,
  ...props
}: CardProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      cardVariants({ className, variant }),
      selected && "!border-[var(--patch-text)]",
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
    className: cn("flex items-center px-5 py-4 border-t border-[var(--patch-border)]", className),
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
      "flex items-center justify-between gap-3 border-t border-[var(--patch-border)] px-5 py-4",
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
