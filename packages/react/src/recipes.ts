// Shared class recipes. Components compose these instead of re-inventing
// per-component variants. Strings are Tailwind v4 class lists; combine
// with cn() from ../utils.

/** 1px neutral focus outline. Applied to every interactive element on
 *  :focus-visible. Intentionally single-layer and neutral. */
export const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-1 " +
  "focus-visible:outline-[var(--focus-ring-color)] " +
  "focus-visible:outline-offset-[var(--focus-ring-offset)]";

/** Control heights + padding + text. Single source for sm/md/lg. */
export const controlSize: Record<"sm" | "md" | "lg", string> = {
  sm: "h-8 px-3 gap-1.5 text-button-12",   // 32px, button-12
  md: "h-10 px-4 gap-2 text-button-14",    // 40px, button-14
  lg: "h-12 px-6 gap-2 text-button-16",    // 48px, button-16
};

/** State-stepping recipes. Interactive fills/borders walk the scale
 *  100 -> 200 -> 300 (fills) or 400 -> 500 -> 600 (borders) as the
 *  user hovers and activates. */
export const stateStepping = {
  neutralFill:
    "bg-gray-100 hover:bg-gray-200 active:bg-gray-300",
  neutralAlphaFill:
    "bg-gray-alpha-100 hover:bg-gray-alpha-200 active:bg-gray-alpha-300",
  neutralBorder:
    "border border-gray-alpha-400 hover:border-gray-alpha-500 active:border-gray-alpha-600",
};

/** Shared disabled contract. */
export const disabled =
  "disabled:bg-gray-100 disabled:text-gray-700 " +
  "disabled:cursor-not-allowed disabled:pointer-events-none";

/** Standard color transition for hover/active fills and borders. */
export const colorTransition =
  "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]";
