"use client";

import type * as React from "react";
import { cn } from "../utils";

/**
 * Table — semantic HTML table with consistent chrome. Thin wrappers around
 * the native `<table>` elements. Use for genuinely tabular data (multiple
 * rows sharing shape, at least one comparable column); for simpler
 * key/value layouts reach for Card / description-list patterns instead.
 *
 * TableBody accepts opt-in booleans that shape the whole body via CSS
 * descendant selectors — no per-row prop drilling required:
 *   - `striped` — alternating row backgrounds
 *   - `bordered` — vertical cell borders
 *   - `interactive` — row hover effect
 *
 * Usage:
 *   <Table>
 *     <TableHeader>
 *       <TableRow>
 *         <TableHead>Name</TableHead>
 *         <TableHead align="right">Last used</TableHead>
 *       </TableRow>
 *     </TableHeader>
 *     <TableBody interactive>
 *       <TableRow>
 *         <TableCell>acme-web</TableCell>
 *         <TableCell align="right">2m ago</TableCell>
 *       </TableRow>
 *     </TableBody>
 *   </Table>
 */

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Wrap in a horizontally-scrollable container. Default true so
   * long-content tables stay usable on narrow viewports without manual
   * overflow handling at the call site.
   */
  scrollable?: boolean;
  /**
   * Visual treatment.
   * - `default`: rounded outer, hairline border, elevated surface bg —
   *   dashboard / data-card feel.
   * - `flat`: no radius, no outer bg, no border — reference / documentation
   *   data-table feel.
   */
  variant?: "default" | "flat";
}

export function Table({
  className,
  scrollable = true,
  variant = "default",
  ...props
}: TableProps): React.ReactElement {
  const tableEl = (
    <table
      data-slot="table"
      data-variant={variant}
      className={cn(
        "w-full caption-bottom border-collapse text-copy-14 text-gray-1000",
        variant === "default" &&
          "overflow-hidden rounded-[var(--radius-12)] bg-background-100 border border-gray-alpha-400",
        className,
      )}
      {...props}
    />
  );
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
      className={cn(
        "bg-background-200 border-b border-gray-alpha-400",
        className,
      )}
      {...props}
    />
  );
}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Alternating row background colors. */
  striped?: boolean;
  /** Vertical cell borders. */
  bordered?: boolean;
  /** Row hover effect (opt-in for actionable rows, off by default). */
  interactive?: boolean;
}

export function TableBody({
  className,
  striped,
  bordered,
  interactive,
  ...props
}: TableBodyProps): React.ReactElement {
  return (
    <tbody
      data-slot="table-body"
      data-striped={striped ? "" : undefined}
      data-bordered={bordered ? "" : undefined}
      data-interactive={interactive ? "" : undefined}
      className={cn(
        striped && "[&_tr:nth-child(even)]:bg-background-200",
        bordered && "[&_td+td]:border-l [&_th+th]:border-l [&_td]:border-gray-alpha-400 [&_th]:border-gray-alpha-400",
        interactive && "[&_tr:hover]:bg-gray-alpha-100 [&_tr]:cursor-pointer",
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
        "bg-background-200 border-t border-gray-alpha-400 font-medium",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------- Rows ------------------------------- */

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function TableRow({
  className,
  ...props
}: TableRowProps): React.ReactElement {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-gray-alpha-400 last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------- Cells ------------------------------ */

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment for the header cell content. */
  align?: "left" | "center" | "right";
}

export function TableHead({
  className,
  align = "left",
  ...props
}: TableHeadProps): React.ReactElement {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-9 px-3 py-2 text-label-11 font-normal text-gray-800 whitespace-nowrap",
        align === "right" && "text-right",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
      {...props}
    />
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
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-3 py-2.5 align-middle",
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
      className={cn("mt-3 text-label-12 text-gray-800 text-left", className)}
      {...props}
    />
  );
}
