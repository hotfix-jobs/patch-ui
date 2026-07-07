---
version: alpha
name: Patch-UI-design-system
description: "A crisp-minimal React component library built on a pure-neutral gray scale (light base #FFFFFF, dark base #0A0A0A — deep near-black, avoids OLED banding). No warm undertones, no cool tints. Two honest surface families (--layer-* for lifted panels and popups, --fill-* for tinted chip fills, no 'canvas' or 'elevated' special names), 1px hairline borders as the load-bearing separator, monochrome primary CTAs (near-black on near-white in light, inverted in dark), and semantic status roles at fixed hex. Type is Inter Variable (weight 300-700, default body 450) and JetBrains Mono for code; size and weight are separate axes, composed at the call site (`text-small font-medium`) rather than bundled into per-size recipes. Line-height comes from element defaults (body 1.5, `<p>` 1.7, headings 1.25). The library ships light + dark and is intentionally chromatically neutral: consumers layer their own brand accent through a single --primary override."

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

  # Base is the page background: everything sits on it. Pure-neutral
  # gray scale, no chroma. Light-mode values shown; dark values live
  # in the Colors table below.
  base: "#FFFFFF"

  # layer-* is the "lifted above base" family. Card, Modal, Menu popup,
  # Combobox popup, Tooltip, Select popup, Input, Table container, and
  # secondary Button chrome all sit on layer-1. layer-2 is a hover-
  # adjacent step above layer-1 (secondary Button hover, Input hover
  # companion). In light layer-1 is pure white; in dark it lifts one
  # rung above base.
  layer-1: "#FFFFFF"
  layer-2: "#FAFAFA"

  # fill-* is the "tinted chip fill" family. Toggle track, Badge
  # neutral, code chip, Switch off-track, striped table hover,
  # Skeleton, active pill Tab. Deeper than base in light so it reads
  # as a subtle darkened indication, not a lift. In dark, fill-* and
  # layer-* land at the same values; the distinction stays semantic
  # so consumers can override one family without the other.
  fill-1: "#FAFAFA"
  fill-2: "#EDEDED"

  # Adaptive interaction-state overlays. rgba, not opaque, so they
  # darken whatever surface sits underneath (base, layer-1, fill-1,
  # or a consumer's own background). Every transparent-at-rest control
  # uses these for hover / selected fills so states never disappear
  # when they land on a rung the state would otherwise match.
  # layer-selected is ~2x layer-hover so pressed always reads darker.
  layer-hover: "rgba(0,0,0,0.04)"
  layer-selected: "rgba(0,0,0,0.08)"

  # Hairlines. Three-step: default, strong (input focus, hover borders),
  # tertiary (nested surfaces where the two above compete). Values are
  # soft: default hairlines carry structure through contrast, not weight.
  hairline: "#EBEBEB"
  hairline-strong: "#D4D4D4"
  hairline-tertiary: "#A3A3A3"

  # Ink (text). Four tiers. Pure gray, no chroma.
  ink: "#171717"
  ink-muted: "#666666"
  ink-subtle: "#8F8F8F"
  ink-tertiary: "#909090"

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
  success: "#397C3B"
  success-hover: "#2D602D"
  success-active: "#234A23"
  success-fg: "#FFFFFF"

  # Focus. 2px ring, 2px offset outside the element border. Color reads
  # {colors.primary} so the ring inherits any consumer brand override
  # for free -- monochrome ink by default, brand-colored when swapped.
  focus-ring: "{colors.primary}"
  focus-width: "2px"
  focus-offset: "2px"

  # Overlays.
  scrim: "rgba(0,0,0,0.45)"

# Size and weight are separate axes. Line-height comes from element
# defaults (body 1.5, <p> 1.7, headings 1.25) rather than the size
# token. Compose at the call site: `text-small font-medium` for a
# 13px medium label; `text-regular` alone for default 15px body.
fontSize:
  micro: 0.6875rem   # 11px, meta label, table column header
  mini: 0.75rem      # 12px, caption, hint, badge
  small: 0.8125rem   # 13px, dense UI copy, sidebar item, button-md label
  regular: 0.9375rem # 15px, default body, button-lg label
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

