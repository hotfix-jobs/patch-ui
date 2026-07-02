"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

/**
 * Section — an opinionated settings-page primitive. A bordered card with
 * a structured header (title + subtitle), content area, and a two-column
 * footer (status on the left, actions on the right).
 *
 * Distinct from `Card`, which is a general-purpose surface primitive
 * (mix-and-match boolean props). Section prescribes a specific layout
 * that shows up over and over on settings pages, plan comparisons, and
 * project configuration screens.
 */
export function Section({
  className,
  render,
  ...props
}: useRender.ComponentProps<"section">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-col rounded-[var(--radius-12)] bg-background-100 border border-gray-alpha-400 text-gray-1000",
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
    className: cn("flex flex-col gap-1.5 px-6 py-5", className),
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
    className: cn("text-heading-20 text-gray-1000", className),
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
    className: cn("text-copy-14 text-gray-900", className),
    "data-slot": "section-subtitle",
  };

  return useRender({
    defaultTagName: "p",
    props: mergeProps<"p">(defaultProps, props),
    render,
  });
}

/**
 * SectionContent — main body of a Section. Renders below the header,
 * above the footer, with matching padding.
 */
export function SectionContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("flex flex-col gap-4 px-6 pb-6", className),
    "data-slot": "section-content",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export interface SectionFooterProps
  extends useRender.ComponentProps<"footer"> {
  /** Use the tonal secondary surface (`gray-100`) as the footer background. */
  secondary?: boolean;
}

/**
 * SectionFooter — bordered footer with a two-column layout. Place a
 * `SectionFooterStatus` on the left and `SectionFooterActions` on the
 * right. When only one child is present it aligns naturally.
 */
export function SectionFooter({
  className,
  render,
  secondary,
  ...props
}: SectionFooterProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 rounded-b-[calc(var(--radius-12)-1px)]",
      "border-t border-gray-alpha-400",
      secondary ? "bg-gray-100" : "bg-background-200",
      className,
    ),
    "data-slot": "section-footer",
  };

  return useRender({
    defaultTagName: "footer",
    props: mergeProps<"footer">(defaultProps, props),
    render,
  });
}

/** Left-aligned status text inside a SectionFooter. */
export function SectionFooterStatus({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("text-copy-14 text-gray-900", className),
    "data-slot": "section-footer-status",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

/** Right-aligned actions row inside a SectionFooter. */
export function SectionFooterActions({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("flex items-center gap-2", className),
    "data-slot": "section-footer-actions",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
