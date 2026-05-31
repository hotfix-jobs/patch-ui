# Patch UI

A React component library built on [Base UI](https://base-ui.com/) primitives, Tailwind CSS v4, and a `--patch-*` design-token system - with a clean, restrained, crisp-minimal aesthetic.

Patch UI is **copy-in**: you add a component and its source lands in your own repo, fully yours to edit. There's no package to install and no Tailwind purge config to maintain.

## Quickstart

Add the `@patchui` registry to your `components.json` (run `npx shadcn@latest init` first if you don't have one):

```json
{
  "registries": {
    "@patchui": "https://ui.hotfix.jobs/r/{name}.json"
  }
}
```

Then add components:

```bash
npx shadcn@latest add @patchui/button
```

This copies the component (and its `cn` helper, shared recipes, and design tokens) into your project and installs its dependencies. Import the tokens once in your Tailwind CSS entry file:

```css
@import "tailwindcss";
@import "./styles/patch-tokens.css";
```

Full guide: **[ui.hotfix.jobs/docs/getting-started](https://ui.hotfix.jobs/docs/getting-started)**.

> The `shadcn` CLI is a generic registry client - it copies **Patch UI's** code into your repo, not shadcn's. Patch UI is its own library, built on Base UI.

## What's inside

Accessible primitives - Button, Input, Select, Switch, Slider, Dialog, Sheet, Menu, Tooltip, Toast, Tabs, Accordion, Table, Pagination, Badge, Card, and more - plus light/dark theming via CSS tokens (no JS theme engine).

## Repository

NPM workspaces monorepo:

- `packages/react` - the component source (`@patchui/react`, private; backs the registry + powers the docs demos)
- `apps/docs` - the [Next.js documentation site](https://ui.hotfix.jobs)
- `registry.json` + `scripts/build-registry-source.mjs` - the registry generator; `npm run registry` builds `r/*.json`

## License

[MIT](./LICENSE) © Hotfix
