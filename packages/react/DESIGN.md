---
version: alpha
name: Patch-UI-design-system
description: "A crisp-minimal React component library built on a quiet neutral canvas with clear content surfaces. Light uses a #f5f5f5 canvas and white surfaces; dark uses a #101010 canvas and #191919 surfaces. Backgrounds and spacing carry hierarchy, while alpha hairlines are reserved for overlays and structural dividers. Controls use radius 8, metadata radius 6, and content surfaces radius 12. The library ships a monochrome primary plus semantic status roles at fixed hex. Type is Inter Variable and JetBrains Mono for code; size and weight remain separate axes."

colors:
  # Monochrome primary. No chromatic brand hue ships in the library.
  # Consumers override --primary in their own layer if they want lavender,
  # cobalt, or anything else. Default is inverted gray for maximum neutrality.
  primary: "{colors.ink}"
  on-primary: "{colors.base}"
  # Computed via color-mix so a consumer's --primary override produces
  # matching hover/active steps automatically: mix toward --base 15% /
  # 25% lightens the near-black primary in light and darkens the
  # near-white primary in dark.
  primary-hover: "color-mix(in srgb, {colors.primary}, {colors.base} 15%)"
  primary-active: "color-mix(in srgb, {colors.primary}, {colors.base} 25%)"
  primary-soft: "color-mix(in srgb, {colors.primary} 8%, {colors.layer-1})"
  primary-soft-hover: "color-mix(in srgb, {colors.primary} 12%, {colors.layer-1})"
  primary-soft-active: "color-mix(in srgb, {colors.primary} 16%, {colors.layer-1})"
  on-primary-soft: "{colors.primary}"

  # Base is the quiet application canvas. Layer-1 is the primary content
  # surface, while layer-2 groups or selects content.
  base: "#f5f5f5"

  # layer-* is the "lifted above base" family. Card (elevated variant),
  # Modal, Menu popup, Combobox popup, Tooltip, Select popup, Input,
  # Table container, and secondary Button chrome all sit on layer-1.
  # layer-2 is the row/button-rest step above layer-1 (secondary Button
  # hover, Input hover companion, active-row highlight).
  layer-1: "#ffffff"
  layer-2: "#f0f0f0"

  # fill-* is the "tinted chip fill" family. Toggle track, Badge
  # neutral, code chip, Switch off-track, striped table hover,
  # Skeleton, active pill Tab. Note (Phase 1 preview): fill-1 now
  # resolves to the same rung as layer-2 -- the intentional collision
  # surfaces which callsites can collapse in Phase 2. fill-2 stays a
  # stronger active-state indication.
  fill-1: "#f0f0f0"
  fill-2: "#e8e8e8"

  # Adaptive interaction-state overlays. rgba (Radix grayA 3 / grayA 5),
  # not opaque, so they darken whatever surface sits underneath (base,
  # layer-1, fill-1, or a consumer's own background). Every transparent-
  # at-rest control uses these for hover / selected fills so states never
  # disappear when they land on a rung the state would otherwise match.
  # layer-selected is ~2x layer-hover so pressed always reads darker.
  layer-hover: "rgba(0,0,0,0.059)"
  layer-selected: "rgba(0,0,0,0.122)"

  # Hairlines. Four-step, all alpha (Radix grayA 3 / 6 / 7 / 8) so a
  # border on a nested card reads the same perceived weight as one on
  # base -- solid borders compound when they land on darker surfaces.
  # hairline-soft is the whisper edge (~6% alpha) for Card / elevated
  # surfaces where the border should be present but recede. hairline
  # is the standard input/menu/divider weight.
  hairline-soft: "rgba(0,0,0,0.059)"
  hairline: "rgba(0,0,0,0.149)"
  hairline-strong: "rgba(0,0,0,0.192)"
  hairline-tertiary: "rgba(0,0,0,0.267)"

  # Ink (text). Four tiers, Radix Gray 12 / 11 / 10 / 10. In the preview
  # ink-subtle collapses onto the same rung as ink-tertiary (both gray 10);
  # the token name stays alive so callsites keep resolving, but they
  # render identically.
  ink: "#202020"
  ink-muted: "#646464"
  ink-subtle: "#838383"
  ink-tertiary: "#838383"

  # Semantic status. Fixed hex, theme-invariant. Paired -fg tokens carry
  # label color so fill and text invert together per theme without a
  # callsite dark: variant.
  error: "#DC2626"
  error-hover: "#B91C1C"
  error-active: "#991B1B"
  error-fg: "#FFFFFF"
  warning: "#FDB203"
  warning-hover: "#D69800"
  warning-active: "#A97007"
  warning-fg: "#171717"
  success: "#1A7F37"
  success-hover: "#166A2E"
  success-active: "#115523"
  success-fg: "#FFFFFF"

  # Focus is semantic neutral gray and stays independent from brand or
  # action-color overrides to primary.
  focus-ring: "{colors.ink-muted}"
  focus-width: "2px"
  focus-offset: "2px"

  # Overlays.
  scrim: "rgba(0,0,0,0.45)"

# Size and weight are separate axes. Line-height comes from element
# defaults (body 1.5, <p> 1.7, headings 1.25) rather than the size
# token. Compose at the call site: `text-small font-medium` for a
# 14px medium label; `text-regular` alone for default 16px body.
fontSize:
  micro: 0.6875rem   # 11px, meta label, table column header
  mini: 0.75rem      # 12px, caption, hint, badge
  small: 0.875rem    # 14px, dense UI copy, sidebar item, button-md label (editorial bump; was 13)
  regular: 1rem      # 16px, default body, button-lg label (editorial bump; was 15)
  large: 1.125rem    # 18px, lead paragraph
  title3: 1.25rem    # 20px, panel title, section headline
  title2: 1.5rem     # 24px, page section headline
  title1: 2.25rem    # 36px, page hero headline

fontWeight:
  light: 300
  normal: 450    # Default body. Only rendered as 450 by variable Inter; non-variable fonts round to 400 or 500.
  medium: 500    # Default heading, button label
  semibold: 600
  bold: 700

# Named recipes: composed size + weight pairs for common roles. Line
# height still comes from the element the class lands on.
typography:
  title1:
    fontSize: "{fontSize.title1}"
    fontWeight: "{fontWeight.medium}"
  title2:
    fontSize: "{fontSize.title2}"
    fontWeight: "{fontWeight.medium}"
  title3:
    fontSize: "{fontSize.title3}"
    fontWeight: "{fontWeight.medium}"
  large:
    fontSize: "{fontSize.large}"
    fontWeight: "{fontWeight.normal}"
  regular:
    fontSize: "{fontSize.regular}"
    fontWeight: "{fontWeight.normal}"
  small:
    fontSize: "{fontSize.small}"
    fontWeight: "{fontWeight.normal}"
  mini:
    fontSize: "{fontSize.mini}"
    fontWeight: "{fontWeight.normal}"
  micro:
    fontSize: "{fontSize.micro}"
    fontWeight: "{fontWeight.normal}"
  # Control labels: same sizes as body but medium weight.
  control-lg:
    fontSize: "{fontSize.regular}"
    fontWeight: "{fontWeight.medium}"
  control-md:
    fontSize: "{fontSize.small}"
    fontWeight: "{fontWeight.medium}"
  control-sm:
    fontSize: "{fontSize.mini}"
    fontWeight: "{fontWeight.medium}"
  mono:
    fontFamily: JetBrains Mono
    fontSize: "{fontSize.small}"
    fontWeight: "{fontWeight.normal}"

