# Patch UI v2 — Design System Alignment

**Status:** Design (approved)
**Date:** 2026-07-01
**Scope:** Full rewrite of Patch UI's design tokens and component surface to align with the Geist design system, plus a follow-up migration of hotfix-jobs to consume the result.

---

## 1. Goals

Bring Patch UI's tokens, components, motion, elevation, spacing, and voice into 1:1 structural alignment with the Geist design system, while preserving two identity choices that keep Patch feeling distinct:

1. **Motion runs 50% faster than the reference system** with the same easing curve.
2. **Focus ring stays 1px neutral outline** (not a colored halo).

Everything else — color scale, typography, spacing rhythm, radius family, shadow tiers, component patterns, voice guidelines, do's and don'ts — matches the reference exactly.

**Simplify while porting.** This rewrite is also a cleanup pass. Every component gets re-read with fresh eyes and simplified where possible: strip dead variants and unused props, collapse duplicated class strings into recipe compositions, remove one-off `data-*` hooks that no consumer uses, delete comments that describe *what* code does, and shrink the render tree wherever a wrapping element earns nothing. Any component whose complexity outstrips its purpose is a candidate for a from-scratch rewrite against the new contract rather than an edit. Simplification is scoped to the current file's responsibilities — no cross-cutting refactors.

## 2. Non-goals

- Backwards compatibility. `--patch-*` role tokens are removed. Consumers migrate to the new naming.
- Publishing to npm. Distribution stays copy-in via the registry.
- Custom accent hues beyond the seven standard families.
- New components. This is a rewrite of the existing surface, not an expansion.

## 3. Naming and attribution

**Internally**, this alignment is referred to as "Patch UI v2" or "the alignment." No reference to the source design system appears in:

- File names or paths
- Commit messages or PR titles
- Code comments or JSDoc
- Spec / plan documents

**Attribution** to the source design system appears in exactly one place: `apps/docs/src/app/docs/foundations/credits.mdx`, which acknowledges the design system Patch UI v2 is aligned with and links to its public spec.

## 4. Token architecture

All tokens live in `packages/react/src/theme/tokens.css`. The `--patch-*` prefix is dropped. Tokens are raw and semantic-free at the base layer; components consume them directly.

### 4.1 Color

**Background scale** (surface neutrals; separate from gray scale):
- `--background-100` — default page background
- `--background-200` — subtle separation only (never a general fill)

**Gray scale** (10 steps, 100→1000), intent contract:

| Step | Purpose |
|---|---|
| 100 | Default fill |
| 200 | Hover fill |
| 300 | Active fill |
| 400 | Default border |
| 500 | Hover border |
| 600 | Active border |
| 700 | Solid high-contrast fill; disabled text |
| 800 | Solid fill hover |
| 900 | Secondary text and icons |
| 1000 | Primary text and icons |

**Gray-alpha scale** (same 100→1000 steps, translucent) — for borders, dividers, and overlays that must sit on any background.

**Accent hue families**, each 100→1000, same intent contract as gray: `--blue-*`, `--red-*`, `--amber-*`, `--green-*`, `--teal-*`, `--purple-*`, `--pink-*`. Each token is defined twice: a base declaration with a hex fallback, and an override inside `@supports (color: oklch(0 0 0))` that redefines the same token name with an oklch(P3) value. Consumers reference `var(--blue-700)` and get the wider gamut automatically where supported.

**Semantic aliases** (for state role only, kept minimal):
- `--error` → `--red-800`
- `--success` → `--green-800`
- `--warning` → `--amber-800`

**Dark mode**: every scale gets an inverted counterpart under `.dark`. The intent contract holds — `gray-100` is still "default fill," it just resolves to a dark neutral.

### 4.2 Typography

Full type scale, four families:

- **Heading** (weight 600, tightening letter-spacing at larger sizes):
  `--heading-72`, `--heading-64`, `--heading-56`, `--heading-48`, `--heading-40`, `--heading-32`, `--heading-24`, `--heading-20`, `--heading-16`, `--heading-14`
- **Label** (weight 400, single-line UI text):
  `--label-20`, `--label-18`, `--label-16`, `--label-14`, `--label-13`, `--label-12`
  Plus `-mono` variants (Geist Mono) at each size.
- **Copy** (weight 400, multi-line body):
  `--copy-24`, `--copy-20`, `--copy-18`, `--copy-16`, `--copy-14`, `--copy-13`
  Plus `-mono` variants.
