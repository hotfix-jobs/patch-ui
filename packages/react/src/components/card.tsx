"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export interface CardProps extends useRender.ComponentProps<"div"> {
  /** Card treatment.
   *  `flat` (default) — transparent frame with hairline border. The quiet default for search/list/content surfaces.
   *  `elevated` — bg-layer-1 with soft edge. Opt-in for auth cards, marketing lifts, or any surface that should read as a distinct object. */
  variant?: "flat" | "elevated";
  /** Add interactive cursor/focus treatment plus a quiet border emphasis. */
  hoverable?: boolean;
  /** Render `shadow-card` in light mode (dark stays flat). Defaults to
   *  `true` for `elevated`, `false` for `flat`. Set explicitly to override. */
  shadow?: boolean;
  /** Render hairline dividers between direct children (list container). */
  borderBetween?: boolean;
  /** Layout direction. */
  direction?: "column" | "row";
  /** Marks the card as selected: primary border in both themes, aria-selected. */
  selected?: boolean;
}

/** Surface primitive. For labeled settings panels with rows, use `Section`. */
export function Card({
  className,
  variant = "flat",
  hoverable,
  shadow,
  borderBetween,
  direction = "column",
  selected,
  render,
  ...props
}: CardProps): React.ReactElement {
  const resolvedShadow = shadow ?? variant === "elevated";
  const defaultProps = {
    className: cn(
      "relative flex rounded-[var(--radius-8)] text-ink",
      direction === "column" ? "flex-col" : "flex-row",
      variant === "flat" && "border border-hairline",
      variant === "elevated" && "bg-layer-1 border border-hairline-soft",
      resolvedShadow && "shadow-card dark:shadow-none",
      hoverable && [
        "cursor-pointer",
        "hover:border-hairline-tertiary",
        focusRing,
      ],
      borderBetween &&
        (direction === "column"
          ? "[&>*+*]:border-t [&>*+*]:border-hairline"
          : "[&>*+*]:border-l [&>*+*]:border-hairline"),
      selected && "border border-primary",
      colorTransition,
      className,
    ),
    "data-slot": "card",
    "data-selected": selected || undefined,
    "aria-selected": selected || undefined,
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