# Radius scale. Named seats map to Tailwind utilities exposed as
# rounded-[var(--radius-N)]. control/surface/panel/full are the
# semantic seats; the raw numeric ladder (4/6/8/10/12/16) is what
# gets referenced in code, with 8 and 10 added this cycle as the
# in-between steps between control (6) and surface (12).
rounded:
  control-sm: 4px   # very small controls (checkbox, radio thumb)
  control: 8px      # buttons, inputs, section, tooltip, modal-inset -- was 6, bumped 6→8
  surface: 12px     # popupSurface (Menu, Combobox, Select, Popover, Command), Sheet
  panel: 16px       # marketing panels
  full: 9999px      # badges (default `rounded` shape now 6, `pill` shape 9999), avatars, pills

spacing:
  space-4: 4px
  space-8: 8px
  space-12: 12px
  space-16: 16px
  space-24: 24px
  space-32: 32px
  space-40: 40px
  space-64: 64px
  space-96: 96px

components:
  # All Button variants share: typography {typography.control-md},
  # square shape rounded to 8px (was 6), padding 8px 14px, height 32px
  # on md. Pressed / active fills use {colors.layer-selected} across the
  # non-solid variants.
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
  button-secondary:
    backgroundColor: "{colors.layer-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  button-secondary-hover:
    backgroundColor: "{colors.layer-2}"
    borderColor: "{colors.hairline-strong}"
  button-secondary-active:
    backgroundColor: "{colors.layer-selected}"
  button-soft:
    backgroundColor: "{colors.fill-1}"
    textColor: "{colors.ink}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  button-soft-hover:
    backgroundColor: "{colors.fill-2}"
  button-soft-active:
    backgroundColor: "{colors.layer-selected}"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  button-tertiary-hover:
    backgroundColor: "{colors.layer-hover}"
  button-tertiary-active:
    backgroundColor: "{colors.layer-selected}"
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "{colors.error-fg}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  # Inputs. Rounded 8 (was 6) so trigger chrome matches Button square.
  input:
    backgroundColor: "{colors.fill-1}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.control}"
    padding: 8px 12px
    height: 32px
  input-hover:
    backgroundColor: "{colors.fill-2}"
  # Focus returns to the content surface and draws a crisp primary
  # outline at the control edge.
  input-focused:
    backgroundColor: "{colors.layer-1}"
    outlineColor: "{colors.primary}"
  input-invalid:
    outlineColor: "{colors.error}"
  # Textarea, Select trigger, and Combobox input use this same surface,
  # hover, focus, invalid, sizing, and radius contract. Their labels,
  # descriptions, and validation messages are composed with Field.
  # Card variants share a borderless layer-1 surface. `elevated` adds
  # shadow-card when the object needs additional separation.
  card:
    backgroundColor: "{colors.layer-1}"
    rounded: "{rounded.surface}"
    padding: 24px
  card-elevated:
    backgroundColor: "{colors.layer-1}"
    rounded: "{rounded.surface}"
    padding: 24px
    shadow: shadow-card
  # Section mirrors Card's surface vocabulary at radius 12.
  section:
    backgroundColor: "{colors.layer-1}"
    rounded: "{rounded.surface}"
  section-outlined:
    backgroundColor: "{colors.layer-1}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.surface}"
  section-elevated:
    backgroundColor: "{colors.layer-1}"
    rounded: "{rounded.surface}"
    shadow: shadow-card
  panel:
    backgroundColor: "{colors.fill-1}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.panel}"
    padding: 32px
  dialog:
    backgroundColor: "{colors.base}"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.surface}"
    padding: 24px
    shadow: shadow-modal
  # menu-popup uses the popupSurface recipe (rounded 12). Menu row uses
  # itemRow uses layer-hover for transient active/highlighted navigation
  # and layer-selected for stored selected, checked, or aria-selected rows.
  menu-popup:
    backgroundColor: "{colors.layer-1}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.surface}"
    padding: 4px
    shadow: shadow-menu
  # Tooltip stays tighter than content-bearing overlays.
  tooltip:
    backgroundColor: "{colors.layer-1}"
    borderColor: "{colors.hairline}"
    textColor: "{colors.ink}"
    rounded: 6px
    padding: 4px 8px
    typography: "{typography.mini}"
    shadow: shadow-tooltip
  # Badges default to radius-6 metadata geometry; pill is an explicit
  # option for tags and categories.
  badge-neutral:
    backgroundColor: "{colors.fill-1}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.mini}"
    rounded: 6px
    padding: 2px 8px
  badge-status-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.success-fg}"
    typography: "{typography.mini}"
    rounded: 6px
    padding: 2px 8px
  badge-status-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.warning-fg}"
    typography: "{typography.mini}"
    rounded: 6px
    padding: 2px 8px
  badge-status-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.error-fg}"
    typography: "{typography.mini}"
    rounded: 6px
    padding: 2px 8px
  # Tabs use one borderless radius-8 treatment in both orientations.
  tab-default:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.small}"
    padding: 8px 12px
    rounded: "{rounded.control}"
  tab-selected:
    backgroundColor: "{colors.layer-selected}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    weight: "{fontWeight.medium}"
    padding: 8px 12px
    rounded: "{rounded.control}"
  section-eyebrow:
    textColor: "{colors.ink-muted}"
    typography: "{typography.control-sm}"
  top-nav:
    backgroundColor: "{colors.base}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    height: 56px
    borderColor: "{colors.hairline}"
  footer:
    backgroundColor: "{colors.base}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.mini}"
    padding: 64px 32px
    borderColor: "{colors.hairline}"
---

## Overview

Patch UI is a crisp-minimal React component library distributed copy-in through the shadcn registry model (`npx shadcn add @patchui/<component>`). The design system uses a quiet canvas, clear content surfaces, filled controls, and a monochrome primary. Backgrounds and spacing carry the primary hierarchy. Hairlines remain available for overlays, outlined surfaces, and explicit structural dividers.

Light `--base` is #f5f5f5 and `--layer-1` is white, so content cards read clearly without decorative borders. Dark `--base` is #101010 and `--layer-1` is #191919, preserving the same canvas-to-surface hierarchy. `--layer-2` groups or selects content. `--fill-1` and `--fill-2` provide the neutral control and metadata ramp. Hairlines remain alpha so necessary borders maintain consistent perceived weight across surfaces.

The library ships **no chromatic brand hue**. `{colors.primary}` resolves to `{colors.ink}` (near-black in light, near-white in dark), and `{colors.on-primary}` resolves to `{colors.base}`. Consumers who want a lavender, cobalt, or any other accent redefine `--primary` and `--primary-hover` in a single downstream layer; action components inherit their brand while semantic focus remains monochrome. The semantic status roles (`{colors.error}`, `{colors.warning}`, `{colors.success}`) remain fixed hex, theme-invariant, and outside the brand system: their meaning is universal and shouldn't shift with a consumer's palette.

Type is Inter Variable for everything that isn't code, JetBrains Mono for code. Size and weight are separate axes: eight size tokens (`micro`, `mini`, `small`, `regular`, `large`, `title3`, `title2`, `title1`) composed at the call site with five weight tokens (`light` 300, `normal` 450, `medium` 500, `semibold` 600, `bold` 700). Body defaults to `normal` (450, only rendered at 450 by the variable font — non-variable Inter rounds to 400 or 500). Headings default to `medium` (500) via element defaults. There is no separate Inter Display cut and no letter-spacing tokens.

The marketing surface for `ui.hotfix.jobs` reuses the same ladder and type scale rather than defining a separate marketing token set. Hero sections lift onto `{colors.fill-1}` panels rounded to `{rounded.panel}` 16px; feature grids use `{colors.fill-1}` cards at `{rounded.surface}` 12px; code snippets embed JetBrains Mono in `{colors.fill-2}` blocks. Dual-theme by default, no atmospheric gradients, no spotlight cards, no second chromatic accent.

**Key characteristics:**