rounded:
  control: 6px
  surface: 12px
  panel: 16px
  full: 9999px

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
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
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
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "{colors.error-fg}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  input:
    backgroundColor: "{colors.layer-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.small}"
    rounded: "{rounded.control}"
    padding: 8px 12px
    height: 32px
  input-hover:
    borderColor: "{colors.hairline-strong}"
  # Focus lifts the border to --primary and drops the outside ring
  # entirely. Border-only focus reads cleaner than a stacked
  # border + outline pair and inherits any brand override on --primary.
  input-focused:
    borderColor: "{colors.primary}"
  input-invalid:
    borderColor: "{colors.error}"
  card:
    backgroundColor: "{colors.layer-1}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.surface}"
    padding: 24px
  card-elevated:
    backgroundColor: "{colors.layer-1}"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.surface}"
    padding: 24px
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
  menu-popup:
    backgroundColor: "{colors.layer-1}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.surface}"
    padding: 4px
    shadow: shadow-menu
  tooltip:
    backgroundColor: "{colors.layer-1}"
    borderColor: "{colors.hairline}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: 6px 10px
    typography: "{typography.mini}"
    shadow: shadow-tooltip
  badge-neutral:
    backgroundColor: "{colors.fill-2}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.mini}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-status-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.success-fg}"
    typography: "{typography.mini}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-status-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.warning-fg}"
    typography: "{typography.mini}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-status-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.error-fg}"
    typography: "{typography.mini}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  tab-default:
    backgroundColor: "transparent"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
    padding: 6px 12px
  tab-selected:
    backgroundColor: "{colors.fill-2}"
    textColor: "{colors.ink}"
    typography: "{typography.control-md}"
    rounded: "{rounded.control}"
    padding: 6px 12px
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

Patch UI is a crisp-minimal React component library distributed copy-in through the shadcn registry model (`npx shadcn add @patchui/<component>`). The design system is intentionally quiet: a pure-neutral gray scale from white to black, two honest surface families (`--layer-*` for lifted panels and popups, `--fill-*` for tinted chip fills), 1px hairline borders as the load-bearing separator, and a monochrome primary. Every deliberate act of restraint in the token layer is what gives downstream consumers room to layer their own brand on top without the library fighting them.

The base in dark mode is `{colors.base}` #000000 (pure black); in light mode it's `{colors.base}` #FFFFFF (pure white). Every page background sits on `--base`. All other surfaces step in a single direction AWAY from that extreme: darker in light, brighter in dark. Two families share that direction: `--layer-1` / `--layer-2` for the "lifted panel" family (Card, Modal, Menu popup, Combobox popup, Tooltip, Select popup, Input, Table container, secondary Button chrome — plus a hover-adjacent step), and `--fill-1` / `--fill-2` for tinted chip fills that step further from base than `--layer-*` (Toggle track, Badge, code chip, Switch off-track, skeleton, striped table rows, active pill Tab, menu item highlight). Hairlines run from `{colors.hairline}` at 7% up through `{colors.hairline-strong}` (11%) and `{colors.hairline-tertiary}` (16%); dark bumps proportionally to 10/15/22%. Because `--base` is the extreme, the border does most of the "this is a lifted panel" signaling — no drop shadow until true overlay altitude (dialog, menu popup, tooltip, toast).

The library ships **no chromatic brand hue**. `{colors.primary}` resolves to `{colors.ink}` (near-black in light, near-white in dark), and `{colors.on-primary}` resolves to `{colors.base}`. Consumers who want a lavender, cobalt, or any other accent redefine `--primary` and `--primary-hover` in a single downstream layer; every Button and focus-adjacent component inherits their brand for free. The semantic status roles (`{colors.error}`, `{colors.warning}`, `{colors.success}`) remain fixed hex, theme-invariant, and outside the brand system: their meaning is universal and shouldn't shift with a consumer's palette.

Type is Inter Variable for everything that isn't code, JetBrains Mono for code. Size and weight are separate axes: eight size tokens (`micro`, `mini`, `small`, `regular`, `large`, `title3`, `title2`, `title1`) composed at the call site with five weight tokens (`light` 300, `normal` 450, `medium` 500, `semibold` 600, `bold` 700). Body defaults to `normal` (450, only rendered at 450 by the variable font — non-variable Inter rounds to 400 or 500). Headings default to `medium` (500) via element defaults. There is no separate Inter Display cut and no letter-spacing tokens.

The marketing surface for `ui.hotfix.jobs` reuses the same ladder and type scale rather than defining a separate marketing token set. Hero sections lift onto `{colors.fill-1}` panels rounded to `{rounded.panel}` 16px; feature grids use `{colors.fill-1}` cards at `{rounded.surface}` 12px; code snippets embed JetBrains Mono in `{colors.fill-2}` blocks. Dual-theme by default, no atmospheric gradients, no spotlight cards, no second chromatic accent.

**Key characteristics:**

