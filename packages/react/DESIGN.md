---
version: alpha
name: Patch-UI-design-system
description: "A crisp-minimal component library built on a near-black flat canvas (light: #FBFBFC, dark: #08090A), a four-step surface ladder carried by 1px hairline borders, monochrome primary CTAs (gray-1000 on gray-100 in light, inverted in dark), and semantic status roles at fixed hex. Display type is Inter Display 600 with aggressively negative tracking (-0.045em at 72px), body is Inter 400/500, code is JetBrains Mono. The library ships light + dark and is intentionally chromatically neutral: consumers layer their own brand accent through a single --primary override. Marketing chrome for the docs site (ui.hotfix.jobs) reuses the same ladder without atmospheric depth, letting the components, code snippets, and product screenshots do the visual work."

colors:
  # Monochrome primary. No chromatic brand hue ships in the library.
  # Consumers override --primary in their own layer if they want lavender,
  # cobalt, or anything else. Default is inverted gray for maximum neutrality.
  primary: "{colors.ink}"
  on-primary: "{colors.canvas}"
  # Computed via color-mix so a consumer's --primary override produces
  # matching hover/active steps automatically: mix toward --canvas 15% /
  # 25% lightens the near-black primary in light and darkens the
  # near-white primary in dark.
  primary-hover: "color-mix(in srgb, {colors.primary}, {colors.canvas} 15%)"
  primary-active: "color-mix(in srgb, {colors.primary}, {colors.canvas} 25%)"

  # Canvas + 4-step surface ladder (light mode reference).
  # Dark values live in the Colors section below.
  canvas: "#FBFBFB"
  surface-1: "#F5F5F7"
  surface-2: "#EDEDEE"
  surface-3: "#E5E5E7"
  surface-4: "#DEDEE0"

  # Elevated surface. Popups (menu, combobox, tooltip), secondary
  # buttons, and card chrome sit on this rung. Lifts TOWARD pure white
  # in light mode and toward a lighter gray rung in dark mode so a
  # floating panel reads brighter than the canvas below.
  surface-elevated: "#FFFFFF"
  surface-elevated-hover: "#F7F7F8"

  # Hairlines. Three-step: default, strong (input focus, hover borders),
  # tertiary (nested surfaces where the two above compete). Values are
  # soft: default hairlines carry structure through contrast, not weight.
  hairline: "rgba(0,0,0,0.04)"
  hairline-strong: "rgba(0,0,0,0.08)"
  hairline-tertiary: "rgba(0,0,0,0.14)"

  # Ink (text). Four tiers.
  ink: "#1D1D1F"
  ink-muted: "#545458"
  ink-subtle: "#6E6E71"
  ink-tertiary: "#8E8E93"

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

typography:
  display-72:
    fontFamily: Inter Display
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.045em
  display-64:
    fontFamily: Inter Display
    fontSize: 64px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.04em
  display-56:
    fontFamily: Inter Display
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.04em
  display-48:
    fontFamily: Inter Display
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.10
    letterSpacing: -0.035em
  display-40:
    fontFamily: Inter Display
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.035em
  display-32:
    fontFamily: Inter Display
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: -0.03em
  display-24:
    fontFamily: Inter Display
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.025em
  display-20:
    fontFamily: Inter Display
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: -0.02em
  body-20:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.015em
  body-18:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.013em
  body-16:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.011em
  body-14:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.006em
  body-13:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.005em
  caption-12:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0
  caption-11:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0.005em
  button-16:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: -0.011em
  button-14:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: -0.006em
  button-12:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: 0
  eyebrow:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.30
    letterSpacing: 0.04em
  mono-14:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  mono-13:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  mono-12:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0

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
    typography: "{typography.button-14}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-14}"
    rounded: "{rounded.control}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-14}"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.button-14}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  button-secondary-hover:
    backgroundColor: "{colors.surface-elevated-hover}"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-14}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "{colors.error-fg}"
    typography: "{typography.button-14}"
    rounded: "{rounded.control}"
    padding: 8px 14px
    height: 32px
  input:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-14}"
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
    backgroundColor: "{colors.surface-elevated}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.surface}"
    padding: 24px
  card-elevated:
    backgroundColor: "{colors.surface-elevated}"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.surface}"
    padding: 24px
  panel:
    backgroundColor: "{colors.surface-1}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.panel}"
    padding: 32px
  dialog:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.surface}"
    padding: 24px
    shadow: shadow-modal
  menu-popup:
    backgroundColor: "{colors.surface-elevated}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.surface}"
    padding: 4px
    shadow: shadow-menu
  tooltip:
    backgroundColor: "{colors.surface-elevated}"
    borderColor: "{colors.hairline}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: 6px 10px
    typography: "{typography.caption-12}"
    shadow: shadow-tooltip
  badge-neutral:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption-12}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-status-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.success-fg}"
    typography: "{typography.caption-12}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-status-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.warning-fg}"
    typography: "{typography.caption-12}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-status-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.error-fg}"
    typography: "{typography.caption-12}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  tab-default:
    backgroundColor: "transparent"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.button-14}"
    rounded: "{rounded.control}"
    padding: 6px 12px
  tab-selected:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.button-14}"
    rounded: "{rounded.control}"
    padding: 6px 12px
  section-eyebrow:
    textColor: "{colors.ink-muted}"
    typography: "{typography.eyebrow}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-14}"
    height: 56px
    borderColor: "{colors.hairline}"
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.caption-12}"
    padding: 64px 32px
    borderColor: "{colors.hairline}"