- **Quiet canvas and clear surfaces.** Light uses `#f5f5f5` canvas with white content surfaces. Dark uses `#101010` canvas with `#191919` content surfaces.
- **Two surface families:** `--layer-1` / `--layer-2` for content and grouped surfaces, `--fill-1` / `--fill-2` for neutral controls and metadata. `--fill-1` and `--layer-2` intentionally share a rung.
- **Alpha hairlines.** Four steps (`--hairline-soft` / `--hairline` / `--hairline-strong` / `--hairline-tertiary`) remain for overlays, dividers, and explicitly outlined surfaces.
- **Monochrome primary.** No brand hue in the shipped tokens. Consumer overrides `--primary` to inject brand.
- **Two type families:** Inter Variable + JetBrains Mono. Size and weight are separate Tailwind utilities (`text-small font-medium`), not bundled into per-size recipes. Body defaults 14/16 (was 13/15).
- **Line-height on the element, not the size class.** `body` inherits 1.5, `<p>` uses 1.7, `<h1>`-`<h6>` use 1.25. A size utility on a `<div>` picks up body's 1.5.
- **Semantic status colors are fixed hex.** Error/warning/success read identically in both themes; paired `-fg` tokens flip the label color per theme.
- **Radius is disciplined:** `--radius-4/6/8/10/12/16/full`. Controls sit at radius-8, metadata at radius-6, and Cards plus popup surfaces at radius-12. Full radius is reserved for intrinsically circular geometry.
- **Focus is a crisp 2px outline** in `{colors.primary}`. Buttons offset it outside the control; filled Inputs draw it directly at the control edge.
- **Cards float on a soft two-stack shadow in light.** `--shadow-card` now stacks `0 1px 2px + 0 4px 12px rgba(3,17,38,0.05)` — an editorial lift rather than a flat plate. Dark mode still resolves to a subtle single-drop; overlays (menu popup, tooltip, modal, toast) keep the triple-stack.
- **Motion is fast and short.** `duration-state` 75ms for state changes, `duration-overlay` 150ms for overlays. One easing keyword (`ease-standard`) with a subtle spring bounce.

## Colors

> Source: `packages/react/src/theme/tokens.css` (Layer 1), consumed via `@theme inline` (Layer 2) into Tailwind utilities and compound classes (Layer 3).

### Base, Layers, Fills

Three token families make up the surface story: `--base` is the page background, `--layer-*` is content and grouped surfaces, and `--fill-*` is neutral control and metadata chrome.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.base}` | `#f5f5f5` | `#101010` | Page background and application canvas |
| `{colors.layer-1}` | `#ffffff` | `#191919` | Cards, panels, inputs, and overlays |
| `{colors.layer-2}` | `#f0f0f0` | `#242424` | Grouped or selected content |
| `{colors.fill-1}` | `#f0f0f0` | `#242424` | Secondary controls, neutral metadata, code chips, and switch off-tracks |
| `{colors.fill-2}` | `#e8e8e8` | `#2e2e2e` | Hovered or stronger neutral controls |
| `{colors.layer-hover}` | `rgba(0,0,0,0.059)` (grayA 3) | `rgba(255,255,255,0.071)` (grayA 3) | Hover / focus-visible / popup-open overlay on transparent-at-rest controls (tertiary Button, Tab, Sidebar link, Toggle, Pagination, icon-only close/clear buttons, list-row itemRow highlight) |
| `{colors.layer-selected}` | `rgba(0,0,0,0.122)` (grayA 5) | `rgba(255,255,255,0.133)` (grayA 5) | Active / pressed / persistent-on overlay on the same controls; ~2x hover strength |

The surface relationship stays consistent across themes. Content surfaces are lighter than the canvas in light and dark. Grouped content and filled controls step away from the primary content surface.

**`--layer-*` defines content hierarchy.** `--layer-1` is the default object surface. `--layer-2` groups or selects content without requiring a border.

**`--fill-*` is the neutral control ramp.** Toggle tracks, Badge metadata, code chips, Switch off-tracks, and secondary Buttons use `fill-1` at rest and `fill-2` on hover. Consumers can override this family without changing content surfaces.

`--layer-hover` and `--layer-selected` are alpha overlays rather than rungs on either ladder. Any transparent-at-rest control (tertiary Button, Tab, Sidebar link, Toggle, Pagination, icon-only close and clear buttons, NavigationMenu link, Calendar day) uses them for `hover:`, `focus-visible:`, `data-[popup-open]:`, `data-[pressed]:`, and `active:` fills. Because they darken whatever surface sits underneath rather than paint over it, the state is visible on any background: base, `--layer-1`, `--fill-1`, or a consumer's own content color. `--layer-selected` sits at ~2x hover strength so pressed always reads visibly darker than hover.

The intentional exception is the `neutralFill` recipe in `recipes.ts` (`bg-fill-1 hover:bg-fill-2 active:bg-fill-2`). That ladder is a solid-color ramp for filled controls that own their base surface. Its semantic is "step deeper on interaction," not "tint over the surface underneath," and it stays opaque.

### Hairlines

Hairlines carry every hierarchical separation that the surface ladder can't. Four steps, all alpha (Radix grayA 3 / 6 / 7 / 8) so a border on a nested card reads the same perceived weight as one on base — solid hex compounds when it lands on darker surfaces, and the alpha migration fixes it. `--hairline-soft` is the whisper edge for Card and elevated surfaces where the border should be present but recede; `--hairline` is the standard input / menu / divider weight.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.hairline-soft}` | `rgba(0,0,0,0.059)` (grayA 3) | `rgba(255,255,255,0.071)` (grayA 3) | Card (elevated variant), ModalInset, Calendar outer chrome — whisper edge that reads present without competing |
| `{colors.hairline}` | `rgba(0,0,0,0.149)` (grayA 6) | `rgba(255,255,255,0.172)` (grayA 6) | Menu border, outlined surfaces, explicit dividers |
| `{colors.hairline-strong}` | `rgba(0,0,0,0.192)` (grayA 7) | `rgba(255,255,255,0.231)` (grayA 7) | Structural separators and stronger outlined-control hover states |
| `{colors.hairline-tertiary}` | `rgba(0,0,0,0.267)` (grayA 8) | `rgba(255,255,255,0.333)` (grayA 8) | Radio hover border and dropzone drag hover |

### Text (Ink)

Four tiers. The naming is deliberate: `ink` is not called `foreground` because the system separates *type* from *icon* and *border* colors, all of which have their own token families. Ink applies to text only.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.ink}` | `#202020` (gray 12) | `#eeeeee` (gray 12) | Body text, headlines, emphasized labels |
| `{colors.ink-muted}` | `#646464` (gray 11) | `#b4b4b4` (gray 11) | Meta text, table cell secondary, muted icon rest state |
| `{colors.ink-subtle}` | `#838383` (gray 10) | `#7b7b7b` (gray 10) | Placeholder, missing/None cell values, deselected tab |
| `{colors.ink-tertiary}` | `#838383` (gray 10, same rung as subtle) | `#7b7b7b` (gray 10, same rung as subtle) | Disabled label, footnote |

In the Phase 1 preview `ink-subtle` and `ink-tertiary` collapse onto the same rung (both gray 10). The token names stay live so callsites keep resolving, but they render identically until Phase 2 collapses one of them.

### Primary (Monochrome)

The library ships no chromatic brand hue. `{colors.primary}` resolves to `{colors.ink}` and `{colors.on-primary}` to `{colors.base}`. In practice this means the default primary button on light is near-black on near-white, and on dark it is near-white on near-black. The visual weight comes from contrast, not hue.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.primary}` | `#202020` (inherits `--ink`) | `#eeeeee` (inherits `--ink`) | Primary button fill, slider indicator + thumb |
| `{colors.on-primary}` | `#f5f5f5` (inherits `--base`) | `#101010` (inherits `--base`) | Text on primary fill |
| `{colors.primary-hover}` | `color-mix(primary, base 15%)` | same | Hovered primary button |
| `{colors.primary-active}` | `color-mix(primary, base 25%)` | same | Pressed primary button |
| `{colors.primary-soft}` | `color-mix(primary 8%, layer-1)` | same | Soft highlighted or selected content |
| `{colors.primary-soft-hover}` | `color-mix(primary 12%, layer-1)` | same | Hovered or focused soft action |
| `{colors.primary-soft-active}` | `color-mix(primary 16%, layer-1)` | same | Pressed soft action |
| `{colors.on-primary-soft}` | inherits `--primary` | same | Text on the primary-soft surface |

