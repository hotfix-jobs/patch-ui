"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

export const badgeVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    defaultVariants: {
      size: "md",
      variant: "default",
      shape: "pill",
      contrast: "low",
    },
    variants: {
      size: {
        sm: "px-2 py-0.5 text-button-12 [&_svg:not([class*='size-'])]:size-3",
        md: "px-2.5 py-1 text-button-12 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "px-3 py-1.5 text-button-14 [&_svg:not([class*='size-'])]:size-4",
      },
      variant: {
        default: "",
        success: "",
        warning: "",
        error: "",
      },
      shape: {
        rounded: "rounded-[var(--radius-6)]",
        pill: "rounded-full",
      },
      contrast: {
        high: "",
        low: "",
      },
    },
    compoundVariants: [
      // Status variants use semantic role tokens (fixed hex in both
      // themes); the accent scale inverts in dark mode.
      { variant: "default", contrast: "high", class: "bg-ink text-canvas" },
      { variant: "success", contrast: "high", class: "bg-success text-success-fg" },
      { variant: "warning", contrast: "high", class: "bg-warning text-warning-fg" },
      { variant: "error",   contrast: "high", class: "bg-error text-error-fg" },
      { variant: "default", contrast: "low", class: "bg-surface-2 text-ink-muted" },
      { variant: "success", contrast: "low", class: "bg-success/10 text-success" },
      { variant: "warning", contrast: "low", class: "bg-warning/10 text-warning" },
      { variant: "error",   contrast: "low", class: "bg-error/10 text-error" },
    ],
  },
);

export interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: VariantProps<typeof badgeVariants>["variant"];
  size?: VariantProps<typeof badgeVariants>["size"];
  shape?: VariantProps<typeof badgeVariants>["shape"];
  /** `high` = solid saturated fill (default). `low` = subtle tinted fill for dense surfaces. */
  contrast?: VariantProps<typeof badgeVariants>["contrast"];
  /** Optional inline icon rendered before the label. */
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant,
  size,
  shape,
  contrast,
  icon,
  render,
  children,
  ...props
}: BadgeProps): React.ReactElement {
  const defaultProps = {
    className: cn(badgeVariants({ size, variant, shape, contrast }), className),
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
