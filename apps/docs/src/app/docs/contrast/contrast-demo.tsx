"use client";

import { useEffect, useState } from "react";

// WCAG 2.1 contrast math - mirrors packages/react/scripts/check-contrast.ts

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

const TIERS = [
  {
    key: "--patch-text",
    label: "patch-text",
    min: 7,
    tierLabel: "AAA body",
    decorative: false,
  },
  {
    key: "--patch-text-secondary",
    label: "patch-text-secondary",
    min: 4.5,
    tierLabel: "AA body",
    decorative: false,
  },
  {
    key: "--patch-text-tertiary",
    label: "patch-text-tertiary",
    min: 4.5,
    tierLabel: "AA meta",
    decorative: false,
  },
  {
    key: "--patch-text-quaternary",
    label: "patch-text-quaternary",
    min: 0,
    tierLabel: "decorative",
    decorative: true,
  },
] as const;

const SURFACES = [
  { key: "--patch-bg", label: "patch-bg" },
  { key: "--patch-surface", label: "patch-surface" },
  { key: "--patch-surface-hover", label: "patch-surface-hover" },
];

export function ContrastDemo() {
  // tick increments whenever the theme class changes, causing a re-render + re-read of CSS vars
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
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  };

  return (
    <div className="flex flex-col gap-8" data-tick={tick}>
      {TIERS.map((tier) => {
        const fg = readVar(tier.key);
        return (
          <div key={tier.key}>
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-sm font-medium text-gray-1000">
                {tier.label}
              </span>
              <span className="text-xs text-gray-800">
                {tier.decorative
                  ? `${tier.tierLabel} - no ratio guarantee`
                  : `${tier.tierLabel}, min ${tier.min}:1`}
              </span>
              {fg && (
                <span
                  className="ml-auto rounded-full border border-gray-alpha-400 px-2 py-0.5 font-mono text-xs text-gray-900"
                >
                  {fg}
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SURFACES.map((surface) => {
                const bg = readVar(surface.key);
                const ratio = fg && bg ? contrastRatio(fg, bg) : null;
                const ratioDisplay =
                  ratio !== null ? ratio.toFixed(2) : "n/a";
                const passes =
                  ratio !== null &&
                  (tier.decorative ? true : ratio >= tier.min);
                const showPassFail = !tier.decorative && ratio !== null;

                return (
                  <div
                    key={surface.key}
                    style={{
                      backgroundColor: bg || undefined,
                      border: "1px solid var(--gray-alpha-400)",
                      borderRadius: 8,
                      padding: "12px 14px",
                    }}
                  >
                    <div style={{ color: fg || undefined, fontSize: 11, lineHeight: "1.5", marginBottom: 2 }}>
                      11px sample text
                    </div>
                    <div style={{ color: fg || undefined, fontSize: 13, lineHeight: "1.5", marginBottom: 2 }}>
                      13px sample text
                    </div>
                    <div style={{ color: fg || undefined, fontSize: 16, lineHeight: "1.5" }}>
                      16px sample text
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-1">
                      <span className="font-mono text-[10px] text-gray-800">
                        {surface.label}
                      </span>
                      <span
                        className={[
                          "rounded-full px-1.5 py-0.5 font-mono text-[10px] font-medium",
                          showPassFail
                            ? passes
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-gray-200 text-gray-800",
                        ].join(" ")}
                      >
                        {ratio !== null ? `${ratioDisplay}:1` : "n/a"}
                        {showPassFail && (passes ? " ✓" : " ✗")}
                        {tier.decorative && ratio !== null && " (dec)"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