- **Deep near-black flat base** (`#0A0A0A`) in dark, pure white (`#FFFFFF`) in light. Both shipped as first-class themes, both pixel-verified. Pure-neutral gray scale — no warm undertones, no cool tints.
- **Two surface families:** `--layer-1` / `--layer-2` for lifted panels + popups + control chrome, `--fill-1` / `--fill-2` for tinted chip fills. No `canvas` or `elevated` special names — direction is honest per family.
- **Monochrome primary.** No brand hue in the shipped tokens. Consumer overrides `--primary` to inject brand.
- **Two type families:** Inter Variable + JetBrains Mono. Size and weight are separate Tailwind utilities (`text-small font-medium`), not bundled into per-size recipes.
- **Line-height on the element, not the size class.** `body` inherits 1.5, `<p>` uses 1.7, `<h1>`-`<h6>` use 1.25. A size utility on a `<div>` picks up body's 1.5.
- **Semantic status colors are fixed hex.** Error/warning/success read identically in both themes; paired `-fg` tokens flip the label color per theme.
- **Radius is disciplined:** 6px for controls, 12px for cards and surfaces, 16px for marketing panels, `9999px` for pills and avatars. Nothing else.
- **Focus is a 2px ring** offset by 2px outside the element border. Color reads `{colors.primary}` so a consumer's brand override colors every focused primitive automatically. Border stays at rest on focus; the ring alone signals it. Inputs are the intentional exception: on focus their border shifts to `{colors.primary}` instead of stacking an outside ring, so the input's own edge carries the state.
- **Flat elevation.** Shadows only exist on true overlays (dialog, menu popup, select popup, tooltip, toast). Cards and panels are flat.
- **Motion is fast and short.** `duration-state` 75ms for state changes, `duration-overlay` 150ms for overlays. One easing keyword (`ease-standard`) with a subtle spring bounce.

## Colors

> Source: `packages/react/src/theme/tokens.css` (Layer 1), consumed via `@theme inline` (Layer 2) into Tailwind utilities and compound classes (Layer 3).

### Base, Layers, Fills

Three token families make up the surface story: `--base` is the page background; `--layer-*` is the "lifted above base" family (panels, cards, popups, control chrome); `--fill-*` is the "tinted chip fill" family (Toggle track, Badge, code chip, Switch off-track, skeleton).

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.base}` | `#FFFFFF` | `#000000` | Page background, docs shell — everything sits on this. Pure white in light, pure black in dark |
| `{colors.layer-1}` | `#FFFFFF` | `#141414` | Default lifted panel: Card, Modal, Menu popup, Combobox popup, Tooltip, Select popup, Input, Table container, secondary Button chrome. Barely off base; the hairline border does the "lifted" work |
| `{colors.layer-2}` | `#FAFAFA` | `#1C1C1C` | Hover step above `layer-1` (secondary Button hover, Input hover companion) |
| `{colors.fill-1}` | `#FAFAFA` | `#131313` | Subtle tinted chip fill: Toggle track, Badge neutral, code chip, Switch off-track |
| `{colors.fill-2}` | `#EDEDED` | `#262626` | Stronger tinted fill: Toggle pressed, active pill Tab, skeleton block, striped table hover, menu item highlight |
| `{colors.layer-hover}` | `rgba(0,0,0,0.04)` | `rgba(255,255,255,0.05)` | Hover / focus-visible / popup-open overlay on transparent-at-rest controls (tertiary Button, Tab, Sidebar link, Toggle, Pagination, icon-only close/clear buttons) |
| `{colors.layer-selected}` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.10)` | Active / pressed / persistent-on overlay on the same controls; ~2x hover strength |

The dark base is deep near-black `#0A0A0A` — not pure `#000000`, to avoid banding on 6-bit panels and give the darkest layer step room to breathe. Light base is pure `#FFFFFF`. In light, `--layer-1` is also `#FFFFFF` — the hairline border alone signals "lifted panel," no color fill lift. In dark, `--layer-1` steps only ~3-5% brighter than base; the hairline sits under the card body rather than competing with it. Pure-neutral grays throughout — no cool or warm cast.

**`--layer-*` is one direction: always lifted above `--base` toward the viewer.** In light mode `--layer-1` is pure white so a Card or popup reads brighter than off-white base; in dark mode it lifts a subtle rung above near-black base — the numeric jump is smaller than the "obvious" choice so panels feel integrated with the dark ambient rather than shouting. Border and shadow do the rest of the elevation work. `--layer-2` is a hover-adjacent step above `--layer-1`.

