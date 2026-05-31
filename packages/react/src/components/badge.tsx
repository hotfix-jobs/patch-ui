"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

export const badgeVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap font-medium text-[length:var(--text-patch-micro)] tracking-[var(--tracking-patch-small)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3",
  {
    defaultVariants: {
      size: "sm",
      variant: "default",
      shape: "rounded",
    },
    variants: {
      size: {
        xs: "h-auto min-w-0 gap-0.5 px-2 py-[2px] [&_svg:not([class*='size-'])]:size-2.5",
        sm: "h-auto min-w-0 px-2 py-[3px]",
        lg: "h-auto min-w-0 px-2.5 py-[4px] text-[length:var(--text-patch-mini)]",
      },
      variant: {
        default: "bg-[var(--badge-default-bg)] text-[var(--badge-default-text)] border-0",
        primary: "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-0",
        ghost: "bg-transparent text-[var(--patch-text)] border-[0.5px] border-[var(--patch-border)]",
        secondary: "bg-[var(--badge-secondary-bg)] text-[var(--badge-secondary-text)] border-0",
        success: "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)] border-0",
        warning: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] border-0",
        danger: "bg-[var(--badge-danger-bg)] text-[var(--badge-danger-text)] border-0",
      },
      shape: {
        rounded: "rounded-[var(--radius-patch-xs)]",
        pill: "rounded-full",
      },
    },
  },
);

export interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: VariantProps<typeof badgeVariants>["variant"];
  size?: VariantProps<typeof badgeVariants>["size"];
  shape?: VariantProps<typeof badgeVariants>["shape"];
  /**
   * When provided, the badge becomes dismissible: a trailing × button is
   * rendered that calls this handler. Use for removable filter tags, applied
   * facets, token inputs, etc.
   */
  onRemove?: () => void;
  /** Accessible label for the remove button. Default "Remove". */
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
      badgeVariants({ className, size, variant, shape }),
      // tighten trailing padding so the × sits closer to the edge
      onRemove && "pe-1",
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
              "-me-0.5 inline-flex size-3.5 shrink-0 items-center justify-center rounded-[var(--radius-patch-xs)] opacity-60 transition-opacity hover:opacity-100",
              focusRing,
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
