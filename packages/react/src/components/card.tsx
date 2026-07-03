"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing, colorTransition } from "../recipes";

export interface CardProps extends useRender.ComponentProps<"div"> {
  /** Show a visible border. */
  border?: boolean;
  /** Add a subtle hover state (bg shift + optional border darken). */
  hoverable?: boolean;
  /** Add an elevation shadow. */
  shadow?: boolean;
  /** Use the tonal secondary surface (gray-100) instead of background-100. */
  secondary?: boolean;
  /** Render dividers between direct children. */
  borderBetween?: boolean;
  /** Layout direction. */
  direction?: "column" | "row";
  /**
   * When true, switches the border to `gray-1000` for a stronger highlight
   * (multi-pick galleries, plan comparison). Also sets `aria-selected`.
   */
  selected?: boolean;
}

/**
 * Card: a surface primitive. Bordered, rounded, tokenized. Compose with
 * boolean props (`border`, `hoverable`, `shadow`, `secondary`, `borderBetween`,
 * `direction`) to fit the surface you need.
 *
 * Card is intentionally content-agnostic: for structured header/content/
 * footer layouts (settings pages, plan pickers), reach for `Section`.
 */
export function Card({
  className,
  border = true,
  hoverable,
  shadow,
  secondary,
  borderBetween,
  direction = "column",
  selected,
  render,
  ...props
}: CardProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative flex rounded-[var(--radius-12)] text-gray-1000",
      direction === "column" ? "flex-col" : "flex-row",
      secondary ? "bg-gray-100" : "bg-background-100",
      border && "border border-gray-alpha-400",
      shadow && "shadow-card",
      hoverable && [
        "cursor-pointer",
        secondary ? "hover:bg-gray-200" : "hover:bg-gray-100",
        border && "hover:border-gray-alpha-500",
        focusRing,
      ],
      borderBetween &&
        (direction === "column"
          ? "[&>*+*]:border-t [&>*+*]:border-gray-alpha-400"
          : "[&>*+*]:border-l [&>*+*]:border-gray-alpha-400"),
      selected && "!border-gray-1000",
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
