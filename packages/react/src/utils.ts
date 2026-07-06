import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register our custom scales so tailwind-merge doesn't collapse them
// into the wrong conflict groups. Without the font-size registration,
// tailwind-merge lumps text-small / text-micro / etc alongside text-ink
// (a color) and strips whichever comes first, so a destructive
// MenuItem's `text-small ... text-error` collapses to just `text-error`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-micro",
        "text-mini",
        "text-small",
        "text-regular",
        "text-large",
        "text-title3",
        "text-title2",
        "text-title1",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
