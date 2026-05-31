"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

export const displayHeadingVariants = cva(
  "font-medium leading-[0.92] text-patch-text",
  {
    defaultVariants: {
      size: "lg",
    },
    variants: {
      // Responsive: smaller on mobile, scales up at md/lg breakpoints to the
      // token value. Mobile sizes prevent overflow on 360-400px viewports.
      size: {
        md: "text-[36px] tracking-[-0.03em] md:text-[44px] md:tracking-[-0.035em] lg:text-[length:var(--text-patch-hero-md)] lg:tracking-[var(--tracking-patch-hero-md)]",
        lg: "text-[44px] tracking-[-0.035em] md:text-[64px] md:tracking-[-0.04em] lg:text-[length:var(--text-patch-hero-lg)] lg:tracking-[var(--tracking-patch-hero-lg)]",
        xl: "text-[52px] tracking-[-0.04em] md:text-[88px] md:tracking-[-0.045em] lg:text-[length:var(--text-patch-hero-xl)] lg:tracking-[var(--tracking-patch-hero-xl)]",
      },
    },
  },
);

export interface DisplayHeadingProps extends useRender.ComponentProps<"h1"> {
  size?: VariantProps<typeof displayHeadingVariants>["size"];
}

/**
 * DisplayHeading - marketing-only big-display typography.
 *
 * Sizes: md (56px) / lg (88px) / xl (124px).
 * Uses --text-patch-hero-* and --tracking-patch-hero-* from tokens.
 * Renders as <h1> by default; pass `render` for a different element.
 */
export function DisplayHeading({
  className,
  size,
  render,
  ...props
}: DisplayHeadingProps): React.ReactElement {
  const defaultProps = {
    className: cn(displayHeadingVariants({ size }), className),
    "data-slot": "display-heading",
  };

  return useRender({
    defaultTagName: "h1",
    props: mergeProps<"h1">(defaultProps, props),
    render,
  });
}
