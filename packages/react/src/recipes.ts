// Shared class recipes so components compose the design bar instead of
// re-inventing it. Strings are Tailwind v4 class lists; compose with cn().

/** 1px solid focus outline. Apply to interactive elements. */
export const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--patch-focus-ring)] focus-visible:outline-offset-[var(--patch-focus-ring-offset)]";

/** Control heights/padding/text by size. Single source for sm/md/lg. */
export const controlSize: Record<"sm" | "md" | "lg", string> = {
  sm: "h-8 px-3.5 gap-1.5 text-[length:var(--text-patch-mini)]", // 32px / 12px
  md: "h-10 px-5 gap-2 text-[length:var(--text-patch-control)]", // 40px / 13px
  lg: "h-11 px-6 gap-2 text-[length:var(--text-patch-body)]", // 44px / 15px
};

/** Standard color transition. Pairs with per-component asymmetric hover
 *  (instant in, eased out) where a hover color/bg change exists. */
export const colorTransition =
  "transition-colors duration-[var(--duration-patch-normal)] ease-[var(--ease-patch-out)]";
