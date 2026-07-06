"use client";

import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

type Rgb = { r: number; g: number; b: number };

function hexToRgb(hex: string): Rgb | null {
  const h = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(h)) return null;
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return {
    r: parseInt(v.slice(0, 2), 16),
    g: parseInt(v.slice(2, 4), 16),
    b: parseInt(v.slice(4, 6), 16),
  };
}

function relLum({ r, g, b }: Rgb): number {
  const ch = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

function contrastRatio(a: string, b: string): number | null {
  const ra = hexToRgb(a);
  const rb = hexToRgb(b);
  if (!ra || !rb) return null;
  const la = relLum(ra);
  const lb = relLum(rb);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

type Tier = {
  fg: string;
  label: string;
  min: number;
  tierLabel: string;
  bgs: readonly { key: string; label: string }[];
};

const TEXT_TIERS: readonly Tier[] = [
  {
    fg: "--ink",
    label: "ink",
    min: 7,
    tierLabel: "AAA body",
    bgs: [
      { key: "--canvas", label: "canvas" },
      { key: "--surface-1", label: "surface-1" },
      { key: "--surface-2", label: "surface-2" },
      { key: "--surface-elevated", label: "surface-elevated" },
    ],
  },
  {
    fg: "--ink-muted",
    label: "ink-muted",
    min: 4.5,
    tierLabel: "AA secondary",
    bgs: [
      { key: "--canvas", label: "canvas" },
      { key: "--surface-1", label: "surface-1" },
      { key: "--surface-2", label: "surface-2" },
    ],
  },
  {
    fg: "--ink-subtle",
    label: "ink-subtle",
    min: 4.5,
    tierLabel: "AA placeholder",
    bgs: [{ key: "--canvas", label: "canvas" }],
  },
  {
    fg: "--ink-tertiary",
    label: "ink-tertiary",
    min: 3,
    tierLabel: "AA-large / disabled",
    bgs: [{ key: "--canvas", label: "canvas" }],
  },
];

const STATUS = [
  { fg: "--error-fg", bg: "--error", label: "error-fg on error" },
  { fg: "--warning-fg", bg: "--warning", label: "warning-fg on warning" },
  { fg: "--success-fg", bg: "--success", label: "success-fg on success" },
] as const;

export function ContrastDemo() {
  const [mounted, setMounted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const obs = new MutationObserver(() => setTick((t) => t + 1));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div className="text-caption-12 text-ink-subtle">Loading contrast matrix…</div>
    );
  }

  const readVar = (name: string): string => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  };

  return (
    <div className="flex flex-col gap-10">
      <section>
        <SectionHeading title="Text on surfaces" />
        <div className="flex flex-col gap-6">
          {TEXT_TIERS.map((tier) => {
            const fg = readVar(tier.fg);
            return (
              <div key={tier.fg}>
                <TierHeader
                  label={tier.label}
                  tierLabel={tier.tierLabel}
                  min={tier.min}
                  hex={fg}
                />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {tier.bgs.map((surface) => {
                    const bg = readVar(surface.key);
                    const ratio =
                      fg && bg ? contrastRatio(fg, bg) : null;
                    const passes = ratio !== null && ratio >= tier.min;
                    return (
                      <SwatchCard
                        key={surface.key}
                        bg={bg}
                        fg={fg}
                        label={surface.label}
                        ratio={ratio}
                        passes={passes}
                      >
                        <SampleText fg={fg} />
                      </SwatchCard>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeading title="Primary button (inverted surface)" />
        <p className="mb-3 text-body-13 text-ink-muted">
          The primary Button is <code>on-primary</code> text (canvas) on a{" "}
          <code>primary</code> (ink) fill. Must clear AAA (7:1).
        </p>
        {(() => {
          const fg = readVar("--on-primary");
          const bg = readVar("--primary");
          const ratio = fg && bg ? contrastRatio(fg, bg) : null;
          const passes = ratio !== null && ratio >= 7;
          return (
            <div className="grid grid-cols-1 sm:max-w-md">
              <SwatchCard
                bg={bg}
                fg={fg}
                label="on-primary on primary"
                ratio={ratio}
                passes={passes}
              >
                <div
                  className="text-button-14"
                  style={{ color: fg || undefined }}
                >
                  Save changes
                </div>
              </SwatchCard>
            </div>
          );
        })()}
      </section>

      <section>
        <SectionHeading title="Semantic status" />
        <p className="mb-3 text-body-13 text-ink-muted">
          Each status role pairs a fixed-hex fill with an <code>-fg</code>{" "}
          label that carries the accessible text color. Must clear AA (4.5:1).
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {STATUS.map((s) => {
            const fg = readVar(s.fg);
            const bg = readVar(s.bg);
            const ratio = fg && bg ? contrastRatio(fg, bg) : null;
            const passes = ratio !== null && ratio >= 4.5;
            return (
              <SwatchCard
                key={s.label}
                bg={bg}
                fg={fg}
                label={s.label}
                ratio={ratio}
                passes={passes}
              >
                <div
                  className="text-button-14"
                  style={{ color: fg || undefined }}
                >
                  Status label
                </div>
              </SwatchCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="mb-3 text-button-14 text-ink">{title}</h3>
  );
}

function TierHeader({
  label,
  tierLabel,
  min,
  hex,
}: {
  label: string;
  tierLabel: string;
  min: number;
  hex: string;
}) {
  return (
    <div className="mb-2 flex flex-wrap items-baseline gap-2">
      <span className="text-button-14 text-ink">{label}</span>
      <span className="text-caption-12 text-ink-muted">
        {tierLabel}, min {min}:1
      </span>
      {hex && (
        <span className="ml-auto rounded-full border border-hairline px-2 py-0.5 text-caption-11 text-ink">
          {hex}
        </span>
      )}
    </div>
  );
}

function SwatchCard({
  bg,
  fg,
  label,
  ratio,
  passes,
  children,
}: {
  bg: string;
  fg: string;
  label: string;
  ratio: number | null;
  passes: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ backgroundColor: bg || undefined }}
      className="rounded-[var(--radius-6)] border border-hairline p-3"
    >
      <div className="space-y-1">{children}</div>
      <div className="mt-3 flex items-center justify-between gap-1">
        <span
          className="text-caption-11"
          style={{ color: fg || undefined, opacity: 0.7 }}
        >
          {label}
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-elevated px-2 py-0.5 text-button-12 text-ink"
        >
          {ratio !== null &&
            (passes ? (
              <Check className="size-3 text-success" aria-hidden />
            ) : (
              <X className="size-3 text-error" aria-hidden />
            ))}
          {ratio !== null ? `${ratio.toFixed(2)}:1` : "n/a"}
        </span>
      </div>
    </div>
  );
}

function SampleText({ fg }: { fg: string }) {
  return (
    <>
      <div className="text-caption-11" style={{ color: fg || undefined }}>
        11px sample text
      </div>
      <div className="text-body-13" style={{ color: fg || undefined }}>
        13px sample text
      </div>
      <div className="text-body-16" style={{ color: fg || undefined }}>
        16px sample text
      </div>
    </>
  );
}
