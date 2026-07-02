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
    defaultVariants: { size: "sm", variant: "default", shape: "rounded" },
    variants: {
      size: {
        sm: "px-2 py-[3px]",
        lg: "px-2.5 py-1",
      },
      variant: {
        default: "bg-gray-alpha-100 text-gray-900",
        secondary: "bg-gray-alpha-200 text-gray-900",
        success: "bg-green-100 text-green-900",
        warning: "bg-amber-100 text-amber-900",
        error: "bg-red-100 text-red-900",
      },
      shape: {
        rounded: "rounded-[var(--radius-6)]",
        pill: "rounded-full",
      },
    },
  },
);

export interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: VariantProps<typeof badgeVariants>["variant"];
  size?: VariantProps<typeof badgeVariants>["size"];
  shape?: VariantProps<typeof badgeVariants>["shape"];
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
  onRemove,
  removeLabel = "Remove",
  render,
  children,
  ...props
}: BadgeProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      badgeVariants({ size, variant, shape }),
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
