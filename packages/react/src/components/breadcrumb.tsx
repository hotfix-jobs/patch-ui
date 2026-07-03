"use client";

import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import { Fragment, useState } from "react";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

export interface BreadcrumbItem {
  /** Label. If `href === "/"` and `name === "Home"`, renders as home icon. */
  name: string;
  /** If omitted, the crumb renders as a non-link (useful for the current page). */
  href?: string;
  /** Custom leading icon; overrides the auto home-icon behavior. */
  icon?: React.ReactNode;
}

export interface BreadcrumbProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItem[];
  /**
   * When true, treat any `<a>` element from your router as a Link. The default
   * uses `<a>`: pass a `linkAs` render prop if you need Next.js Link etc.
   */
  linkAs?: (props: {
    href: string;
    children: React.ReactNode;
    className?: string;
    "aria-label"?: string;
    "aria-current"?: "page";
  }) => React.ReactElement;
}

function Separator() {
  return (
    <ChevronRight
      aria-hidden
      className="size-3.5 shrink-0 text-gray-700"
    />
  );
}

/**
 * Breadcrumb: horizontal trail of ancestor links leading to the current page.
 *
 * - The Home crumb (href="/" + name="Home") renders as an icon-only link to
 *   keep the chain compact; screen readers still get "Home" via sr-only.
 * - Long chains (4+ items) collapse the middle behind a `…` toggle below sm:.
 *   Tapping expands them inline. Desktop always shows the full chain.
 * - Overflow scrolls horizontally with the scrollbar hidden so long final
 *   crumbs never wrap.
 */
export function Breadcrumb({
  items,
  linkAs,
  className,
  ...props
}: BreadcrumbProps): React.ReactElement | null {
  const [expanded, setExpanded] = useState(false);
  if (items.length === 0) return null;

  const collapseMiddle = items.length > 3;
  const LinkComponent =
    linkAs ??
    ((linkProps) => <a {...linkProps}>{linkProps.children}</a>);

  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumb"
      className={cn("text-copy-13", className)}
      {...props}
    >
      <ol className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-gray-800 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isMiddle = idx > 0 && !isLast;
          const hiddenOnMobile = collapseMiddle && isMiddle && !expanded;
          const isHome =
            item.icon === undefined &&
            item.href === "/" &&
            item.name === "Home";

          const content =
            item.icon !== undefined ? (
              <>
                <span className="inline-flex shrink-0 items-center">
                  {item.icon}
                </span>
                <span className={cn(isLast && "truncate")}>{item.name}</span>
              </>
            ) : isHome ? (
              <>
                <Home className="size-3.5 shrink-0" aria-hidden />
                <span className="sr-only">{item.name}</span>
              </>
            ) : (
              <span className={cn(isLast && "truncate")}>{item.name}</span>
            );

          const inlineClass = cn(
            "inline-flex items-center gap-1",
            focusRing,
            "rounded-[var(--radius-4)]",
          );

          const crumb =
            item.href && !isLast ? (
              <LinkComponent
                href={item.href}
                aria-label={isHome ? item.name : undefined}
                className={cn(
                  inlineClass,
                  "text-gray-800 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:text-gray-1000",
                )}
              >
                {content}
              </LinkComponent>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={cn(
                  inlineClass,
                  isLast && "text-gray-1000 min-w-0",
                )}
              >
                {content}
              </span>
            );

          return (
            <Fragment key={`${idx}-${item.name}`}>
              <li
                className={cn(
                  "flex items-center gap-2",
                  isLast && "min-w-0",
                  hiddenOnMobile && "hidden sm:flex",
                )}
              >
                {idx > 0 && <Separator />}
                {crumb}
              </li>
              {collapseMiddle && idx === 0 && (
                <li
                  className={cn(
                    "items-center gap-2",
                    expanded ? "hidden" : "flex sm:hidden",
                  )}
                >
                  <Separator />
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    aria-expanded={expanded}
                    aria-label="Show hidden breadcrumbs"
                    className={cn(
                      "inline-flex items-center rounded-[var(--radius-4)] px-0.5 text-gray-800 transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:text-gray-1000",
                      focusRing,
                    )}
                  >
                    <MoreHorizontal className="size-4" aria-hidden />
                  </button>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
