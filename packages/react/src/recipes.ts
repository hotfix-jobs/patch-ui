// Shared class recipes composed via cn() from ../utils.

/** Focus outline via --focus-ring-color / --focus-ring-width / --focus-ring-offset. */
export const focusRing =
  "outline-none focus-visible:outline " +
  "focus-visible:outline-[length:var(--focus-ring-width)] " +
  "focus-visible:outline-[var(--focus-ring-color)] " +
  "focus-visible:outline-offset-[var(--focus-ring-offset)]";

/** Compact keyboard-focus indicator for non-editable controls. */
export const selectionFocus =
  "outline-none focus-visible:outline-none focus-visible:shadow-[inset_0_-2px_0_var(--focus-ring-color)]";

/** Control heights + padding + icon gap + text for sm/md/lg. */
export const controlSize: Record<"sm" | "md" | "lg", string> = {
  sm: "h-6 px-2.5 gap-1.5 text-mini font-medium",
  md: "h-8 px-3.5 gap-2 text-small font-medium",
  lg: "h-10 px-4 gap-2 text-regular font-medium",
};

/** Interactive fill/border state ramps. */
export const stateStepping = {
  /** Solid neutral fill that steps deeper on hover. Its base fill IS the
   *  control's surface, so hover moves to fill-2 rather than an overlay. */
  neutralFill:
    "bg-fill-1 hover:bg-fill-2 active:bg-fill-2",
  /** Transparent at rest, adaptive overlay on hover/active. Use for
   *  toolbar buttons, tabs, and sidebar links that sit on any surface. */
  neutralGhostFill:
    "bg-transparent hover:bg-layer-hover active:bg-layer-hover",
  neutralBorder:
    "border border-hairline hover:border-hairline-strong active:border-hairline-tertiary",
};

/** Shared disabled contract: 50% opacity, cursor-not-allowed. */
export const disabled =
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

/** Standard color transition for hover/active fills and borders. */
export const colorTransition =
  "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]";

/** Shared chrome for floating panels (Menu, Combobox, Select, Popover, Command). */
export const popupSurface =
  "rounded-[var(--radius-12)] bg-layer-1 border border-hairline shadow-menu outline-none focus:outline-none";

export const mobilePopupBackdrop =
  "fixed inset-0 z-[70] bg-scrim backdrop-blur-sm " +
  "transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-standard)] " +
  "data-starting-style:opacity-0 data-ending-style:opacity-0";

export const mobilePopupSurface =
  popupSurface +
  " fixed left-1/2 top-1/2 z-[80] flex w-[calc(100vw-1rem)] max-h-[calc(100dvh-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden " +
  "transition-[opacity,translate] duration-[var(--duration-overlay)] ease-[var(--ease-standard)] " +
  "data-starting-style:opacity-0 data-starting-style:translate-y-[calc(-50%+8px)] " +
  "data-ending-style:opacity-0 data-ending-style:translate-y-[calc(-50%+8px)]";

/** Held state shared by triggers while their popup is open. */
export const popupTriggerOpen = "data-[popup-open]:bg-fill-2";

/** Interactive row inside a popup list. */
export const itemRow = {
  base:
    "my-0.5 first:mt-0 last:mb-0 flex items-center cursor-default select-none rounded-[var(--radius-6)] text-ink outline-none transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] " +
    "data-[active]:bg-layer-hover data-highlighted:bg-layer-hover " +
    "data-[selected]:bg-layer-hover data-[checked]:bg-layer-hover aria-selected:bg-layer-hover " +
    "data-highlighted:data-[selected]:bg-layer-hover data-highlighted:data-[checked]:bg-layer-hover data-highlighted:aria-selected:bg-layer-hover " +
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  compact: "min-h-7 px-2 py-1.5 text-small",
  comfortable: "min-h-9 px-2.5 py-2 text-small",
};

/** Section header inside a popup list. */
export const itemGroupLabel = {
  base: "pt-1.5 pb-1 text-micro text-ink-tertiary",
  compact: "px-2",
  comfortable: "px-2.5",
};

/** Full-bleed 1px separator inside a popup list. Assumes the popup's
 *  content wrapper carries `p-1`; `-mx-1` overshoots that to reach the
 *  inner border edge to edge. */
export const popupDivider = "-mx-1 my-1 h-px bg-hairline";
