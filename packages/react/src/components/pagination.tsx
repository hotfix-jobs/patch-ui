"use client";

import type * as React from "react";
import { cn } from "../utils";
import { selectionFocus } from "../recipes";

import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
export interface PaginationProps {
  /** Current page (1-indexed). */
  page: number;
  totalPages: number;
  /** When provided, each control renders as a real `<a href>` for SEO-friendly navigation. */
  href?: (page: number) => string;
  /** Client-side handler. Rendered as `<button>` when `href` is not given. */
  onPageChange?: (page: number) => void;
  /** Number of page-number siblings on each side of the current page. Default 1. */
  siblingCount?: number;
  loading?: boolean;
  className?: string;
}

/** Loose row of page chips flanked by prev/next arrows. Renders nothing when totalPages <= 1. */
export function Pagination({
  page,
  totalPages,
  href,
  onPageChange,
  siblingCount = 1,
  loading = false,
  className,
}: PaginationProps): React.ReactElement | null {
  if (totalPages <= 1) return null;

  const atFirst = page === 1;
  const atLast = page === totalPages;
  const items = getPageItems(page, totalPages, siblingCount);

  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center gap-0.5",
        loading && "opacity-70",
        className,
      )}
    >
      <PageCell
        page={page - 1}
        disabled={atFirst || loading}
        href={href}
        onPageChange={onPageChange}
        ariaLabel="Previous page"
        icon={<CaretLeft className="size-3.5" />}
      />
      {items.map((item, i) => {
        if (item === "ellipsis") {
          return (
            <span
              key={`ellipsis-${i}`}
              aria-hidden
              className="inline-flex size-8 shrink-0 items-center justify-center text-ink-tertiary tabular-nums"
              data-slot="pagination-ellipsis"
            >
              …
            </span>
          );
        }
        return (
          <PageCell
            key={item}
            page={item}
            current={item === page}
            disabled={loading}
            href={href}
            onPageChange={onPageChange}
            ariaLabel={`Page ${item}`}
            label={String(item)}
          />
        );
      })}
      <PageCell
        page={page + 1}
        disabled={atLast || loading}
        href={href}
        onPageChange={onPageChange}
        ariaLabel="Next page"
        icon={<CaretRight className="size-3.5" />}
      />
    </nav>
  );
}

interface PageCellProps {
  page: number;
  label?: string;
  icon?: React.ReactNode;
  ariaLabel: string;
  current?: boolean;
  disabled?: boolean;
  href?: (page: number) => string;
  onPageChange?: (page: number) => void;
}

function PageCell({
  page,
  label,
  icon,
  ariaLabel,
  current,
  disabled,
  href,
  onPageChange,
}: PageCellProps): React.ReactElement {
  const className = cn(
    // Fixed 32x32 chip + tabular-nums so the row width stays stable across page counts.
    "inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-8)] text-small tabular-nums transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
    current
      ? "bg-layer-hover font-medium text-ink"
      : "text-ink-muted hover:bg-layer-hover hover:text-ink",
    "active:bg-layer-hover",
    disabled && "pointer-events-none opacity-50 text-ink-tertiary hover:bg-transparent active:bg-transparent",
    selectionFocus,
  );
  const inner = icon ?? label;

  if (href && !disabled) {
    return (
      <a
        href={href(page)}
        aria-label={ariaLabel}
        aria-current={current ? "page" : undefined}
        className={className}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => !disabled && onPageChange?.(page)}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={current ? "page" : undefined}
      className={className}
    >
      {inner}
    </button>
  );
}

// Produces exactly `siblingCount * 2 + 5` items when ellipses are needed, so the row
// width stays stable as `page` changes. Near start/end, one side widens to absorb
// the slot the missing ellipsis would have taken.
function getPageItems(
  page: number,
  totalPages: number,
  siblingCount: number,
): Array<number | "ellipsis"> {
  const totalRendered = siblingCount * 2 + 5;

  // Short ranges: everything fits without ellipsis.
  if (totalPages <= totalRendered) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: Array<number | "ellipsis"> = [];

  // Near start: [1 .. 2·sib+3] … last  → same total slots.
  if (page <= siblingCount + 3) {
    for (let p = 1; p <= siblingCount * 2 + 3; p++) items.push(p);
    items.push("ellipsis");
    items.push(totalPages);
    return items;
  }

  // Near end: 1 … [last-(2·sib+2) .. last]
  if (page >= totalPages - siblingCount - 2) {
    items.push(1);
    items.push("ellipsis");
    for (let p = totalPages - siblingCount * 2 - 2; p <= totalPages; p++) {
      items.push(p);
    }
    return items;
  }

  // Middle: 1 … [current-sib .. current+sib] … last
  items.push(1);
  items.push("ellipsis");
  for (let p = page - siblingCount; p <= page + siblingCount; p++) items.push(p);
  items.push("ellipsis");
  items.push(totalPages);
  return items;
}