`primary-hover` and `primary-active` are computed via `color-mix` so a consumer's `--primary` override on a downstream layer automatically produces matching hover and active steps. Mixing toward `--base` gives a "subtle move toward the background" that works in both themes: it lightens the near-black primary in light mode and darkens the near-white primary in dark.

**Consumer override.** A downstream project that wants a lavender brand redefines `--primary`, `--on-primary`, `--primary-hover`, and `--primary-active` in a single CSS layer after the token import. Buttons and links pick up the brand without recoloring the semantic monochrome focus treatment.

### Semantic Status

The three status roles are theme-invariant fixed hex. Meaning is universal; a warning should read as a warning in both light and dark without the consumer's brand palette shifting its color. Each role ships with a paired `-fg` token that carries the label color so fill and text invert together per theme.

| Role | Fill (both themes) | fg light | fg dark | Use |
|---|---|---|---|---|
| `{colors.error}` | `#DC2626` | `#FFFFFF` | `#FFFFFF` | Destructive buttons, error badges, form validation |
| `{colors.warning}` | `#FDB203` | `#171717` | `#171717` | Warning badges, caution indicators |
| `{colors.success}` | `#1A7F37` | `#FFFFFF` | `#FFFFFF` | Success badges, completed states, positive deltas |

Hover and active steps (`error-hover`, `success-active`, etc.) exist for each role but never shift hue, only lightness.

### Focus

Focus is semantic neutral gray, independent from `{colors.primary}` and the near-black/white `{colors.ink}`. Consumer action-color overrides do not recolor accessibility focus.

Editable fields draw the solid focus outline directly at their edge and return from `fill-1` to `layer-1` on focus. Non-editable controls use a compact monochrome indicator rather than borrowing the editable-field ring.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.focus-ring-color}` | `{colors.ink-muted}` | `{colors.ink-muted}` | Semantic neutral focus indicator |
| `{colors.focus-ring-width}` | `2px` | `2px` | Outline width |
| `{colors.focus-ring-offset}` | `2px` | `2px` | Outline offset |

Recipe: `focusRing` in `packages/react/src/recipes.ts` composes `focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]`. Every interactive primitive that uses the outside-ring approach applies the recipe verbatim.

### Overlay

`{colors.scrim}` at `rgba(0,0,0,0.45)` sits behind dialogs and drawers on both themes. On light mode it dims the canvas without going full black; on dark mode it deepens the canvas without going invisible.

## Typography

### Font Family

- **Inter Variable** carries everything that isn't code. Weight 100-900 covered by a single variable-font file. `font-family: "Inter", -apple-system, system-ui, "Segoe UI", Roboto, sans-serif`. There is no separate Inter Display cut.
- **Inter** carries body, buttons, and captions. Weight 400 for copy, weight 500 for buttons and eyebrows. Same fallback stack minus the Display entry.
- **JetBrains Mono** carries code contexts only. Weight 400. `font-family: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace`.

The display and text families are variants of the same superfamily. The system treats them as one continuous voice: the family change from display-20 down to body-20 is silent.

### Size Scale

Eight sizes. `regular` (16px) is the default body size; everything else steps out from there. Small and regular took an editorial bump this cycle (small 13→14, regular 15→16); every existing `text-small`/`text-regular` utility picks it up automatically.

| Utility | Size | Use |
|---|---|---|
| `text-micro` | 11px | Meta label, table column header, footer link |
| `text-mini` | 12px | Caption, badge, hint text |
| `text-small` | 14px | Dense UI copy, sidebar item, form label, table cell, default button label |
| `text-regular` | 16px | Default body copy, large button label |
| `text-large` | 18px | Lead paragraph |
| `text-title3` | 20px | Panel title, section headline |
| `text-title2` | 24px | Card title, page section headline |
| `text-title1` | 36px | Page hero headline |

The micro token wraps in `round(up, 0.6875rem, 2px)` on sub-2× DPI displays so 11px never lands on a fractional pixel.

### Weight Scale

Five weights. `normal` (450) is the default body weight — a variable-font-only value that reads slightly heavier than 400 without going into medium territory. Non-variable Inter rounds it to 400 or 500 depending on the browser.

| Utility | Weight | Use |
|---|---|---|
| `font-light` | 300 | Rare, decorative |
| `font-normal` | 450 | Default body, applied automatically to `<body>` |
| `font-medium` | 500 | Headings (applied automatically to `<h1>`–`<h6>`), button labels, form labels |
| `font-semibold` | 600 | Emphasized headings, section eyebrows |
| `font-bold` | 700 | Rare, only for genuine emphasis in copy |

### Line Height

Set on the element, not on the size utility.

| Element | Line height |
|---|---|
| `body` | 1.5 |
| `p` | 1.7 |
| `h1`–`h6` | 1.25 |

A size utility on a `<div>` inherits body's 1.5. Wrap the same content in `<p>` to open it up to 1.7, or in a heading to tighten to 1.25.

### Composition

```html
<!-- Default body: 16px, weight 450, line-height 1.5. No utilities needed. -->
<div>A crisp-minimal component library.</div>

<!-- Heading: h1 defaults to weight 500 and line-height 1.25 via element style.
     Size utility carries the 36px. -->
<h1 class="text-title1">Ship it.</h1>

<!-- Button label: 14px medium. Weight is explicit because <button> doesn't
     inherit heading semantics. -->
<button class="text-small font-medium">Get started</button>

