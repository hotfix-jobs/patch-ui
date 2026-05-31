# Changelog

## Unreleased — Public launch (copy-in registry)

Patch UI moves to **copy-in distribution** via a shadcn-compatible registry
(`npx shadcn add @patchui/<component>`). The installable package
`@hotfix-patchui/react` is **retired** — there is no published Patch UI runtime
package anymore. See the docs Getting Started for the new flow.

### Breaking — distribution & package

- **No more `npm install`.** Components are copied into your repo via
  `npx shadcn add @patchui/<name>` after adding the `@patchui` namespace to
  `components.json` (`"@patchui": "https://ui.hotfix.jobs/r/{name}.json"`).
- `@hotfix-patchui/react` is deprecated; the source now lives as the private
  `@patchui/react` workspace that backs the registry.

### Breaking — components removed

- **Marquee**, **StatGrid** / **CountUpStat**, **StickyScrollSection** — removed
  (unused; marketing-specific). Copy from git history if needed.
- **DataList** / **DataListRow** — removed. Use **Table** (handles tabular data
  and simple key/value pairs).
- **FilterChip** — removed. Use **`<Badge onRemove={...}>`** for removable filter
  tags (every prior usage was the `soft` tone + clear button).

### Breaking — API changes

- **Badge** `variant="salary"` → **`variant="success"`** (now a generic green
  semantic variant). Dead `size="md"` removed (use `sm`/`lg`). Added `onRemove`.
- **Input** / **Select** `size="default"` → **`size="md"`**.
- **Button** `variant="mono"` → **`variant="uppercase"`**; `variant="link-underline"`
  → **`variant="link"`** (now the animated draw-underline).
- Legacy `--radius-patch-md` / `-xl` / `-2xl` tokens removed — use `xs`/`sm`/`lg`.

### Visual — design-system refinement

All components conformed to a single design bar: a 1px focus-ring token, a
tokenized type scale (11/12/13/15/18), tightened radii (xs 2 / sm 4 / lg 8),
asymmetric motion tokens, and hairline borders. Tabs gained a sliding Base UI
indicator + a `pill` variant with orientation support. Error toast made opaque.

## 0.8.0 (2026-04-21)

### Visual — Input/Textarea/Select transparent by default

`--input-bg` retokened from `var(--patch-surface)` → `transparent` (light + dark).
`--input-bg-focus` shifted from `var(--patch-surface-hover)` → `var(--patch-surface)`
so focused fields fill in cleanly. Result: forms no longer sit as a sea of opaque
white rectangles on a `--patch-bg` page; affected components (Input, Textarea,
SelectTrigger) match the new outlined Card language. Empty fields rely on
their 1px border for definition.

### Breaking — Avatar removed

The `Avatar` primitive has been removed from the library. It was only being
used as a wrapper around a single `<img>` for company logos, which is more
naturally expressed as a small project-local component (logo URL, fallback
initial, hydration-safe rendering for theme-aware logo URLs).

Removed:

- `Avatar`, `avatarVariants`, `AvatarProps`
- `--avatar-placeholder-bg` / `--avatar-placeholder-text` tokens (light + dark)

### Migration

Roll your own. A 30-line `CompanyLogo`-style component (image with `<Image fill>`,
fallback initial on error, `useSyncExternalStore` to defer mount for theme-
aware URLs) covers the surface area Avatar was providing.

If you need a generic person/profile avatar, pin to `^0.7.2`.

## 0.7.2 (2026-04-20)

### Visual — outlined surfaces

A cohesive move away from filled surfaces toward transparent-by-default with
hover-fill for interactive treatments. Reads quieter in dense UIs where the
previous bg-tint + border combo felt like a "double treatment."

- **`Card` `variant="interactive"`**: transparent bg → hover fill with
  `--patch-surface`. Border-hover transition still applies.
- **`Button` `variant="secondary"`**: transparent bg + border (outlined). Hover
  fills with the former default bg; active picks up the former hover bg.
- **`Avatar`**: new `fill="none"` variant — transparent bg, secondary text
  color. Use for logo-only avatars where the placeholder tile reads as visual
  noise. Existing `neutral` (default) and `brand` fills unchanged.

No token changes; no API breaks. Visual regression QA recommended for consumers
using `Card variant="interactive"` and `Button variant="secondary"`.

## 0.7.1 (2026-04-20)

### Token consolidation

- **Removed `--badge-salary-text`** — Badge salary variant now sources its text color from `--patch-success` directly. Previously the two greens drifted in dark mode (`#4ade80` success vs `#10b981` salary text).
- **`--badge-salary-bg`** tint hue updated to match `--patch-success` base (22,163,74 light / 74,222,128 dark) — was incorrectly using `#10b981` (green-500) as the base.

Net effect: the salary chip green and any other success indicator now use exactly the same color.

## 0.7.0 (2026-04-20)

### Radius unification

All overlays and surfaces moved to the consistent 4px/10px language:

