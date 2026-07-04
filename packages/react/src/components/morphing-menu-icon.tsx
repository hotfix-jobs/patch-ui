"use client";

import { motion, useReducedMotion } from "motion/react";
import type * as React from "react";
import { cn } from "../utils";

export interface MorphingMenuIconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Toggles the morph. `false` renders two bars, `true` rotates them into an X. */
  open: boolean;
}

/**
 * MorphingMenuIcon: a two-bar hamburger that morphs into an X. Bars
 * rotate 45 / -45 and converge on center when open; separate to
 * top / bottom of the box when closed. Matches the Vercel mobile
 * header pattern.
 *
 * Meant as the trigger icon for MobileNavPanel or any two-state
 * open / close toggle, but it's a plain animated icon and works
 * anywhere an icon slot expects a ReactNode.
 *
 * Respects `prefers-reduced-motion` (instant swap, no rotation).
 * Colors via `currentColor` so wrap in a text-color utility on the
 * parent Button to tint it.
 */
export function MorphingMenuIcon({
  open,
  className,
  ...props
}: MorphingMenuIconProps): React.ReactElement {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };
  const bar =
    "absolute left-1/2 top-1/2 h-[1.5px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current";

  return (
    <span
      aria-hidden="true"
      data-slot="morphing-menu-icon"
      data-state={open ? "open" : "closed"}
      className={cn(
        "relative inline-flex h-[18px] w-[18px] items-center justify-center",
        className,
      )}
      {...props}
    >
      <motion.span
        className={bar}
        initial={false}
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
        transition={transition}
      />
      <motion.span
        className={bar}
        initial={false}
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
        transition={transition}
      />
    </span>
  );
}
