"use client";

import { CaretDown, CaretUp, CaretUpDown } from "@phosphor-icons/react/dist/ssr";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

/** Semantic HTML table with consistent chrome.
 *
 *  `variant` mirrors Card / Section: `flat` (transparent frame + hairline)
 *  or `elevated` (`bg-layer-1` + `hairline-soft`).
 *
 *  Row state opinions live on the root: `striped`, `interactive`,
 *  `bordered`. Density lives on `size` (`sm` | `md`). Sticky headers via
 *  `stickyHeader` when the container has a fixed scroll height. */

type TableVariant = "flat" | "elevated";
type TableSize = "sm" | "md";

interface TableContextValue {
  size: TableSize;
  striped: boolean;
  interactive: boolean;
  bordered: boolean;
}

const TableContext = createContext<TableContextValue>({
  size: "md",
  striped: false,
  interactive: false,
  bordered: false,
});

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Table treatment.
   *  `flat` (default) — transparent frame with hairline border.
   *  `elevated` — `bg-layer-1` + `hairline-soft`. Matches Card. */
  variant?: TableVariant;
  /** Row density. `md` default; `sm` tightens for dense grids. */
  size?: TableSize;
  /** Alternating row background colors. */
  striped?: boolean;
  /** Row hover effect (opt in for actionable rows). */
  interactive?: boolean;
  /** Vertical cell borders. */
  bordered?: boolean;
  /** Wrap in a horizontally-scrollable container. Default true. */
  scrollable?: boolean;
  /** Pin the header row to the top of the scroll container. Consumer
   *  must give the container a fixed height (e.g. via className) for
   *  vertical sticky to have room to work. */
  stickyHeader?: boolean;
}

export function Table({
  className,
  variant = "flat",
  size = "md",
  striped = false,
  interactive = false,
  bordered = false,
  scrollable = true,
  stickyHeader = false,
  ...props
}: TableProps): React.ReactElement {
  const ctx: TableContextValue = { size, striped, interactive, bordered };
  const rowSpacing = striped || interactive ? "border-spacing-0 [border-spacing:0_2px]" : "border-spacing-0";
  const tableEl = (
    <TableContext.Provider value={ctx}>
      <table
        data-slot="table"
        data-variant={variant}
        data-size={size}
        className={cn(
          // border-separate is required so cells accept border-radius for the interactive/striped pill look.
          "w-full caption-bottom border-separate text-small text-ink",
          rowSpacing,
          stickyHeader && "[&_thead>tr>th]:sticky [&_thead>tr>th]:top-0 [&_thead>tr>th]:z-10 [&_thead>tr>th]:bg-layer-1",
          className,
        )}
        {...props}
      />
    </TableContext.Provider>
  );

  if (variant === "elevated") {
    return (
      <div
        data-slot="table-container"
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--radius-8)] bg-layer-1 border border-hairline-soft",
          scrollable && "overflow-x-auto",
        )}
      >
        {tableEl}
      </div>
    );
  }

  if (!scrollable) return tableEl;
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      {tableEl}
    </div>
  );
}

/* ------------------------------ Sections ----------------------------- */

