import { Info, Lightbulb, OctagonAlert, TriangleAlert } from "lucide-react";
import type * as React from "react";

interface CalloutProps {
  children: React.ReactNode;
  type?: "note" | "warning" | "error" | "tip";
  title?: string;
}

const TYPE_CONFIG = {
  note: { Icon: Info, iconClass: "text-gray-800" },
  warning: { Icon: TriangleAlert, iconClass: "text-warning" },
  error: { Icon: OctagonAlert, iconClass: "text-error" },
  tip: { Icon: Lightbulb, iconClass: "text-success" },
} as const;

/**
 * Callout: MDX shortcode for asides. Flat surface, hairline border, one
 * color signal via the leading icon.
 *
 * The body applies aggressive `!`-prefixed overrides for <p> and <ul>
 * margins because the global mdx-components map applies `mb-4` to
 * paragraphs and lists. Without the override, nested content inside a
 * Callout inherits body-copy spacing which reads too airy inside the
 * confined box.
 */
export function Callout({ children, type = "note", title }: CalloutProps) {
  const { Icon, iconClass } = TYPE_CONFIG[type];

  return (
    <div
      data-slot="callout"
      data-type={type}
      className="my-6 flex items-start gap-3 rounded-[var(--radius-12)] border-[0.5px] border-gray-alpha-400 bg-background-200 p-4"
    >
      <Icon
        className={`mt-0.5 size-4 shrink-0 ${iconClass}`}
        aria-hidden
      />
      <div
        className={
          // Body column: prose color is gray-900 to match <p> body copy.
          // The `!` overrides beat the mdx-components map's global p/ul
          // margins so items sit compactly inside the callout.
          "min-w-0 flex-1 text-copy-14 text-gray-900 " +
          "[&_p]:!my-0 [&_p:not(:last-child)]:!mb-2 " +
          "[&_ul]:!my-0 [&_ul]:!ml-4 [&_ul:not(:last-child)]:!mb-2 " +
          "[&_ol]:!my-0 [&_ol]:!ml-4 [&_ol:not(:last-child)]:!mb-2 " +
          "[&_li]:!mt-1 [&_li]:!leading-6 " +
          "[&_code]:text-gray-1000 " +
          "[&_strong]:font-medium [&_strong]:text-gray-1000 " +
          "[&_a]:text-gray-1000 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-gray-alpha-500 hover:[&_a]:decoration-gray-1000"
        }
      >
        {title !== undefined && (
          <p className="!mb-2 font-medium text-gray-1000">{title}</p>
        )}
        {children}
      </div>
    </div>
  );
}