- **`Avatar` shape="square"**: 10px → 4px (matches new card language)
- **`Menu`** popup: 14px → 4px, border-based focus ring (was `ring-1`)
- **`Select`** popup: 14px → 4px, border-based
- **`FilterDropdown`** (FilterPill): 14px → 4px, border token
- **`Dialog`** popup: 14px → 10px (smaller than overlays, more cohesive)
- **`Sheet`** all sides: 14px → 10px

Additionally replaced `ring-1 ring-patch-border-hover` with `border border-[var(--patch-border)]` in Menu/Select/FilterDropdown popups for consistent border rendering at all zoom levels.

### Breaking — removed unused components

Deleted 8 component modules that had zero in-tree consumers. Library bundle dropped ~30% (d.ts `32.74 KB → 22.21 KB`).

- `AvatarSelector`, `AvatarSelectorItem`
- `CodeBlock`, `CodeBlockHeader`, `CodeBlockTitle`, `CodeBlockBody`, `CodeBlockCopyButton`
- `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`, `CollapsiblePrimitive`
- `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, `CommandEmpty`, `CommandSeparator`, `CommandShortcut`
- `Row`, `RowGroup`
- `ScrollArea`, `ScrollBar`, `ScrollAreaPrimitive`
- `Sidebar` + all sub-components (`SidebarProvider`, `SidebarHeader`, `SidebarContent`, etc. — 20+ exports)
- `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`

### Migration

If you need any of these, pin to `^0.6.3`. All are available there. We can re-add any individual component by request — removal was based on zero usage, not deprecation.

## 0.6.3 (2026-04-20)

### Accessibility

- **`--input-placeholder`** contrast bumped to meet WCAG AA:
  - Light: `#a3a3a3` → `#737373` (matches `--patch-text-tertiary`)
  - Dark: `#333333` → `#858585`
- Previous values were barely visible on light mode (`~2.5:1` contrast) and invisible in dark mode. New values are `>4.5:1` on their respective surfaces.

## 0.6.2 (2026-04-20)

### Form primitive consistency

- **`Input`** — radius changed from `--radius-patch-md` (10px) to `--radius-patch-sm` (4px) to match Button/Card/Badge. Border bumped from 0.5px to 1px for stronger visual weight.
- **`Textarea`** — same radius change. Switched from ring-based focus to border-based (consistent with Input). Added `bg-[var(--input-bg)]` for consistent surface color.
- **`Select`** trigger — same radius change. Same ring→border focus switch for parity.

### Why

Inputs looked visually inconsistent with the rest of the 4px-radius design language. Before 0.6.2, consumers had to override via `className="rounded-[var(--radius-patch-sm)]"` on every Input to match their surrounding UI. Now it's the default.

## 0.6.1 (2026-04-20)

### Button — typography alignment

- Tracking tightened to `-0.015em` (from `--tracking-patch-small`, ~-0.005em).
- Text sizes bumped +1px per variant: `sm 13px`, `md 14px`, `lg 15px`.
- Horizontal padding generous: `sm px-3`, `md px-5`, `lg px-6`.
- Removed `active:scale-[0.98]` micro-press. Replaced with explicit color-shift active states on every variant.
- Base transition narrowed from `transition-all` to `transition-colors`.

### Button variants — explicit active states

- **`primary`**: `hover:bg-[var(--btn-primary-hover)] active:bg-[var(--btn-primary-active)]`.
- **`secondary`**: added `active:bg-[var(--btn-secondary-active)]`.
- **`ghost`**: added `active:bg-[var(--patch-surface-active)]`.
- **`danger`**: fixed broken hover (was `--patch-surface-hover`, neutral gray). Now `hover:bg-[var(--btn-danger-hover)] active:bg-[var(--btn-danger-active)]` — proper red tints.
- **`link`**: added `hover:underline` with `underline-offset-2`.

### Added tokens

- `--btn-primary-active` (light + dark)
- `--btn-secondary-active` (light + dark)
- `--btn-danger-hover` (light + dark)
- `--btn-danger-active` (light + dark)

## 0.6.0 (2026-04-20)

### Added

- **`SectionLabel`** — 11px uppercase label with optional action slot and `divided` variant. Replaces ad-hoc section headers in settings and account UIs.
- **`Stat` / `StatStrip`** — large-number + small-label primitive for identity/dashboard strips. `StatStrip` handles hairline top/bottom borders and vertical dividers between stats.
- **`AppHeader` + `AppHeaderBrand` + `AppHeaderNav` + `AppHeaderNavItem` + `AppHeaderRight`** — sticky top-header shell primitives that replace the sidebar-inset pattern.
- **`TopBarFilters` + `TopBarFilterPill` + `TopBarFilterSeparator`** — horizontal filter-pill row for list/grid pages.
- Tokens: `--tracking-patch-display`, `--tracking-patch-display-xl`, `--tracking-patch-title`, `--tracking-patch-body`, `--tracking-patch-small`, `--tracking-patch-label`, `--tracking-patch-label-tight` — letter-spacing scale.
- `Button` `ghost` variant (transparent, no border).
- `Badge` `primary` (solid dark) and `ghost` (bordered transparent) variants.
- `Badge` `salary` variant is now `font-semibold`.

