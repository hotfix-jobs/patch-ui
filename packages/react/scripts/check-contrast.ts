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

if (Object.keys(light).length < 40 || Object.keys(dark).length < 40) {
  throw new Error("parseBlock returned too few tokens — selector may not have matched");
}

type Target = { fg: string; bgs: string[]; min: number; label: string };

const checks = (theme: string): Target[] => [
  { fg: "gray-1000", bgs: ["background-100", "background-200"], min: 7.0, label: `${theme}: gray-1000 (primary text) AAA` },
  { fg: "gray-900",  bgs: ["background-100", "background-200"], min: 4.5, label: `${theme}: gray-900 (secondary text) AA` },
  { fg: "gray-800",  bgs: ["background-100", "background-200"], min: 4.5, label: `${theme}: gray-800 (tertiary text) AA` },
  { fg: "gray-700",  bgs: ["background-100", "background-200"], min: 3.0, label: `${theme}: gray-700 (disabled/hint text) AA-large` },

  { fg: "blue-700",   bgs: ["background-100"], min: 4.5, label: `${theme}: blue-700 solid on bg AA` },
  { fg: "red-700",    bgs: ["background-100"], min: 4.5, label: `${theme}: red-700 solid on bg AA` },
  { fg: "amber-700",  bgs: ["background-100"], min: 4.5, label: `${theme}: amber-700 solid on bg AA` },
  { fg: "green-700",  bgs: ["background-100"], min: 4.5, label: `${theme}: green-700 solid on bg AA` },
  { fg: "teal-700",   bgs: ["background-100"], min: 4.5, label: `${theme}: teal-700 solid on bg AA` },
  { fg: "purple-700", bgs: ["background-100"], min: 4.5, label: `${theme}: purple-700 solid on bg AA` },
  { fg: "pink-700",   bgs: ["background-100"], min: 4.5, label: `${theme}: pink-700 solid on bg AA` },

  { fg: "background-100", bgs: ["gray-1000"], min: 7.0, label: `${theme}: background-100 on gray-1000 (primary button) AAA` },
];

const fails: string[] = [];
for (const [theme, vars] of [["light", light], ["dark", dark]] as const) {
  for (const c of checks(theme)) {
    const fg = vars[c.fg];
    for (const bgKey of c.bgs) {
      const bg = vars[bgKey];
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
