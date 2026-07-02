"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type * as React from "react";
import { cn } from "../utils";

// SSR-safe layout effect. Falls back to useEffect on the server so React
// doesn't warn about useLayoutEffect during hydration.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface MiddleTruncateProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The full string to render. Shown verbatim on hover via `title`. */
  value: string;
  /**
   * Single ellipsis glyph to insert at the truncation point. Default `…`
   * (U+2026 HORIZONTAL ELLIPSIS). Only accepts a single string node so
   * the width measurement stays predictable.
   */
  ellipsis?: string;
}

/**
 * MiddleTruncate — truncates a string in the middle, preserving the
 * start and end. Use for identifiers where BOTH the beginning and end
 * matter (file paths, commit hashes, deploy IDs, URLs, branch names).
 *
 * Measures the parent's client width with ResizeObserver and uses a
 * hidden canvas to measure text width in the current computed font.
 * A binary search finds the largest symmetric head/tail split that
 * fits. Result: clean, pixel-accurate truncation, one ellipsis, both
 * sides shrink together — matches Vercel Geist.
 *
 * Not for prose / headings — middle-truncating a sentence destroys
 * meaning.
 */
export function MiddleTruncate({
  value,
  ellipsis = "…",
  className,
  style,
  ...props
}: MiddleTruncateProps): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const parent = el.parentElement;
      if (!parent) return;

      // Container width in CSS pixels. Use client width so padding is
      // excluded.
      const containerWidth = parent.clientWidth;
      if (containerWidth <= 0) return;

      const cs = window.getComputedStyle(el);
      // Canvas doesn't accept the full `font` shorthand as separate
      // properties, so build it from computed values.
      const font = `${cs.fontStyle} ${cs.fontVariant} ${cs.fontWeight} ${cs.fontSize} / ${cs.lineHeight} ${cs.fontFamily}`;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.font = font;

      const fullWidth = ctx.measureText(value).width;
      if (fullWidth <= containerWidth) {
        setDisplay(value);
        return;
      }

      const ellipsisWidth = ctx.measureText(ellipsis).width;
      const target = containerWidth - ellipsisWidth;

      // Binary search for the largest symmetric split (head length = tail
      // length = k) such that value.slice(0, k) + value.slice(-k) fits
      // within `target`. Left half gets the extra character on odd
      // remainders so path prefixes stay intact.
      const maxHalf = Math.floor(value.length / 2);
      let lo = 0;
      let hi = maxHalf;
      while (lo < hi) {
        const mid = Math.ceil((lo + hi + 1) / 2);
        const head = value.slice(0, mid);
        const tail = value.slice(-mid);
        const width = ctx.measureText(head + tail).width;
        if (width <= target) {
          lo = mid;
        } else {
          hi = mid - 1;
        }
      }

      if (lo === 0) {
        // Container too narrow to fit even one char + ellipsis. Show
        // the ellipsis alone; the title / aria-label still surface the
        // full value.
        setDisplay(ellipsis);
        return;
      }

      const head = value.slice(0, lo);
      // Give the head the extra character when the original length is odd.
      const tailStart = value.length - lo;
      const tail = value.slice(tailStart);
      setDisplay(head + ellipsis + tail);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el.parentElement ?? el);
    return () => ro.disconnect();
  }, [value, ellipsis]);

  return (
    <span
      ref={ref}
      data-slot="middle-truncate"
      title={value}
      aria-label={value}
      className={cn("block truncate", className)}
      style={style}
      {...props}
    >
      {display}
    </span>
  );
}
