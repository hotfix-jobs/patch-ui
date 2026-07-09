# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Flag Better Approaches

**If you see a clearly better approach, say so before implementing.**

- Explain the tradeoff in 2-4 bullets.
- If the current request is still reasonable, proceed unless the alternative avoids serious risk or wasted work.
- Don't silently substitute your preferred design for what was asked.

---

# Project specifics

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sibling repos

Patch UI is consumed downstream by the Hotfix web app; changes here often need to be sanity-checked or back-ported alongside that repo.

| Repo | Path | Relationship |
|------|------|--------------|
| `patch-ui` (this repo) | `/Users/caseyferrara/patch-ui` | Source of truth for the design system. |
| `hotfix-jobs` | `/Users/caseyferrara/hotfix-jobs` | Primary consumer. Installs Patch UI via the shadcn registry; component files under `src/components/ui/` are owned copies. Diffs between this repo's `packages/react/src/components/` and hotfix's `src/components/ui/` are the alignment surface. |

For sibling repos not in the session, use `gh` CLI to read files from GitHub.

## Repository Overview

Patch UI is a React component library built on Base UI primitives with Tailwind CSS v4 and a near-flat design-token system (`--base`, `--layer-1/2`, `--fill-1/2`, `--layer-hover` / `--layer-selected` overlays, `--ink*`, `--hairline-soft` / `--hairline` / `--hairline-strong` / `--hairline-tertiary` (all alpha), `--primary`, `--radius-4/6/8/10/12/16/full`, `--duration-*`, plus separate `--font-size-*` and `--font-weight-*` axes, no prefix). The neutral scale is currently Radix Colors Gray (Phase 1 preview). It is an NPM workspaces monorepo with a docs site.

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
5. Compose the shared recipes from `src/recipes.ts`: `focusRing`, `controlSize` (sm/md/lg), `stateStepping`, `disabled`, `colorTransition`, `iconMuted`, `iconMutedSolid`, `popupSurface`, `itemRow`, `itemGroupLabel`, `popupDivider`. Do not re-invent focus rings, sizes, or popup chrome per component.
6. `data-slot` attribute on the root element for styling hooks.
7. Props extend `useRender.ComponentProps<"element">` for the `render` pattern.
8. Named exports only; all public API goes through `src/index.ts`.

## Design Bar (every component conforms)

