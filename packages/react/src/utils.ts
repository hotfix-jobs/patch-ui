import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register our custom typography scales as font-size utilities. Without this,
// tailwind-merge lumps text-label-10 / text-copy-14 / etc into the same conflict
// group as text-gray-700 (a color) and strips whichever comes first, so the
// combined `text-label-10 text-gray-700` collapses to just `text-gray-700`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { "text-heading": ["14", "16", "20", "24", "32", "40", "48", "56", "64", "72"] },
        { "text-label": ["10", "11", "12", "13", "14", "16", "18", "20"] },
        { "text-copy": ["13", "14", "16", "18", "20", "24"] },
        { "text-button": ["12", "14", "16"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