---

## Overview

Patch UI is a crisp-minimal React component library distributed copy-in through the shadcn registry model (`npx shadcn add @patchui/<component>`). The design system is intentionally quiet: a near-black flat canvas, a four-step surface ladder that carries hierarchy without shadow, 1px hairline borders as the load-bearing separator, and a monochrome primary. Every deliberate act of restraint in the token layer is what gives downstream consumers room to layer their own brand on top without the library fighting them.

The canvas in dark mode is `{colors.canvas}` #0F0F10, warm near-black. The light canvas is `{colors.canvas}` #FBFBFB, warm near-white. On top of each canvas sits a four-step surface ladder (`{colors.surface-1}` through `{colors.surface-4}`) plus a fifth `{colors.surface-elevated}` rung that carries popups (menu, combobox, tooltip), secondary Button chrome, Card, Input, Select, and other "lifted control" surfaces. Hairlines run from `{colors.hairline}` at 4% opacity up through `{colors.hairline-strong}` (8%) and `{colors.hairline-tertiary}` (14%). Cards, dialogs, popups, and marketing panels all lift by picking a rung plus a hairline; no drop shadow is used until a component reaches true overlay altitude (dialog, menu popup, tooltip, toast).

The library ships **no chromatic brand hue**. `{colors.primary}` resolves to `{colors.ink}` (near-black in light, near-white in dark), and `{colors.on-primary}` resolves to `{colors.canvas}`. Consumers who want a lavender, cobalt, or any other accent redefine `--primary` and `--primary-hover` in a single downstream layer; every Button and focus-adjacent component inherits their brand for free. The semantic status roles (`{colors.error}`, `{colors.warning}`, `{colors.success}`) remain fixed hex, theme-invariant, and outside the brand system: their meaning is universal and shouldn't shift with a consumer's palette.

Display type is Inter Display at weight 600 with aggressively negative letter-spacing (-0.045em at 72px, tapering to zero at body sizes). Body is Inter at weight 400 for copy, 500 for buttons and eyebrows. Code is JetBrains Mono at weight 400. Three families total, replacing an earlier four-family model (heading/copy/label/button) with a two-plus-mono model.

The marketing surface for `ui.hotfix.jobs` reuses the same ladder and type scale rather than defining a separate marketing token set. Hero sections lift onto `{colors.surface-1}` panels rounded to `{rounded.panel}` 16px; feature grids use `{colors.surface-1}` cards at `{rounded.surface}` 12px; code snippets embed JetBrains Mono in `{colors.surface-2}` blocks. Dual-theme by default, no atmospheric gradients, no spotlight cards, no second chromatic accent.

**Key characteristics:**

- **Near-black flat canvas** in dark, near-white flat canvas in light. Both shipped as first-class themes, both pixel-verified.
- **Four-step surface ladder** replaces the earlier two-tone background scale. Hierarchy is carried by the ladder plus 1px hairlines, not by shadow.
- **Monochrome primary.** No brand hue in the shipped tokens. Consumer overrides `--primary` to inject brand.
- **Aggressive negative tracking on display** (-0.045em at 72px), single voice from display to body, positive tracking reserved for the eyebrow (+0.04em) as a taxonomy marker.
- **Three type families:** Inter Display + Inter + JetBrains Mono. Compound utility classes (`text-display-72`, `text-body-16`, `text-mono-13`) bundle size + line-height + tracking + weight.
- **Semantic status colors are fixed hex.** Error/warning/success read identically in both themes; paired `-fg` tokens flip the label color per theme.
- **Radius is disciplined:** 6px for controls, 12px for cards and surfaces, 16px for marketing panels, `9999px` for pills and avatars. Nothing else.
- **Focus is a 2px ring** offset by 2px outside the element border. Color reads `{colors.primary}` so a consumer's brand override colors every focused primitive automatically. Border stays at rest on focus; the ring alone signals it. Inputs are the intentional exception: on focus their border shifts to `{colors.primary}` instead of stacking an outside ring, so the input's own edge carries the state.
- **Flat elevation.** Shadows only exist on true overlays (dialog, menu popup, select popup, tooltip, toast). Cards and panels are flat.
- **Motion is fast and short.** `duration-state` 75ms for state changes, `duration-overlay` 150ms for overlays. One easing keyword (`ease-standard`) with a subtle spring bounce.

## Colors

> Source: `packages/react/src/theme/tokens.css` (Layer 1), consumed via `@theme inline` (Layer 2) into Tailwind utilities and compound classes (Layer 3).

