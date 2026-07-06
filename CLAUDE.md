# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Patch UI is a React component library built on Base UI primitives with Tailwind CSS v4 and a flat design-token system (`--canvas`, `--surface-1..4`, `--surface-elevated`, `--ink*`, `--hairline*`, `--primary`, `--radius-*`, `--duration-*`, no prefix). It is an NPM workspaces monorepo with a docs site.

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
- **Type family discipline:** compound `text-*` classes are complete recipes (size + line-height + tracking + font-weight bundled). Use them alone, never paired with a `font-*` utility. Families: `text-display-*` = 600, `text-button-*` = 500, `text-body-*` and `text-caption-*` = 400, `text-mono-*` = 400 code contexts only. Never mix `text-body-14 font-medium`; use `text-button-14` instead. No raw `text-[Npx]` except intentional display sizes.
- **Sizing:** `sm/md/lg` vocabulary via `controlSize` (24/32/40 px heights). No arbitrary `h-[Npx]`.
- **Radius:** `--radius-4/6/12/16/full` only; controls use radius-6, surfaces use radius-12, marketing chrome uses radius-16, chips use radius-full. radius-4 is reserved for very small controls (checkbox, radio thumb).
- **Motion:** duration/easing tokens only (`--duration-state`, `--duration-overlay`, `--ease-standard`); no hardcoded ms, no inline cubic-bezier, no `transition-all`.
- **Elevation:** flat with 1px hairline borders (`border-hairline` for default, `border-hairline-strong` only for structural separators). Shadows only on overlays (modal, menu, select-popup, tooltip, toast).
- **Lifted chrome:** every popup, control container, and card sits on `bg-surface-elevated + border border-hairline`. Secondary Button, Card, Input, Select, Menu, Combobox, Command, Tooltip, Modal, Sheet, Table container, and the active pill Tab all share this recipe.
- **Icons:** lucide-react only (never inline SVG in components). Icons in interactive contexts compose the `iconMuted` recipe: `text-ink-muted` at rest, `text-ink` on `hover`, `focus-visible`, `data-[active]`, `data-[state=open]`, `data-[state=on]`, `aria-pressed`, `aria-selected`. Use `iconMutedSolid` on primary/destructive/warning fills where changing color would break the fill/text contract.
- **Status colors:** use the semantic role tokens (`bg-success` / `bg-warning` / `bg-error`) with paired `-fg` label tokens. Fixed hex, theme-invariant; the `-fg` flips label color per role. Applies to Badge, Progress, Switch, Button destructive/warning variants.
- **Variant vocabulary:** where multiple components accept variants for the same visual role, use the shared Button vocabulary (`primary` / `secondary` / `tertiary` / `warning` / `destructive`). Toggle follows this too: `secondary` = bordered, `tertiary` = transparent. Do not invent per-component names like `outline` or `ghost`.
- **Shape API:** Button and Toggle share `shape={"square" | "pill" | "circle"}`. `circle` produces icon-only chips (`aspect-square + !px-0`).
- **No uppercase text.** Uppercase small-caps reads as a design cliche and is not part of the aesthetic.
- **No decorative mono.** Reserve `font-mono` for genuine code contexts: `<code>`, `<pre>`, `<kbd>`, install snippets, hex values shown as code. Not for pill labels, table cells, or class-name reference chips.
- **States:** hover, active, focus-visible, disabled defined on every interactive component.
- Verify light + dark and run `check:contrast`.

## Styling Conventions

- All colors reference tokens through Tailwind utilities (`bg-canvas`, `text-ink`, `text-ink-muted`, `border-hairline`, `bg-surface-elevated`, `bg-primary`, `text-on-primary`) or CSS variables (`var(--canvas)`, `var(--ink)`), never hardcoded hex.
- Design tokens live in `packages/react/src/theme/tokens.css`. Layer 1: raw `--canvas`, `--surface-*`, `--ink*`, `--hairline*`, `--primary`, `--radius-*` etc. on `:root` / `.dark`. Layer 2: `@theme inline` block bridges them into Tailwind utilities. Layer 3: `@layer utilities` compound text classes (`.text-display-32`, `.text-body-14`, `.text-button-14`, etc.).
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
