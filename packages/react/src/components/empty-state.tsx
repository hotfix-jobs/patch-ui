"use client";

import type * as React from "react";
import { cn } from "../utils";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Title - typically a short sentence describing the empty condition. */
  title: React.ReactNode;
  /** Helper text expanding on the title. */
  description?: React.ReactNode;
  /** Optional icon, rendered in a hairline-bordered 36×36 box above the title. */
  icon?: React.ReactNode;
  /**
   * Optional CTA. Pass any node — typically a `<Button>` from this library.
   * Routing primitives (e.g. `next/link`) are intentionally not coupled to
   * keep patch-ui framework-agnostic; wrap the Button with your router's Link.
   */
  action?: React.ReactNode;
}

/**
 * EmptyState - "no results" / "no data yet" placeholder.
 *
 * Used for zero-result, empty-list, and first-run states.
 * Refined to the new system: hairline icon container, tighter typography.
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps): React.ReactElement {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center px-6 py-12 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div
          aria-hidden
          className="mb-4 flex w-9 h-9 items-center justify-center rounded-[var(--radius-patch-sm)] border-[0.5px] border-patch-border text-patch-text-tertiary"
        >
          {icon}
        </div>
      )}
      <h3 className="text-[length:var(--text-patch-body)] font-medium tracking-[-0.015em] text-patch-text">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-xs text-[length:var(--text-patch-mini)] leading-relaxed text-patch-text-secondary">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
