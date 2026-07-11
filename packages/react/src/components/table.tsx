"use client";

import { CaretDown, CaretUp, CaretUpDown } from "@phosphor-icons/react/dist/ssr";
import { createContext, useContext } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { selectionFocus } from "../recipes";

/** Semantic HTML table with horizontal row dividers by default. */
type TableSize = "sm" | "md";

interface TableContextValue {
  size: TableSize;
  interactive: boolean;
}

const TableContext = createContext<TableContextValue>({
  size: "md",
  interactive: false,
});

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Adds a layer background, rounded corners, and an outer hairline. */
  bordered?: boolean;
  /** Row density. `md` default; `sm` tightens for dense grids. */
  size?: TableSize;
  /** Row hover effect (opt in for actionable rows). */
  interactive?: boolean;
  /** Wrap in a horizontally-scrollable container. Default true. */
  scrollable?: boolean;
  /** Pin the header row to the top of the scroll container. Consumer
   *  must give the container a fixed height (e.g. via className) for
   *  vertical sticky to have room to work. */
  stickyHeader?: boolean;
}

export function Table({
  className,
  bordered = false,
  size = "md",
  interactive = false,
  scrollable = true,
  stickyHeader = false,
  ...props
}: TableProps): React.ReactElement {
  const ctx: TableContextValue = { size, interactive };
  const tableEl = (
    <TableContext.Provider value={ctx}>
      <table
        data-slot="table"
        data-bordered={bordered || undefined}
        data-size={size}
        className={cn(
          "w-full caption-bottom border-separate border-spacing-0 text-small text-ink",
          stickyHeader && "[&_thead>tr>th]:sticky [&_thead>tr>th]:top-0 [&_thead>tr>th]:z-10 [&_thead>tr>th]:bg-layer-1",
          className,
        )}
        {...props}
      />
    </TableContext.Provider>
  );

  if (bordered) {
    return (
      <div
        data-slot="table-container"
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--radius-12)] bg-layer-1 border border-hairline",
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
  const { interactive } = useContext(TableContext);
  return (
    <tbody
      data-slot="table-body"
      data-interactive={interactive ? "" : undefined}
      className={cn(
        "[&_td]:border-b [&_td]:border-hairline-soft [&_tr:last-child>td]:border-b-0",
        interactive && [
          "[&_tr:hover>td]:bg-layer-hover",
          "[&_tr[data-selected]:hover>td]:bg-layer-hover",
        ],
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
        "font-medium",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------- Rows ------------------------------- */

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Marks the row as selected and sets `aria-selected`. */
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
        selected && "[&>td]:bg-layer-hover",
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

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment for the header cell content. */
  align?: "left" | "center" | "right";
}

export function TableHead({
  className,
  align = "left",
  ...props
}: TableHeadProps): React.ReactElement {
  const { size } = useContext(TableContext);

  return (
    <th
      data-slot="table-head"
      className={cn(
        headHeightBySize[size],
        "border-b border-hairline-strong px-3 text-mini font-medium text-ink-muted whitespace-nowrap",
        align === "right" && "text-right",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
      {...props}
    />
  );
}

export interface TableSortButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: SortDirection;
}

/** Compact sort control composed inside a TableHead. */
export function TableSortButton({
  className,
  direction = "none",
  children,
  ...props
}: TableSortButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      data-slot="table-sort-button"
      data-direction={direction}
      className={cn(
        "-mx-1 inline-flex h-7 items-center gap-1 rounded-[var(--radius-6)] px-1 text-mini font-medium text-ink-muted hover:bg-layer-hover hover:text-ink focus-visible:bg-layer-hover active:bg-layer-hover transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]",
        direction !== "none" && "text-ink",
        selectionFocus,
        className,
      )}
      {...props}
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
        "align-middle",
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
