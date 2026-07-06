# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Patch UI is a React component library built on Base UI primitives with Tailwind CSS v4 and a flat design-token system (`--base`, `--layer-1/2`, `--fill-1/2`, `--layer-hover` / `--layer-selected` overlays, `--ink*`, `--hairline*`, `--primary`, `--radius-*`, `--duration-*`, plus separate `--font-size-*` and `--font-weight-*` axes, no prefix). It is an NPM workspaces monorepo with a docs site.

It is distributed **copy-in** (the shadcn model): there is **no published npm package**. Consumers run `npx shadcn add @patchui/<component>` and the source is copied into their repo. The component library is the source of truth that the registry is generated from.

## Conventions (read first)

- **Commits** are authored as `hotfix-bot <support@hotfix.jobs>` (repo-local git config). Never use a personal name. Copyright is "Hotfix".
- **Never mention "Linear"** anywhere (code, comments, docs). Describe the aesthetic as "crisp-minimal". The CSS `linear-gradient(...)` and `linear` easing keyword are fine.
- **No em dashes** in docs or written content. Use commas, colons, parentheses, or restructure.
- **No user names in demos.** Use Ada Lovelace / Alan Turing / Grace Hopper / Katherine Johnson / Linus Torvalds for demo data.

## Monorepo Structure

- `packages/react` - the component source (`@patchui/react`, `private: true`, not published). Backs the registry and powers the docs live demos.
- `apps/docs` - Next.js 16 documentation site with MDX, deployed at https://ui.hotfix.jobs. Root `/` redirects to `/docs`; no marketing landing.
- `registry.json` + `scripts/build-registry-source.mjs` - the registry generator
- `apps/docs/public/r/*.json` - the built registry, served at `ui.hotfix.jobs/r/<name>.json` (committed so it serves regardless of build config)

## Commands

```bash
npm run build -w packages/react            # build the library (tsup; for the docs demos)
npm run dev -w packages/react              # watch mode
npm run dev -w apps/docs                   # docs dev server
npm run check:contrast -w packages/react   # WCAG contrast contract
npm run registry                           # regenerate registry/ + apps/docs/public/r/*.json
```

The `vercel.json` build chains: `build -w packages/react`, then `npm run registry`, then `build -w apps/docs`.

There are no unit-test or lint frameworks. The verification gate is: build, `check:contrast`, `registry`, and docs `tsc --noEmit`. CI runs these (`.github/workflows/ci.yml`).

## Distribution / registry

- `scripts/build-registry-source.mjs` reads `packages/react/src`, rewrites internal imports (`../utils` to `@/lib/utils`, `../recipes` to `@/lib/recipes`, `./x` to `@/components/ui/x`) into `registry/`, and emits `registry.json` (one item per component plus `utils`, `recipes`, and a `tokens` file item).
- `npx shadcn build registry.json --output apps/docs/public/r` compiles the served JSON. `npm run registry` does both steps.
- If you add a new cross-component import, update the rewrite map in the generator.

## Component Authoring Pattern

1. `"use client"` directive at the top.
2. Base UI primitives: `mergeProps` for prop composition, `useRender` for render-prop delegation.
3. Variants via `cva` (class-variance-authority); export the variants object (e.g. `buttonVariants`).
4. `cn()` (clsx + tailwind-merge) for class merging.
5. Compose the shared recipes from `src/recipes.ts`: `focusRing`, `controlSize` (sm/md/lg), `colorTransition`, `iconMuted`, `iconMutedSolid`, `popupSurface`, `itemRow`, `itemGroupLabel`, `popupDivider`. Do not re-invent focus rings, sizes, or popup chrome per component.
6. `data-slot` attribute on the root element for styling hooks.
7. Props extend `useRender.ComponentProps<"element">` for the `render` pattern.
8. Named exports only; all public API goes through `src/index.ts`.

## Design Bar (every component conforms)

