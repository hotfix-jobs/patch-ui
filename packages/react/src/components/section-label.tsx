"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

export interface SectionLabelProps extends useRender.ComponentProps<"p"> {}

/**
 * SectionLabel: a small bold heading used to introduce a labeled section
 * within a larger surface: sidebar nav groups, showcase-wall cells, demo
 * variant clusters, foundations-page charts.
 *
 * Typography only. Uses the `text-button-12` recipe (12px, weight 500).
 *
 * Named "button" in our type system for its most common use, but the
 * family represents the "medium weight at this size" recipe. Section
 * labels are a legitimate non-button consumer: they want a heavier
 * anchor than the 400-weight label family provides so they read as
 * intentional headings rather than muted metadata. Per our type
 * discipline (compound classes used alone, no `font-*` override), this
 * is how you get medium at 12px.
 *
 * Layout is the parent's job: reach for `space-y-*`, `gap-*`, or
 * explicit margin on the wrapper.
 *
 *   <div className="space-y-3">
 *     <SectionLabel>Bordered variants</SectionLabel>
 *     {content}
 *   </div>
 */
export function SectionLabel({
  className,
  render,
  ...props
}: SectionLabelProps): React.ReactElement {
  const defaultProps = {
    "data-slot": "section-label",
    className: cn(
      "text-button-12 text-gray-800",
      className,
    ),
  };

  return useRender({
    render: render ?? <p />,
    props: mergeProps<"p">(defaultProps, props),
  });
}
