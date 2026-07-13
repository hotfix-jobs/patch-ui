"use client";

const samples = [
  ["text-title1", "Page title"],
  ["text-title2", "Section heading"],
  ["text-title3", "Panel title"],
  ["text-large", "Lead copy"],
  ["text-regular", "Body copy"],
  ["text-small", "Interface copy"],
  ["text-mini", "Metadata"],
  ["text-micro", "Compact label"],
] as const;

export function ThemeTypographyDemo() {
  return (
    <div className="my-6 flex w-full flex-col gap-4 rounded-[var(--radius-12)] bg-layer-1 p-6">
      {samples.map(([className, label]) => (
        <div key={className} className="flex flex-wrap items-baseline justify-between gap-3">
          <span className={`${className} text-ink`}>{label}</span>
          <code className="text-micro text-ink-muted">{className}</code>
        </div>
      ))}
    </div>
  );
}
