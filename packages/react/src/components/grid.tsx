"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useId } from "react";
import type * as React from "react";
import { cn } from "../utils";

type ResponsiveNumber = number | { sm?: number; md?: number; lg?: number };

/** Tailwind breakpoint widths (rem) matching the default v4 config. */
const BREAKPOINTS = { sm: "40rem", md: "48rem", lg: "64rem" } as const;

/** Build a grid-template-columns / grid-template-rows string. */
function templateFor(count: number): string {
  return `repeat(${count}, minmax(0, 1fr))`;
}

/**
 * Emit responsive grid-template-* CSS. Static (number) → inline style.
 * Responsive ({sm,md,lg}) → scoped <style> block using a data-attribute
 * selector so we don't leak into the DOM as a class collision.
 */
function useResponsiveTemplate(
  columns: ResponsiveNumber | undefined,
  rows: ResponsiveNumber | undefined,
) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const hasResponsiveColumns =
    columns != null && typeof columns !== "number";
  const hasResponsiveRows = rows != null && typeof rows !== "number";
  const isResponsive = hasResponsiveColumns || hasResponsiveRows;

  const inlineStyle: React.CSSProperties = {};
  if (columns != null && typeof columns === "number") {
    inlineStyle.gridTemplateColumns = templateFor(columns);
  } else if (hasResponsiveColumns) {
    // Base (mobile) value: sm if provided, else 1.
    inlineStyle.gridTemplateColumns = templateFor(
      (columns as { sm?: number }).sm ?? 1,
    );
  }
  if (rows != null && typeof rows === "number") {
    inlineStyle.gridTemplateRows = templateFor(rows);
  } else if (hasResponsiveRows) {
    inlineStyle.gridTemplateRows = templateFor(
      (rows as { sm?: number }).sm ?? 1,
    );
  }

  const dataAttr = isResponsive ? `data-grid-id="${id}"` : "";
  let css = "";
  if (isResponsive) {
    const rules: string[] = [];
    for (const bp of ["md", "lg"] as const) {
      const cols = hasResponsiveColumns
        ? (columns as Record<string, number | undefined>)[bp]
        : undefined;
      const rws = hasResponsiveRows
        ? (rows as Record<string, number | undefined>)[bp]
        : undefined;
      if (cols == null && rws == null) continue;
      const inner: string[] = [];
      if (cols != null) inner.push(`grid-template-columns:${templateFor(cols)};`);
      if (rws != null) inner.push(`grid-template-rows:${templateFor(rws)};`);
      rules.push(
        `@media (min-width:${BREAKPOINTS[bp]}){[data-grid-id="${id}"]{${inner.join("")}}}`,
      );
    }
    css = rules.join("");
  }

  return { id, inlineStyle, css, isResponsive, dataAttr };
}

export interface GridProps extends useRender.ComponentProps<"div"> {
  /**
   * Column count. Number for a fixed grid, or `{sm, md, lg}` for responsive
   * reflow at Tailwind's sm/md/lg breakpoints (40rem / 48rem / 64rem).
   */
  columns?: ResponsiveNumber;
  /**
   * Row count. Usually left undefined so rows flow from content.
   */
  rows?: ResponsiveNumber;
  /**
   * Show the hairline guides between cells. Default `true` (the whole point
   * of the component). Set `false` for a plain CSS grid without dividers.
   */
  guides?: boolean;
}

/**
 * Grid — a decorative layout primitive with visible hairline guides between
 * cells. Use it when the grid structure itself is part of the design:
 * marketing pages, documentation landings, feature grids, showcase walls.
 *
 * The hairlines are drawn with the `gap-px + colored parent background`
 * trick, so a single 1px `gray-alpha-400` gutter shows through between
 * cells. Cells default to `bg-background-100` so they cover the parent bg
 * except in the gutters.
 *
 *   <Grid columns={{ sm: 1, md: 2, lg: 3 }}>
 *     <GridCell>…</GridCell>
 *     <GridCell>…</GridCell>
 *     <GridCell column="1 / 3">Wide cell spanning two columns</GridCell>
 *   </Grid>
 *
 * For plain responsive content that doesn't need guides, reach for Tailwind's
 * `grid grid-cols-*` utilities instead.
 */
