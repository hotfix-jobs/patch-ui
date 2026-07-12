"use client";

export function ThemeColorsDemo() {
  return (
    <div className="my-6 flex w-full flex-col gap-6 rounded-[var(--radius-12)] bg-base p-6">
      <TokenRow label="Canvas and content">
        <Swatch className="bg-base" label="base" />
        <Swatch className="bg-layer-1" label="layer-1" />
        <Swatch className="bg-layer-2" label="layer-2" />
      </TokenRow>
      <TokenRow label="Controls">
        <Swatch className="bg-fill-1" label="fill-1" />
        <Swatch className="bg-fill-2" label="fill-2" />
        <Swatch className="bg-layer-hover" label="layer-hover" />
      </TokenRow>
      <TokenRow label="Text">
        <Swatch className="bg-ink" label="ink" />
        <Swatch className="bg-ink-muted" label="ink-muted" />
        <Swatch className="bg-ink-subtle" label="ink-subtle" />
        <Swatch className="bg-ink-tertiary" label="ink-tertiary" />
      </TokenRow>
      <TokenRow label="Status">
        <Swatch className="bg-error" label="error" />
        <Swatch className="bg-warning" label="warning" />
        <Swatch className="bg-success" label="success" />
      </TokenRow>
      <TokenRow label="Boundaries">
        <Hairline className="border-hairline-soft" label="soft" />
        <Hairline className="border-hairline" label="default" />
        <Hairline className="border-hairline-strong" label="strong" />
        <Hairline className="border-hairline-tertiary" label="tertiary" />
      </TokenRow>
    </div>
  );
}

function TokenRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-mini font-medium text-ink-muted">{label}</p>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

function Swatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`size-14 rounded-[var(--radius-6)] border border-hairline-soft ${className}`} />
      <span className="text-micro text-ink-muted">{label}</span>
    </div>
  );
}

function Hairline({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`flex size-14 items-center justify-center rounded-[var(--radius-6)] border bg-layer-1 ${className}`}>
        <span className="h-px w-8 bg-ink-muted" aria-hidden />
      </div>
      <span className="text-micro text-ink-muted">{label}</span>
    </div>
  );
}