- **Focus:** the `focusRing` recipe (2px outline via `--focus-ring-color` + `--focus-ring-offset`, offset 2px outside the element border). Inputs are the intentional exception: on focus their border shifts to `--primary` instead of stacking an outside ring.
- **Type discipline:** size and weight are separate axes, composed at the call site. Size utilities: `text-micro` (11), `text-mini` (12), `text-small` (13), `text-regular` (15, body default), `text-large` (18), `text-title3` (20), `text-title2` (24), `text-title1` (36). Weight utilities: `font-light` (300), `font-normal` (450, body default), `font-medium` (500, heading + button-label default), `font-semibold` (600), `font-bold` (700). Line-height comes from element defaults (`body` 1.5, `<p>` 1.7, headings 1.25), not from the size utility. Compose like `text-small font-medium`. No raw `text-[Npx]`.
- **Sizing:** `sm/md/lg` vocabulary via `controlSize` (24/32/40 px heights). No arbitrary `h-[Npx]`.
- **Radius:** `--radius-4/6/12/16/full` only; controls use radius-6, surfaces use radius-12, marketing chrome uses radius-16, chips use radius-full. radius-4 is reserved for very small controls (checkbox, radio thumb).
- **Motion:** duration/easing tokens only (`--duration-state`, `--duration-overlay`, `--ease-standard`); no hardcoded ms, no inline cubic-bezier, no `transition-all`.
- **Elevation:** flat with 1px hairline borders (`border-hairline` for default, `border-hairline-strong` only for structural separators). Shadows only on overlays (modal, menu, select-popup, tooltip, toast).
- **Lifted chrome:** every popup, control container, and card sits on `bg-layer-1 + border border-hairline`. Secondary Button, Card, Input, Select, Menu, Combobox, Command, Tooltip, Modal, Sheet, and Table container all share this recipe. Interaction states on transparent-at-rest controls use the adaptive overlays (`bg-layer-hover` for hover / focus-visible / popup-open, `bg-layer-selected` for pressed / persistent-on / active pill Tab), not solid rungs — the overlays darken whatever surface sits underneath so the state reads on any container.
- **Fills vs layers:** `--fill-1` / `--fill-2` are tinted chip fills (Toggle track, Badge, code chip, striped table, Switch off-track, menu item highlight, active pill Tab fill). They stay opaque and deeper than base in light. `--layer-*` are lifted panels. In dark mode `--fill-2` sits above `--layer-1` so hovers, stripes, and chips remain visible on top of layer-1 surfaces.
- **Icons:** lucide-react only (never inline SVG in components). Icons in interactive contexts compose the `iconMuted` recipe: `text-ink-muted` at rest, `text-ink` on `hover`, `focus-visible`, `data-[active]`, `data-[state=open]`, `data-[state=on]`, `aria-pressed`, `aria-selected`. Use `iconMutedSolid` on primary/destructive/warning fills where changing color would break the fill/text contract.
- **Status colors:** use the semantic role tokens (`bg-success` / `bg-warning` / `bg-error`) with paired `-fg` label tokens. Fixed hex, theme-invariant; the `-fg` flips label color per role. Applies to Badge, Progress, Switch, Button destructive/warning variants.
- **Variant vocabulary:** where multiple components accept variants for the same visual role, use the shared Button vocabulary (`primary` / `secondary` / `tertiary` / `warning` / `destructive`). Toggle follows this too: `secondary` = bordered, `tertiary` = transparent. Do not invent per-component names like `outline` or `ghost`.
- **Shape API:** Button and Toggle share `shape={"square" | "pill" | "circle"}`. `circle` produces icon-only chips (`aspect-square + !px-0`).
- **No uppercase text.** Uppercase small-caps reads as a design cliche and is not part of the aesthetic.
- **No decorative mono.** Reserve `font-mono` for genuine code contexts: `<code>`, `<pre>`, `<kbd>`, install snippets, hex values shown as code. Not for pill labels, table cells, or class-name reference chips.
- **States:** hover, active, focus-visible, disabled defined on every interactive component.
- Verify light + dark and run `check:contrast`.

## Styling Conventions

- All colors reference tokens through Tailwind utilities (`bg-base`, `bg-layer-1`, `bg-fill-1`, `text-ink`, `text-ink-muted`, `border-hairline`, `bg-primary`, `text-on-primary`) or CSS variables (`var(--base)`, `var(--ink)`), never hardcoded hex.
- Design tokens live in `packages/react/src/theme/tokens.css`. Layer 1: raw `--base`, `--layer-*`, `--fill-*`, `--layer-hover` / `--layer-selected`, `--ink*`, `--hairline*`, `--primary`, `--radius-*`, `--font-size-*`, `--font-weight-*` etc. on `:root` / `.dark`. Layer 2: `@theme inline` block bridges them into Tailwind utilities. Layer 3: `@layer base` sets element defaults (`body` font-family + size + weight + line-height 1.5, `<p>` line-height 1.7, `<h1>-<h6>` font-weight medium + line-height 1.25, form controls inherit `--font-body`).
- Tailwind v4 with `@import` syntax. Consumers import the copied `styles/patch-ui-tokens.css` through their Tailwind entry file.
- The docs CSS uses `@source` to scan the workspace library source so demo classes are not purged (docs only; copy-in consumers do not need `@source`).

## Comment discipline

- Default to writing no comments. Only add one when the WHY is non-obvious: a hidden constraint, a subtle invariant, a workaround for a specific bug, behavior that would surprise a reader.
- Don't explain WHAT the code does — well-named identifiers already do that.
- Don't reference the current task / fix / callers (belongs in commit messages, not code).
- Keep JSDoc summaries to one short line at most.

## Build Configuration

- tsup builds the library to ESM + CJS with `.d.ts` (used by the docs demos), with a `"use client"` banner.
- `react`, `react-dom`, `react/jsx-runtime`, and `@base-ui/react` are externalized.

## Compound Components

Many components use a compound pattern (e.g. `Modal`, `Sheet`, `Menu`, `Select`, `Combobox`, `Command`, `Tabs`, `Field`, `Table`, `Section`, `Sidebar`). The parent wraps Base UI's context provider; sub-components are exported individually. Some also export a `*Primitive` re-export for escape-hatch access.

## Docs App

- Next.js 16 app router, MDX pages under `apps/docs/src/app/docs/`, grouped in `src/lib/navigation.ts` (Components plus a Blocks section).
- Root `/` redirects to `/docs`; no marketing landing, no footer on docs routes. Docs shell locks body to viewport height; only the content region scrolls.
- Each component page has a live demo importing from `@patchui/react`.
- Full-text search via MiniSearch over a build-time index (`scripts/build-search-index.mjs`). Palette lives at the layout root; triggers dispatch a `docs-search:open` window CustomEvent. `SearchTrigger` (desktop) sits in the sidebar header, another lives in `DocsHeader` (mobile-only).
- Sitemap + robots at `app/sitemap.ts` / `app/robots.ts`. Syntax highlighting via rehype-pretty-code + shiki. Path alias `@/*` maps to `apps/docs/src/*`.
