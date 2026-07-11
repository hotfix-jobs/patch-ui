# Patch UI

Patch UI is a copy-in React component library built on [Base UI](https://base-ui.com/) and Tailwind CSS v4. It uses a quiet canvas, clear content surfaces, filled controls, restrained boundaries, monochrome actions, and shared light/dark tokens.

There is no published runtime package. The shadcn CLI copies component source into your project, where you own and can edit it.

**Documentation:** [ui.hotfix.jobs](https://ui.hotfix.jobs)

## Quick start

Initialize shadcn if the project does not already have `components.json`:

```bash
npx shadcn@latest init
```

Register Patch UI's namespace:

```bash
npx shadcn@latest registry add @patchui=https://ui.hotfix.jobs/r/{name}.json
```

Add one component or the complete registry:

```bash
npx shadcn@latest add @patchui/button
npx shadcn@latest add @patchui/all
```

The registry writes tokens to `styles/patch-ui-tokens.css`. Import that file through the Tailwind CSS entry point, adjusting the relative path to your project structure:

```css
@import "tailwindcss";
@import "../styles/patch-ui-tokens.css";
```

See the [Getting Started guide](https://ui.hotfix.jobs/docs/getting-started) for setup details.

## Design contract

- `--base` is the canvas; `--layer-1` and `--layer-2` organize content.
- `--fill-1` and `--fill-2` provide neutral control and metadata chrome.
- Normal hierarchy comes from backgrounds and spacing, not borders on every object.
- Hairlines are reserved for floating boundaries, outlined surfaces, and structural dividers.
- Controls default to radius 8, metadata to radius 6, and content/floating surfaces to radius 12.
- Button and Badge expose explicit `rounded` and `pill` shapes.
- Editable fields use a crisp neutral focus outline; non-editable controls use compact keyboard focus.
- `--primary` is monochrome by default and can be overridden downstream for brand.

The detailed source of truth is [packages/react/DESIGN.md](./packages/react/DESIGN.md).

## Repository

- `packages/react`: component source, tokens, recipes, and contrast checks
- `apps/docs`: Next.js documentation, live demos, and served registry output
- `registry.json`: generated registry catalog
- `scripts/build-registry-source.mjs`: source rewrite and registry generation

Verification:

```bash
npm run build -w packages/react
npm run check:contrast -w packages/react
npm run registry
npx tsc --noEmit -p apps/docs/tsconfig.json
```

## License

[MIT](./LICENSE) © Hotfix
