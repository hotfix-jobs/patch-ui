// Shared class recipes composed via cn() from ../utils.

/** 1px focus outline via --focus-ring-color / --focus-ring-offset. */
export const focusRing =
  "outline-none focus-visible:outline " +
  "focus-visible:outline-[length:var(--focus-ring-width)] " +
  "focus-visible:outline-[var(--focus-ring-color)] " +
  "focus-visible:outline-offset-[var(--focus-ring-offset)]";

/** Control heights + padding + icon gap + text for sm/md/lg. */
export const controlSize: Record<"sm" | "md" | "lg", string> = {
  sm: "h-6 px-2.5 gap-1.5 text-button-12",
  md: "h-8 px-3.5 gap-2 text-button-14",
  lg: "h-10 px-4 gap-2 text-button-16",
};

/** Interactive fill/border state ramps. */
export const stateStepping = {
  neutralFill:
    "bg-surface-1 hover:bg-surface-2 active:bg-surface-3",
  neutralGhostFill:
    "bg-transparent hover:bg-surface-1 active:bg-surface-2",
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

/** Shared chrome for floating panels (Menu, Combobox, Select, Tooltip). */
export const popupSurface =
  "rounded-[var(--radius-12)] bg-surface-elevated border border-hairline shadow-menu outline-none focus:outline-none";

/** Interactive row inside a popup list.
 *  Usage: cn(itemRow.base, density === "compact" ? itemRow.compact : itemRow.comfortable, iconMuted, ...) */
export const itemRow = {
  base:
    "flex items-center cursor-default select-none rounded-[var(--radius-6)] text-ink outline-none " +
    "data-[active]:bg-surface-2 data-highlighted:bg-surface-2 " +
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  compact: "min-h-7 px-2 py-1.5 text-body-13",
  comfortable: "min-h-9 px-2.5 py-2 text-body-14",
};

/** Section header inside a popup list. */
export const itemGroupLabel = {
  base: "pt-1.5 pb-1 text-caption-11 text-ink-tertiary",
  compact: "px-2",
  comfortable: "px-2.5",
};

/** Full-bleed 1px separator inside a popup list. Assumes the popup's
 *  content wrapper carries `p-1`; `-mx-1` overshoots that to reach the
 *  inner border edge to edge. */
export const popupDivider = "-mx-1 my-1 h-px bg-hairline";
