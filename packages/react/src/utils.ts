import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register our custom typography scales as font-size utilities. Without this,
// tailwind-merge lumps text-body-14 / text-caption-11 / etc into the same
// conflict group as text-ink (a color) and strips whichever comes first, so
// a destructive MenuItem's `text-body-13 ... text-error` collapses to just
// `text-error`, dropping the 13px size back to browser default.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { "text-display": ["20", "24", "32", "40", "48", "56", "64", "72"] },
        { "text-body": ["13", "14", "16", "18", "20"] },
        { "text-caption": ["11", "12"] },
        { "text-button": ["12", "14", "16"] },
        { "text-mono": ["12", "13", "14"] },
        "text-eyebrow",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