<!-- Dense list item on a card: 14px, weight inherited from body. -->
<li class="text-small">Owner</li>
```

### Principles

- **Size and weight are separate axes.** Compose at the call site (`text-small font-medium`) rather than growing a compound-class scale.
- **Element defaults do the heavy lifting.** Weight and line-height come from `body` / `<p>` / `<h1>`–`<h6>` element rules, so most call sites only pick a size.
- **Mono only in code contexts.** `<code>`, `<pre>`, `<kbd>`, install snippets, hex values shown as code, terminal output. Never for decorative pills, table cells, or reference chips.
- **No uppercase small-caps.** Uppercase reads as a design cliche and is not part of the aesthetic.
- **No `text-[Npx]` arbitrary sizes.** If a design needs a size between two tokens, add the token to the scale rather than escaping it inline.
- **No letter-spacing tokens.** The system does not ship tracking adjustments. Size and weight carry the type story.

### Font Substitutes

Inter Variable and JetBrains Mono are free, self-hostable, and ship on Google Fonts. The library imports them through `next/font` in the docs app and expects downstream consumers to do the same (or vend the WOFF2 files directly). Non-variable Inter is an acceptable fallback: `font-normal` at 450 rounds to 400 or 500, but the composition still reads.

## Layout

### Base Unit

4px. Every spacing token, radius, and control height is a multiple.

### Spacing Scale

| Token | Value | Use |
|---|---|---|
| `{spacing.space-4}` | 4px | Icon-to-label gap in a button, badge internal padding |
| `{spacing.space-8}` | 8px | Vertical stack gap in a form, list item gap |
| `{spacing.space-12}` | 12px | Card internal padding at small size, input horizontal padding |
| `{spacing.space-16}` | 16px | Default card internal padding, section-header-to-body gap |
| `{spacing.space-24}` | 24px | Card interior on `card`, feature card padding, gap between cards |
| `{spacing.space-32}` | 32px | Panel interior on `panel`, gap between panel and next section on marketing |
| `{spacing.space-40}` | 40px | Section-header vertical padding on docs |
| `{spacing.space-64}` | 64px | Marketing hero vertical padding |
| `{spacing.space-96}` | 96px | Between marketing sections |

Card padding defaults to `{spacing.space-24}` 24px. Dense compound components (Menu, Command) drop to `{spacing.space-4}`/`{spacing.space-8}` per row. Marketing panels take `{spacing.space-32}` or higher.

### Grid & Container

- **Max content width**: 1280px.
- **Marketing content column**: 1080px on landing, 960px on docs prose, 1280px on component demo pages.
- **Card grids**: 3-up at desktop-xl and desktop, 2-up at tablet, 1-up at mobile.
- **Component demo panels**: full content-column width, always.

### Whitespace Philosophy

The canvas is the whitespace. Sections are separated by 96px of canvas between blocks; within a lifted panel, generous 24px gaps between content clusters. The system does not use horizontal rules or dividers on marketing surfaces; a change in surface rung (base to layer-1) does the separator's job.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow, no border | Body copy, hero headlines, footer text |
| 1 (canvas surfaces) | `{colors.base}` bg | Docs shell backdrop, page background |
| 2 (content surface) | `{colors.layer-1}` bg, no border | Flat Card and content groupings |
| 2b (elevated Card) | `{colors.layer-1}` bg + `shadow-card` | Auth cards, marketing lifts, any surface that should read as a distinct object |
| 3 (popup) | `{colors.layer-1}` bg + 1px `{colors.hairline}` + `shadow-menu` | Menu popup, Combobox, Select popup, Command palette, Popover, Toast |
| 4 (tooltip) | `{colors.layer-1}` bg + 1px `{colors.hairline}` + `shadow-tooltip` | Tooltip chip |
| 5 (modal) | `{colors.layer-1}` bg + 1px `{colors.hairline}` + `shadow-modal` | Dialog, sheet |
| 6 (focus) | 2px `{colors.focus-ring-color}` outline | Focused editable controls and compact keyboard-focus indicators. |

**Card treatment is intent-based.** `surface` is the default content surface, `outlined` adds an explicit structural boundary, and `elevated` adds `shadow-card`. The caller owns layout and dividers.

**Shadow tokens** (`shadow-menu`, `shadow-modal`, `shadow-tooltip`, `shadow-card`) live in `tokens.css`. `shadow-card` in light is a two-stack — `0 1px 2px + 0 4px 12px rgba(3,17,38,0.05)` — for a soft editorial lift; in dark it resolves to a subtle single drop. Overlays (`shadow-menu` / `shadow-modal` / `shadow-tooltip`) still use the triple-stack: a 1px top edge for hairline crispness, a mid diffusion for the body, and a long soft drop for the cast. Dark-mode shadows increase alpha to compensate for reduced contrast against the near-black canvas.

**No atmospheric depth.** No gradients on marketing surfaces, no spotlight cards, no glow effects, no ambient noise textures. Depth is carried by the surface ladder plus the hairline plus, where necessary, the shadow stack. Nothing else.

### Marketing Depth

Product screenshots and live component demos are the marketing surface's decorative depth. A feature panel that would elsewhere show a stock photo instead frames a live `<Button>` or a screenshot of the docs. The chrome around each demo is a `fill-1` panel with a hairline; the demo does the visual work.

## Shapes

### Radius Scale

The library ships seven radii. Everything maps to one of them.

| Token | Value | Use |
|---|---|---|
| `--radius-4` | 4px | Checkbox, radio thumb — where 6px would look proportionally too round |
| `--radius-6` | 6px | Menu-row highlight, small chips (Badge default), kbd, dense chrome |
| `--radius-8` | 8px | Labeled Buttons, Input, Textarea, Select trigger, Combobox trigger, Tabs, ModalInset, Toggle, ToggleGroup, and Toast actions |
| `--radius-10` | 10px | In-between step for surfaces that want more than 8 but less than 12 |
| `--radius-12` | 12px | `popupSurface` recipe: Menu popup, Combobox popup, Select popup, Popover, Command palette; Sheet (all four sides) |
| `--radius-16` | 16px | Marketing panels, hero surfaces, product screenshot frames |
| `--radius-full` | `9999px` | Avatars, circular icon controls, radio, switch, slider, and progress geometry |

Radius-8 and radius-10 were added this cycle as steps between control-6 and surface-12. Control-shaped chrome uses 8 across Button, Input, Section, Card, Tooltip, Toggle, ToggleGroup, ModalInset, and toast actions. Popup surfaces and Sheet stay at 12. Radius-24 remains absent by design; if a surface wants more than 16, the pattern is wrong.

### Icons & Iconography

Icons come from `lucide-react` (never hand-rolled inline SVG in components — the only tolerated exception is a comment-justified case like the GitHub brand mark in the docs header, where lucide dropped brand icons). Sizes: 16px default in-body, 20px in card headers, 14px in dense compound components (Menu row, Select item). Stroke weight is lucide's default (2px), matched across the system.

Icon color inherits from the surrounding text color (`ink`, `ink-muted`, etc.). The `iconMuted` recipe in `packages/react/src/recipes.ts` codifies the "muted at rest, lift to `ink` on interaction" pattern: it targets `[&_svg]` and swaps `text-ink-muted` → `text-ink` on `hover`, `focus-visible`, `data-[active]`, `data-[state=open]`, `data-[state=on]`, `data-[popup-open]`, `data-highlighted`, `aria-pressed`, and `aria-selected`. Any control that reads as "muted rest, live on interaction" applies the recipe wholesale rather than hand-coding icon color per state.

`iconMutedSolid` is the opacity-based sibling for solid-fill contexts (primary button, destructive button, warning button) where changing to `ink-muted` would break the fill/text contract.

### Avatar & Logo Geometry

- Avatars: circular (`{rounded.full}`), sizes 24 / 32 / 40 / 56 / 80 px.
- Customer logos in a marquee: 24px tall, monochrome (`ink-subtle`), no border, no tile background.
- Product logo (top-nav wordmark): renders in `ink` on both themes.

## Motion

### Timing

Two duration tokens carry the entire motion system.

| Token | Value | Use |
|---|---|---|
| `--duration-state` | 75ms | Hover, active, focus transitions on buttons, inputs, tabs, menu items |
| `--duration-overlay` | 150ms | Dialog open/close, drawer slide, popup fade, toast enter/exit |

Both are deliberately short. The library reads fast because it is fast: 75ms state changes feel instant, 150ms overlays feel intentional. Any duration longer than 150ms in a component is a design bug.

### Easing

One easing token, `--ease-standard: cubic-bezier(0.175, 0.885, 0.32, 1.1)`. The last control point at 1.1 gives the curve a subtle spring overshoot that reads as physical rather than mechanical. Every animated property uses it: opacity, transform, background-color, border-color.

### Rules

- **No `transition-all`.** Every animation names the properties it touches: `transition-property: opacity, transform;` or Tailwind's `transition-opacity transition-transform`.
- **No hardcoded ms.** Every duration references `--duration-state` or `--duration-overlay`.
- **No inline cubic-bezier.** Every easing references `--ease-standard`.
- **Reduced motion.** `@media (prefers-reduced-motion: reduce)` overrides both duration tokens to `0ms` and swaps `--ease-standard` to `ease`. All animations still fire, but they resolve instantly.

## Components

Each component below is a single paragraph plus a token map. Full API and source live in `packages/react/src/<name>.tsx`; the shipped registry item includes the source verbatim.

### Buttons

**Variant vocabulary.** Button ships six variants: `primary` / `secondary` / `soft` / `tertiary` / `warning` / `destructive`. Components reuse the matching subset of this vocabulary when their roles overlap; Toggle keeps only `secondary` and `tertiary`. The `shadow` prop was dropped this cycle, so Button no longer casts a shadow at rest. Pressed and active fills on non-solid variants use `{colors.layer-selected}` for a consistent depressed feel.

**`button-primary`**: Monochrome CTA. Default primary action across the system.
- Background `{colors.primary}` (resolves to `{colors.ink}`), text `{colors.on-primary}`, type `{typography.control-md}`, `square` shape radius `--radius-8` (was 6), padding 8px 14px, height 32px.
- Hover: background `{colors.primary-hover}`. Active: background `{colors.primary-active}`.
- Sizes: sm (24px height, padding 4px 10px, `{typography.control-sm}`), md (32px height, default), lg (40px height, padding 10px 16px, `{typography.control-lg}`).

**`button-secondary`**: Bordered button on `layer-1`. Secondary CTAs and confirmations that aren't primary.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, text `{colors.ink}`, radius `--radius-8`, padding 8px 14px.
- Hover: background `{colors.layer-2}`, border `{colors.hairline-strong}` (new this cycle — border shifts to strong on hover for a firmer edge).
- Active: background `{colors.layer-selected}`, border stays strong.
- Icons composed via the `iconMuted` recipe.

**`button-soft`** (new): Neutral fill button for embedded/secondary chrome that shouldn't wear a border.
- Background `{colors.fill-1}`, text `{colors.ink}`, radius `--radius-8`, no border.
- Hover: `{colors.fill-2}`. Active: `{colors.layer-selected}`. Uses the `neutralFill` state ramp — a solid step deeper on hover, overlay-pressed on active.

**`button-tertiary`**: Transparent button. Toolbar actions, icon-only chrome, low-emphasis links styled as buttons.
- Background transparent, text `{colors.ink}`, radius `--radius-8`, padding 8px 14px.
- Hover: background `{colors.layer-hover}`. Active: `{colors.layer-selected}`. Overlay-based so the state reads on any surface underneath.
- Icons composed via the `iconMuted` recipe.

**`button-destructive`**: Destructive action. Uses the semantic error role at fixed hex.
- Background `{colors.error}`, text `{colors.error-fg}`, radius `--radius-8`, padding 8px 14px.
- Hover: `{colors.error-hover}`. Active: `{colors.error-active}`.

**Shape API.** Button and Badge expose only `rounded` and `pill`, both defaulting to rounded. Button rounded is radius-8; Badge rounded is radius-6. Icon-only Buttons always infer circular geometry. Toggle has no shape prop. Switch retains its pill track because that shape communicates movement. Do not invent per-module variant names like `outline` or `ghost`.

### Inputs & Forms

**`input`**: Single-line text input.
- Background `{colors.fill-1}`, no border, text `{colors.ink}`, placeholder `{colors.ink-subtle}`, type `{typography.small}`, radius `--radius-8`, padding 8px 12px, height 32px.
- Hover: background `{colors.fill-2}`.
- Focused: background `{colors.layer-1}` with a 2px `{colors.focus-ring-color}` outline at zero offset.
- Invalid: 1px `{colors.error}` outline supplied by Field state or `aria-invalid`.
- Sizes: sm (24px height), md (32px, default), lg (40px height).

**`textarea`**: Multi-line. Same tokens as `input`, radius `--radius-8`, min-height 96px, resize vertical only.

**`select-trigger`**: Filled, borderless trigger at radius `--radius-8`; adds a 16px chevron at the right edge. Keyboard focus and open use `fill-2`; keyboard focus adds the compact monochrome inset indicator rather than the editable-field ring.

**`combobox-input`**: Editable filled, borderless control at radius `--radius-8`. Default uses `fill-1` at rest and `fill-2` on hover/open, with the crisp neutral editable-field outline on focus. `unstyled` removes chrome for composite surfaces.

**`checkbox`**: 16px square, radius `--radius-4`, borderless `{colors.fill-2}` at rest. Checked: background `{colors.ink}`, checkmark `{colors.base}`.

**`radio`**: 16px borderless circle in `{colors.fill-2}`. Selected: 6px inner dot in `{colors.ink}`.

**`switch`**: 32px wide × 20px tall pill (`{rounded.full}`), background `{colors.fill-2}` off / `{colors.ink}` on, thumb 16px circle in `{colors.base}` on both states.

**`slider`**: 4px track in `{colors.fill-2}`, fill in `{colors.primary}`, thumb 16px circle in `{colors.base}` with 1px `{colors.hairline-strong}` border.

**`field`**: Form field wrapper. Renders label (`{typography.small}` weight 500) + control + hint (`{typography.mini}` in `ink-subtle`) + error (`{typography.mini}` in `error`). 8px vertical stack.

### Cards & Containers

**`card`**: Content surface with a small intent-based interface.
- `variant="surface"` (default): borderless `bg-layer-1`, radius `--radius-12`.
- `variant="outlined"`: transparent surface with a hairline boundary for dense or administrative layouts.
- `variant="elevated"`: `bg-layer-1`, radius `--radius-12`, and `shadow-card`.
- `interactive`: adds quiet hover and pressed fills plus compact keyboard focus.
- `selected`: switches the surface to `layer-2`.
- Layout, direction, dividers, and custom shadows belong to caller composition.

**`section`**: Structural surface with optional header, content, and footer slots.
- `variant="surface"` (default): borderless `bg-layer-1`, radius `--radius-12`.
- `variant="outlined"`: adds a hairline boundary.
- `variant="elevated"`: adds `shadow-card`.
- Header, content, and footer are unstyled structural slots. Callers own padding, gaps, alignment, rows, and separators.

**`panel`**: Marketing hero panels, form containers, docs section wrappers.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, radius `--radius-16`, padding `{spacing.space-32}` 32px.

### Overlays

**`dialog`**: Modal dialog.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, radius `--radius-12`, padding `{spacing.space-24}` 24px, shadow `shadow-modal`.
- Scrim: `{colors.scrim}` at 45%.
- Enter/exit: `duration-overlay` 150ms `ease-standard`, opacity + scale-from-98%.
- Header and actions use spacing rather than internal divider lines.
- Close button: compact radius-8 icon-only control with `layer-hover`, `layer-selected`, and `selectionFocus` states.
- `ModalInset`: quiet borderless `bg-fill-1` sub-surface at radius `--radius-8`.

**`sheet`**: Side drawer. Slides in from any edge (`side="top" | "right" | "bottom" | "left"`).
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`. All four sides now use radius `--radius-12` (bumped from 10 this cycle for parity with `popupSurface`).
- Header and footer use spacing rather than internal divider lines. The close control matches Modal.
- `SheetHeader`: stacks title + description by default, with an absolute-positioned close X (`absolute top-2 end-2`). The compact row layout only triggers when `leading` or an explicit `trailing` slot is passed. A plain `SheetTitle + SheetDescription` header no longer collapses into a single row.
- Single canonical variant, always modal; no `variant="drawer"` or `modal={false}` API.
- Enter/exit: `duration-overlay` 150ms `ease-standard`, transform-based slide.

