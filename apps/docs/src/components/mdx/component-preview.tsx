"use client";

import { type ReactNode } from "react";

interface ComponentPreviewProps {
  children: ReactNode;
  /** Optional label shown above the preview */
  label?: string;
}

/**
 * Renders a live preview of a React component in a styled container.
 * Used in MDX pages to show interactive component demos.
 */
export function ComponentPreview({ children, label }: ComponentPreviewProps) {
  return (
    <div
      className="my-6 overflow-hidden rounded-[6px] ring-1 ring-patch-border"
      data-slot="component-preview"
    >
      <div className="w-full min-w-0 overflow-hidden p-6">{children}</div>
    </div>
  );
}
