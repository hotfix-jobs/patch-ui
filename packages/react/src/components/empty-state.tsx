"use client";

import { motion, useReducedMotion } from "motion/react";
import type * as React from "react";
import { cn } from "../utils";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Title: a short sentence describing the empty condition. */
  title: React.ReactNode;
  /** Helper text expanding on the title. Two lines max reads best. */
  description?: React.ReactNode;
  /** Optional icon, rendered in a rounded-square container above the title. */
  icon?: React.ReactNode;
  /** Primary CTA: typically a `<Button>`. */
  action?: React.ReactNode;
  /**
   * Additional slots rendered below the primary action. Use for a
   * secondary link ("Learn more") or supporting content.
   */
  children?: React.ReactNode;
}

/**
 * EmptyState: "no results" / "no data yet" placeholder.
 *
 * Structure: icon → title → description → primary action → optional
 * secondary children. Everything horizontally centered with generous
 * vertical spacing. Fades in on mount so the transition from a loading
 * state or a list-with-data feels intentional rather than abrupt.
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  children,
  className,
  ...props
}: EmptyStateProps): React.ReactElement {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      data-slot="empty-state"
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
      }
      className={cn(
        "flex flex-col items-center justify-center px-6 py-14 text-center",
        className,
      )}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {icon && (
        <div
          aria-hidden
          className="mb-5 flex size-14 items-center justify-center rounded-[var(--radius-6)] border border-gray-alpha-400 bg-background-100 text-gray-1000 [&_svg]:size-6"
          data-slot="empty-state-icon"
        >
          {icon}
        </div>
      )}
      <h3
        className="text-heading-20 text-gray-1000"
        data-slot="empty-state-title"
      >
        {title}
      </h3>
      {description && (
        <p
          className="mt-2 max-w-md text-copy-14 text-gray-900"
          data-slot="empty-state-description"
        >
          {description}
        </p>
      )}
      {action && (
        <div className="mt-5" data-slot="empty-state-action">
          {action}
        </div>
      )}
      {children && (
        <div className="mt-4 flex flex-col items-center gap-2" data-slot="empty-state-extras">
          {children}
        </div>
      )}
    </motion.div>
  );
}
