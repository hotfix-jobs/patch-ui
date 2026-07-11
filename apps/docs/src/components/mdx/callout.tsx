import type * as React from "react";

import { Info, Lightbulb, Warning, WarningOctagon } from "@phosphor-icons/react/dist/ssr";
interface CalloutProps {
  children: React.ReactNode;
  type?: "note" | "warning" | "error" | "tip";
  title?: string;
}

const TYPE_CONFIG = {
  note: { Icon: Info, iconClass: "text-ink-muted" },
  warning: { Icon: Warning, iconClass: "text-warning" },
  error: { Icon: WarningOctagon, iconClass: "text-error" },
  tip: { Icon: Lightbulb, iconClass: "text-success" },
} as const;

/** MDX shortcode for asides. */
export function Callout({ children, type = "note", title }: CalloutProps) {
  const { Icon, iconClass } = TYPE_CONFIG[type];

  return (
    <div
      data-slot="callout"
      data-type={type}
      className="my-6 flex items-start gap-3 rounded-[var(--radius-12)] bg-fill-1 p-4"
    >
      <Icon
        className={`mt-0.5 size-4 shrink-0 ${iconClass}`}
        aria-hidden
      />
      <div
        className={
          // `!` overrides beat the mdx-components map's global p/ul margins.
          "min-w-0 flex-1 text-small text-ink " +
          "[&_p]:!my-0 [&_p:not(:last-child)]:!mb-2 " +
          "[&_ul]:!my-0 [&_ul]:!ml-4 [&_ul:not(:last-child)]:!mb-2 " +
          "[&_ol]:!my-0 [&_ol]:!ml-4 [&_ol:not(:last-child)]:!mb-2 " +
          "[&_li]:!mt-1 [&_li]:!leading-6 " +
          "[&_code]:text-ink " +
          "[&_strong]:font-medium [&_strong]:text-ink " +
          "[&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-hairline-tertiary hover:[&_a]:decoration-ink"
        }
      >
        {title !== undefined && (
          <p className="!mb-2 font-medium text-ink">{title}</p>
        )}
        {children}
      </div>
    </div>
  );
}
