"use client";

import type * as React from "react";
import { cn } from "../utils";

/**
 * ListRow: two-column row layout for lists of heterogeneous items.
 *
 * Use for stacked lists where each row shares a shape (title + optional
 * description on the left, controls on the right) but doesn't need
 * sortable columns like Table would. Common: member / integration /
 * deployment / notification / watchlist rows.
 *
 *   <ListRowList>
 *     <ListRow
 *       left={<Avatar letter="A" />}
 *       right={<Button size="sm">Remove</Button>}
 *     >
 *       <ListRowContent
 *         title="Ada Lovelace"
 *         description="ada@example.com"
 *       />
 *     </ListRow>
 *   </ListRowList>
 *
 * Compose freely: the `left`, body, and `right` slots each accept any
 * ReactNode, so a row could be `<Avatar>` + `<ListRowContent>` +
 * `<Button>` for a member row, or `<Checkbox>` + custom JSX +
 * `<Menu>` for a settings row.
 */

export interface ListRowProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Left slot: typically Avatar, Checkbox, or icon. */
  left?: React.ReactNode;
  /** Right slot: typically Button or a compact action cluster. */
  right?: React.ReactNode;
  /** Body content between the slots. Usually one or more <ListRowContent>. */
  children?: React.ReactNode;
  /** HTML element type. Defaults to `div`; pass `"li"` inside a `<ul>`. */
  as?: "div" | "li" | "button";
  /** Optional className overrides. */
  leftClassName?: string;
  rightClassName?: string;
  bodyClassName?: string;
  /** Vertical padding size. `md` (default) or `sm` for tighter rows. */
  size?: "sm" | "md";
}

export function ListRow({
  className,
  left,
  right,
  children,
  as = "div",
  leftClassName,
  rightClassName,
  bodyClassName,
  size = "md",
  ...props
}: ListRowProps): React.ReactElement {
  const Element = as as "div";
  return (
    <Element
      data-slot="list-row"
      className={cn(
        "flex items-center gap-3",
        size === "md" && "px-4 py-3",
        size === "sm" && "px-3 py-2",
        className,
      )}
      {...props}
    >
      {left != null && (
        <span
          data-slot="list-row-left"
          className={cn("flex shrink-0 items-center", leftClassName)}
        >
          {left}
        </span>
      )}
      <div
        data-slot="list-row-body"
        className={cn("flex min-w-0 flex-1 flex-col", bodyClassName)}
      >
        {children}
      </div>
      {right != null && (
        <span
          data-slot="list-row-right"
          className={cn("flex shrink-0 items-center gap-2", rightClassName)}
        >
          {right}
        </span>
      )}
    </Element>
  );
}

/* ----------------------------- Content ------------------------------ */

export interface ListRowContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Primary line: the entity's name or title. */
  title?: React.ReactNode;
  /** Secondary line under the title: email, path, role, tagline. */
  description?: React.ReactNode;
}

export function ListRowContent({
  className,
  title,
  description,
  children,
  ...props
}: ListRowContentProps): React.ReactElement {
  return (
    <div
      data-slot="list-row-content"
      className={cn("flex min-w-0 flex-col", className)}
      {...props}
    >
      {title != null && (
        <div
          data-slot="list-row-title"
          className="truncate text-button-14 text-gray-1000"
        >
          {title}
        </div>
      )}
      {description != null && (
        <div
          data-slot="list-row-description"
          className="truncate text-label-13 text-gray-800"
        >
          {description}
        </div>
      )}
      {children}
    </div>
  );
}

/* ------------------------------ List -------------------------------- */

export interface ListRowListProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as `<ul>` for semantic list markup; children should be `<ListRow as="li">`. Default `<div>`. */
  as?: "div" | "ul";
  /** Wrap the list in a bordered rounded card. Default true. */
  bordered?: boolean;
  /** Row hover fill for actionable lists. Default false. */
  interactive?: boolean;
}

export function ListRowList({
  className,
  as = "div",
  bordered = true,
  interactive = false,
  children,
  ...props
}: ListRowListProps): React.ReactElement {
  const Element = as as "div";
  return (
    <Element
      data-slot="list-row-list"
      className={cn(
        "flex flex-col",
        bordered &&
          "overflow-hidden rounded-[var(--radius-12)] border border-gray-alpha-400 bg-background-100",
        // Hairline between direct children so wrappers (e.g. an <article> around each ListRow) still get dividers.
        "[&>*+*]:border-t [&>*]:border-gray-alpha-400",
        interactive && "[&>*:hover]:bg-gray-alpha-100",
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