**`--fill-*` runs deeper than `--base` in light, and straddles `--layer-1` in dark.** Toggle tracks, Badge chips, code chips, Switch off-tracks want to read as *indication* rather than lift. `--fill-1` sits below `--layer-1` in both themes (subtle deeper tint); `--fill-2` sits above `--layer-1` in dark so components that use it on top of a `layer-1` surface (Table row hover, striped rows, Modal nested tile, menu item highlight) stay visible — collapsing `--fill-2` into `--layer-1` would erase every one of those states in dark mode. In light mode the direction still works because `--layer-1` is pure white, so a deeper `--fill-2` reads as a distinct chip. Consumers can override one family without touching the other.

`--layer-hover` and `--layer-selected` are alpha overlays rather than rungs on either ladder. Any transparent-at-rest control (tertiary Button, Tab, Sidebar link, Toggle, Pagination, icon-only close and clear buttons, NavigationMenu link, Calendar day) uses them for `hover:`, `focus-visible:`, `data-[popup-open]:`, `data-[pressed]:`, and `active:` fills. Because they darken whatever surface sits underneath rather than paint over it, the state is visible on any background: base, `--layer-1`, `--fill-1`, or a consumer's own content color. `--layer-selected` sits at ~2x hover strength so pressed always reads visibly darker than hover.

The intentional exception is the `neutralFill` recipe in `recipes.ts` (`bg-fill-1 hover:bg-fill-2 active:bg-fill-2`). That ladder is a solid-color ramp for filled controls that own their base surface. Its semantic is "step deeper on interaction," not "tint over the surface underneath," and it stays opaque.

### Hairlines

Hairlines carry every hierarchical separation that the surface ladder can't. Cards, panels, dropdowns, and inputs all wear a 1px hairline; the strong step is for hovered/focused inputs and the tertiary step is for nested content that already sits on a lifted surface.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.hairline}` | `rgba(0,0,0,0.07)` | `rgba(255,255,255,0.10)` | Default card border, input border, table row divider, tab underline |
| `{colors.hairline-strong}` | `rgba(0,0,0,0.11)` | `rgba(255,255,255,0.15)` | Hovered input border, structural separators (docs header, table header divider) |
| `{colors.hairline-tertiary}` | `rgba(0,0,0,0.16)` | `rgba(255,255,255,0.22)` | Radio hover border, dropzone drag hover, nested surfaces where the two above compete |

### Text (Ink)

Four tiers. The naming is deliberate: `ink` is not called `foreground` because the system separates *type* from *icon* and *border* colors, all of which have their own token families. Ink applies to text only.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.ink}` | `#171717` | `#EDEDED` | Body text, headlines, emphasized labels |
| `{colors.ink-muted}` | `#666666` | `#A1A1A1` | Meta text, table cell secondary, muted icon rest state |
| `{colors.ink-subtle}` | `#8F8F8F` | `#737373` | Placeholder, missing/None cell values, deselected tab |
| `{colors.ink-tertiary}` | `#909090` | `#666666` | Disabled label, dark-mode switch off-thumb, footnote |

### Primary (Monochrome)

The library ships no chromatic brand hue. `{colors.primary}` resolves to `{colors.ink}` and `{colors.on-primary}` to `{colors.base}`. In practice this means the default primary button on light is near-black on near-white, and on dark it is near-white on near-black. The visual weight comes from contrast, not hue.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.primary}` | `#171717` | `#EDEDED` | Primary button fill, active pill fill, slider indicator + thumb, switch on-track |
| `{colors.on-primary}` | `#FFFFFF` | `#0A0A0A` | Text on primary fill, switch thumb (contrast) |
| `{colors.primary-hover}` | `color-mix(primary, base 15%)` | same | Hovered primary button |
| `{colors.primary-active}` | `color-mix(primary, base 25%)` | same | Pressed primary button |

`primary-hover` and `primary-active` are computed via `color-mix` so a consumer's `--primary` override on a downstream layer automatically produces matching hover and active steps. Mixing toward `--base` gives a "subtle move toward the background" that works in both themes: it lightens the near-black primary in light mode and darkens the near-white primary in dark.

**Consumer override.** A downstream project that wants a lavender brand redefines `--primary`, `--on-primary`, `--primary-hover`, and `--primary-active` in a single CSS layer after the token import. Every Button, focus ring on `data-brand-scope`, and link that inherits `--primary` picks up the new brand without any callsite edits.

### Semantic Status

The three status roles are theme-invariant fixed hex. Meaning is universal; a warning should read as a warning in both light and dark without the consumer's brand palette shifting its color. Each role ships with a paired `-fg` token that carries the label color so fill and text invert together per theme.

