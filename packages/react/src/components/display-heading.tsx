"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

export const displayHeadingVariants = cva(
  "font-medium leading-[0.92] text-gray-1000",
  {
    defaultVariants: {
      size: "lg",
    },
    variants: {
      // Responsive: smaller on mobile, scales up at md/lg breakpoints to the
      // token value. Mobile sizes prevent overflow on 360-400px viewports.
      size: {
        md: "text-[36px] tracking-[-0.03em] md:text-[44px] md:tracking-[-0.035em] lg:text-[length:var(--text-patch-hero-md)] lg:tracking-tight",
        lg: "text-[44px] tracking-[-0.035em] md:text-[64px] md:tracking-[-0.04em] lg:text-[length:var(--text-patch-hero-lg)] lg:tracking-tight",
        xl: "text-[52px] tracking-[-0.04em] md:text-[88px] md:tracking-[-0.045em] lg:text-[length:var(--text-patch-hero-xl)] lg:tracking-tight",
      },
    },
  },
);

export interface DisplayHeadingProps extends useRender.ComponentProps<"h1"> {
  size?: VariantProps<typeof displayHeadingVariants>["size"];
  /**
   * Small uppercase label rendered above the heading (e.g. "Hiring",
   * "New release"). Uses --tracking-patch-label and --text-patch-micro
   * so it visually anchors a marketing display moment without competing.
   */
  eyebrow?: React.ReactNode;
}

/**
 * DisplayHeading - marketing-only big-display typography.
 *
 * Sizes: md (56px) / lg (88px) / xl (124px).
 * Uses --text-patch-hero-* and --tracking-patch-hero-* from tokens.
 * Renders as <h1> by default; pass `render` for a different element.
 *
 * The heading text is wrapped in a `text-wrap: balance` span so multi-line
 * headlines distribute words evenly instead of leaving orphan tails.
 */
export function DisplayHeading({
  className,
  size,
  eyebrow,
  children,
  render,
  ...props
}: DisplayHeadingProps): React.ReactElement {
  const defaultProps = {
    className: cn(displayHeadingVariants({ size }), className),
    "data-slot": "display-heading",
    children: (
      <>
        {eyebrow != null && (
          <span
            className="mb-3 block text-label-12 font-medium uppercase tracking-tight text-gray-900"
            data-slot="display-heading-eyebrow"
          >
            {eyebrow}
          </span>
        )}
        <span
          className="block text-balance"
          data-slot="display-heading-text"
        >
          {children}
        </span>
      </>
    ),
  };

  return useRender({
    defaultTagName: "h1",
    props: mergeProps<"h1">(defaultProps, props),
    render,
  });
}
