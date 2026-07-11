// Shared class recipes composed via cn() from ../utils.

/** Focus outline via --focus-ring-color / --focus-ring-width / --focus-ring-offset. */
export const focusRing =
  "outline-none focus-visible:outline " +
  "focus-visible:outline-[length:var(--focus-ring-width)] " +
  "focus-visible:outline-[var(--focus-ring-color)] " +
  "focus-visible:outline-offset-[var(--focus-ring-offset)]";

/** Compact keyboard-focus indicator for non-editable controls. */
export const selectionFocus =
  "focus-visible:shadow-[inset_0_-2px_0_var(--focus-ring-color)]";

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
    "bg-transparent hover:bg-layer-hover active:bg-layer-selected",
  neutralBorder:
    "border border-hairline hover:border-hairline-strong active:border-hairline-tertiary",
};

/** Shared disabled contract: 50% opacity, cursor-not-allowed. */
export const disabled =
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

/** Standard color transition for hover/active fills and borders. */
export const colorTransition =
  "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]";

/** Muted icons at rest, lift to label color on interaction. Consumer
 *  overrides on the svg itself win over these descendant selectors. */
export const iconMuted =
  "[&_svg]:text-ink-muted [&_svg]:transition-colors [&_svg]:duration-[var(--duration-state)] [&_svg]:ease-[var(--ease-standard)] " +
  "hover:[&_svg]:text-ink focus-visible:[&_svg]:text-ink " +
  "data-[active]:[&_svg]:text-ink data-[popup-open]:[&_svg]:text-ink data-[state=open]:[&_svg]:text-ink data-[state=on]:[&_svg]:text-ink data-highlighted:[&_svg]:text-ink " +
  "aria-pressed:[&_svg]:text-ink aria-selected:[&_svg]:text-ink";

/** Opacity variant of iconMuted for solid-fill variants where changing
 *  color would break the fill/text contract. */
export const iconMutedSolid =
  "[&_svg]:opacity-70 [&_svg]:transition-opacity [&_svg]:duration-[var(--duration-state)] [&_svg]:ease-[var(--ease-standard)] " +
  "hover:[&_svg]:opacity-100 focus-visible:[&_svg]:opacity-100 active:[&_svg]:opacity-100";

/** Shared chrome for floating panels (Menu, Combobox, Select, Popover, Command). */
export const popupSurface =
  "rounded-[var(--radius-12)] bg-layer-1 border border-hairline shadow-menu outline-none focus:outline-none";

/** Held state shared by triggers while their popup is open. */
export const popupTriggerOpen = "data-[popup-open]:bg-fill-2";

/** Interactive row inside a popup list.
 *  Usage: cn(itemRow.base, density === "compact" ? itemRow.compact : itemRow.comfortable, iconMuted, ...) */
export const itemRow = {
  base:
    "flex items-center cursor-default select-none rounded-[var(--radius-6)] text-ink outline-none " +
    "data-[active]:bg-layer-hover data-highlighted:bg-layer-hover " +
    "data-[selected]:bg-layer-selected data-[checked]:bg-layer-selected aria-selected:bg-layer-selected " +
    "data-highlighted:data-[selected]:bg-layer-selected data-highlighted:data-[checked]:bg-layer-selected data-highlighted:aria-selected:bg-layer-selected " +
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
