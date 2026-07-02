"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

export interface SectionLabelProps extends useRender.ComponentProps<"p"> {}

/**
 * SectionLabel — a small bold heading used to introduce a labeled section
 * within a larger surface: sidebar nav groups, showcase-wall cells, demo
 * variant clusters, foundations-page charts.
 *
 * Typography only. Uses the `text-label-12` recipe (12px, weight 400)
 * following our type system's family discipline: compound text-* classes
 * are complete recipes and are used alone, never paired with a `font-*`
 * override. A 400-weight label at 12px reads as a calm hierarchical
 * divider, which is what section labels are meant to be. Layout is the
 * parent's job: reach for `space-y-*`, `gap-*`, or explicit margin on
 * the wrapper.
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
      "text-label-12 text-gray-800",
      className,
    ),
  };

  return useRender({
    render: render ?? <p />,
    props: mergeProps<"p">(defaultProps, props),
  });
}