### Canvas & Surface Ladder

The canvas and its four-step ladder replace the earlier `--background-100` / `--background-200` two-tone scale. Every surface in the system picks a rung: canvas for page background, `surface-1` for cards and default lifted panels, `surface-2` for elevated or hovered cards, `surface-3` for menu popups and dropdowns, `surface-4` for the deepest lifted content (nested tiles inside a lifted panel).

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.canvas}` | `#FBFBFB` | `#0F0F10` | Page background, docs shell |
| `{colors.surface-1}` | `#F5F5F7` | `#1B1B1C` | Segmented toggle track, tertiary button hover, subtle tint fills |
| `{colors.surface-2}` | `#EDEDEE` | `#222224` | Toggle pressed fill, striped/interactive table hover, skeleton |
| `{colors.surface-3}` | `#E5E5E7` | `#2A2A2C` | Switch off-track, older popup rung (now largely replaced by `surface-elevated`) |
| `{colors.surface-4}` | `#DEDEE0` | `#313134` | Deepest lifted step, hover on switch off-track |
| `{colors.surface-elevated}` | `#FFFFFF` | `#1B1B1C` | Popups (menu, combobox, tooltip), secondary Button chrome, Card, Input, Select, Tooltip, Table container |
| `{colors.surface-elevated-hover}` | `#F7F7F8` | `#232324` | Secondary Button hover, Input hover companion |

The dark canvas at `#0F0F10` is deliberately not pure `#000000`. It keeps the surface warm on OLED and prevents the ladder from banding on cheap panels. Light canvas at `#FBFBFB` picks up a matched off-white so the two themes read as reflections of each other rather than as separate palettes.

`surface-elevated` is the workhorse rung of the popup + control layer. In light mode it lifts TOWARD pure white so a floating menu, an input control, or a Card reads brighter than the canvas below. In dark mode it lifts TOWARD a lighter gray rung above canvas. Every recipe that reads as "lifted chrome" (secondary Button, Card, Input, Select, Menu, Tooltip, Dialog, Table container) resolves to this token.

### Hairlines

Hairlines carry every hierarchical separation that the surface ladder can't. Cards, panels, dropdowns, and inputs all wear a 1px hairline; the strong step is for hovered/focused inputs and the tertiary step is for nested content that already sits on a lifted surface.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.hairline}` | `rgba(0,0,0,0.04)` | `rgba(255,255,255,0.06)` | Default card border, input border, table row divider, tab underline |
| `{colors.hairline-strong}` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.11)` | Hovered input border, structural separators (docs header, table header divider) |
| `{colors.hairline-tertiary}` | `rgba(0,0,0,0.14)` | `rgba(255,255,255,0.18)` | Radio hover border, dropzone drag hover, nested surfaces where the two above compete |

### Text (Ink)

Four tiers. The naming is deliberate: `ink` is not called `foreground` because the system separates *type* from *icon* and *border* colors, all of which have their own token families. Ink applies to text only.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.ink}` | `#1D1D1F` | `#F5F5F5` | Body text, headlines, emphasized labels |
| `{colors.ink-muted}` | `#545458` | `#9D9DA0` | Meta text, table cell secondary, muted icon rest state |
| `{colors.ink-subtle}` | `#6E6E71` | `#7C7C80` | Placeholder, missing/None cell values, deselected tab |
| `{colors.ink-tertiary}` | `#8E8E93` | `#6E6E71` | Disabled label, dark-mode switch off-thumb, footnote |

### Primary (Monochrome)

The library ships no chromatic brand hue. `{colors.primary}` resolves to `{colors.ink}` and `{colors.on-primary}` to `{colors.canvas}`. In practice this means the default primary button on light is near-black on near-white, and on dark it is near-white on near-black. The visual weight comes from contrast, not hue.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.primary}` | `#1D1D1F` | `#F5F5F5` | Primary button fill, active pill fill, slider indicator + thumb, switch on-track |
| `{colors.on-primary}` | `#FBFBFB` | `#0F0F10` | Text on primary fill, switch thumb (contrast) |
| `{colors.primary-hover}` | `color-mix(primary, canvas 15%)` | same | Hovered primary button |
| `{colors.primary-active}` | `color-mix(primary, canvas 25%)` | same | Pressed primary button |

`primary-hover` and `primary-active` are computed via `color-mix` so a consumer's `--primary` override on a downstream layer automatically produces matching hover and active steps. Mixing toward `--canvas` gives a "subtle move toward the background" that works in both themes: it lightens the near-black primary in light mode and darkens the near-white primary in dark.

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

- **Inter Display** carries display sizes. Weight 600 across the entire display scale. `font-family: "Inter Display", "Inter", -apple-system, system-ui, "Segoe UI", Roboto, sans-serif`. The display cut of Inter has optical adjustments at large sizes that keep the negative tracking readable.
- **Inter** carries body, buttons, and captions. Weight 400 for copy, weight 500 for buttons and eyebrows. Same fallback stack minus the Display entry.
- **JetBrains Mono** carries code contexts only. Weight 400. `font-family: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace`.