| Role | Fill (both themes) | fg light | fg dark | Use |
|---|---|---|---|---|
| `{colors.error}` | `#DC2626` | `#FFFFFF` | `#FFFFFF` | Destructive buttons, error badges, form validation |
| `{colors.warning}` | `#FDB203` | `#171717` | `#171717` | Warning badges, caution indicators |
| `{colors.success}` | `#397C3B` | `#FFFFFF` | `#FFFFFF` | Success badges, completed states, positive deltas |

Hover and active steps (`error-hover`, `success-active`, etc.) exist for each role but never shift hue, only lightness.

### Focus

Focus is a single 2px outline offset by 2px outside the element border. The color reads `{colors.primary}` so it inherits any consumer brand override for free: monochrome ink by default, brand-colored when swapped. Border stays at rest on focus; the ring alone signals it.

Inputs are the deliberate exception: the input family uses a border-lift approach instead of an outside ring. On focus the input's own border shifts to `{colors.primary}` (see `input-focused` in the components map). Reads cleaner than a stacked border + outline pair, still brand-overrideable via the same `--primary` token.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.focus-ring-color}` | `{colors.primary}` | `{colors.primary}` | Outline color on all focus-visible states |
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

Eight sizes. `regular` (15px) is the default body size; everything else steps out from there.

| Utility | Size | Use |
|---|---|---|
| `text-micro` | 11px | Meta label, table column header, footer link |
| `text-mini` | 12px | Caption, badge, hint text |
| `text-small` | 13px | Dense UI copy, sidebar item, form label, table cell, default button label |
| `text-regular` | 15px | Default body copy, large button label |
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
<!-- Default body: 15px, weight 450, line-height 1.5. No utilities needed. -->
<div>A crisp-minimal component library.</div>

<!-- Heading: h1 defaults to weight 500 and line-height 1.25 via element style.
     Size utility carries the 36px. -->
<h1 class="text-title1">Ship it.</h1>

<!-- Button label: 13px medium. Weight is explicit because <button> doesn't
     inherit heading semantics. -->
<button class="text-small font-medium">Get started</button>

<!-- Dense list item on a card: 13px, weight inherited from body. -->
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
| 1 (canvas surfaces) | `{colors.base}` bg + 1px `{colors.hairline}` | Docs shell backdrop, page background |
| 2 (elevated chrome) | `{colors.layer-1}` bg + 1px `{colors.hairline}` | Secondary Button, Card, Input, Select, Table container, active pill Tab |
| 3 (popup) | `{colors.layer-1}` bg + 1px `{colors.hairline}` + `shadow-menu` | Menu popup, Combobox, Select popup, Command palette |
| 4 (tooltip) | `{colors.layer-1}` bg + 1px `{colors.hairline}` + `shadow-tooltip` | Tooltip chip |
| 5 (modal) | `{colors.layer-1}` bg + 1px `{colors.hairline}` + `shadow-modal` | Dialog, sheet, toast |
| 6 (focus) | 2px `{colors.primary}` outline, 2px offset | Focused button, tab, link. Inputs shift their own border to `{colors.primary}` instead. |

**Flat by default.** Cards and panels never wear a drop shadow. The lift onto `fill-1` combined with the hairline is the entire elevation vocabulary at that level. Shadows enter only at popup and modal altitude, where the component is genuinely floating above the page.

**Shadow tokens** (`shadow-menu`, `shadow-modal`, `shadow-tooltip`, `shadow-card`) live in `tokens.css` and use a stacked triple to fake depth: a 1px top edge for hairline crispness, a mid diffusion for the body of the lift, and a long soft drop for the cast. Dark-mode shadows increase alpha to compensate for the reduced contrast against the near-black canvas.

**No atmospheric depth.** No gradients on marketing surfaces, no spotlight cards, no glow effects, no ambient noise textures. Depth is carried by the surface ladder plus the hairline plus, where necessary, the shadow stack. Nothing else.

### Marketing Depth

Product screenshots and live component demos are the marketing surface's decorative depth. A feature panel that would elsewhere show a stock photo instead frames a live `<Button>` or a screenshot of the docs. The chrome around each demo is a `fill-1` panel with a hairline; the demo does the visual work.

## Shapes

### Radius Scale

The library ships four radii. Everything maps to one of them.

| Token | Value | Use |
|---|---|---|
| `{rounded.control}` | 6px | Buttons, inputs, selects, checkboxes, menu items, small tags |
| `{rounded.surface}` | 12px | Cards, dialogs, popups, feature tiles, code blocks |
| `{rounded.panel}` | 16px | Marketing panels, hero surfaces, product screenshot frames |
| `{rounded.full}` | `9999px` | Badges, avatars, pills, status chips |

