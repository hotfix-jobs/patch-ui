"use client";

import type * as React from "react";
import { cn } from "../utils";

export interface MiddleTruncateProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The full string to render. Shown verbatim on hover via `title`. */
  value: string;
  /**
   * Number of characters from the end that stay visible. Increase for
   * identifiers where the tail is disambiguating (commit hashes / IDs
   * typically want 6–8; branch names often 8–12).
   */
  tail?: number;
}

/**
 * MiddleTruncate — truncates a string in the middle, preserving the start
 * and the last `tail` characters. Use for identifiers where BOTH the
 * beginning and end matter (file paths, commit hashes, deploy IDs, URLs).
 *
 * When the container is wide enough, the full value renders. When it's
 * not, the head span truncates with a single `…` glyph and the tail
 * stays flush.
 *
 * Not for prose / headings — middle-truncating a sentence destroys
 * meaning.
 */
export function MiddleTruncate({
  value,
  tail = 6,
  className,
  ...props
}: MiddleTruncateProps): React.ReactElement {
  // Guard against a tail longer than the value — just render the whole
  // string with no truncation logic.
  if (value.length <= tail) {
    return (
      <span
        data-slot="middle-truncate"
        title={value}
        className={cn("inline-block", className)}
        {...props}
      >
        {value}
      </span>
    );
  }

  const head = value.slice(0, -tail);
  const rest = value.slice(-tail);

  return (
    <span
      data-slot="middle-truncate"
      title={value}
      aria-label={value}
      className={cn("inline-flex min-w-0 max-w-full items-baseline", className)}
      {...props}
    >
      <span data-slot="middle-truncate-head" className="min-w-0 truncate">
        {head}
      </span>
      <span data-slot="middle-truncate-tail" className="shrink-0">
        {rest}
      </span>
    </span>
  );
}