The display and text families are variants of the same superfamily. The system treats them as one continuous voice: the family change from display-20 down to body-20 is silent.

### Hierarchy

| Token | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|
| `{typography.display-72}` | 72px | 600 | 1.05 | -0.045em | Marketing hero headline |
| `{typography.display-64}` | 64px | 600 | 1.05 | -0.04em | Landing headline |
| `{typography.display-56}` | 56px | 600 | 1.08 | -0.04em | Section opener |
| `{typography.display-48}` | 48px | 600 | 1.10 | -0.035em | Sub-section opener |
| `{typography.display-40}` | 40px | 600 | 1.15 | -0.035em | Card cluster headline |
| `{typography.display-32}` | 32px | 600 | 1.20 | -0.03em | Docs page title |
| `{typography.display-24}` | 24px | 600 | 1.25 | -0.025em | Card title |
| `{typography.display-20}` | 20px | 600 | 1.30 | -0.02em | Panel title, small heading |
| `{typography.body-20}` | 20px | 400 | 1.50 | -0.015em | Lead paragraph |
| `{typography.body-18}` | 18px | 400 | 1.55 | -0.013em | Marketing sub-lede |
| `{typography.body-16}` | 16px | 400 | 1.55 | -0.011em | Default body |
| `{typography.body-14}` | 14px | 400 | 1.55 | -0.006em | Card body, form label, table cell |
| `{typography.body-13}` | 13px | 400 | 1.50 | -0.005em | Dense UI copy, sidebar item |
| `{typography.caption-12}` | 12px | 400 | 1.40 | 0 | Caption, badge, hint text |
| `{typography.caption-11}` | 11px | 400 | 1.35 | +0.005em | Table column header, meta strip |
| `{typography.button-16}` | 16px | 500 | 1.20 | -0.011em | Large button label |
| `{typography.button-14}` | 14px | 500 | 1.20 | -0.006em | Default button label |
| `{typography.button-12}` | 12px | 500 | 1.20 | 0 | Small button label, tag |
| `{typography.eyebrow}` | 13px | 500 | 1.30 | +0.04em | Section eyebrow (taxonomy marker) |
| `{typography.mono-14}` | 14px | 400 | 1.55 | 0 | Large code block |
| `{typography.mono-13}` | 13px | 400 | 1.50 | 0 | Default code block, inline code |
| `{typography.mono-12}` | 12px | 400 | 1.45 | 0 | Small code, kbd, hex value |

### Compound Utility Classes

Each typography token compiles into a single utility class that bakes size, line-height, tracking, and weight together. Consumers use the class alone, never paired with a `font-*` utility. If a design needs a different weight at a given size, it switches families: display for 600, button for 500, body for 400. Mixing (e.g. `text-body-14 font-medium`) is a lint-level error.

```html
<!-- correct -->
<h1 class="text-display-56">Ship it.</h1>
<p class="text-body-16">A crisp-minimal component library.</p>
<button class="text-button-14">Get started</button>

<!-- incorrect: don't stack a weight utility on a compound class -->
<p class="text-body-14 font-medium">...</p>
<!-- correct alternative: use the button family for weight 500 at 14px -->
<p class="text-button-14">...</p>
```

### Principles

- **Aggressive negative tracking on display.** At 72px, -0.045em pulls the letterforms into a single word-shape. The scale tapers linearly: -0.04em at 56px, -0.035em at 40px, -0.02em at 20px.
- **Positive tracking is reserved for taxonomy.** The eyebrow at +0.04em and caption-11 at +0.005em are the only tokens that lift tracking above zero. The positive shift signals "this is a category label, not body text."
- **One voice from display to body.** Weight 600 display, weight 400 body, both Inter, same fallback stack. The family change is silent.
- **Mono only in code contexts.** `<code>`, `<pre>`, `<kbd>`, install snippets, hex values shown as code, terminal output. Never for decorative pills, table cells, or reference chips.
- **No uppercase small-caps.** Uppercase reads as a design cliche and is not part of the aesthetic.
- **No `text-[Npx]` arbitrary sizes.** If a design needs a size between two tokens, add the token to the scale rather than escaping it inline.

### Font Substitutes

Inter Display and Inter are free, self-hostable, and ship on Google Fonts. JetBrains Mono is free and self-hostable. The library imports them through `next/font` in the docs app and expects downstream consumers to do the same (or vend the WOFF2 files directly). If a consumer's environment can't load the display cut, plain Inter at weight 600 is an acceptable fallback: the optical adjustments are lost but the tracking still reads.

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