### Changed

- `Button` — 4px radius across all sizes; `font-semibold` is now the workhorse; sizes bumped (sm 28px, md 36px, lg 44px); tracking token.
- `Card` — 4px radius (was 14px); 1px border (was 0.5px); tighter padding (20/16 rhythm); `CardTitle` uses new `--tracking-patch-title`; `CardFooter` now has its own `border-t`; removed scale transform on `interactive` variant.
- `Badge` base tracking shifted to `--tracking-patch-small` token.

### Removed

- `Card` `static` variant — functionally identical to `default`. **Migration:** replace `variant="static"` with `variant="default"` (or remove the prop).

## 0.5.2 (2026-04-19)

### Added

- **`Avatar` `ImageComponent` prop.** Defaults to `"img"` — existing consumers are unaffected. Pass a framework image component (e.g. Next.js `Image`) to route Avatar's image rendering through that component's optimization pipeline. When a custom component is passed, Avatar applies `fill` mode and sizes the image to the outer span, so consumers don't need to pass width/height:

  ```tsx
  import Image from "next/image";

  <Avatar
    ImageComponent={Image}
    src="/logo.png"
    alt="Figma"
    initials="F"
    size="md"
  />
  ```

  The `onError` → initials fallback still works; the custom component receives Avatar's `onError` handler.

## 0.5.1 (2026-04-19)

### Changed

- **`CardReferrer` → `CardMeta`.** Renamed and generalized. The new prop shape is `icon` / `primary` / `secondary` / `action`, with `primary` and `secondary` loosened from `string` to `React.ReactNode`. Same layout, same visual output — only the naming and types changed so the component works for person attribution *or* system attribution (e.g., ATS source + timestamp) without semantic mismatch. `data-slot="card-referrer"` becomes `data-slot="card-meta"`.
- No other component changes.

### Migration from 0.5.0

If you were already using `CardReferrer` (shipped hours ago — we know of no external consumers):

```tsx
// Before
<CardReferrer avatar={…} name="Jane" role="Staff Engineer" action={…} />

// After
<CardMeta icon={…} primary="Jane" secondary="Staff Engineer" action={…} />
```

No deprecation alias — the component had no downstream consumers at the time of rename.

## 0.5.0 (2026-04-19)

### New

- **`Avatar`** primitive — image / initials / brand-fill; circle or square; xs/sm/md/lg sizes.
- **`AvatarSelector`** + **`AvatarSelectorItem`** — horizontal selection with WAI-ARIA radiogroup + roving-tabindex keyboard nav, "well" active treatment.
- **`CardReferrer`** — avatar + name + role + action sub-component of Card, auto-renders a hairline border-top.
- **`Badge`** `shape` prop (`rounded` default, `pill`) and `size="lg"` option.
- New radius tokens: `--radius-patch-md` (10px), `--radius-patch-xl` (14px), `--radius-patch-2xl` (16px).
- New avatar placeholder tokens: `--avatar-placeholder-bg`, `--avatar-placeholder-text` (both light and dark).

### Changed (visually breaking, API-compatible)

- `Card` radius 6 → 14.
- `Input` / `Textarea` / `SelectTrigger` radius 6/4 → 10. `--input-bg` / `--input-bg-focus` repointed to `--patch-surface` / `--patch-surface-hover` (plain surface, no more tinted-inset).
- `Menu` popup 6 → 14, items 4 → 8.
- `Select` popup 6 → 14, items 4 → 8.
- `FilterPill` 6 → `rounded-full`; padding 2×8 → 3.5×14; dropdown popup 8 → 14, items 5 → 8.
- `Toast` 6/8 → 12.
- `Button size="lg"` 6 → 10. `sm` and `md` unchanged.
- `Dialog` content 12 → 14.
- `Sheet` content (right/left/top) 6 → 14; bottom sheet unchanged at 16.

### Removed

- `useListNavigation` hook — was exported but had zero consumers. AvatarSelector uses inline roving-tabindex nav instead.

### Not changed

- All small/medium Buttons, Badge color variants, Tooltip, Spinner, Skeleton, Separator, Sidebar, Table, ScrollArea, Checkbox, Switch, Slider, CodeBlock, ThemeToggle, Command, RowGroup/Row, Field/Form, Collapsible, Banner.

### Migration notes

- No API changes — imports and props are unchanged. Visual regression QA recommended for consumers using Card, Input/Textarea/Select, Menu, FilterPill, Toast, Dialog, Sheet, Button size=lg.
- The Input tinted-inset background is gone with no escape hatch. Consumers who relied on it should reapply via `className`.
- `useListNavigation` removal: if any downstream code imports this, replace with inline keyboard handling.
