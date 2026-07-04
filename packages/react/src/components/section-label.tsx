"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

export type SectionLabelProps = useRender.ComponentProps<"p">;

/**
 * SectionLabel: a section anchor heading. Sits above a labeled group of
 * content (sidebar nav groups, footer columns, browse-hub column heads,
 * showcase-wall cells, demo variant clusters) as a mid-weight primary-
 * color title.
 *
 * Uses the `text-button-14` recipe (14px, weight 500) in primary text
 * (`text-gray-1000`), matching the Vercel column-heading treatment.
 * Reads as an intentional section anchor, not a muted eyebrow.
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
      "text-button-14 text-gray-1000",
      className,
    ),
  };

  return useRender({
    render: render ?? <p />,
    props: mergeProps<"p">(defaultProps, props),
  });
}
