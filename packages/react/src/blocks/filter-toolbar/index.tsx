"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import type * as React from "react";
import { cn } from "../../utils";
import { Button } from "../../components/button";
import { Scroller } from "../../components/scroller";

export type FilterToolbarOverflow = "scroll" | "wrap";

export interface FilterToolbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
  /** Horizontal rail by default; wrap is useful on spacious directory pages. */
  overflow?: FilterToolbarOverflow;
  /** Number of active filters. Controls visibility of the clear action. */
  activeCount?: number;
  onClearAll?: () => void;
  clearLabel?: string;
  /** Preformatted result count or other quiet metadata. */
  count?: React.ReactNode;
  /** Pinned controls such as sorting or view selection. */
  trailing?: React.ReactNode;
  ariaLabel?: string;
  filtersClassName?: string;
  trailingClassName?: string;
}

/** Responsive filter rail with clear, count, and pinned trailing actions. */
export function FilterToolbar({
  children,
  overflow = "scroll",
  activeCount = 0,
  onClearAll,
  clearLabel = "Clear all",
  count,
  trailing,
  ariaLabel = "Filters",
  className,
  filtersClassName,
  trailingClassName,
  ...props
}: FilterToolbarProps): React.ReactElement {
  const clearAction = (
    <AnimatePresence initial={false}>
      {activeCount > 0 && onClearAll && (
        <motion.div
          key="clear"
          layout
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ type: "spring", stiffness: 600, damping: 48 }}
          className="shrink-0 overflow-hidden"
        >
          <Button
            variant="tertiary"
            size="md"
            className="text-ink-muted"
            onClick={onClearAll}
          >
            {clearLabel}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-slot="filter-toolbar"
        data-overflow={overflow}
        className={cn(
          "flex w-full min-w-0 items-center gap-2",
          className,
        )}
        {...props}
      >
        <motion.div
          layout="size"
          data-slot="filter-toolbar-filters"
          className="min-w-0 flex-1"
        >
          {overflow === "scroll" ? (
            <Scroller
              overflow="x"
              ariaLabel={ariaLabel}
              childrenContainerClassName={cn(
                "items-center gap-1 pe-1 [&>*]:shrink-0",
                filtersClassName,
              )}
            >
              {children}
              {clearAction}
            </Scroller>
          ) : (
            <div
              role="group"
              aria-label={ariaLabel}
              className={cn(
                "flex flex-wrap items-center gap-1",
                filtersClassName,
              )}
            >
              {children}
              {clearAction}
            </div>
          )}
        </motion.div>

        {(count != null || trailing != null) && (
          <div
            data-slot="filter-toolbar-trailing"
            className={cn(
              "flex shrink-0 items-center gap-2 sm:gap-3",
              trailingClassName,
            )}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {count != null && (
                <motion.span
                  key={String(count)}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ type: "spring", stiffness: 600, damping: 48 }}
                  className="whitespace-nowrap text-mini font-medium tabular-nums text-ink-muted"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
            {trailing}
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
