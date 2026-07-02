"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import { cn } from "../utils";
import { Button } from "./button";

export interface PaginationProps {
  /** Current page (1-indexed). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Fired when the user picks a new page (any value 1..totalPages). */
  onPageChange: (page: number) => void;
  /**
   * When true, disables every control. Use during async page transitions
   * so users get feedback that something is loading.
   */
  loading?: boolean;
  className?: string;
}

const WINDOW_SIZE = 5;

/**
 * Pagination, a sliding window of up to 5 page-number buttons flanked by
 * prev/next chevrons. No ellipses, no "Page X of Y" caption: the number
 * row is the caption. Renders nothing when there's only one page.
 *
 * The window slides to keep the active page centered; clamps at both ends
 * so the leftmost number is never below 1 and the rightmost is never above
 * totalPages.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  loading = false,
  className,
}: PaginationProps): React.ReactElement | null {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(page, totalPages);
  const atFirst = page === 1;
  const atLast = page === totalPages;

  function go(p: number) {
    if (loading) return;
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  }

  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      className={cn(
        "flex items-center justify-center gap-1 pt-6 pb-2",
        loading && "opacity-70",
        className,
      )}
    >
      <Button
        variant="tertiary"
        size="sm"
        className="h-8 w-8"
        icon={<ChevronLeft className="h-3.5 w-3.5" />}
        onClick={() => go(page - 1)}
        disabled={atFirst || loading}
        aria-label="Previous page"
      />
      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? "secondary" : "tertiary"}
          size="sm"
          className="h-8 min-w-8 px-2 tabular-nums"
          onClick={() => go(p)}
          disabled={loading}
          aria-label={`Page ${p}`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Button>
      ))}
      <Button
        variant="tertiary"
        size="sm"
        className="h-8 w-8"
        icon={<ChevronRight className="h-3.5 w-3.5" />}
        onClick={() => go(page + 1)}
        disabled={atLast || loading}
        aria-label="Next page"
      />
    </nav>
  );
}

/**
 * Sliding window of up to WINDOW_SIZE pages centered on the active page.
 * Clamps so the window never extends past 1 or totalPages.
 */
function getPageWindow(page: number, totalPages: number): number[] {
  if (totalPages <= WINDOW_SIZE) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const half = Math.floor(WINDOW_SIZE / 2);
  let start = page - half;
  let end = page + half;
  if (start < 1) {
    start = 1;
    end = WINDOW_SIZE;
  }
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - WINDOW_SIZE + 1;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