- **Button** (weight 500, controls):
  `--button-16`, `--button-14`, `--button-12`

Each named size is a family of four custom properties consumed together: `--copy-14-size`, `--copy-14-leading`, `--copy-14-tracking`, `--copy-14-weight`. Components apply them as a group via a Tailwind utility class (`text-copy-14`) generated from the `@theme` block, so consumers write one class instead of four inline styles. Default UI text is `copy-14`.

Fonts: Geist Sans (UI + prose), Geist Mono (code + tabular figures). Loaded via the `geist` npm package in the docs app; consumers pick their own font stack and Patch defaults to `ui-sans-serif` if none is provided.

### 4.3 Spacing

Codified scale (as tokens): `--space-4`, `--space-8`, `--space-12`, `--space-16`, `--space-24`, `--space-32`, `--space-40`, `--space-64`, `--space-96`.

Rhythm rules (documented in `foundations/spacing.mdx`):
- **8px** between items inside a group.
- **16px** between groups.
- **32–40px** between sections.

Card padding: 24px default, 16px compact, 32px hero.

### 4.4 Radius

- `--radius-6` — everyday surfaces and controls (buttons, inputs, cards)
- `--radius-12` — menus, popovers, dialogs
- `--radius-16` — sheets and fullscreen surfaces
- `--radius-full: 9999px` — pills, avatars, circular controls

Rule (documented, not linted): one radius family per view.

### 4.5 Elevation

Three named shadow tiers, each a multi-layer stack in light mode. Dark-mode variants use higher-opacity shadows.

- `--shadow-card` — `0 2px 2px rgba(0, 0, 0, 0.04)`. For raised cards.
- `--shadow-menu` — `0 1px 1px rgba(0, 0, 0, 0.02), 0 4px 8px -4px rgba(0, 0, 0, 0.04), 0 16px 24px -8px rgba(0, 0, 0, 0.06)`. For popovers, menus, dropdowns, selects, tooltips (tooltip uses this tier as the lightest recipe).
- `--shadow-modal` — `0 1px 1px rgba(0, 0, 0, 0.02), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 24px 32px -8px rgba(0, 0, 0, 0.06)`. For modals, dialogs, sheets.

Elevation pairs with radius: card → 6, menu → 12, modal → 12, sheet → 16.

### 4.6 Motion

Easing: `--ease-standard: cubic-bezier(0.175, 0.885, 0.32, 1.1)` — a single curve for everything that moves.

Durations (the twist — 50% of the reference system):
- `--duration-state: 75ms` — hover, active, focus color changes
- `--duration-popover: 100ms` — popovers, tooltips revealing
- `--duration-overlay: 150ms` — modals, dialogs, sheets

`prefers-reduced-motion: reduce` zeroes all durations and replaces easing with `ease`.

### 4.7 Focus

The other twist. Single-token contract:

```css
--focus-ring: 1px solid var(--gray-alpha-600);
--focus-ring-offset: 1px;
```

Applied via the `focusRing` recipe in `recipes.ts`. No colored halo, no 2px halo. Every interactive element shows it on `:focus-visible`. Never removed without a visible replacement.

### 4.8 Layout

Documented (not a token): content column 1200px centered, breakpoints `sm 401px / md 601px / lg 961px / xl 1200px / 2xl 1400px`. Side padding grows at wider breakpoints.

## 5. Recipes (packages/react/src/recipes.ts)

Rewritten to encode the new contract:

```ts
export const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-1 " +
  "focus-visible:outline-[var(--gray-alpha-600)] " +
  "focus-visible:outline-offset-[1px]";

export const controlSize = {
  sm: "h-8 px-3 gap-1.5 text-[length:var(--button-12)]",   // 32px
  md: "h-10 px-4 gap-2 text-[length:var(--button-14)]",    // 40px
  lg: "h-12 px-6 gap-2 text-[length:var(--button-16)]",    // 48px
};

export const stateStepping = {
  fill: "bg-[var(--gray-100)] hover:bg-[var(--gray-200)] active:bg-[var(--gray-300)]",
  border: "border-[var(--gray-alpha-400)] hover:border-[var(--gray-alpha-500)] active:border-[var(--gray-alpha-600)]",
};

export const disabled =
  "disabled:bg-[var(--gray-100)] disabled:text-[var(--gray-700)] " +
  "disabled:cursor-not-allowed disabled:pointer-events-none";

export const colorTransition =
  "transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)]";
```

