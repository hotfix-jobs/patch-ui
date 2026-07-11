"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";
import { focusRing } from "../recipes";

export interface CardProps extends useRender.ComponentProps<"div"> {
  /** Visual treatment for the content surface. */
  variant?: "surface" | "outlined" | "elevated";
  /** Add focus treatment and hover elevation. */
  interactive?: boolean;
  /** Marks the card as selected with the grouped-content surface. */
  selected?: boolean;
}

/** Surface primitive. For labeled settings panels with rows, use `Section`. */
export function Card({
  className,
  variant = "surface",
  interactive,
  selected,
  render,
  ...props
}: CardProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative rounded-[var(--radius-12)] text-ink",
      variant === "surface" && "bg-layer-1",
      variant === "outlined" && "border border-hairline bg-transparent",
      variant === "elevated" && "bg-layer-1 shadow-card",
      interactive && [
        "hover:shadow-card",
        "active:bg-layer-2",
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        focusRing,
      ],
      selected && "bg-layer-2",
      "transition-[background-color,box-shadow] duration-[var(--duration-state)] ease-[var(--ease-standard)]",
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
