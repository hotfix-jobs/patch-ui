"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";
import { Button } from "./button";

export interface PaginationProps {
  /** Current page (1-indexed). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Fired when the user picks a new page (any value 1..totalPages). */
  onPageChange: (page: number) => void;
  /** Show the "Page X of Y" caption beside the controls. Default true. */
  showSummary?: boolean;
  /**
   * Number of adjacent pages to show on each side of the active page.
   * Default 1 (shows active - 1, active, active + 1).
   */
  siblingCount?: number;
  /**
   * Render "First" and "Last" text buttons that jump to page 1 / totalPages.
   * Default false.
   */
  showFirstLast?: boolean;
  /**
   * Compact mode — drops the numbered list and renders just prev/next +
   * summary. Useful on narrow viewports or chrome-tight contexts.
   */
  compact?: boolean;
  /**
   * When true, disables every control. Use during async page transitions
   * so users get feedback that something is loading.
   */
  loading?: boolean;
  /** Aria label for the nav landmark. Default "Pagination". */
  ariaLabel?: string;
  className?: string;
}

/**
 * Pagination — minimal page-list with prev/next icon buttons.
 *
 * Numbers render as inline text (not full secondary buttons) so the
 * control reads as quiet navigation chrome rather than a row of
 * stamped buttons. Active page gets bold text + a hairline underline.
 * Numerals use the `tabular-nums tracking-[-0.01em]` utility so digits
 * land aligned regardless of width.
 *
 * Renders nothing when there's only one page.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  showSummary = true,
  siblingCount = 1,
  showFirstLast = false,
  compact = false,
  loading = false,
  ariaLabel = "Pagination",
  className,
}: PaginationProps): React.ReactElement | null {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages, siblingCount);
  const atFirst = page === 1;
  const atLast = page === totalPages;
  const isDisabled = (cond: boolean) => cond || loading;

  function go(p: number) {
    if (loading) return;
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  }

  return (
    <nav
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-6 pb-2",
        loading && "opacity-70",
        className,
      )}
    >
      {showFirstLast && !compact && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => go(1)}
          disabled={isDisabled(atFirst)}
          aria-label="First page"
        >
          First
        </Button>
      )}

      <Button
        variant="secondary"
        size="sm"
        className="h-8 w-8"
        icon={<ChevronLeft className="h-3.5 w-3.5" />}
        onClick={() => go(page - 1)}
        disabled={isDisabled(atFirst)}
        aria-label="Previous page"
      />

      {!compact && (
        <ol className="flex items-center gap-1 text-[length:var(--text-patch-control)]">
          {pages.map((p, i) =>
            p === "ellipsis" ? (
              <li
                key={`ellipsis-${i}`}
                aria-hidden
                className="px-1 text-[var(--patch-text-tertiary)] select-none"
              >
                ...
              </li>
            ) : (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => go(p)}
                  disabled={loading}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                  aria-disabled={p === page || undefined}
                  className={cn(
                    "tabular-nums tracking-[-0.01em] inline-flex items-center justify-center min-w-[32px] px-2 py-1.5",
                    "text-[var(--patch-text-secondary)] transition-[colors,transform] duration-[var(--duration-patch-fast)] ease-[var(--ease-patch-out)] hover:text-[var(--patch-text)]",
                    "rounded-[var(--radius-patch-xs)]",
                    "active:scale-95 disabled:pointer-events-none disabled:opacity-50",
                    focusRing,
                    p === page &&
                      "text-[var(--patch-text)] font-semibold underline underline-offset-[6px] decoration-[0.5px] decoration-[var(--patch-text)] cursor-default",
                  )}
                >
                  {p}
                </button>
              </li>
            ),
          )}
        </ol>
      )}

      <Button
        variant="secondary"
        size="sm"
        className="h-8 w-8"
        icon={<ChevronRight className="h-3.5 w-3.5" />}
        onClick={() => go(page + 1)}
        disabled={isDisabled(atLast)}
        aria-label="Next page"
      />

      {showFirstLast && !compact && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => go(totalPages)}
          disabled={isDisabled(atLast)}
          aria-label="Last page"
        >
          Last
        </Button>
      )}

      {showSummary && (
        <span className="ms-2 text-[length:var(--text-patch-mini)] text-[var(--patch-text-tertiary)]">
          Page <span className="tabular-nums tracking-[-0.01em]">{page}</span> of{" "}
          <span className="tabular-nums tracking-[-0.01em]">{totalPages}</span>
        </span>
      )}
    </nav>
  );
}

/**
 * Build the displayed page list. Always includes first + last; shows
 * `siblingCount` pages on each side of the active page; uses "ellipsis"
 * markers for gaps. siblingCount=1 (default) yields the original ±1
 * window; siblingCount=2 widens it.
 */
function getPageNumbers(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis")[] {
  const visible = 1 + siblingCount * 2 + 4; // first + last + 2 ellipses + window
  if (totalPages <= visible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  // Leading ellipsis when the window doesn't touch the first page.
  if (page - siblingCount > 2) pages.push("ellipsis");

  const start = Math.max(2, page - siblingCount);
  const end = Math.min(totalPages - 1, page + siblingCount);

  for (let i = start; i <= end; i++) pages.push(i);

  // Trailing ellipsis when the window doesn't touch the last page.
  if (page + siblingCount < totalPages - 1) pages.push("ellipsis");

  pages.push(totalPages);

  return pages;
}