The canvas is the whitespace. Sections are separated by 96px of canvas between blocks; within a lifted panel, generous 24px gaps between content clusters. The system does not use horizontal rules or dividers on marketing surfaces; a change in surface rung (canvas to surface-1) does the separator's job.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow, no border | Body copy, hero headlines, footer text |
| 1 (canvas surfaces) | `{colors.canvas}` bg + 1px `{colors.hairline}` | Docs shell backdrop, page background |
| 2 (elevated chrome) | `{colors.surface-elevated}` bg + 1px `{colors.hairline}` | Secondary Button, Card, Input, Select, Table container, active pill Tab |
| 3 (popup) | `{colors.surface-elevated}` bg + 1px `{colors.hairline}` + `shadow-menu` | Menu popup, Combobox, Select popup, Command palette |
| 4 (tooltip) | `{colors.surface-elevated}` bg + 1px `{colors.hairline}` + `shadow-tooltip` | Tooltip chip |
| 5 (modal) | `{colors.surface-elevated}` bg + 1px `{colors.hairline}` + `shadow-modal` | Dialog, sheet, toast |
| 6 (focus) | 2px `{colors.primary}` outline, 2px offset | Focused button, tab, link. Inputs shift their own border to `{colors.primary}` instead. |

**Flat by default.** Cards and panels never wear a drop shadow. The lift onto `surface-1` combined with the hairline is the entire elevation vocabulary at that level. Shadows enter only at popup and modal altitude, where the component is genuinely floating above the page.

**Shadow tokens** (`shadow-menu`, `shadow-modal`, `shadow-tooltip`, `shadow-card`) live in `tokens.css` and use a stacked triple to fake depth: a 1px top edge for hairline crispness, a mid diffusion for the body of the lift, and a long soft drop for the cast. Dark-mode shadows increase alpha to compensate for the reduced contrast against the near-black canvas.

**No atmospheric depth.** No gradients on marketing surfaces, no spotlight cards, no glow effects, no ambient noise textures. Depth is carried by the surface ladder plus the hairline plus, where necessary, the shadow stack. Nothing else.

### Marketing Depth

Product screenshots and live component demos are the marketing surface's decorative depth. A feature panel that would elsewhere show a stock photo instead frames a live `<Button>` or a screenshot of the docs. The chrome around each demo is a `surface-1` panel with a hairline; the demo does the visual work.

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
- Background `{colors.primary}` (resolves to `{colors.ink}`), text `{colors.on-primary}`, type `{typography.button-14}`, radius `{rounded.control}` 6px, padding 8px 14px, height 32px.
- Hover: background `{colors.primary-hover}`. Active: background `{colors.primary-active}`.
- Focus: 1px `{colors.focus-ring}` outline, 1px offset. Disabled: opacity 0.5, cursor not-allowed.
- Sizes: sm (24px height, padding 4px 10px, `{typography.button-12}`), md (32px height, default), lg (40px height, padding 10px 16px, `{typography.button-16}`).

