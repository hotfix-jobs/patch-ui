# Patch UI

A React component library built on [Base UI](https://base-ui.com/) primitives and Tailwind CSS v4, with a crisp-minimal design language: a Radix-Gray neutral scale (`--base` #fcfcfc light / #0a0a0a dark), two surface families (`--layer-*` for lifted panels + popups + control chrome, `--fill-*` for tinted chip fills), alpha hairline borders (whisper-weight `--hairline-soft` for elevated Cards, standard `--hairline` for inputs and menus), and a monochrome primary that consumers override for brand.

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

**Primitives:** Accordion, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Checkbox, Combobox, Command, EmptyState, Field, Form, Input, Label, Menu, Modal, NavigationMenu, Pagination, Progress, Radio, Scroller, SearchInput, Section, SegmentedToggle, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Spinner, Switch, Table, Tabs, Textarea, ThemeToggle, TimeAgo, Toast, Toggle, Tooltip.

**Blocks:** AppHeader, Dropzone.

**Foundations:** light + dark from a single `.dark` class, no JS theme engine. A `check:contrast` CI gate enforces WCAG minimums so a token change that breaks readability fails the build.

## Repository

NPM workspaces monorepo:

- `packages/react`: the component source (`@patchui/react`, private; backs the registry and powers the docs demos)
- `apps/docs`: the [Next.js documentation site](https://ui.hotfix.jobs)
- `registry.json` + `scripts/build-registry-source.mjs`: the registry generator; `npm run registry` builds `apps/docs/public/r/*.json`

## License

[MIT](./LICENSE) © Hotfix
