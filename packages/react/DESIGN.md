# Patch UI Design Contract

This document describes the current system. It is a contract for component source, registry output, documentation, and downstream copies. Historical migrations belong in Git history, not here.

## Product language

Patch UI is crisp-minimal, approachable, and content-first. It should feel appropriate for modern marketplaces, directories, dashboards, and job boards without encoding one product's brand.

The hierarchy is simple:

1. A quiet application canvas.
2. Clear content surfaces.
3. Filled controls and metadata.
4. Alpha overlays for interaction.
5. Boundaries and shadows only where separation needs help.

Do not put a border, background, radius, or shadow on every element. Spacing and typography carry most hierarchy.

## Runtime tokens

The source is `src/theme/tokens.css`. Raw custom properties are bridged to Tailwind v4 utilities in the same file.

### Surfaces

| Role | Light | Dark | Use |
|---|---:|---:|---|
| `--base` | `#f5f5f5` | `#101010` | Application canvas |
| `--layer-1` | `#ffffff` | `#191919` | Primary content and floating surface |
| `--layer-2` | `#f0f0f0` | `#242424` | Grouped or selected content |
| `--fill-1` | `#f0f0f0` | `#242424` | Neutral control and metadata fill |
| `--fill-2` | `#e8e8e8` | `#2e2e2e` | Stronger filled-control state |

`--fill-1` intentionally shares a value with `--layer-2`. The separate name preserves intent: layers organize content; fills provide control chrome.

### Interaction

- `--layer-hover` is the light alpha overlay for transparent-at-rest controls and rows.
- `--layer-selected` is the stronger overlay for press, selection, and current navigation.
- Filled controls step from `fill-1` to `fill-2` rather than placing an overlay on top.
- Popup triggers and persisted toggles use their shared held-state recipe.

### Ink and contrast

- `--ink`: primary text, AAA on shipped surfaces.
- `--ink-muted`: secondary text and default icon tone, AA on base, layer-1, and fill-1.
- `--ink-subtle`: placeholder and missing-value copy, 3:1 on base.
- `--ink-tertiary`: disabled and footnote copy, 3:1 on base.

Status fills use `--error`, `--warning`, and `--success` with paired foreground and soft-treatment tokens. Status fills are theme-invariant.

Run `npm run check:contrast -w packages/react` after any readable color change.

### Primary

`--primary` resolves to `--ink`; `--on-primary` resolves to `--base`. Consumers override primary to inject brand. Patch UI ships no accent token family.

Focus color is independent from primary so a brand override does not recolor accessibility focus.

### Hairlines

Hairlines are alpha values so necessary boundaries retain consistent perceived weight across surfaces.

- `--hairline-soft`: whisper containment.
- `--hairline`: standard floating boundary and divider.
- `--hairline-strong`: structural or stronger interactive boundary.
- `--hairline-tertiary`: strongest neutral boundary.

Use hairlines for floating surfaces, explicit outlined variants, table headers, code, and structural separators. Do not add them to ordinary content objects or filled controls.

### Radius

| Token | Role |
|---|---|
| `--radius-4` | Very small controls such as Checkbox |
| `--radius-6` | Metadata, Badge, Tooltip, popup rows |
| `--radius-8` | Buttons, fields, navigation items, utility controls |
| `--radius-10` | Reserved compatibility step |
| `--radius-12` | Cards, popups, Modal, Sheet, Toast, previews |
| `--radius-16` | Large marketing chrome |
| `--radius-full` | Explicit pills and intrinsic circles |

Rounded is the default. Pill or circle geometry must communicate a purpose.

### Type

Inter Variable is the body and display family. JetBrains Mono is reserved for code.

Sizes: micro 11, mini 12, small 14, regular 16, large 18, title3 20, title2 24, title1 36.

Weights: light 300, normal 450, medium 500, semibold 600, bold 700.

Size and weight are separate axes. Compose `text-small font-medium`; do not add raw pixel type utilities. Element defaults own line height: body 1.5, paragraph 1.7, headings 1.25.

### Motion and elevation

- `--duration-state`: hover and press transitions.
- `--duration-overlay`: opening and closing transitions.
- `--ease-standard`: the shared easing.
- `--shadow-card`: explicitly elevated Card and small physical thumbs.
- `--shadow-menu`: menus, selects, comboboxes, popovers, command surfaces, Toast.
- `--shadow-tooltip`: Tooltip.
- `--shadow-modal`: Modal and Sheet.

Ordinary interactive Cards change fill; they do not gain a shadow on hover.

## Focus

Editable fields and non-editable controls use different treatments.

