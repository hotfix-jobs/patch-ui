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
 * Typography only. Weight is `font-semibold` (600), heavy enough to anchor
 * without competing with real headings. Layout is the parent's job: reach
 * for `space-y-*`, `gap-*`, or explicit margin on the wrapper. No baked-in
 * spacing means no callsite has to fight a default.
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
      "text-label-12 font-semibold text-gray-800",
      className,
    ),
  };

  return useRender({
    render: render ?? <p />,
    props: mergeProps<"p">(defaultProps, props),
  });
}
