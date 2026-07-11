"use client";

import type * as React from "react";
import { cn } from "../utils";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  /** Primary CTA, typically a `<Button>`. */
  action?: React.ReactNode;
  /** Additional slots rendered below the primary action. */
  children?: React.ReactNode;
}

/** EmptyState: "no results" / "no data yet" placeholder. */
export function EmptyState({
  title,
  description,
  icon,
  action,
  children,
  className,
  ...props
}: EmptyStateProps): React.ReactElement {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center px-6 py-14 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div
          aria-hidden
          className="mb-3 flex items-center justify-center text-ink-muted [&_svg]:size-8"
          data-slot="empty-state-icon"
        >
          {icon}
        </div>
      )}
      <h3
        className="text-regular text-ink-muted"
        data-slot="empty-state-title"
      >
        {title}
      </h3>
      {description && (
        <p
          className="mt-1.5 max-w-md text-small text-ink-subtle"
          data-slot="empty-state-description"
        >
          {description}
        </p>
      )}
      {action && (
        <div className="mt-6" data-slot="empty-state-action">
          {action}
        </div>
      )}
      {children && (
        <div className="mt-6 flex flex-col items-center gap-2 w-full" data-slot="empty-state-extras">
          {children}
        </div>
      )}
    </div>
  );
}
