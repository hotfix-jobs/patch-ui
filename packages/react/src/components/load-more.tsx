"use client";

import type * as React from "react";
import { cn } from "../utils";
import { focusRing, disabled as disabledRecipe, colorTransition } from "../recipes";
import { Spinner } from "./spinner";

export interface LoadMoreProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Label content. */
  children?: React.ReactNode;
  /** Shows a spinner and disables the button while a fetch is in flight. */
  loading?: boolean;
  /**
   * Drops the button's own top margin. Use when the LoadMore sits right
   * against a data list with its own bottom margin already.
   */
  noGap?: boolean;
  /**
   * Removes rounded corners. Use when the LoadMore is attached to the
   * bottom of a Card or list container so the edges meet flush.
   */
  noBorderRadius?: boolean;
}

/**
 * LoadMore: a full-width, secondary-style button used to append more
 * items to a paginated feed (job listings, search results, activity log).
 * Manages the loading state so the trigger stays focusable and announces
 * busy state to assistive tech.
 */
export function LoadMore({
  className,
  children = "Load More",
  loading,
  noGap,
  noBorderRadius,
  disabled,
  ...props
}: LoadMoreProps): React.ReactElement {
  const isDisabled = disabled || loading;
  return (
    <button
      type="button"
      data-slot="load-more"
      aria-busy={loading || undefined}
      disabled={isDisabled}
      className={cn(
        "relative flex w-fit mx-auto items-center justify-center gap-2 cursor-pointer",
        "h-10 px-6 text-button-14 text-gray-1000",
        "bg-background-100 border border-gray-alpha-400",
        "hover:bg-gray-alpha-100 hover:border-gray-alpha-500",
        "active:bg-gray-alpha-200",
        noBorderRadius ? "rounded-none" : "rounded-[var(--radius-6)]",
        !noGap && "mt-3",
        focusRing,
        colorTransition,
        disabledRecipe,
        className,
      )}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