export function Grid({
  columns,
  rows,
  guides = true,
  className,
  style,
  render,
  ...props
}: GridProps): React.ReactElement {
  const { id, inlineStyle, css, isResponsive } = useResponsiveTemplate(
    columns,
    rows,
  );

  const defaultProps = {
    "data-slot": "grid",
    ...(isResponsive && { "data-grid-id": id }),
    className: cn(
      "grid",
      guides
        ? "gap-px overflow-hidden rounded-[var(--radius-12)] border-[0.5px] border-gray-alpha-400 bg-gray-alpha-400"
        : "",
      className,
    ),
    style: { ...inlineStyle, ...style },
  };

  const rendered = useRender({
    render: render ?? <div />,
    props: mergeProps<"div">(defaultProps, props),
  });

  if (!css) return rendered;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {rendered}
    </>
  );
}

type CellPosition =
  | string
  | number
  | { sm?: string | number; md?: string | number; lg?: string | number };

export interface GridCellProps extends useRender.ComponentProps<"div"> {
  /**
   * Column start / span. Number = start column, string `"1 / 3"` = span from
   * column 1 to column 3. Responsive object for breakpoint-specific values.
   */
  column?: CellPosition;
  /** Row start / span. Same shape as `column`. */
  row?: CellPosition;
  /**
   * Ensure this cell's opaque background covers the grid guides underneath.
   * Default `true` so guides render as gutters, not overlays. Set `false`
   * for transparent cells where guides should show through the cell body.
   */
  solid?: boolean;
}

function useCellPositions(
  column: CellPosition | undefined,
  row: CellPosition | undefined,
) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const isColumnResponsive =
    column != null && typeof column === "object";
  const isRowResponsive = row != null && typeof row === "object";
  const isResponsive = isColumnResponsive || isRowResponsive;

  const inlineStyle: React.CSSProperties = {};
  if (column != null && typeof column !== "object") {
    inlineStyle.gridColumn = String(column);
  } else if (isColumnResponsive) {
    const base = (column as { sm?: string | number }).sm;
    if (base != null) inlineStyle.gridColumn = String(base);
  }
  if (row != null && typeof row !== "object") {
    inlineStyle.gridRow = String(row);
  } else if (isRowResponsive) {
    const base = (row as { sm?: string | number }).sm;
    if (base != null) inlineStyle.gridRow = String(base);
  }

  let css = "";
  if (isResponsive) {
    const rules: string[] = [];
    for (const bp of ["md", "lg"] as const) {
      const col = isColumnResponsive
        ? (column as Record<string, string | number | undefined>)[bp]
        : undefined;
      const rw = isRowResponsive
        ? (row as Record<string, string | number | undefined>)[bp]
        : undefined;
      if (col == null && rw == null) continue;
      const inner: string[] = [];
      if (col != null) inner.push(`grid-column:${col};`);
      if (rw != null) inner.push(`grid-row:${rw};`);
      rules.push(
        `@media (min-width:${BREAKPOINTS[bp]}){[data-cell-id="${id}"]{${inner.join("")}}}`,
      );
    }
    css = rules.join("");
  }

  return { id, inlineStyle, css, isResponsive };
}

/**
 * GridCell — a child of Grid. Positioning via `column` and `row` (number for
 * start column, `"1 / 3"` string for span), opaque background by default so
 * grid guides render as gutters.
 */
export function GridCell({
  column,
  row,
  solid = true,
  className,
  style,
  render,
  ...props
}: GridCellProps): React.ReactElement {
  const { id, inlineStyle, css, isResponsive } = useCellPositions(column, row);

  const defaultProps = {
    "data-slot": "grid-cell",
    ...(isResponsive && { "data-cell-id": id }),
    className: cn(solid ? "bg-background-100" : "", className),
    style: { ...inlineStyle, ...style },
  };

  const rendered = useRender({
    render: render ?? <div />,
    props: mergeProps<"div">(defaultProps, props),
  });

  if (!css) return rendered;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {rendered}
    </>
  );
}
