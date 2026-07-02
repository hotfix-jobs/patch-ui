"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export const badgeVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap",
    "text-label-12 font-medium",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3",
  ].join(" "),
  {
    defaultVariants: {
      size: "sm",
      variant: "default",
      shape: "pill",
      outline: false,
    },
    variants: {
      size: {
        sm: "px-2 py-[3px]",
        lg: "px-2.5 py-1",
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
      outline: {
        true: "bg-transparent border",
        false: "",
      },
    },
    compoundVariants: [
      // Solid (fill + text)
      { variant: "default", outline: false, class: "bg-gray-200 text-gray-900" },
      { variant: "success", outline: false, class: "bg-green-100 text-green-900" },
      { variant: "warning", outline: false, class: "bg-amber-100 text-amber-900" },
      { variant: "error",   outline: false, class: "bg-red-100 text-red-900" },
      // Outline (border + text, transparent fill)
      { variant: "default", outline: true, class: "border-gray-alpha-400 text-gray-1000" },
      { variant: "success", outline: true, class: "border-green-700 text-green-700" },
      { variant: "warning", outline: true, class: "border-amber-700 text-amber-700" },
      { variant: "error",   outline: true, class: "border-red-700 text-red-700" },
    ],
  },
);

export interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: VariantProps<typeof badgeVariants>["variant"];
  size?: VariantProps<typeof badgeVariants>["size"];
  shape?: VariantProps<typeof badgeVariants>["shape"];
  /** When true, renders a hairline outline + colored text on a transparent fill. */
  outline?: boolean;
  /** When provided, renders a trailing × button that calls this handler. */
  onRemove?: () => void;
  /** Accessible label for the × remove button. */
  removeLabel?: string;
}

export function Badge({
  className,
  variant,
  size,
  shape,
  outline,
  onRemove,
  removeLabel = "Remove",
  render,
  children,
  ...props
}: BadgeProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      badgeVariants({ size, variant, shape, outline }),
      onRemove && "group pe-1",
      className,
    ),
    "data-slot": "badge",
    children: (
      <>
        {children}
        {onRemove && (
          <button
            type="button"
            aria-label={removeLabel}
            onClick={onRemove}
            className={cn(
              "-me-0.5 inline-flex size-3.5 shrink-0 items-center justify-center rounded-[var(--radius-6)] opacity-50 group-hover:opacity-80 hover:!opacity-100",
              focusRing,
              colorTransition,
            )}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-2.5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </>
    ),
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}
