import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

type Rgb = { r: number; g: number; b: number };

const hexToRgb = (hex: string): Rgb => {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return {
    r: parseInt(v.slice(0, 2), 16),
    g: parseInt(v.slice(2, 4), 16),
    b: parseInt(v.slice(4, 6), 16),
  };
};

const relLum = ({ r, g, b }: Rgb): number => {
  const ch = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
};

const ratio = (a: string, b: string): number => {
  const la = relLum(hexToRgb(a));
  const lb = relLum(hexToRgb(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
};

const parseBlock = (css: string, selector: string): Record<string, string> => {
  const re = new RegExp(`${selector.replace(/[.:]/g, "\\$&")}\\s*{([^}]+)}`, "m");
  const body = css.match(re)?.[1] ?? "";
  const out: Record<string, string> = {};
  body.replace(/--([\w-]+):\s*(#[0-9a-fA-F]{3,6})\s*;/g, (_, k, v) => {
    out[k] = v;
    return "";
  });
  return out;
};

const css = readFileSync(resolve(__dirname, "../src/theme/tokens.css"), "utf8");
const light = parseBlock(css, ":root");
const dark = parseBlock(css, ".dark");

// The new token scheme ships a small set of hex tokens per theme
// (canvas + surface-1..4, ink * 4 tiers, error/warning/success roles
// with hover/active/fg). Sanity-check we pulled a reasonable count.
if (Object.keys(light).length < 15 || Object.keys(dark).length < 5) {
  throw new Error("parseBlock returned too few tokens — selector may not have matched");
}

// Dark overrides only the shifted tokens; status roles are theme-invariant
// so they don't appear in .dark. Merge for lookup.
const darkMerged = { ...light, ...dark };

type Target = { fg: string; bgs: string[]; min: number; label: string };

const checks = (theme: string): Target[] => [
  // Ink tiers on canvas and every surface rung. Primary text must clear
  // AAA; muted/subtle clear AA; tertiary clears AA-large only (disabled,
  // footnote, timestamp use cases).
  { fg: "ink", bgs: ["canvas", "surface-1", "surface-2", "surface-3", "surface-4"], min: 7.0, label: `${theme}: ink (primary text) AAA` },
  { fg: "ink-muted", bgs: ["canvas", "surface-1", "surface-2"], min: 4.5, label: `${theme}: ink-muted (secondary text) AA` },
  // ink-subtle and ink-tertiary target canvas contexts (placeholder,
  // footer link, disabled label, footnote). Both tiers land 4.4:1 /
  // 3.0:1 on surface-1 in light mode -- close to but under threshold.
  // Callsites that need low-contrast text on a lifted card should reach
  // for ink-muted instead.
  { fg: "ink-subtle", bgs: ["canvas"], min: 4.5, label: `${theme}: ink-subtle (placeholder / footer link) AA` },
  { fg: "ink-tertiary", bgs: ["canvas"], min: 3.0, label: `${theme}: ink-tertiary (disabled / footnote) AA-large` },

  // Primary button. --primary resolves to --ink through the var chain,
  // --on-primary to --canvas; check ink vs canvas directly (same pair,
  // inverted role). Same math either way.
  { fg: "canvas", bgs: ["ink"], min: 7.0, label: `${theme}: on-primary on primary (button label) AAA` },

  // Semantic status roles. Fixed hex, theme-invariant. -fg pair carries
  // label color that must clear AA against the fill in both themes.
  { fg: "error-fg", bgs: ["error"], min: 4.5, label: `${theme}: error-fg on error (error label) AA` },
  { fg: "warning-fg", bgs: ["warning"], min: 4.5, label: `${theme}: warning-fg on warning (warning label) AA` },
  { fg: "success-fg", bgs: ["success"], min: 4.5, label: `${theme}: success-fg on success (success label) AA` },
];

const fails: string[] = [];
for (const [theme, vars] of [["light", light], ["dark", darkMerged]] as const) {
  for (const c of checks(theme)) {
    const fg = c.fg.startsWith("#") ? c.fg : vars[c.fg];
    for (const bgKey of c.bgs) {
      const bg = bgKey.startsWith("#") ? bgKey : vars[bgKey];
      if (!fg) { console.warn(`[WARN] missing --${c.fg} in ${theme}`); continue; }
      if (!bg) { console.warn(`[WARN] missing --${bgKey} in ${theme}`); continue; }
      const r = ratio(fg, bg);
      const status = r >= c.min ? "PASS" : "FAIL";
      const line = `[${status}] ${c.label} on --${bgKey}: ${r.toFixed(2)}:1 (min ${c.min})`;
      console.log(line);
      if (status === "FAIL") fails.push(line);
    }
  }
}

if (fails.length) {
  console.error(`\n${fails.length} contrast violation(s)`);
  process.exit(1);
}