## 6. Component contract

Every component in `packages/react/src/components/` is audited against this contract:

- Uses tokenized type only (no arbitrary `text-[Npx]`).
- Uses tokenized radius only (`--radius-6/12/16` or `--radius-full`).
- Uses tokenized spacing only.
- Hover/active step through the scale (`100→200→300`, `400→500→600`).
- Disabled state uses the shared recipe.
- Focus ring uses the shared recipe.
- Motion uses tokenized durations + easing.
- Shadows only on overlay-tier components.
- Verified in light + dark.

**Simplification checklist**, applied to every component in the same pass:

- Every variant, size, and prop has a demo on its docs page. If it doesn't, delete it.
- Class strings that repeat across variants collapse into a base + variant map via `cva`.
- No inline conditional class chains longer than 3 clauses; extract to a variant.
- No wrapping `<div>` that exists only to hold a class — merge into the child.
- No `data-*` hooks beyond `data-slot` unless a docs demo relies on them.
- No comments describing what code does (JSDoc on the public API is fine; keep only comments that explain a non-obvious *why*).
- Prefer composition of shared recipes over per-component class literals.
- If a component's total line count didn't shrink or its complexity didn't fall, question whether it needed to be touched at all.

### 6.1 Button variants

Rewritten to match the reference contract:

| Variant | Fill | Text | Border | Height | Radius |
|---|---|---|---|---|---|
| Primary | `--gray-1000` | `--background-100` | — | 40 | 6 |
| Secondary | `--background-100` | `--gray-1000` | `--gray-alpha-400` | 40 | 6 |
| Tertiary | transparent | `--gray-1000` | — | 40 | 6 |
| Error | `--red-800` | `#ffffff` | — | 40 | 6 |

Sizes: sm 32, md 40, lg 48. Large buttons step type up to `--button-16`.

### 6.2 Input pattern

- Fill: `--background-100`
- Border: `--gray-alpha-400`
- Radius: 6
- Height: 40 default (`input-small` 32, `input-large` 48)
- Focus: standard 1px neutral ring on the wrapper; no accent-colored replacement.

### 6.3 Component list

Every file in `packages/react/src/components/` gets touched. Enumerated:

