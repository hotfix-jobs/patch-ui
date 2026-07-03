# Patch UI

A React component library built on [Base UI](https://base-ui.com/) primitives, Tailwind CSS v4, and a token system inspired by [Vercel Geist](https://vercel.com/geist). Crisp, restrained, accessible.

Patch UI is **copy-in**: you add a component and its source lands in your own repo, fully yours to edit. There is no npm package to install, no version to bump, no Tailwind purge config to maintain.

**Docs:** [ui.hotfix.jobs](https://ui.hotfix.jobs)

## Quickstart

Add the `@patchui` registry to your `components.json` (run `npx shadcn@latest init` first if you do not have one):

```json
{
  "registries": {
    "@patchui": "https://ui.hotfix.jobs/r/{name}.json"
  }
}
```

Add components one at a time:

```bash
npx shadcn@latest add @patchui/button
```

Or install the whole library in one shot:

```bash
npx shadcn@latest add @patchui/all
```

Wire the tokens through your Tailwind CSS entry file:

```css
@import "tailwindcss";
@import "./styles/patch-ui-tokens.css";
```

Full guide: **[ui.hotfix.jobs/docs/getting-started](https://ui.hotfix.jobs/docs/getting-started)**.

> The `shadcn` CLI is a generic registry client. It copies **Patch UI's** code into your repo, not shadcn's. Patch UI is its own library, built on Base UI.

## What is inside

**Primitives:** Accordion, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Checkbox, Combobox, Command, EmptyState, Field, Form, Grid, Input, Kbd, Label, ListRow, LoadMore, Menu, MiddleTruncate, Modal, NavigationMenu, Pagination, Progress, Radio, Scroller, Section, SectionLabel, SegmentedToggle, Select, Separator, Sheet, Skeleton, Slider, Spinner, Switch, Table, Tabs, Textarea, ThemeToggle, TimeAgo, Toast, Toggle, Tooltip.

**Blocks:** AppHeader, Dropzone.

**Foundations:** light + dark from a single `.dark` class, no JS theme engine. A `check:contrast` CI gate enforces WCAG minimums so a token change that breaks readability fails the build.

## Repository

NPM workspaces monorepo:

- `packages/react`: the component source (`@patchui/react`, private; backs the registry and powers the docs demos)
- `apps/docs`: the [Next.js documentation site](https://ui.hotfix.jobs)
- `registry.json` + `scripts/build-registry-source.mjs`: the registry generator; `npm run registry` builds `apps/docs/public/r/*.json`

## Credits

Design system inspired by Vercel Geist. Built on Base UI, Floating UI, Motion, Tailwind CSS v4, class-variance-authority, clsx, tailwind-merge, and Lucide. Distribution via shadcn/ui's registry format. See [ui.hotfix.jobs/docs/credits](https://ui.hotfix.jobs/docs/credits) for the full attribution.

## License

[MIT](./LICENSE) © Hotfix
