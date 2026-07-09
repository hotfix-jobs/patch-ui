"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

export const badgeVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    defaultVariants: {
      size: "md",
      color: "default",
      shape: "rounded",
      variant: "soft",
    },
    variants: {
      size: {
        sm: "px-2 py-0.5 text-mini font-medium [&_svg:not([class*='size-'])]:size-3",
        md: "px-2.5 py-1 text-mini font-medium [&_svg:not([class*='size-'])]:size-3.5",
        lg: "px-3 py-1.5 text-small font-medium [&_svg:not([class*='size-'])]:size-4",
      },
      color: {
        default: "",
        success: "",
        warning: "",
        error: "",
      },
      shape: {
        rounded: "rounded-[var(--radius-6)]",
        pill: "rounded-full",
      },
      variant: {
        solid: "",
        soft: "",
        outlined: "",
      },
    },
    compoundVariants: [
      // Semantic colors use fixed hex tokens in both themes; the accent
      // scale inverts in dark mode.
      { color: "default", variant: "solid", class: "bg-ink text-[color:var(--base)]" },
      { color: "success", variant: "solid", class: "bg-success text-success-fg" },
      { color: "warning", variant: "solid", class: "bg-warning text-warning-fg" },
      { color: "error",   variant: "solid", class: "bg-error text-error-fg" },
      { color: "default", variant: "soft", class: "bg-fill-2 text-ink-muted" },
      { color: "success", variant: "soft", class: "bg-success-soft-bg text-success-soft-fg" },
      { color: "warning", variant: "soft", class: "bg-warning-soft-bg text-warning-soft-fg" },
      { color: "error",   variant: "soft", class: "bg-error-soft-bg text-error-soft-fg" },
      // Outlined: no fill, hairline border. Semantic colors use a tinted
      // border + matching text; default falls back to the shared hairline.
      { color: "default", variant: "outlined", class: "border border-hairline text-ink-muted" },
      { color: "success", variant: "outlined", class: "border border-success/40 text-success" },
      { color: "warning", variant: "outlined", class: "border border-warning/40 text-warning" },
      { color: "error",   variant: "outlined", class: "border border-error/40 text-error" },
    ],
  },
);

export interface BadgeProps extends Omit<useRender.ComponentProps<"span">, "color"> {
  /** Semantic color. Maps to fill / border / text tokens per `variant`. */
  color?: VariantProps<typeof badgeVariants>["color"];
  size?: VariantProps<typeof badgeVariants>["size"];
  shape?: VariantProps<typeof badgeVariants>["shape"];
  /** Visual treatment. `solid` = saturated fill. `soft` (default) =
   *  tinted fill for dense surfaces. `outlined` = no fill, hairline border. */
  variant?: VariantProps<typeof badgeVariants>["variant"];
  /** Optional inline icon rendered before the label. */
  icon?: React.ReactNode;
}

export function Badge({
  className,
  color,
  size,
  shape,
  variant,
  icon,
  render,
  children,
  ...props
}: BadgeProps): React.ReactElement {
  const defaultProps = {
    className: cn(badgeVariants({ size, color, shape, variant }), className),
    "data-slot": "badge",
    children: (
      <>
        {icon}
        {children}
      </>
    ),
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}