**`button-secondary`**: Elevated bordered button. Secondary CTAs and confirmations that aren't primary. Same surface as cards and popups so the button reads as part of the elevated-chrome layer.
- Background `{colors.surface-elevated}`, border 1px `{colors.hairline}`, text `{colors.ink}`, type `{typography.button-14}`, radius `{rounded.control}` 6px, padding 8px 14px.
- Hover: background `{colors.surface-elevated-hover}` (a subtle tint on the same rung — the border stays stable so the whole button doesn't shimmer on hover).
- Icons composed via the `iconMuted` recipe.

**`button-tertiary`**: Transparent button. Toolbar actions, icon-only chrome, low-emphasis links styled as buttons.
- Background transparent, text `{colors.ink}`, type `{typography.button-14}`, radius `{rounded.control}` 6px, padding 8px 14px.
- Hover: background `{colors.surface-1}`. Active: `{colors.surface-2}`.
- Icons composed via the `iconMuted` recipe.

**`button-destructive`**: Destructive action. Uses the semantic error role at fixed hex.
- Background `{colors.error}`, text `{colors.error-fg}`, type `{typography.button-14}`, radius `{rounded.control}` 6px, padding 8px 14px.
- Hover: `{colors.error-hover}`. Active: `{colors.error-active}`.

**Variant vocabulary.** Any component that accepts button-like variants (Toggle, IconButton, LinkButton) reuses `primary` / `secondary` / `tertiary` / `destructive` verbatim. Per-component inventions like `outline` or `ghost` are forbidden.

### Inputs & Forms

**`input`**: Single-line text input.
- Background `{colors.surface-elevated}`, border 1px `{colors.hairline}`, text `{colors.ink}`, placeholder `{colors.ink-subtle}`, type `{typography.body-14}`, radius `{rounded.control}` 6px, padding 8px 12px, height 32px.
- Hover: border `{colors.hairline-strong}`.
- Focused: border `{colors.primary}` (no outside ring — the border-lift is the focus signal).
- Invalid: border `{colors.error}` at 100% (rare exception to the hairline rule; error state overrides).
- Sizes: sm (24px height), md (32px, default), lg (40px height).

**`textarea`**: Multi-line. Same tokens as `input`, min-height 96px, resize vertical only.

**`select-trigger`**: Trigger button for a Select. Same specs as `input`; adds a 16px chevron icon in `ink-subtle` at the right edge.

**`checkbox`**: 16px square, radius `{rounded.control}` 6px, border 1px `{colors.hairline-strong}`. Checked: background `{colors.primary}`, checkmark `{colors.on-primary}`.

**`radio`**: 16px circle, border 1px `{colors.hairline-strong}`. Selected: 6px inner dot in `{colors.primary}`.

**`switch`**: 32px wide × 20px tall pill (`{rounded.full}`), background `{colors.surface-2}` off / `{colors.primary}` on, thumb 16px circle in `{colors.canvas}` on both states.

**`slider`**: 4px track in `{colors.surface-2}`, fill in `{colors.primary}`, thumb 16px circle in `{colors.canvas}` with 1px `{colors.hairline-strong}` border.

**`field`**: Form field wrapper. Renders label (`{typography.body-14}` weight 500) + control + hint (`{typography.caption-12}` in `ink-subtle`) + error (`{typography.caption-12}` in `error`). 8px vertical stack.

### Cards & Containers

**`card`**: Default lifted content block.
- Background `{colors.surface-elevated}`, border 1px `{colors.hairline}`, radius `{rounded.surface}` 12px, padding `{spacing.space-24}` 24px.

**`card-elevated`**: Hovered or featured card. Same background rung; a stronger hairline carries the "one step lifted" signal instead of a surface-rung change.
- Background `{colors.surface-elevated}`, border 1px `{colors.hairline-strong}`, otherwise identical.

**`panel`**: Larger container for marketing hero panels, form containers, docs section wrappers.
- Background `{colors.surface-elevated}`, border 1px `{colors.hairline}`, radius `{rounded.panel}` 16px, padding `{spacing.space-32}` 32px.

### Overlays

**`dialog`**: Modal dialog.
- Background `{colors.surface-elevated}`, border 1px `{colors.hairline}`, radius `{rounded.surface}` 12px, padding `{spacing.space-24}` 24px, shadow `shadow-modal`.
- Scrim: `{colors.scrim}` at 45%.
- Enter/exit: `duration-overlay` 150ms `ease-standard`, opacity + scale-from-98%.
- Close button: circle icon-only (`size-8 rounded-full`) with lucide `X`; `hover:bg-surface-1` for tertiary style.

**`sheet`**: Side drawer. Slides in from the right or bottom.
- Same background and border as `dialog`. Radius `{rounded.panel}` 16px on the leading edge only; other edges square.
- Single canonical variant, always modal; no `variant="drawer"` or `modal={false}` API.
- Enter/exit: `duration-overlay` 150ms `ease-standard`, transform-based slide.

**`menu-popup`**: Menu dropdown. Shared recipe with Combobox popup, Select popup, Command palette via the `popupSurface` mixin.
- Background `{colors.surface-elevated}`, border 1px `{colors.hairline}`, radius `{rounded.surface}` 12px, padding `{spacing.space-4}` 4px, shadow `shadow-menu`.
- Menu row: padding 6px 8px, type `{typography.body-14}`, radius `{rounded.control}` 6px on hover; icons composed via the `iconMuted` recipe.

**`select-popup`**, **`combobox-popup`**, **`command-palette`**: Same specs as `menu-popup`.

**`tooltip`**: Compact tooltip. Uses the same lifted-chrome recipe as menus (no inverted `bg-ink` chip).
- Background `{colors.surface-elevated}`, border 1px `{colors.hairline}`, text `{colors.ink}`, radius `{rounded.control}` 6px, padding 6px 10px, type `{typography.caption-12}`, shadow `shadow-tooltip`.
- Enter/exit: `duration-state` 75ms `ease-standard`, opacity + scale-from-97%.

**`toast`**: Positioned toast, bottom-right by default.
- Background `{colors.surface-elevated}`, border 1px `{colors.hairline}`, radius `{rounded.surface}` 12px, padding 12px 16px, shadow `shadow-modal`, type `{typography.button-14}` title + `{typography.caption-12}` description.
- Close button: circle icon-only (`size-7 rounded-full`), lucide `X`, `hover:bg-surface-2 hover:text-ink`.
- Status icons: lucide `CircleCheck` / `CircleAlert` / `TriangleAlert` / `Info` in mapped Tailwind classes (`text-success`, `text-error`, `text-warning`, `text-ink-muted`).

### Badges

Neutral and status variants. Every badge uses `{rounded.full}` and `{typography.caption-12}`.

**`badge-neutral`**: Background `{colors.surface-2}`, text `{colors.ink-muted}`, padding 2px 8px.

**`badge-status-*`**: One per semantic role. Success uses `{colors.success}` fill with `{colors.success-fg}` text; warning and error follow the same pattern. Fixed hex, theme-invariant, `-fg` flips per role.

### Navigation

**`top-nav`**: Sticky top bar with the Patch wordmark left, primary nav links centered, secondary + primary buttons right.
- Background `{colors.canvas}`, border-bottom 1px `{colors.hairline}`, text `{colors.ink}`, type `{typography.body-14}`, height 56px.

**`tabs`**: Two variants.
- `underline` (default): 2px bar tracks the active tab via motion's `layoutId` sliding between positions. Muted text at rest, ink text active.
- `pill`: fully-rounded chip with a 1px `{colors.hairline}` border always visible (per-tab, matches secondary-button chrome). Active tab fills with `{colors.surface-elevated}` via a direct data-attr swap (no sliding indicator — a fill traveling through the gap between bordered pills reads awkwardly). Inactive tabs pick up a `{colors.surface-1}` tint on hover, like the tertiary button.

**`segmented-toggle`**: Compact segmented radio control with a sliding pill.
- Container: `{colors.surface-1}` fill, 1px `{colors.hairline}` border, padding 0.5px, radius `{rounded.control}` 6px.
- Active item: `{colors.surface-elevated}` sliding pill (`layoutId` animation), no border, `{colors.ink}` text.
- Inactive item: transparent, `{colors.ink-muted}` text, iconMuted icon, `hover:bg-surface-elevated-hover` for a subtle press feel.

**`toggle`**: Press-to-toggle button (Bold / Italic / Star / Pin).
- Vocabulary matches Button: `tertiary` (transparent at rest) / `secondary` (bordered at rest). Shape API also matches Button: `square` (default, 6px radius) / `pill` / `circle` (aspect-square + `!px-0` for icon-only chips).
- Rest: `{colors.ink-muted}` text + iconMuted icon.
- Hover: `hover:bg-surface-1 hover:text-ink`; secondary adds `hover:border-hairline-strong`.
- Pressed (`data-[state=on]`): `{colors.surface-2}` fill, `{colors.ink}` text — reads as depressed, not color-inverted.
- Container: no border; the surface-2 lift is the entire visual affordance.

**`command`**: Command palette. Full-screen overlay with an input, filtered results, and a keyboard hint bar.
- Background `{colors.canvas}`, border 1px `{colors.hairline-strong}`, radius `{rounded.surface}` 12px, shadow `shadow-modal`.
- Result row: padding 8px 12px, type `{typography.body-14}`, hover `{colors.surface-1}`.

### Marketing-Specific

**`hero-panel`**: Landing hero container.
- Background `{colors.surface-1}`, border 1px `{colors.hairline}`, radius `{rounded.panel}` 16px, padding `{spacing.space-64}` 64px vertical / `{spacing.space-40}` 40px horizontal.
- Contains `{typography.display-72}` headline, `{typography.body-20}` lede, one `button-primary` + one `button-secondary` CTA row.

**`feature-card`**: Marketing feature tile.
- Background `{colors.surface-1}`, border 1px `{colors.hairline}`, radius `{rounded.surface}` 12px, padding `{spacing.space-32}` 32px.
- Contains 24px icon in `{colors.ink}`, `{typography.display-24}` title, `{typography.body-14}` copy.

**`code-block`**: Framed code snippet.
- Background `{colors.surface-2}`, radius `{rounded.surface}` 12px, padding `{spacing.space-16}` 16px, type `{typography.mono-13}`.
- Syntax highlighting shipped by rehype-pretty-code with a two-theme palette matching the design system's ink tiers.

**`cta-banner`**: Closing CTA panel.
- Background `{colors.surface-1}`, border 1px `{colors.hairline}`, radius `{rounded.panel}` 16px, padding `{spacing.space-64}` 64px.
- `{typography.display-40}` headline, one `button-primary` CTA.

**`section-eyebrow`**: Taxonomy marker above section headlines.
- Text `{colors.ink-muted}`, type `{typography.eyebrow}` (+0.04em tracking), typically preceded by a small dot or icon in `{colors.ink-tertiary}`.

**`footer`**: Dense link grid.
- Background `{colors.canvas}`, border-top 1px `{colors.hairline}`, text `{colors.ink-subtle}`, type `{typography.caption-12}`, padding 64px 32px.
- Wordmark left, three or four link columns right, copyright and version at the bottom.

## Marketing Surface

The `ui.hotfix.jobs` docs and marketing surface ships dual-theme, respecting the visitor's system preference and the top-nav theme toggle. There is no separate marketing token set; every marketing surface is composed from the core tokens above.

### Page Rhythm

Marketing pages follow a fixed vertical rhythm:

1. **Top nav** (56px, sticky, `{colors.canvas}` with `hairline` bottom).
2. **Hero panel** (`hero-panel`, first section, 96px above the fold).
3. **Content sections** (each preceded by a `section-eyebrow` + `display-40` headline pair, separated by `{spacing.space-96}` 96px).
4. **Closing CTA** (`cta-banner`, 96px above the footer).
5. **Footer** (`footer`).

### Hero Pattern

The landing hero is a single `surface-1` panel with a `display-72` headline, a `body-20` lede, and a two-button CTA row. No decorative background image, no gradient wash. If the hero needs a visual, it embeds a live component demo (e.g. a `<Dialog>` open in a phone frame) or a docs screenshot in a `surface-2` frame.

### Feature Grids

Three-up cards at desktop, each in a `feature-card`. Icons are 24px in `ink`; titles are `display-24`; body is `body-14` in `ink-muted`. No hover lift beyond a background shift to `surface-2`.

### Code Snippets

Every install snippet, prop reference, and inline API example lives in a `code-block`. The syntax palette maps to ink tiers: comments in `ink-tertiary`, punctuation in `ink-subtle`, identifiers in `ink`, strings in `success` (both themes, subtle usage), keywords in `ink` weight 500. No red/blue/orange rainbow.

### Docs Prose

Docs pages use a 960px content column. Prose is `body-16` in `ink`, headings are `display-32` (h1), `display-24` (h2), `display-20` (h3). Inline code is `mono-13` in a `surface-2` chip with 4px horizontal padding and `{rounded.control}` 6px radius. Callouts (Info, Warning, Danger) reuse the semantic status roles as the left border color, keeping the callout body on `surface-1`.

### Component Demo Pages

Each component page opens with a live demo (surface-1 panel, 32px padding), followed by the install snippet (code-block), then Anatomy, Props, and Examples. Every example is a live demo, not a screenshot. The demo panel width matches the content column; the demo itself is centered.

### Do Not

- Do not introduce a marketing gradient wash on any surface.
- Do not use display type larger than `display-72` (~72px) even on the hero.
- Do not add decorative illustrations. The components and code snippets are the illustration.

## Do's and Don'ts

### Do

- Anchor every page on `{colors.canvas}`. The faint blue tint is intentional and gives the flat surface warmth on OLED.
- Use the four-step surface ladder for hierarchy; a card lift plus a hairline is the entire elevation vocabulary at that level.
- Reserve shadows for true overlays: dialog, menu popup, select popup, tooltip, toast. Cards and panels are flat.
- Keep `{colors.primary}` monochrome by default. Consumers override to inject their brand.
- Use semantic status roles (`{colors.error}`, `{colors.warning}`, `{colors.success}`) for status fills, never a chromatic step from a color scale.
- Pair display weight 600 with body weight 400. Never introduce a 700 or 800 display cut.
- Apply aggressive negative letter-spacing on display; taper linearly to zero at body.
- Use compound utility classes (`text-display-56`, `text-body-16`) as complete recipes; never combine them with a `font-*` utility.
- Reserve mono for genuine code contexts.
- Compose focus with the `focusRing` recipe. Never reinvent a focus ring per component.

### Don't

- Don't introduce a chromatic brand hue in the shipped tokens. If a demo needs one, it belongs in the docs consumer layer.
- Don't use `#000000` true black as the canvas; `#08090A` reads warmer.
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
2. When introducing a new section on marketing, decide first which surface rung it lives on. Default to `surface-1`; use `surface-2` only for elevated emphasis.
3. Default body to `{typography.body-16}` at weight 400. Reach for `body-20` only for a lede paragraph, `body-14` for card body or dense UI.
4. Run `npm run check:contrast -w packages/react` after any color token change. WCAG contrast is a gate.
5. Regenerate the registry after any component or token change: `npm run registry`.
6. Add new component variants as separate entries in the `components:` frontmatter map. Never overload an existing entry with a variant switch.
7. Treat the monochrome primary as a first-class principle. New components that need a fill default to `{colors.primary}`; new components that need chromatic emphasis use a semantic status role or defer the choice to the consumer.
8. When adding a new size token to the type scale, verify it's not already covered by an existing size within 2px. The scale is intentionally sparse.
9. Every interactive primitive gets a `focus-visible` state through the `focusRing` recipe. Never bypass it.
10. Every animated property names itself; `transition-all` is banned.

## Known Gaps

- The 4-step surface ladder values (`{colors.surface-1}` through `{colors.surface-4}`) are targets. The current `tokens.css` still ships a 10-step gray scale; the migration path bridges `surface-*` through gray until every consumer has moved.
- The 7 accent scales (blue/red/amber/green/teal/purple/pink) in the current `tokens.css` are deprecated. They remain during migration to avoid breaking downstream consumers who have not moved to the semantic roles + consumer-owned `--primary` model. Removal is tracked as a separate breakage window.
- The `Inter Display` cut is not automatically shipped by every host environment. The docs app loads it through `next/font`; consumers who install patch-ui components without a font pipeline get plain Inter at weight 600, which is a graceful degradation but loses the optical adjustments at large sizes.
- Marketing surface layouts (hero, feature grid, cta-banner) are defined in this document but do not ship as registry items. They live in `apps/docs` as page-level compositions.
- Chart color palettes are not defined in this system. Data-viz surfaces defer entirely to the consumer's palette choice.
- Illustration and photography guidelines are not documented because the aesthetic does not use decorative illustration or photography. Product screenshots and live component demos are the only visual content in marketing surfaces.