- **Focus:** the `focusRing` recipe (2px outline via `--focus-ring-color` + `--focus-ring-offset`, offset 2px outside the element border). Color reads `var(--primary)` — monochrome ink by default; a consumer's brand override colors every focused primitive. Inputs are the intentional exception: on focus their border shifts to `--primary` instead of stacking an outside ring.
- **Type discipline:** size and weight are separate axes, composed at the call site. Size utilities: `text-micro` (11), `text-mini` (12), `text-small` (14, editorial bump from 13), `text-regular` (16, body default, editorial bump from 15), `text-large` (18), `text-title3` (20), `text-title2` (24), `text-title1` (36). Weight utilities: `font-light` (300), `font-normal` (450, body default), `font-medium` (500, heading + button-label default), `font-semibold` (600), `font-bold` (700). Line-height comes from element defaults (`body` 1.5, `<p>` 1.7, headings 1.25), not from the size utility. Compose like `text-small font-medium`. No raw `text-[Npx]`.
- **Sizing:** `sm/md/lg` vocabulary via `controlSize` (24/32/40 px heights). No arbitrary `h-[Npx]`.
- **Radius:** `--radius-4/6/8/10/12/16/full`. Controls (Button `square`, Input, Textarea, Select trigger, Combobox trigger, Section, Card, Tooltip, ModalInset, Toggle `square`) sit at radius-8 (bumped from 6 this cycle). Popup surfaces via `popupSurface` (Menu, Combobox, Select, Popover, Command) and Sheet sit at radius-12. Marketing chrome uses radius-16, chips (Badge default `rounded` shape) use radius-6, pills use radius-full. radius-4 is reserved for very small controls (checkbox, radio thumb).
- **Motion:** duration/easing tokens only (`--duration-state`, `--duration-overlay`, `--ease-standard`); no hardcoded ms, no inline cubic-bezier, no `transition-all`.
- **Elevation:** near-flat with 1px alpha hairline borders. `border-hairline-soft` (grayA 3, ~6% alpha) is the whisper edge for elevated Card / ModalInset / Calendar chrome; `border-hairline` (grayA 6) is the default for inputs, menus, dividers, flat Card; `border-hairline-strong` (grayA 7) for structural separators and hover input borders; `border-hairline-tertiary` (grayA 8) for hoverable Card / Radio hover / dropzone drag hover. Overlay shadows (`shadow-menu` / `shadow-modal` / `shadow-tooltip`) on modal, menu, popover, select-popup, tooltip, toast. `shadow-card` (softer two-stack in light) turns on for `Card variant="elevated"`.
- **Card / Section variants:** `variant="flat" | "elevated"`. Flat = transparent frame + hairline; Elevated = `bg-layer-1 + hairline-soft + shadow-card` (in light). Card `hoverable` adds `hover:border-hairline-tertiary` only (no bg-shift, no shadow-on-hover). Card `selected` = `border border-primary` (no `!important`). The old `border` / `shadow` / `secondary` booleans on Card were dropped.
- **Popup chrome:** every popup uses the shared `popupSurface` recipe (`rounded-[var(--radius-12)] bg-layer-1 border border-hairline shadow-menu`). List rows use `itemRow` with `data-[active]:bg-layer-hover data-highlighted:bg-layer-hover` (alpha overlay, not solid `bg-fill-2`). Menu, Combobox, and Popover mobile branches wrap content in `<RemoveScroll>` (react-remove-scroll) to lock body scroll while the centered mobile panel is open.
- **Interaction overlays:** transparent-at-rest controls (tertiary Button, Tab, Sidebar link, Toggle, Pagination, icon-only close/clear buttons) use `bg-layer-hover` for hover / focus-visible / popup-open and `bg-layer-selected` for pressed / persistent-on. These are alpha overlays (Radix grayA 3 / 5), not solid rungs, so the state reads on any container underneath.
- **Fills vs layers:** `--fill-1` / `--fill-2` are tinted chip fills (Toggle track, Badge, code chip, striped table, Switch off-track, `Button variant="soft"` fill). `--layer-*` are lifted panels. In the Phase 1 preview `--fill-1` collapses onto `--layer-2` (same rung); the token names stay live so callsites keep resolving.
- **Icons:** `@phosphor-icons/react` only (import from `@phosphor-icons/react/dist/ssr` for tree-shaken server-safe glyphs; never inline SVG in components). Icons in interactive contexts compose the `iconMuted` recipe: `text-ink-muted` at rest, `text-ink` on `hover`, `focus-visible`, `data-[active]`, `data-[state=open]`, `data-[state=on]`, `aria-pressed`, `aria-selected`. Use `iconMutedSolid` on primary/destructive/warning fills where changing color would break the fill/text contract.
- **Status colors:** use the semantic role tokens (`bg-success` / `bg-warning` / `bg-error`) with paired `-fg` label tokens for solid; `-soft-bg` / `-soft-fg` for the soft Badge variant (theme-adaptive so the tint stays legible on both bases). Fixed hex, theme-invariant. Applies to Badge, Progress, Switch, Button destructive/warning variants.
- **Variant vocabulary:** where multiple components accept variants for the same visual role, use the shared Button vocabulary (`primary` / `secondary` / `soft` / `tertiary` / `warning` / `destructive`). The `soft` variant was added this cycle (`bg-fill-1 hover:bg-fill-2 active:bg-layer-selected`, no border) for embedded chrome. Combobox mirrors the split with `variant="control" | "soft"` on its input. The `shadow` prop was dropped from Button. Do not invent per-component names like `outline` or `ghost`.
- **Shape API:** Button and Toggle share `shape={"square" | "pill" | "circle"}`. `square` = radius-8 (bumped from 6). `pill` = radius-full. `circle` produces icon-only chips (`aspect-square + !px-0`).
- **Tabs:** folder-tab shape (one canonical variant — `underline` / `pill` variants were dropped). Active tab has `border border-hairline` on top+sides, transparent bottom border, `rounded-t-[var(--radius-6)]`, `-mb-px` to overlap the container line, and `bg-base` fill so it merges into the panel body. Supports `orientation="horizontal" | "vertical"`.
- **Sheet:** all four sides use `--radius-12` (bumped from 10). `SheetHeader` only collapses into the compact row layout when a `leading` or explicit `trailing` slot is present; `SheetTitle + SheetDescription` alone stacks with an absolute-positioned close X.
- **No accent slot.** Patch UI ships no `--accent*` token family. Consumers override `--primary` to inject brand.
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
