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
 * Numerals use the `tabular-nums tracking-[-0.01em]` utility so digits land aligned
 * regardless of width.
 *
 * Renders nothing when there's only one page.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  showSummary = true,
  ariaLabel = "Pagination",
  className,
}: PaginationProps): React.ReactElement | null {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  function go(p: number) {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  }

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-6 pb-2",
        className,
      )}
    >
      <Button
        variant="secondary"
        size="sm"
        className="h-8 w-8"
        icon={<ChevronLeft className="h-3.5 w-3.5" />}
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      />

      <ol className="flex items-center gap-2 text-[length:var(--text-patch-control)]">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <li
              key={`ellipsis-${i}`}
              aria-hidden
              className="text-[var(--patch-text-tertiary)] select-none"
            >
              ...
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => go(p)}
                aria-label={`Page ${p}`}
                aria-current={p === page ? "page" : undefined}
                className={cn(
                  "tabular-nums tracking-[-0.01em] inline-flex items-center justify-center min-w-[20px] px-1 py-1",
                  "text-[var(--patch-text-secondary)] transition-colors hover:text-[var(--patch-text)]",
                  "rounded-[var(--radius-patch-xs)]",
                  focusRing,
                  p === page &&
                    "text-[var(--patch-text)] font-semibold underline underline-offset-[6px] decoration-[0.5px] decoration-[var(--patch-text)]",
                )}
              >
                {p}
              </button>
            </li>
          ),
        )}
      </ol>

      <Button
        variant="secondary"
        size="sm"
        className="h-8 w-8"
        icon={<ChevronRight className="h-3.5 w-3.5" />}
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      />

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
 * Build the displayed page list. Returns up to 7 entries: the first
 * page, the last page, the current page +/- 1, and "ellipsis" markers
 * for any gaps, so callers can render compact pagination controls.
 */
function getPageNumbers(page: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (page > 3) pages.push("ellipsis");

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (page < totalPages - 2) pages.push("ellipsis");

  pages.push(totalPages);

  return pages;
}
