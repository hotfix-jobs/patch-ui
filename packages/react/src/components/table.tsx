"use client";

import type * as React from "react";
import { cn } from "../utils";

/** Semantic HTML table with consistent chrome. */

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Wrap in a horizontally-scrollable container. */
  scrollable?: boolean;
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
        // border-separate is required so cells accept border-radius for the interactive/striped pill look.
        "w-full caption-bottom border-separate border-spacing-0 text-small text-ink",
        "has-[tbody[data-interactive]]:[border-spacing:0_2px] has-[tbody[data-striped]]:[border-spacing:0_2px]",
        className,
      )}
      {...props}
    />
  );

  if (variant === "default") {
    return (
      <div
        data-slot="table-container"
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--radius-12)] bg-layer-1 border border-hairline-strong",
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
        "[&_tr:last-child>td]:border-b-0",
        interactive && [
          "[&_td]:!border-b-0",
          "[&_tr]:cursor-pointer",
          "[&_tr:hover>td]:bg-fill-2",
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

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function TableRow({
  className,
  ...props
}: TableRowProps): React.ReactElement {
  return (
    <tr data-slot="table-row" className={cn(className)} {...props} />
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
        "h-9 px-3 py-2 text-mini font-medium text-ink-muted whitespace-nowrap",
        "border-b border-hairline",
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
        "px-3 py-2.5 align-middle border-b border-hairline",
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