`accordion`, `alert`, `app-header`, `avatar`, `badge`, `button`, `calendar`, `card`, `checkbox`, `combobox`, `command`, `date-picker`, `dialog`, `display-heading`, `dropzone`, `empty-state`, `field`, `input`, `kbd`, `label`, `menu`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio`, `section-label`, `segmented-toggle`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `spinner`, `switch`, `table`, `tabs`, `tag-input`, `textarea`, `theme-toggle`, `time-ago`, `toast`, `toggle`, `tooltip`.

Approach per component: swap tokens, apply recipes, verify against the contract. Any component that requires structural change (variant rewrites, prop API changes) gets called out in its section of the implementation plan.

## 7. Docs

`apps/docs/src/app/docs/foundations/` becomes the primary reference:

- `color.mdx` — background, gray, gray-alpha, and each accent family with intent contract
- `typography.mdx` — every token, default is `copy-14`
- `spacing.mdx` — scale + rhythm rules
- `radius.mdx` — 6/12/16 with the one-family-per-view rule
- `elevation.mdx` — three tiers with recipes
- `motion.mdx` — timings, easing, reduced-motion
- `focus.mdx` — the 1px neutral ring rationale
- `content.mdx` — voice guide (see §8)
- `dos-and-donts.mdx`
- `credits.mdx` — the only attribution page

Existing component pages get their demos refreshed to show new variants + new patterns. `packages/react/src/components/*` demos consumed by MDX use the new API.

`src/lib/navigation.ts` gets a Foundations group ahead of Components.

## 8. Content and voice

Documented in `foundations/content.mdx`, applied to every user-visible string in the docs and (in the follow-up PR) hotfix-jobs:

- **Title Case** for labels, buttons, titles, tabs.
- **Sentence case** for body, helper text, toasts.
- **Action verbs + nouns** for buttons: `Deploy Project`, `Delete Member`. Never `Confirm`, `OK`, or a bare verb.
- **Errors** name what happened + what to do next.
- **Toasts** name the specific change, drop the trailing period, never say `successfully`.
- **Empty states** point to the first action.
- **In-progress states** use the present participle with an ellipsis: `Deploying…`, `Saving…`.
- **Numerals** (`3 projects`), curly quotes, ellipsis character.
- **No filler**: skip `please` and marketing superlatives.

## 9. Do's and don'ts (encoded in docs, enforced by conventions)

- Use the gray scale to rank information (1000 primary, 900 secondary, 700 disabled).
- Reserve solid accent for state and one hero action per view.
- Hold WCAG AA (4.5:1 body text). Verified by `check:contrast`.
- Show focus ring on every interactive element; never remove without visible replacement.
- Apply typography tokens; never set size/line-height/weight by hand.
- Never signal state with color alone; pair with icon or text.
- Do not use `--background-200` as a general fill.
- Do not mix rounded and sharp corners, or more than two font weights, in one view.
- Do not swap `--gray-*` for `--background-*`; they are separate scales.

## 10. Registry

`scripts/build-registry-source.mjs` gets updated:

- The rewrite map handles the new token file, new recipe file, and the removal of `--patch-*`.
- New foundations pages that ship copy-in content (e.g. the tokens CSS) get registry items.
- `apps/docs/public/r/*.json` is rebuilt as part of the atomic PR.

## 11. Verification gates

The PR does not merge until all of these pass:

- `npm run build -w packages/react` clean
- `npm run check:contrast` extended to verify every scale step against relevant fg/bg pairs
- `npm run registry` clean
- `apps/docs`: `tsc --noEmit` clean
- `grep -r "\-\-patch-" packages/react/src` returns zero results
- `grep -ri "vercel\|geist" packages/react/src apps/docs/src` returns only the `credits.mdx` page
- Every docs component page loads and renders correctly in light and dark

## 12. hotfix-jobs migration (follow-up PR)

Runs after the patch-ui PR merges.

1. **Token consumption**: replace `hotfix-jobs/src/styles/patch-tokens.css` with the new tokens copied from patch-ui.
2. **Utility class migration** in `hotfix-jobs/src/app/globals.css`:
   - `bg-patch-bg` → `bg-background-100`
   - `text-patch-text` → `text-gray-1000`
   - `border-patch-border` → `border-gray-alpha-400`
   - Focus ring block (already 1px neutral) stays.
3. **Codebase sweep**: `grep -r "patch-" hotfix-jobs/src` and port every reference.
4. **Component replacement**: any hand-rolled UI (custom buttons, custom cards, custom inputs) gets replaced with patch-ui equivalents.
5. **Copy audit**: apply the voice guide to visible strings.
6. **Verify** in dev, light + dark, mobile + desktop, top user flows walked through manually.

## 13. Rollout order

1. **PR 1 — patch-ui v2** (one atomic PR): tokens rewrite, recipes rewrite, every component migrated, docs rewritten, registry rebuilt, verification gates clean.
2. **PR 2 — hotfix-jobs migration** (separate PR, follows patch-ui merge): consume new tokens, replace hand-rolled UI, apply voice guide.

## 14. Estimated shape

- **PR 1**: ~50–60 files touched. `tokens.css` and `recipes.ts` full rewrites. Most components a 20–100 line touch-up. Docs pages new or heavily rewritten. Expect 3–5 focused work sessions.
- **PR 2**: Wide but shallow. Token file swap, utility class rename sweep, replacements of hand-rolled UI. Expect 1–2 sessions.

## 15. Risks

- **Scope**: PR 1 is very large. Mitigation: written implementation plan breaks it into commits that each leave the tree buildable.
- **Contrast regressions**: adding 10-step scales expands the surface `check:contrast` covers. Mitigation: extend the script as part of the same PR.
- **Docs demo drift**: demos consuming old API break during the migration. Mitigation: land the demos in the same PR as the token/recipe changes; keep the docs `tsc --noEmit` gate.
- **Motion feel**: 50% faster than reference is a taste call. Mitigation: sit with it in the docs live demos, adjust before hotfix-jobs migration if it feels wrong.
- **Over-simplification**: aggressive prop/variant deletion could remove something a docs demo or hotfix-jobs relies on. Mitigation: before deleting any public API surface, grep both `apps/docs/src` and `hotfix-jobs/src` for consumers, and add a note in the PR description for anything removed.