**`menu-popup`** / **`combobox-popup`** / **`select-popup`** / **`popover`** / **`command-palette`**: Shared via the `popupSurface` recipe.
- Recipe: `rounded-[var(--radius-12)] bg-layer-1 border border-hairline shadow-menu`.
- Centered mobile branches use the same menu-level elevation rather than modal elevation.
- Non-editable triggers use `bg-fill-2` for keyboard focus and while open, without the editable-field outline. Input, Textarea, and Combobox input retain the crisp neutral focus outline.
- Menu / list row (`itemRow.base`): `rounded-[var(--radius-6)]`; active or highlighted navigation uses `bg-layer-hover`, while selected, checked, or `aria-selected` rows use `bg-layer-selected`, including when highlighted.
- Menu, Combobox, and Popover all wrap the mobile centered panel in `<RemoveScroll>` (react-remove-scroll) to lock body scroll while the sheet-like mobile popup is open. Popover gained a full mobile-centered branch this cycle (Backdrop + centered popup at `w-[calc(100vw-1rem)]` and `max-h-[calc(100dvh-2rem)]`).

**`tooltip`**: Compact tooltip. Uses a tighter treatment than content-bearing overlays.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, text `{colors.ink}`, radius `--radius-6`, padding 4px 8px, type `{typography.mini}`, shadow `shadow-tooltip`.
- Enter/exit: `duration-state` 75ms `ease-standard`, opacity + scale-from-97%.

