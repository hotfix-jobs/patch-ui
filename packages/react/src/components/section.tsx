"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

/** Opinionated settings-page card: header, content, two-column footer (status + actions). */
export function Section({
  className,
  render,
  ...props
}: useRender.ComponentProps<"section">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-col rounded-[var(--radius-12)] bg-surface-elevated border border-hairline text-ink",
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
    className: cn("text-display-20 text-ink", className),
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
    className: cn("text-body-14 text-ink", className),
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
  /** Use the tonal secondary surface as the footer background. */
  secondary?: boolean;
}

export function SectionFooter({
  className,
  render,
  ...props
}: SectionFooterProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 rounded-b-[calc(var(--radius-12)-1px)]",
      "border-t border-hairline",
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
    className: cn("text-body-14 text-ink", className),
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

export interface SectionRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
}

/** One two-column setting inside a Section. Rows self-separate via `[&+&]` hairlines. */
export function SectionRow({
  title,
  description,
  className,
  children,
  ...props
}: SectionRowProps): React.ReactElement {
  return (
    <div
      data-slot="section-row"
      className={cn(
        "flex items-center gap-4 px-6 py-4 [&+&]:border-t [&+&]:border-hairline",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="text-button-14 text-ink">{title}</div>
        {description != null && (
          <div className="text-body-13 text-ink-muted">{description}</div>
        )}
      </div>
      {children != null && (
        <div
          className="flex shrink-0 items-center gap-2"
          data-slot="section-row-control"
        >
          {children}
        </div>
      )}
    </div>
  );
}
