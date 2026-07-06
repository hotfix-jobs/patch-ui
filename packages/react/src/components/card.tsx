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
  /** Sit on the next surface step up. Use for cards nested inside another card. */
  secondary?: boolean;
  /** Render hairline dividers between direct children (list container). */
  borderBetween?: boolean;
  /** Layout direction. */
  direction?: "column" | "row";
  /** Border adopts `--primary` and sets `aria-selected` for definitive selected state. */
  selected?: boolean;
}

/** Surface primitive. For structured header/content/footer layouts, use `Section`. */
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
      "relative flex rounded-[var(--radius-12)] text-ink",
      direction === "column" ? "flex-col" : "flex-row",
      secondary ? "bg-surface-1" : "bg-surface-elevated",
      border && "border border-hairline",
      shadow && "shadow-card",
      hoverable && [
        "cursor-pointer",
        secondary ? "hover:bg-surface-1" : "hover:bg-surface-elevated-hover",
        focusRing,
      ],
      borderBetween &&
        (direction === "column"
          ? "[&>*+*]:border-t [&>*+*]:border-hairline"
          : "[&>*+*]:border-l [&>*+*]:border-hairline"),
      selected && "!border-primary",
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
