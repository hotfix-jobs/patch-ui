"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

export type SectionLabelProps = useRender.ComponentProps<"p">;

/** Section anchor heading. Sits above a labeled group of content. */
export function SectionLabel({
  className,
  render,
  ...props
}: SectionLabelProps): React.ReactElement {
  const defaultProps = {
    "data-slot": "section-label",
    className: cn(
      "text-small font-medium text-ink",
      className,
    ),
  };

  return useRender({
    render: render ?? <p />,
    props: mergeProps<"p">(defaultProps, props),
  });
}
