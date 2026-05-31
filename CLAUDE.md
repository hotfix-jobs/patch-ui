# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Patch UI is a React component library built on Base UI primitives with Tailwind CSS v4 and a `--patch-*` design-token system. It is an NPM workspaces monorepo with a docs site.

It is distributed **copy-in** (the shadcn model): there is **no published npm package**. Consumers run `npx shadcn add @patchui/<component>` and the source is copied into their repo. The component library is the source of truth that the registry is generated from.

## Conventions (read first)

- **Commits** are authored as `hotfix-bot <support@hotfix.jobs>` (repo-local git config). Never use a personal name. Copyright is "Hotfix".
- **Never mention "Linear"** anywhere (code, comments, docs). Describe the aesthetic as "crisp-minimal". The CSS easing keyword `linear` is fine.
- **No em dashes** in docs or written content. Use commas, colons, parentheses, or restructure.

## Monorepo Structure

- `packages/react` - the component source (`@patchui/react`, `private: true`, not published). Backs the registry and powers the docs live demos.
- `apps/docs` - Next.js 16 documentation site with MDX, deployed at https://ui.hotfix.jobs
- `registry.json` + `scripts/build-registry-source.mjs` - the registry generator
- `apps/docs/public/r/*.json` - the built registry, served at `ui.hotfix.jobs/r/<name>.json` (committed so it serves regardless of build config)

## Commands

```bash
npm run build -w packages/react        # build the library (tsup; for the docs demos)
npm run dev -w packages/react          # watch mode
npm run dev -w apps/docs               # docs dev server
npm run check:contrast -w packages/react   # WCAG contrast contract
npm run registry                       # regenerate registry/ + apps/docs/public/r/*.json
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
5. Compose the shared recipes from `src/recipes.ts`: `focusRing` (1px outline), `controlSize` (sm/md/lg), `colorTransition`. Do not re-invent focus rings or sizes per component.
6. `data-slot` attribute on the root element for styling hooks.
7. Props extend `useRender.ComponentProps<"element">` for the `render` pattern.
8. Named exports only; all public API goes through `src/index.ts`.

## Design Bar (every component conforms)

- **Focus:** the `focusRing` recipe (1px solid outline via `--patch-focus-ring`). No ring-2/ring-3.
- **Type:** tokenized scale only (`--text-patch-micro/mini/control/body/lead` = 11/12/13/15/18). No raw `text-[Npx]` except intentional display sizes.
- **Sizing:** `sm/md/lg` vocabulary via `controlSize`. No arbitrary `h-[Npx]`.
- **Radius:** `--radius-patch-xs/sm/lg` (2/4/8) only; controls use sm, surfaces use lg, chips use xs.
- **Motion:** duration/easing tokens only (`--duration-patch-*`, `--ease-patch-*`); no hardcoded ms, no inline cubic-bezier, no `transition-all`.
- **Elevation:** flat with 0.5px hairline borders; shadows only on overlays (dialog/menu/select-popup/tooltip/toast).
- **States:** hover, active, focus-visible, disabled defined on every interactive component.
- Verify light + dark and run `check:contrast`.

## Styling Conventions

- All colors reference CSS custom properties (e.g. `bg-[var(--btn-primary-bg)]`), never hardcoded values.
- Design tokens live in `packages/react/src/theme/tokens.css` (`--patch-*`). Light/dark via `:root` and `.dark`.
- Tailwind v4 with `@import` syntax. Consumers import the copied `styles/patch-tokens.css` through their Tailwind entry file.
- The docs CSS uses `@source` to scan the workspace library source so demo classes are not purged (docs only; copy-in consumers do not need `@source`).

## Build Configuration

- tsup builds the library to ESM + CJS with `.d.ts` (used by the docs demos), with a `"use client"` banner.
- `react`, `react-dom`, `react/jsx-runtime`, and `@base-ui/react` are externalized.

## Compound Components

Many components use a compound pattern (e.g. `Dialog`, `Sheet`, `Menu`, `Select`, `Tabs`, `Field`). The parent wraps Base UI's context provider; sub-components are exported individually. Some also export a `*Primitive` re-export for escape-hatch access.

## Docs App

- Next.js 16 app router, MDX pages under `apps/docs/src/app/docs/`, grouped in `src/lib/navigation.ts` (Components plus a Blocks section).
- Each component page has a live demo importing from `@patchui/react`.
- Full-text search via MiniSearch over a build-time index (`scripts/build-search-index.mjs`).
- Sitemap + robots at `app/sitemap.ts` / `app/robots.ts`. Syntax highlighting via rehype-pretty-code + shiki. Path alias `@/*` maps to `apps/docs/src/*`.