- Input, Textarea, and editable Combobox draw the crisp neutral field outline and return to layer-1 on focus.
- Buttons, navigation, selection controls, rows, and other non-editable controls use `selectionFocus`, a compact keyboard indicator paired with the component's state fill.
- `focusRing` remains available for the limited outside-outline pattern.

Compose the recipes from `src/recipes.ts`. Do not reimplement focus classes in library components.

## Shared component vocabulary

### Button and Badge shapes

Button and Badge expose `shape="rounded" | "pill"` and default to rounded. Icon-only Button infers equal width and height but still respects `shape`. Use `shape="pill"` when a circle is intentional.

Button variants are `primary`, `secondary`, `soft`, `tertiary`, `warning`, and `destructive`. Do not create aliases such as outline or ghost.

### Card and Section

Card exposes `surface`, `outlined`, and `elevated`. Interactive Card uses hover and pressed fills plus compact keyboard focus.

Section is a plain structural grouping by default. Its optional `card` variant adds a borderless, shadowless layer-1 surface, while `dividers` independently separates direct children. Callers own padding and row layout.

### Fields

Input, Textarea, Select, and Combobox use borderless neutral fills at radius 8. Filled controls step from fill-1 to fill-2. Editable focus is distinct from non-editable trigger focus.

Checkbox is a radius-4 square. Radio, Switch, Slider, and Progress retain circular or pill geometry because that geometry communicates their behavior.

### Popup family

Menu, Select, Combobox, Popover, NavigationMenu, and Command share radius-12 layer-1 surfaces with a hairline boundary and menu shadow. Mobile centered branches keep menu-level elevation and lock body scroll where appropriate.

Popup rows use radius 6. Highlight uses layer-hover; selected or checked state uses layer-selected and keeps priority while highlighted.

Tooltip is tighter: radius 6, compact padding, hairline, tooltip shadow.

### Modal, Sheet, and Toast

Modal and Sheet use radius 12, one outer boundary, modal elevation, and borderless internal header/footer regions. Modal remains vertically centered with narrow gutters on mobile. Their close controls use radius 8 and compact focus.

Toast uses radius 12, one outer boundary, menu-level elevation, a borderless filled action, and a radius-8 close control.

### Navigation

- Tabs: borderless radius-8 items, layer-hover on hover, layer-selected when active.
- Sidebar and Pagination: the same radius-8 navigation state vocabulary.
- Sidebar: borderless layer-1 by default, optional `rounded` and `bordered` surface treatments.
- Breadcrumb: borderless text trail with compact keyboard focus; its mobile overflow control uses radius 8.
- NavigationMenu: radius-8 triggers. `NavigationMenuLink` uses `item` inside popups and `trigger` at the top level.

### Table

Table defaults to `surface`; `outlined` adds a radius-12 layer-1 wrapper and hairline boundary. The header keeps one structural divider. Body rows and cells have no automatic hairlines. Interactive rows use layer-hover; selected rows use layer-selected without an accent stripe. Sortable headers make the full header cell actionable.

### Overlays and utility controls

Close, clear, copy, search, theme, and similar utility controls use radius 8 by default. Do not force circles with consumer class overrides. Use an exposed shape API when a circle is intentional.

## Icons

Use `@phosphor-icons/react`, importing from `@phosphor-icons/react/dist/ssr` for server-safe tree shaking. Do not hand-roll SVG icons.

Interactive icons use `iconMuted` or `iconMutedSolid`. Default icons are muted and lift to the label color through interaction state.

## Cursor and states

Do not add `cursor-pointer`. Use native platform cursor behavior. Disabled controls may use `cursor-not-allowed` where appropriate.

Every interactive component defines hover, active, focus-visible, and disabled behavior.

## Documentation as a consumer

The docs app is the first real consumer of Patch UI.

- ComponentPreview: borderless layer-1, radius 12.
- Notes and install commands: borderless fill-1.
- Code blocks, tables, blockquotes, and explicit separators: meaningful boundaries retained.
- Demo shells: do not nest borders around a preview just to create containment.
- Custom utility controls: radius 8 and the same interaction vocabulary as library controls.
- Demo content stays generic and never names a downstream product.

Foundational docs must match the actual token file, component APIs, registry targets, and contrast script.

## Distribution contract

Patch UI is copy-in. There is no published runtime package.

`packages/react/src` is the component source of truth. `npm run registry` rewrites internal imports, generates `registry.json`, and builds committed item JSON under `apps/docs/public/r`.

When a public component changes:

1. Build `packages/react`.
2. Regenerate the registry.
3. Type-check the docs app.
4. Run contrast checks when colors or readable pairs are involved.
5. Verify representative light, dark, desktop, and mobile states.

Downstream copies do not update automatically. Review and back-port changes deliberately.