**`toast`**: Positioned toast, bottom-right by default.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, radius `--radius-12`, padding 12px 16px, shadow `shadow-menu`, type `{typography.control-md}` title + `{typography.mini}` description.
- Action button: borderless `bg-fill-1` at radius `--radius-8`, with shared embedded-control states.
- Close button: compact radius-8 icon-only control with shared selection focus and interaction states.
- Status icons: lucide `CircleCheck` / `CircleAlert` / `TriangleAlert` / `Info` in mapped Tailwind classes (`text-success`, `text-error`, `text-warning`, `text-ink-muted`).

### Badges

Neutral and status variants always use radius-6 metadata geometry. Default variant is `soft`. Every badge uses `{typography.mini}`.

**`badge-neutral`**: Background `{colors.fill-1}`, text `{colors.ink-muted}`, radius `--radius-6`, padding 2px 8px.

**`badge-status-*`**: One per semantic role. Soft variant uses the paired `-soft-bg` / `-soft-fg` tokens (theme-adaptive so the tint stays legible on both light and dark bases); solid variant uses the raw semantic fill with `-fg` text. Outlined variant sits on a 40%-alpha border of the semantic color with matching text.

### Navigation

**`top-nav`**: Sticky top bar with the Patch wordmark left, primary nav links centered, secondary + primary buttons right.
- Background `{colors.base}`, border-bottom 1px `{colors.hairline}`, text `{colors.ink}`, type `{typography.small}`, height 56px.

**`tabs`**: One borderless radius-8 navigation treatment.
- Container (`TabsList`): borderless row or column with a 4px gap.
- Trigger (`TabsTrigger`): `px-3 py-2 text-small`, muted text at rest, `layer-hover` on hover.
- Active trigger: `bg-layer-selected`, `text-ink`, weight medium.
- Vertical orientation: `TabsPanel` adds `pl-6 flex-1 min-w-0`; root gets `flex gap-0`.
- Keyboard focus uses `selectionFocus`.

**`sidebar`** / **`pagination`**: Borderless navigation using the same state vocabulary as Tabs.
- Items use radius-8, `layer-hover` on hover, `layer-selected` for the current item, and `selectionFocus` for keyboard focus.
- Sidebar uses a `layer-1` surface without side or footer hairlines. The optional `rounded` treatment supports inset layouts, and `bordered` adds an explicit boundary when needed.

**`table`**: Borderless data surface by default.
- `surface` is borderless; `outlined` adds a radius-12 layer-1 wrapper with a hairline boundary.
- The header keeps one structural hairline. Body rows and cells have no automatic hairlines. Interactive rows use `layer-hover`; selected rows use `layer-selected` without an accent stripe.
- Size, striping, sticky headers, horizontal scrolling, sortable heads, and native table semantics remain available.

**`toggle`**: Press-to-toggle button (Bold / Italic / Star / Pin).
- Vocabulary matches Button: `tertiary` (transparent at rest) / `secondary` (filled at rest). Both use `layer-selected` for the persisted pressed state and the compact non-editable focus indicator.
- Rest: `{colors.ink-muted}` text + iconMuted icon.
- Hover: tertiary uses `bg-layer-hover`; secondary steps from `fill-1` to `fill-2`.
- Pressed (`data-[pressed]`): `{colors.layer-selected}` overlay fill, `{colors.ink}` text — reads as depressed, not color-inverted.

**`toggle-group`**: Row of related toggles with a shared container.
- Container: borderless `bg-fill-1`, radius-8, `gap-0.5` between items.
- Item rest: transparent, muted label.
- Item hover: `bg-layer-hover` (was `layer-2`).
- Item pressed: `bg-layer-selected` (was `fill-2`).

**`command`**: Command palette. Uses the shared `popupSurface` recipe.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, radius `--radius-12`, shadow `shadow-menu`.
- Result row: padding 8px 12px, type `{typography.small}`, `data-[active]:bg-layer-hover data-highlighted:bg-layer-hover`.

### Blocks

**`app-header`**: Composed application header block (`AppHeader` + `AppHeaderBrand` / `AppHeaderNav` / `AppHeaderNavItem` / `AppHeaderNavSection` / `AppHeaderRight` / `AppHeaderTools` / `AppHeaderMobileTop`). Renders desktop as a single sticky bar with brand left, nav center, right cluster right; renders mobile as a stacked drawer.
- `AppHeaderMobileTop` (new): content pinned into the mobile top bar just before the hamburger, hidden on desktop, never in the panel footer — reserved for one-tap actions like a notification bell.
- `filterToolbar` prop (new): third sub-row rendered below the tools row, for list-page filter chips.
- Mobile tools row divider tied to `bordered` state.
- Hamburger geometry tightened this cycle: bars are `h-px w-[15px]` (was `h-[1.5px] w-[16px]`).

**`empty-state`**: Empty-state block.
- Dropped the fixed `size-24` icon wrapper (was pure whitespace); icon now sits directly above the title.
- Title top margin `mb-6` → `mb-3`.

### Marketing-Specific

**`hero-panel`**: Landing hero container.
- Background `{colors.fill-1}`, border 1px `{colors.hairline}`, radius `{rounded.panel}` 16px, padding `{spacing.space-64}` 64px vertical / `{spacing.space-40}` 40px horizontal.
- Contains `{typography.title1}` headline, `{typography.large}` lede, one `button-primary` + one `button-secondary` CTA row.

**`feature-card`**: Marketing feature tile.
- Background `{colors.fill-1}`, border 1px `{colors.hairline}`, radius `{rounded.surface}` 12px, padding `{spacing.space-32}` 32px.
- Contains 24px icon in `{colors.ink}`, `{typography.title2}` title, `{typography.small}` copy.

**`code-block`**: Framed code snippet.
- Background `{colors.fill-2}`, radius `{rounded.surface}` 12px, padding `{spacing.space-16}` 16px, type `{typography.mono}`.
- Syntax highlighting shipped by rehype-pretty-code with a two-theme palette matching the design system's ink tiers.

**`cta-banner`**: Closing CTA panel.
- Background `{colors.fill-1}`, border 1px `{colors.hairline}`, radius `{rounded.panel}` 16px, padding `{spacing.space-64}` 64px.
- `{typography.title1}` headline, one `button-primary` CTA.

**`section-eyebrow`**: Taxonomy marker above section headlines.
- Text `{colors.ink-muted}`, type `{typography.control-sm}` (+0.04em tracking), typically preceded by a small dot or icon in `{colors.ink-tertiary}`.

**`footer`**: Dense link grid.
- Background `{colors.base}`, border-top 1px `{colors.hairline}`, text `{colors.ink-subtle}`, type `{typography.mini}`, padding 64px 32px.
- Wordmark left, three or four link columns right, copyright and version at the bottom.

## Marketing Surface

The `ui.hotfix.jobs` docs and marketing surface ships dual-theme, respecting the visitor's system preference and the top-nav theme toggle. There is no separate marketing token set; every marketing surface is composed from the core tokens above.

### Page Rhythm

Marketing pages follow a fixed vertical rhythm:

