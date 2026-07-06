"use client";

export function ColorScales() {
  return (
    <div className="flex flex-col gap-6 rounded-[var(--radius-12)] border border-hairline bg-surface-elevated p-6">
      <Row label="Canvas & surfaces">
        <Swatch className="bg-canvas" label="canvas" />
        <Swatch className="bg-surface-1" label="surface-1" />
        <Swatch className="bg-surface-2" label="surface-2" />
        <Swatch className="bg-surface-3" label="surface-3" />
        <Swatch className="bg-surface-4" label="surface-4" />
        <Swatch className="bg-surface-elevated" label="elevated" />
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
      <div className="text-caption-12 text-ink-muted">{label}</div>
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
      <div className="text-caption-11 text-ink-subtle">{label}</div>
    </div>
  );
}

function Hairline({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex size-14 items-center justify-center rounded-[var(--radius-6)] border bg-canvas ${className}`}
      >
        <div className="h-px w-8 bg-current opacity-60" />
      </div>
      <div className="text-caption-11 text-ink-subtle">{label}</div>
    </div>
  );
}

export function TypographySamples() {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-12)] border border-hairline bg-surface-elevated p-6">
      <Sample cls="text-display-32" text="Display 32" />
      <Sample cls="text-display-24" text="Display 24" />
      <Sample cls="text-display-20" text="Display 20" />
      <Sample cls="text-body-18" text="Body 18 — lead paragraph" />
      <Sample cls="text-body-16" text="Body 16 — default body copy" />
      <Sample cls="text-body-14" text="Body 14 — dense UI copy" />
      <Sample cls="text-body-13" text="Body 13 — sidebar item, table cell" />
      <Sample cls="text-caption-12" text="Caption 12 — metadata, hint, badge" />
      <Sample cls="text-button-16" text="Button 16 — large control label" />
      <Sample cls="text-button-14" text="Button 14 — default control label" />
      <Sample cls="text-button-12" text="Button 12 — small control label, chip" />
      <Sample cls="text-mono-13" text="Mono 13 — inline code, kbd, install snippet" />
    </div>
  );
}

function Sample({ cls, text }: { cls: string; text: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-4">
      <span className={`${cls} text-ink`}>{text}</span>
      <span className="text-caption-11 text-ink-subtle">.{cls}</span>
    </div>
  );
}

export function RadiusSamples() {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-[var(--radius-12)] border border-hairline bg-surface-elevated p-6 sm:grid-cols-4">
      <RadiusCell label="radius-6" cls="rounded-[var(--radius-6)]" />
      <RadiusCell label="radius-12" cls="rounded-[var(--radius-12)]" />
      <RadiusCell label="radius-16" cls="rounded-[var(--radius-16)]" />
      <RadiusCell label="radius-full" cls="rounded-full" />
    </div>
  );
}

function RadiusCell({ label, cls }: { label: string; cls: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`h-16 w-full border border-hairline bg-surface-1 ${cls}`} />
      <div className="text-caption-11 text-ink-subtle">{label}</div>
    </div>
  );
}
