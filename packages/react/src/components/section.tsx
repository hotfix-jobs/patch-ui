"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

export interface SectionProps extends useRender.ComponentProps<"section"> {
  /** Optional card surface. Plain remains structural only. */
  variant?: "plain" | "card";
  /** Draw separators between direct children. */
  dividers?: boolean;
}

/** Structural surface with optional header, content, and footer slots. */
export function Section({
  className,
  variant = "plain",
  dividers = false,
  render,
  ...props
}: SectionProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-col text-ink",
      variant === "card" && "rounded-[var(--radius-12)] bg-layer-1",
      dividers && "[&>*+*]:border-t [&>*+*]:border-hairline-soft",
      className,
    ),
    "data-slot": "section",
  };

  return useRender({
    defaultTagName: "section",
    props: mergeProps<"section">(defaultProps, props),
    render,
  });
}

export function SectionHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className,
    "data-slot": "section-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function SectionTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h3">): React.ReactElement {
  const defaultProps = {
    className: cn("text-title3 text-ink", className),
    "data-slot": "section-title",
  };

  return useRender({
    defaultTagName: "h3",
    props: mergeProps<"h3">(defaultProps, props),
    render,
  });
}

export function SectionSubtitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"p">): React.ReactElement {
  const defaultProps = {
    className: cn("text-small text-ink-muted", className),
    "data-slot": "section-subtitle",
  };

  return useRender({
    defaultTagName: "p",
    props: mergeProps<"p">(defaultProps, props),
    render,
  });
}

export function SectionContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className,
    "data-slot": "section-content",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export type SectionFooterProps = useRender.ComponentProps<"footer">;

export function SectionFooter({
  className,
  render,
  ...props
}: SectionFooterProps): React.ReactElement {
  const defaultProps = {
    className,
    "data-slot": "section-footer",
  };

  return useRender({
    defaultTagName: "footer",
    props: mergeProps<"footer">(defaultProps, props),
    render,
  });
}