1. **Top nav** (56px, sticky, `{colors.base}` with `hairline` bottom).
2. **Hero panel** (`hero-panel`, first section, 96px above the fold).
3. **Content sections** (each preceded by a `section-eyebrow` + `display-40` headline pair, separated by `{spacing.space-96}` 96px).
4. **Closing CTA** (`cta-banner`, 96px above the footer).
5. **Footer** (`footer`).

### Hero Pattern

The landing hero is a single `fill-1` panel with a `display-72` headline, a `body-20` lede, and a two-button CTA row. No decorative background image, no gradient wash. If the hero needs a visual, it embeds a live component demo (e.g. a `<Dialog>` open in a phone frame) or a docs screenshot in a `fill-2` frame.

### Feature Grids

Three-up cards at desktop, each in a `feature-card`. Icons are 24px in `ink`; titles are `display-24`; body is `body-14` in `ink-muted`. No hover lift beyond a background shift to `fill-2`.

### Code Snippets

Every install snippet, prop reference, and inline API example lives in a `code-block`. The syntax palette maps to ink tiers: comments in `ink-tertiary`, punctuation in `ink-subtle`, identifiers in `ink`, strings in `success` (both themes, subtle usage), keywords in `ink` weight 500. No red/blue/orange rainbow.

### Docs Prose

Docs pages use a 960px content column. Prose is `body-16` in `ink`, headings are `display-32` (h1), `display-24` (h2), `display-20` (h3). Inline code is `mono-13` in a `fill-2` chip with 4px horizontal padding and `{rounded.control}` 6px radius. Callouts (Info, Warning, Danger) reuse the semantic status roles as the left border color, keeping the callout body on `fill-1`.

### Component Demo Pages

Each component page opens with a live demo (layer-1 panel, 32px padding), followed by the install snippet (code-block), then Anatomy, Props, and Examples. Every example is a live demo, not a screenshot. The demo panel width matches the content column; the demo itself is centered.

### Do Not

- Do not introduce a marketing gradient wash on any surface.
- Do not use display type larger than `display-72` (~72px) even on the hero.
- Do not add decorative illustrations. The components and code snippets are the illustration.

## Do's and Don'ts

### Do

- Anchor every page on `{colors.base}` and place meaningful content groups on `{colors.layer-1}`.
- Use backgrounds and spacing for hierarchy. Flat Cards are borderless content surfaces; reach for `variant="elevated"` only when the object needs additional separation.
- Reserve overlay shadows (`shadow-menu` / `shadow-modal` / `shadow-tooltip`) for true overlays: dialog, menu popup, select popup, popover, tooltip, toast. `shadow-card` is the softer editorial-lift stack for elevated Cards.
- Keep `{colors.primary}` monochrome by default. Consumers override to inject their brand. Do NOT ship an `--accent*` token family — Patch UI has no accent slot.
- Use semantic status roles (`{colors.error}`, `{colors.warning}`, `{colors.success}`) for status fills, never a chromatic step from a color scale.
- Let element defaults do the weight work: `<body>` gets `normal` (450), `<h1>`–`<h6>` get `medium` (500). Only add a `font-*` utility when the element defaults don't fit the role.
- Compose size and weight at the call site (`text-small font-medium`); never grow a new compound recipe.
- Reserve mono for genuine code contexts.
- Compose editable or outside-outline focus with `focusRing`; compose compact non-editable focus with `selectionFocus`. Never reinvent focus presentation per component.

### Don't

- Don't introduce a chromatic brand hue or an `--accent*` token in the shipped tokens. If a demo needs an accent, it belongs in the docs consumer layer.
- Don't use `#000000` true black as the base; `#101010` preserves separation from dark surfaces.
- Don't add a shadow to every Card. If a surface needs additional lift, use `variant="elevated"`.
- Don't stack a weight utility on a compound text class.
- Don't use uppercase small-caps for section labels or eyebrows.
- Don't apply `font-mono` decoratively.
- Don't invent per-component variant names like `outline` or `ghost`. Use `primary` / `secondary` / `tertiary` / `destructive`.
- Don't use em dashes in written content.
- Don't hardcode ms durations or inline cubic-beziers.
- Don't use `transition-all`.
- Don't add `cursor-pointer`; interactive components use native platform cursor behavior.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop-XL | 1440px | Default desktop layout, 1280px max content column |
| Desktop | 1280px | Card grids 3-up maintained |
| Tablet | 1024px | Card grids 3-up → 2-up, top-nav links persist |
| Mobile-Lg | 768px | Top-nav collapses to hamburger, hero display-72 → display-56, docs sidebar → drawer |
| Mobile | 480px | Card grids → 1-up, display-56 → display-40, panel padding 32px → 24px |

### Touch Targets

- Buttons hold a minimum 32px tap height on cursor viewports, 40px on touch.
- Inputs hold 32px on cursor, 44px on touch.
- Menu rows and Select items hold 32px on cursor, 44px on touch.

### Collapsing Strategy

- **Top nav:** primary links collapse to hamburger below 768px.
- **Docs sidebar:** persistent left rail above 1024px, collapsible drawer below.
- **Card grids:** 3-up above 1024px, 2-up at 1024-768, 1-up below 768.
- **Hero display:** `display-72` scales linearly to `display-40` on mobile.
- **Panel padding:** `space-64` on desktop-xl, `space-40` on desktop, `space-32` on tablet, `space-24` on mobile.
- **Section rhythm:** `space-96` on desktop, `space-64` on tablet, `space-40` on mobile.

### Image Behavior

- Product screenshots maintain aspect ratio; never crop.
- Component demo panels shrink proportionally, never letterbox.
- Code blocks scroll horizontally on overflow rather than wrap.

## Iteration Guide

1. Focus on one component at a time. Reference it by its `components:` token name in the frontmatter.
2. When introducing a new section on marketing, decide first which surface rung it lives on. Default to `fill-1`; use `fill-2` only for elevated emphasis.
3. Default body to `{typography.regular}` (16px) at weight 450. Reach for `text-large` only for a lede paragraph, `text-small` for card body or dense UI, `text-mini` for meta.
4. Run `npm run check:contrast -w packages/react` after any color token change. WCAG contrast is a gate.
5. Regenerate the registry after any component or token change: `npm run registry`.
6. Add new component variants as separate entries in the `components:` frontmatter map. Never overload an existing entry with a variant switch.
7. Treat the monochrome primary as a first-class principle. New components that need a fill default to `{colors.primary}`; new components that need chromatic emphasis use a semantic status role or defer the choice to the consumer.
8. When adding a new size token to the type scale, verify it's not already covered by an existing size within 2px. The scale is intentionally sparse.
9. Every interactive primitive gets a visible `focus-visible` state through `focusRing` or `selectionFocus`. Never bypass both.
10. Every animated property names itself; `transition-all` is banned.

## Known Gaps

- `font-normal` renders as 450 only in variable-font environments. Non-variable Inter (or a system fallback) rounds to 400 or 500 depending on the browser; the composition still reads, but body copy loses its slight weight lift.
- `--fill-*` in dark mode sits between `--base` and `--layer-1` (both slightly darker than `--layer-1` but a nudge lighter than `--base`). The perceptual gap is smaller than in light mode — Toggle track vs Card is a 3-4% lightness step rather than a strong tint step. Consumers who want a bigger split can override `--fill-*` directly.
- The palette ships pure neutral. Consumers who want a warm-cast or cool-cast surface family can override every `--layer-*` / `--fill-*` / `--hairline*` / `--ink*` token in their own layer.
- Marketing surface layouts (hero, feature grid, cta-banner) are defined in this document but do not ship as registry items. They live in `apps/docs` as page-level compositions.
- Chart color palettes are not defined in this system. Data-viz surfaces defer entirely to the consumer's palette choice.
- Illustration and photography guidelines are not documented because the aesthetic does not use decorative illustration or photography. Product screenshots and live component demos are the only visual content in marketing surfaces.
