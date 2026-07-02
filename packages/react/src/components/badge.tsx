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
      // High contrast: solid saturated fill, light text
      { variant: "default", contrast: "high", class: "bg-gray-1000 text-background-100" },
      { variant: "success", contrast: "high", class: "bg-green-700 text-white" },
      { variant: "warning", contrast: "high", class: "bg-amber-700 text-white" },
      { variant: "error",   contrast: "high", class: "bg-red-700 text-white" },
      // Low contrast: subtle tint, darker text
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
