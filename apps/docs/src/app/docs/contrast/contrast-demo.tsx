"use client";

import { useEffect, useState } from "react";

/* WCAG 2.1 contrast math — mirrors packages/react/scripts/check-contrast.ts */

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

const TEXT_TIERS = [
  { key: "--gray-1000", label: "gray-1000", min: 7, tierLabel: "AAA body" },
  { key: "--gray-900", label: "gray-900", min: 4.5, tierLabel: "AA body" },
  { key: "--gray-800", label: "gray-800", min: 4.5, tierLabel: "AA meta" },
  { key: "--gray-700", label: "gray-700", min: 3, tierLabel: "AA-large / hint" },
] as const;

const SURFACES = [
  { key: "--background-100", label: "background-100" },
  { key: "--background-200", label: "background-200" },
] as const;

const ACCENTS = [
  { key: "--blue-700", label: "blue-700" },
  { key: "--red-700", label: "red-700" },
  { key: "--amber-700", label: "amber-700" },
  { key: "--green-700", label: "green-700" },
  { key: "--teal-700", label: "teal-700" },
  { key: "--purple-700", label: "purple-700" },
  { key: "--pink-700", label: "pink-700" },
] as const;

export function ContrastDemo() {
  // Re-read tokens whenever the theme class flips on <html>.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const obs = new MutationObserver(() => setTick((t) => t + 1));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  const readVar = (name: string): string => {
    if (typeof window === "undefined") return "";
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  };

  return (
    <div className="flex flex-col gap-10" data-tick={tick}>
      <section>
        <SectionHeading title="Text on surfaces" />
        <div className="flex flex-col gap-6">
          {TEXT_TIERS.map((tier) => {
            const fg = readVar(tier.key);
            return (
              <div key={tier.key}>
                <TierHeader
                  label={tier.label}
                  tierLabel={tier.tierLabel}
                  min={tier.min}
                  hex={fg}
                />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SURFACES.map((surface) => {
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
        <SectionHeading title="Accent solids on background-100" />
        <p className="mb-3 text-copy-13 text-gray-800">
          The `-700` step is the "solid" tier used for saturated badges,
          focused links, and status pills. Each must clear AA (4.5:1)
          against the primary canvas.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ACCENTS.map((accent) => {
            const fg = readVar(accent.key);
            const bg = readVar("--background-100");
            const ratio = fg && bg ? contrastRatio(fg, bg) : null;
            const passes = ratio !== null && ratio >= 4.5;
            return (
              <SwatchCard
                key={accent.key}
                bg={bg}
                fg={fg}
                label={accent.label}
                ratio={ratio}
                passes={passes}
                compact
              >
                <div
                  className="text-button-14"
                  style={{ color: fg || undefined }}
                >
                  Solid on canvas
                </div>
              </SwatchCard>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeading title="Primary button (inverted surface)" />
        <p className="mb-3 text-copy-13 text-gray-800">
          The primary Button is `background-100` text on a `gray-1000`
          fill. Must clear AAA (7:1) so the label stays readable at every
          weight.
        </p>
        {(() => {
          const fg = readVar("--background-100");
          const bg = readVar("--gray-1000");
          const ratio = fg && bg ? contrastRatio(fg, bg) : null;
          const passes = ratio !== null && ratio >= 7;
          return (
            <div className="grid grid-cols-1 sm:max-w-md">
              <SwatchCard
                bg={bg}
                fg={fg}
                label="background-100 on gray-1000"
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
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="mb-3 text-button-14 text-gray-1000">{title}</h3>
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
      <span className="text-button-14 text-gray-1000">
        {label}
      </span>
      <span className="text-label-12 text-gray-800">
        {tierLabel}, min {min}:1
      </span>
      {hex && (
        <span className="ml-auto rounded-full border border-gray-alpha-400 px-2 py-0.5 text-label-11 text-gray-900">
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
  compact,
  children,
}: {
  bg: string;
  fg: string;
  label: string;
  ratio: number | null;
  passes: boolean;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ backgroundColor: bg || undefined }}
      className="rounded-[var(--radius-6)] border-[0.5px] border-gray-alpha-400 p-3"
    >
      <div className={compact ? "" : "space-y-1"}>{children}</div>
      <div className="mt-3 flex items-center justify-between gap-1">
        <span
          className="text-label-11"
          style={{ color: fg || undefined, opacity: 0.7 }}
        >
          {label}
        </span>
        <span
          className={
            "rounded-full px-1.5 py-0.5 text-button-12 " +
            (ratio === null
              ? "bg-gray-100 text-gray-800"
              : passes
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800")
          }
        >
          {ratio !== null ? `${ratio.toFixed(2)}:1` : "n/a"}{" "}
          {ratio !== null && (passes ? "✓" : "✗")}
        </span>
      </div>
    </div>
  );
}

function SampleText({ fg }: { fg: string }) {
  return (
    <>
      <div className="text-label-11" style={{ color: fg || undefined }}>
        11px sample text
      </div>
      <div className="text-copy-13" style={{ color: fg || undefined }}>
        13px sample text
      </div>
      <div className="text-copy-16" style={{ color: fg || undefined }}>
        16px sample text
      </div>
    </>
  );
}
