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

const TOKEN_FLOOR = 10;
if (Object.keys(light).length < TOKEN_FLOOR || Object.keys(dark).length < TOKEN_FLOOR) {
  throw new Error(`parseBlock returned fewer than ${TOKEN_FLOOR} tokens — selector may not have matched`);
}

type Target = { fg: string; bgs: string[]; min: number; label: string };

const checks = (vars: Record<string, string>, theme: string): Target[] => [
  { fg: "patch-text", bgs: ["patch-bg", "patch-surface"], min: 7, label: `${theme}: patch-text AAA` },
  { fg: "patch-text-secondary", bgs: ["patch-bg", "patch-surface"], min: 4.5, label: `${theme}: patch-text-secondary AA` },
  { fg: "patch-text-tertiary", bgs: ["patch-bg", "patch-surface"], min: 4.5, label: `${theme}: patch-text-tertiary AA` },
];

const fails: string[] = [];
for (const [theme, vars] of [["light", light], ["dark", dark]] as const) {
  for (const c of checks(vars, theme)) {
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
