"use client";

import type * as React from "react";
import { cn } from "../utils";

/**
 * Table - Patch UI primitive table set.
 *
 * Thin wrappers around the native <table> elements with consistent
 * Patch UI styling: hairline dividers, surface backgrounds, restrained
 * typography hierarchy. Mirrors the shadcn Base Table API
 * (Table / TableHeader / TableBody / TableFooter / TableHead /
 * TableRow / TableCell / TableCaption) so the components compose the
 * way developers expect.
 *
 * Used for any tabular data: leaderboards, comparison rows, pricing
 * matrices, or simple key/value pairs — any row/column display.
 *
 * Usage:
 *   <Table>
 *     <TableHeader>
 *       <TableRow>
 *         <TableHead>Field</TableHead>
 *         <TableHead align="right">Median</TableHead>
 *       </TableRow>
 *     </TableHeader>
 *     <TableBody>
 *       <TableRow>
 *         <TableCell>Backend Engineering</TableCell>
 *         <TableCell align="right">$215k</TableCell>
 *       </TableRow>
 *     </TableBody>
 *   </Table>
 */

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Wrap in a horizontally-scrollable container. Default true so
   *  long-content tables stay usable on narrow viewports without
   *  manual overflow handling at the call site. */
  scrollable?: boolean;
  /**
   * Visual treatment.
   * - `default`: rounded 12px outer, hairline border, surface bg — dashboard / data-card feel.
   * - `editorial`: flat (no radius, no outer bg, no border) — NYT / Bloomberg data-table feel.
   *    Row + header backgrounds and hairlines still render.
   */
  variant?: "default" | "editorial";
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
        "w-full caption-bottom border-collapse",
        "text-[length:var(--text-patch-control)] text-patch-text",
        variant === "default" &&
          "rounded-[var(--radius-patch-lg)] overflow-hidden bg-patch-surface border-[0.5px] border-patch-border",
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

export type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableHeader({
  className,
  ...props
}: TableSectionProps): React.ReactElement {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "bg-patch-surface-2 border-b-[0.5px] border-patch-border",
        className,
      )}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: TableSectionProps): React.ReactElement {
  return <tbody data-slot="table-body" className={className} {...props} />;
}

export function TableFooter({
  className,
  ...props
}: TableSectionProps): React.ReactElement {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-patch-surface-2 border-t-[0.5px] border-patch-border font-medium",
        className,
      )}
      {...props}
    />
  );
}

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function TableRow({
  className,
  ...props
}: TableRowProps): React.ReactElement {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b-[0.5px] border-patch-border last:border-b-0",
        "transition-colors hover:bg-[var(--menu-item-hover)]",
        className,
      )}
      {...props}
    />
  );
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment for the header cell content. Maps to text-{align}
   *  rather than the legacy `align` attribute so it composes with the
   *  rest of the Tailwind class chain. */
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
        "h-9 px-3 py-2 text-[length:var(--text-patch-micro)] font-semibold uppercase tracking-[var(--tracking-patch-label)] text-patch-text-tertiary",
        "whitespace-nowrap",
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
        "px-3 py-3 align-middle",
        "tracking-[-0.005em]",
        align === "right" && "text-right tabular-nums",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
      {...props}
    />
  );
}

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

export function TableCaption({
  className,
  ...props
}: TableCaptionProps): React.ReactElement {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-3 text-[length:var(--text-patch-mini)] text-patch-text-tertiary text-left",
        className,
      )}
      {...props}
    />
  );
}
