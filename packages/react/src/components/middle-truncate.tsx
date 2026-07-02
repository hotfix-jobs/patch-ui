"use client";

import type * as React from "react";
import { cn } from "../utils";

export interface MiddleTruncateProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The full string to render. Shown verbatim on hover via `title`. */
  value: string;
}

/**
 * MiddleTruncate — truncates a string in the middle, preserving the start
 * and end. Use for identifiers where BOTH the beginning and end matter
 * (file paths, commit hashes, deploy IDs, URLs, branch names).
 *
 * Implementation: splits the value in half, renders `head` (LTR) + `…`
 * (fixed) + `tail` (RTL). As the container narrows, head clips from the
 * right and tail clips from the left, so the ellipsis stays visually
 * centered — matching Vercel Geist's algorithm.
 *
 * Not for prose / headings — middle-truncating a sentence destroys
 * meaning.
 */
export function MiddleTruncate({
  value,
  className,
  ...props
}: MiddleTruncateProps): React.ReactElement {
  // Short values render whole, no truncation logic needed.
  if (value.length <= 8) {
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

  // Roughly-equal split. Left gets the larger half when the length is
  // odd, so paths like `apps/foo/bar/baz.tsx` keep more context on the
  // side that starts the string.
  const mid = Math.ceil(value.length / 2);
  const head = value.slice(0, mid);
  const tail = value.slice(mid);

  return (
    <span
      data-slot="middle-truncate"
      title={value}
      aria-label={value}
      className={cn("flex w-full min-w-0 items-baseline", className)}
      {...props}
    >
      {/* Head clips from the right — no ellipsis, just overflow-hidden */}
      <span
        data-slot="middle-truncate-head"
        className="min-w-0 flex-1 overflow-hidden whitespace-nowrap"
      >
        {head}
      </span>
      {/* Fixed middle ellipsis glyph — always visible, always centered */}
      <span
        data-slot="middle-truncate-ellipsis"
        className="shrink-0"
        aria-hidden="true"
      >
        …
      </span>
      {/* Tail clips from the left via RTL trick: dir="rtl" makes the
          browser truncate at the logical start (visually the left).
          text-align:left keeps the reading direction sane. Unicode
          Left-to-Right Mark (‎) is prepended so mixed content
          doesn't flip. */}
      <span
        data-slot="middle-truncate-tail"
        dir="rtl"
        className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-left"
      >
        {"‎"}
        {tail}
      </span>
    </span>
  );
}
