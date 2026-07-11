"use client";

export function ColorScales() {
  return (
    <div className="flex flex-col gap-6 p-2">
      <Row label="Base + layers">
        <Swatch className="bg-base" label="base" />
        <Swatch className="bg-layer-1" label="layer-1" />
        <Swatch className="bg-layer-2" label="layer-2" />
      </Row>
      <Row label="Fills">
        <Swatch className="bg-fill-1" label="fill-1" />
        <Swatch className="bg-fill-2" label="fill-2" />
      </Row>
      <Row label="Ink (text)">
        <Swatch className="bg-ink" label="ink" />
        <Swatch className="bg-ink-muted" label="muted" />
        <Swatch className="bg-ink-subtle" label="subtle" />
        <Swatch className="bg-ink-tertiary" label="tertiary" />
      </Row>
      <Row label="Semantic status">
        <Swatch className="bg-error" label="error" />
        <Swatch className="bg-warning" label="warning" />
        <Swatch className="bg-success" label="success" />
      </Row>
      <Row label="Hairlines">
        <Hairline className="border-hairline" label="hairline" />
        <Hairline className="border-hairline-strong" label="strong" />
        <Hairline className="border-hairline-tertiary" label="tertiary" />
      </Row>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-mini text-ink-muted">{label}</div>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

function Swatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`size-14 rounded-[var(--radius-6)] border border-hairline ${className}`}
      />
      <div className="text-micro text-ink-subtle">{label}</div>
    </div>
  );
}

function Hairline({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex size-14 items-center justify-center rounded-[var(--radius-6)] border bg-base ${className}`}
      >
        <div className="h-px w-8 bg-current opacity-60" />
      </div>
      <div className="text-micro text-ink-subtle">{label}</div>
    </div>
  );
}

export function TypographySamples() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <Sample cls="text-title1" text="Title 1: 36px, page hero" />
      <Sample cls="text-title2" text="Title 2: 24px, section headline" />
      <Sample cls="text-title3" text="Title 3: 20px, panel title" />
      <Sample cls="text-large" text="Large: 18px, lead paragraph" />
      <Sample cls="text-regular" text="Regular: 16px, default body" />
      <Sample cls="text-small" text="Small: 14px, dense UI copy" />
      <Sample cls="text-mini" text="Mini: 12px, metadata, hint" />
      <Sample cls="text-micro" text="Micro: 11px, meta label" />
    </div>
  );
}

function Sample({ cls, text }: { cls: string; text: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-4">
      <span className={`${cls} text-ink`}>{text}</span>
      <span className="text-micro text-ink-subtle">.{cls}</span>
    </div>
  );
}

export function RadiusSamples() {
  return (
    <div className="grid grid-cols-2 gap-4 p-2 sm:grid-cols-3">
      <RadiusCell label="radius-4" cls="rounded-[var(--radius-4)]" />
      <RadiusCell label="radius-6" cls="rounded-[var(--radius-6)]" />
      <RadiusCell label="radius-8" cls="rounded-[var(--radius-8)]" />
      <RadiusCell label="radius-12" cls="rounded-[var(--radius-12)]" />
      <RadiusCell label="radius-16" cls="rounded-[var(--radius-16)]" />
      <RadiusCell label="radius-full" cls="rounded-full" />
    </div>
  );
}

function RadiusCell({ label, cls }: { label: string; cls: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`h-16 w-full bg-fill-1 ${cls}`} />
      <div className="text-micro text-ink-subtle">{label}</div>
    </div>
  );
}