export type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableHeader({
  className,
  ...props
}: TableSectionProps): React.ReactElement {
  return (
    <thead
      data-slot="table-header"
      className={cn(className)}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: TableSectionProps): React.ReactElement {
  const { striped, interactive, bordered } = useContext(TableContext);
  return (
    <tbody
      data-slot="table-body"
      data-striped={striped ? "" : undefined}
      data-bordered={bordered ? "" : undefined}
      data-interactive={interactive ? "" : undefined}
      className={cn(
        "[&_tr:last-child>td]:border-b-0",
        interactive && [
          "[&_td]:!border-b-0",
          "[&_tr]:cursor-pointer",
          "[&_tr:hover>td]:bg-layer-hover",
          "[&_tr:hover>td:first-child]:rounded-l-[var(--radius-6)]",
          "[&_tr:hover>td:last-child]:rounded-r-[var(--radius-6)]",
        ],
        striped && [
          "[&_td]:!border-b-0",
          "[&_tr:nth-child(even)>td]:bg-fill-2",
          "[&_tr:nth-child(even)>td:first-child]:rounded-l-[var(--radius-6)]",
          "[&_tr:nth-child(even)>td:last-child]:rounded-r-[var(--radius-6)]",
        ],
        bordered && "[&_td+td]:border-l [&_th+th]:border-l",
        className,
      )}
      {...props}
    />
  );
}

export function TableFooter({
  className,
  ...props
}: TableSectionProps): React.ReactElement {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-hairline font-medium",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------- Rows ------------------------------- */

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Marks the row as selected. Adds `bg-layer-selected` + accent left
   *  border and sets `aria-selected`. */
  selected?: boolean;
}

export function TableRow({
  className,
  selected,
  ...props
}: TableRowProps): React.ReactElement {
  return (
    <tr
      data-slot="table-row"
      data-selected={selected || undefined}
      aria-selected={selected || undefined}
      className={cn(
        selected && [
          "[&>td]:bg-layer-selected",
          "[&>td:first-child]:rounded-l-[var(--radius-6)] [&>td:last-child]:rounded-r-[var(--radius-6)]",
          "[&>td:first-child]:border-l-2 [&>td:first-child]:border-l-primary",
        ],
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------- Cells ------------------------------ */

const headHeightBySize: Record<TableSize, string> = {
  sm: "h-7 py-1",
  md: "h-9 py-2",
};

const cellPadBySize: Record<TableSize, string> = {
  sm: "px-3 py-1.5",
  md: "px-3 py-2.5",
};

type SortDirection = "asc" | "desc" | "none";

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment for the header cell content. */
  align?: "left" | "center" | "right";
  /** Marks this column as sortable — renders a chevron indicator and
   *  clickable affordance. Pair with `direction` and `onSort`. */
  sortable?: boolean;
  /** Current sort direction for this column. */
  direction?: SortDirection;
  /** Fired when a sortable header is clicked. */
  onSort?: () => void;
}

export function TableHead({
  className,
  align = "left",
  sortable,
  direction = "none",
  onSort,
  children,
  ...props
}: TableHeadProps): React.ReactElement {
  const { size } = useContext(TableContext);
  const ariaSort =
    !sortable || direction === "none"
      ? undefined
      : direction === "asc"
      ? "ascending"
      : "descending";

  return (
    <th
      data-slot="table-head"
      data-sortable={sortable ? "" : undefined}
      data-direction={sortable ? direction : undefined}
      aria-sort={ariaSort}
      className={cn(
        headHeightBySize[size],
        "px-3 text-mini font-medium text-ink-muted whitespace-nowrap",
        "border-b border-hairline",
        align === "right" && "text-right",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            "inline-flex items-center gap-1 select-none text-mini font-medium text-ink-muted hover:text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
            direction !== "none" && "text-ink",
            focusRing,
          )}
          data-slot="table-head-sort-trigger"
        >
          {children}
          {direction === "asc" ? (
            <CaretUp aria-hidden className="size-3 shrink-0" />
          ) : direction === "desc" ? (
            <CaretDown aria-hidden className="size-3 shrink-0" />
          ) : (
            <CaretUpDown aria-hidden className="size-3 shrink-0 opacity-60" />
          )}
        </button>
      ) : (
        children
      )}
    </th>
  );
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function TableCell({
  className,
  align = "left",
  ...props
}: TableCellProps): React.ReactElement {
  const { size } = useContext(TableContext);
  return (
    <td
      data-slot="table-cell"
      className={cn(
        cellPadBySize[size],
        "align-middle border-b border-hairline",
        align === "right" && "text-right tabular-nums",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
      {...props}
    />
  );
}

/* ------------------------------ Caption ------------------------------ */

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

export function TableCaption({
  className,
  ...props
}: TableCaptionProps): React.ReactElement {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-3 text-mini text-ink-muted text-left", className)}
      {...props}
    />
  );
}

/* -------------------------------- Empty ------------------------------ */

export type TableEmptyProps = React.HTMLAttributes<HTMLTableCellElement> & {
  /** Number of columns to span across. Required so the cell fills the
   *  full table width. */
  colSpan: number;
};

/** Render an empty-state row inside `<TableBody>`. Wrap `<EmptyState>`
 *  or any custom content; the cell centers it and spans the full width. */
export function TableEmpty({
  className,
  children,
  colSpan,
  ...props
}: TableEmptyProps): React.ReactElement {
  return (
    <tr data-slot="table-empty">
      <td
        colSpan={colSpan}
        className={cn(
          "px-3 py-10 text-center align-middle text-small text-ink-muted",
          className,
        )}
        {...props}
      >
        {children}
      </td>
    </tr>
  );
}