Intermediate radii (8px, 24px) are intentionally absent. 6px reads slightly tighter on controls without going flat; 16px is the widest radius any surface earns. If a design wants 24px, the pattern is wrong.

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

**`button-primary`**: Monochrome CTA. Default primary action across the system.
- Background `{colors.primary}` (resolves to `{colors.ink}`), text `{colors.on-primary}`, type `{typography.control-md}`, radius `{rounded.control}` 6px, padding 8px 14px, height 32px.
- Hover: background `{colors.primary-hover}`. Active: background `{colors.primary-active}`.
- Focus: 1px `{colors.focus-ring}` outline, 1px offset. Disabled: opacity 0.5, cursor not-allowed.
- Sizes: sm (24px height, padding 4px 10px, `{typography.control-sm}`), md (32px height, default), lg (40px height, padding 10px 16px, `{typography.control-lg}`).

**`button-secondary`**: Elevated bordered button. Secondary CTAs and confirmations that aren't primary. Same surface as cards and popups so the button reads as part of the elevated-chrome layer.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, text `{colors.ink}`, type `{typography.control-md}`, radius `{rounded.control}` 6px, padding 8px 14px.
- Hover: background `{colors.layer-2}` (a subtle tint on the same rung — the border stays stable so the whole button doesn't shimmer on hover).
- Icons composed via the `iconMuted` recipe.

**`button-tertiary`**: Transparent button. Toolbar actions, icon-only chrome, low-emphasis links styled as buttons.
- Background transparent, text `{colors.ink}`, type `{typography.control-md}`, radius `{rounded.control}` 6px, padding 8px 14px.
- Hover: background `{colors.layer-hover}`. Active: `{colors.layer-selected}`. Overlay-based so the state reads on any surface underneath, not just canvas.
- Icons composed via the `iconMuted` recipe.

**`button-destructive`**: Destructive action. Uses the semantic error role at fixed hex.
- Background `{colors.error}`, text `{colors.error-fg}`, type `{typography.control-md}`, radius `{rounded.control}` 6px, padding 8px 14px.
- Hover: `{colors.error-hover}`. Active: `{colors.error-active}`.

**Variant vocabulary.** Any component that accepts button-like variants (Toggle, IconButton, LinkButton) reuses `primary` / `secondary` / `tertiary` / `destructive` verbatim. Per-component inventions like `outline` or `ghost` are forbidden.

### Inputs & Forms

**`input`**: Single-line text input.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, text `{colors.ink}`, placeholder `{colors.ink-subtle}`, type `{typography.small}`, radius `{rounded.control}` 6px, padding 8px 12px, height 32px.
- Hover: border `{colors.hairline-strong}`.
- Focused: border `{colors.primary}` (no outside ring — the border-lift is the focus signal).
- Invalid: border `{colors.error}` at 100% (rare exception to the hairline rule; error state overrides).
- Sizes: sm (24px height), md (32px, default), lg (40px height).

**`textarea`**: Multi-line. Same tokens as `input`, min-height 96px, resize vertical only.

**`select-trigger`**: Trigger button for a Select. Same specs as `input`; adds a 16px chevron icon in `ink-subtle` at the right edge.

**`checkbox`**: 16px square, radius `{rounded.control}` 6px, border 1px `{colors.hairline-strong}`. Checked: background `{colors.primary}`, checkmark `{colors.on-primary}`.

**`radio`**: 16px circle, border 1px `{colors.hairline-strong}`. Selected: 6px inner dot in `{colors.primary}`.

**`switch`**: 32px wide × 20px tall pill (`{rounded.full}`), background `{colors.fill-2}` off / `{colors.primary}` on, thumb 16px circle in `{colors.base}` on both states.

**`slider`**: 4px track in `{colors.fill-2}`, fill in `{colors.primary}`, thumb 16px circle in `{colors.base}` with 1px `{colors.hairline-strong}` border.

**`field`**: Form field wrapper. Renders label (`{typography.small}` weight 500) + control + hint (`{typography.mini}` in `ink-subtle`) + error (`{typography.mini}` in `error`). 8px vertical stack.

### Cards & Containers

**`card`**: Default lifted content block.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, radius `{rounded.surface}` 12px, padding `{spacing.space-24}` 24px.

**`card-elevated`**: Hovered or featured card. Same background rung; a stronger hairline carries the "one step lifted" signal instead of a surface-rung change.
- Background `{colors.layer-1}`, border 1px `{colors.hairline-strong}`, otherwise identical.

**`panel`**: Larger container for marketing hero panels, form containers, docs section wrappers.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, radius `{rounded.panel}` 16px, padding `{spacing.space-32}` 32px.

### Overlays

**`dialog`**: Modal dialog.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, radius `{rounded.surface}` 12px, padding `{spacing.space-24}` 24px, shadow `shadow-modal`.
- Scrim: `{colors.scrim}` at 45%.
- Enter/exit: `duration-overlay` 150ms `ease-standard`, opacity + scale-from-98%.
- Close button: circle icon-only (`size-8 rounded-full`) with lucide `X`; `hover:bg-layer-hover` for tertiary style.

**`sheet`**: Side drawer. Slides in from the right or bottom.
- Same background and border as `dialog`. Radius `{rounded.panel}` 16px on the leading edge only; other edges square.
- Single canonical variant, always modal; no `variant="drawer"` or `modal={false}` API.
- Enter/exit: `duration-overlay` 150ms `ease-standard`, transform-based slide.

**`menu-popup`**: Menu dropdown. Shared recipe with Combobox popup, Select popup, Command palette via the `popupSurface` mixin.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, radius `{rounded.surface}` 12px, padding `{spacing.space-4}` 4px, shadow `shadow-menu`.
- Menu row: padding 6px 8px, type `{typography.small}`, radius `{rounded.control}` 6px on hover; icons composed via the `iconMuted` recipe.

**`select-popup`**, **`combobox-popup`**, **`command-palette`**: Same specs as `menu-popup`.

**`tooltip`**: Compact tooltip. Uses the same lifted-chrome recipe as menus (no inverted `bg-ink` chip).
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, text `{colors.ink}`, radius `{rounded.control}` 6px, padding 6px 10px, type `{typography.mini}`, shadow `shadow-tooltip`.
- Enter/exit: `duration-state` 75ms `ease-standard`, opacity + scale-from-97%.

**`toast`**: Positioned toast, bottom-right by default.
- Background `{colors.layer-1}`, border 1px `{colors.hairline}`, radius `{rounded.surface}` 12px, padding 12px 16px, shadow `shadow-modal`, type `{typography.control-md}` title + `{typography.mini}` description.
- Close button: circle icon-only (`size-7 rounded-full`), lucide `X`, `hover:bg-layer-hover hover:text-ink`.
- Status icons: lucide `CircleCheck` / `CircleAlert` / `TriangleAlert` / `Info` in mapped Tailwind classes (`text-success`, `text-error`, `text-warning`, `text-ink-muted`).

### Badges

Neutral and status variants. Every badge uses `{rounded.full}` and `{typography.mini}`.

**`badge-neutral`**: Background `{colors.fill-2}`, text `{colors.ink-muted}`, padding 2px 8px.

**`badge-status-*`**: One per semantic role. Success uses `{colors.success}` fill with `{colors.success-fg}` text; warning and error follow the same pattern. Fixed hex, theme-invariant, `-fg` flips per role.

### Navigation

**`top-nav`**: Sticky top bar with the Patch wordmark left, primary nav links centered, secondary + primary buttons right.
- Background `{colors.base}`, border-bottom 1px `{colors.hairline}`, text `{colors.ink}`, type `{typography.small}`, height 56px.

**`tabs`**: Two variants.
- `underline` (default): 2px bar tracks the active tab via motion's `layoutId` sliding between positions. Muted text at rest, ink text active.
- `pill`: fully-rounded chip with a 1px `{colors.hairline}` border always visible (per-tab, matches secondary-button chrome). Active tab fills with `{colors.layer-1}` via a direct data-attr swap (no sliding indicator — a fill traveling through the gap between bordered pills reads awkwardly). Inactive tabs pick up a `{colors.layer-hover}` overlay tint on hover, like the tertiary button.

**`segmented-toggle`**: Compact segmented radio control with a sliding pill.
- Container: `{colors.fill-1}` fill, 1px `{colors.hairline}` border, padding 0.5px, radius `{rounded.control}` 6px.
- Active item: `{colors.layer-1}` sliding pill (`layoutId` animation), no border, `{colors.ink}` text.
- Inactive item: transparent, `{colors.ink-muted}` text, iconMuted icon, `hover:bg-layer-2` for a subtle press feel.

**`toggle`**: Press-to-toggle button (Bold / Italic / Star / Pin).
- Vocabulary matches Button: `tertiary` (transparent at rest) / `secondary` (bordered at rest). Shape API also matches Button: `square` (default, 6px radius) / `pill` / `circle` (aspect-square + `!px-0` for icon-only chips).
- Rest: `{colors.ink-muted}` text + iconMuted icon.
- Hover: `hover:bg-layer-hover hover:text-ink`; secondary adds `hover:border-hairline-strong`.
- Pressed (`data-[pressed]`): `{colors.layer-selected}` overlay fill, `{colors.ink}` text — reads as depressed, not color-inverted.
- Container: no border; the press overlay is the entire visual affordance.

**`command`**: Command palette. Full-screen overlay with an input, filtered results, and a keyboard hint bar.
- Background `{colors.base}`, border 1px `{colors.hairline-strong}`, radius `{rounded.surface}` 12px, shadow `shadow-modal`.
- Result row: padding 8px 12px, type `{typography.small}`, hover `{colors.layer-hover}`.

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

- Anchor every page on `{colors.base}`. The faint blue tint is intentional and gives the flat surface warmth on OLED.
- Use the four-step surface ladder for hierarchy; a card lift plus a hairline is the entire elevation vocabulary at that level.
- Reserve shadows for true overlays: dialog, menu popup, select popup, tooltip, toast. Cards and panels are flat.
- Keep `{colors.primary}` monochrome by default. Consumers override to inject their brand.
- Use semantic status roles (`{colors.error}`, `{colors.warning}`, `{colors.success}`) for status fills, never a chromatic step from a color scale.
- Let element defaults do the weight work: `<body>` gets `normal` (450), `<h1>`–`<h6>` get `medium` (500). Only add a `font-*` utility when the element defaults don't fit the role.
- Compose size and weight at the call site (`text-small font-medium`); never grow a new compound recipe.
- Reserve mono for genuine code contexts.
- Compose focus with the `focusRing` recipe. Never reinvent a focus ring per component.

### Don't

- Don't introduce a chromatic brand hue in the shipped tokens. If a demo needs one, it belongs in the docs consumer layer.
- Don't use `#000000` true black as the base; `#0F0F13` reads warmer.
- Don't ship a card with a drop shadow. Cards lift with surface + hairline only.
- Don't stack a weight utility on a compound text class.
- Don't use uppercase small-caps for section labels or eyebrows.
- Don't apply `font-mono` decoratively.
- Don't invent per-component variant names like `outline` or `ghost`. Use `primary` / `secondary` / `tertiary` / `destructive`.
- Don't use em dashes in written content.
- Don't hardcode ms durations or inline cubic-beziers.
- Don't use `transition-all`.

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
3. Default body to `{typography.regular}` at weight 400. Reach for `body-20` only for a lede paragraph, `body-14` for card body or dense UI.
4. Run `npm run check:contrast -w packages/react` after any color token change. WCAG contrast is a gate.
5. Regenerate the registry after any component or token change: `npm run registry`.
6. Add new component variants as separate entries in the `components:` frontmatter map. Never overload an existing entry with a variant switch.
7. Treat the monochrome primary as a first-class principle. New components that need a fill default to `{colors.primary}`; new components that need chromatic emphasis use a semantic status role or defer the choice to the consumer.
8. When adding a new size token to the type scale, verify it's not already covered by an existing size within 2px. The scale is intentionally sparse.
9. Every interactive primitive gets a `focus-visible` state through the `focusRing` recipe. Never bypass it.
10. Every animated property names itself; `transition-all` is banned.

## Known Gaps

- `font-normal` renders as 450 only in variable-font environments. Non-variable Inter (or a system fallback) rounds to 400 or 500 depending on the browser; the composition still reads, but body copy loses its slight weight lift.
- `--fill-*` in dark mode sits between `--base` and `--layer-1` (both slightly darker than `--layer-1` but a nudge lighter than `--base`). The perceptual gap is smaller than in light mode — Toggle track vs Card is a 3-4% lightness step rather than a strong tint step. Consumers who want a bigger split can override `--fill-*` directly.
- The palette ships pure neutral. Consumers who want a warm-cast or cool-cast surface family can override every `--layer-*` / `--fill-*` / `--hairline*` / `--ink*` token in their own layer.
- Marketing surface layouts (hero, feature grid, cta-banner) are defined in this document but do not ship as registry items. They live in `apps/docs` as page-level compositions.
- Chart color palettes are not defined in this system. Data-viz surfaces defer entirely to the consumer's palette choice.
- Illustration and photography guidelines are not documented because the aesthetic does not use decorative illustration or photography. Product screenshots and live component demos are the only visual content in marketing surfaces.
