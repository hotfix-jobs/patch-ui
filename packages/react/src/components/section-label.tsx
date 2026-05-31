"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

export const sectionLabelVariants = cva(
  "flex items-baseline justify-between text-[length:var(--text-patch-micro)] uppercase tracking-[0.08em] text-patch-text-secondary font-medium",
  {
    defaultVariants: {
      variant: "bare",
    },
    variants: {
      variant: {
        bare: "mb-3",
        divided: "mb-5 pb-3 border-b-[0.5px] border-[var(--patch-border)]",
      },
    },
  },
);

export interface SectionLabelProps extends useRender.ComponentProps<"div"> {
  variant?: VariantProps<typeof sectionLabelVariants>["variant"];
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export function SectionLabel({
  className,
  variant,
  action,
  children,
  render,
  ...props
}: SectionLabelProps): React.ReactElement {
  const defaultProps = {
    className: cn(sectionLabelVariants({ className, variant })),
    "data-slot": "section-label",
    children: (
      <>
        <span>{children}</span>
        {action && (
          <span className="normal-case tracking-[var(--tracking-patch-small)] text-[length:var(--text-patch-mini)] font-medium text-patch-text">
            {action}
          </span>
        )}
      </>
    ),
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
