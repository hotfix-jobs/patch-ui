import type * as React from "react";

interface CalloutProps {
  children: React.ReactNode;
  type?: "note" | "warning" | "tip";
  title?: string;
}

const icons = {
  note: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
  tip: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
};

// Patch UI aesthetic: flat surface + full hairline border, no heavy left accent.
// The only color signal is the icon, tinted by type.
const iconColor = {
  note: "text-patch-text-tertiary",
  warning: "text-patch-warning",
  tip: "text-patch-success",
};

export function Callout({ children, type = "note", title }: CalloutProps) {
  return (
    <div
      className="my-6 flex gap-2.5 rounded-[var(--radius-patch-lg)] border-[0.5px] border-patch-border bg-patch-surface-2 p-4 text-[length:var(--text-patch-control)] leading-relaxed text-patch-text-secondary [&_strong]:font-medium [&_strong]:text-patch-text [&_code]:text-patch-text [&_a]:text-patch-text [&_a]:underline [&_a]:underline-offset-2"
      data-slot="callout"
      data-type={type}
    >
      <span className={`mt-px shrink-0 [&_svg]:size-4 ${iconColor[type]}`}>
        {icons[type]}
      </span>
      <div className="min-w-0 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:mb-0 [&_ul]:mt-1 [&_li]:mt-1 [&_li]:marker:text-patch-text-quaternary">
        {title !== undefined ? (
          <>
            <p className="mb-1.5 font-medium text-patch-text">{title}</p>
            {children}
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
