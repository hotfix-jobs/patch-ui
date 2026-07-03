"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

export const badgeVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap",
    "font-medium",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    defaultVariants: {
      size: "md",
      variant: "default",
      shape: "pill",
      contrast: "high",
    },
    variants: {
      size: {
        sm: "px-2 py-[2px] text-label-12 [&_svg:not([class*='size-'])]:size-3",
        md: "px-2.5 py-1 text-label-12 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "px-3 py-1.5 text-label-13 [&_svg:not([class*='size-'])]:size-4",
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
      // High contrast: solid saturated fill, light text.
      // Status variants use the semantic role tokens (--error / --warning /
      // --success), not the -700 accent step. The accent scale inverts in
      // dark mode (green-700 becomes a light green), which would leave
      // white-on-light-green with no contrast. The semantic roles are
      // fixed hex values that read identically in both themes.
      { variant: "default", contrast: "high", class: "bg-gray-1000 text-background-100" },
      // Semantic solids pair with the matching -fg text token so the
      // label color inverts with the theme (light: white text on dark
      // fill; dark: dark text on bright fill), matching Vercel Geist.
      { variant: "success", contrast: "high", class: "bg-success text-success-fg" },
      { variant: "warning", contrast: "high", class: "bg-warning text-warning-fg" },
      { variant: "error",   contrast: "high", class: "bg-error text-error-fg" },
      // Low contrast: subtle tint, darker text. The 100/900 pair inverts
      // in dark mode (100 becomes very dark, 900 becomes very light), so
      // dark-on-light in light mode becomes light-on-dark in dark mode.
      { variant: "default", contrast: "low", class: "bg-gray-200 text-gray-1000" },
      { variant: "success", contrast: "low", class: "bg-green-100 text-green-900" },
      { variant: "warning", contrast: "low", class: "bg-amber-100 text-amber-900" },
      { variant: "error",   contrast: "low", class: "bg-red-100 text-red-900" },
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
