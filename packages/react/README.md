# @patchui/react

The source of truth for Patch UI: a React component library built on [Base UI](https://base-ui.com/) primitives with Tailwind CSS v4 and a near-flat design-token system (`--base`, `--layer-*`, `--fill-*`, `--ink*`, `--hairline-soft` / `--hairline` / `--hairline-strong` / `--hairline-tertiary` (all alpha), `--primary`, `--radius-4/6/8/10/12/16/full`, `--duration-*`; type as separate `--font-size-*` + `--font-weight-*` axes). Neutral scale is Radix Colors Gray (Phase 1 preview).

> This package is **not published**. Patch UI is distributed **copy-in**: components are copied into your own repo with the shadcn CLI, so you own and can edit the code. Docs: **[ui.hotfix.jobs](https://ui.hotfix.jobs)**.

## Install components

Add the `@patchui` registry to your `components.json` (run `npx shadcn@latest init` first if you don't have one):

```json
{
  "registries": {
    "@patchui": "https://ui.hotfix.jobs/r/{name}.json"
  }
}
```

Then add a component. This copies its source into your repo, installs its npm dependencies, and adds the design tokens:

```bash
npx shadcn@latest add @patchui/button
```

Import the tokens once, through your Tailwind CSS entry file:

```css
@import "tailwindcss";
@import "./styles/patch-ui-tokens.css";
```

### Light / Dark mode

Add the `dark` class to `<html>` to switch. No JavaScript theme engine needed.

## Usage

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="flex gap-3">
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

## Components

Accordion, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Checkbox, Combobox, Command, EmptyState, Field, Form, Input, Label, Menu, Modal, NavigationMenu, Pagination, Progress, Radio, Scroller, SearchInput, Section, SegmentedToggle, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Spinner, Switch, Table, Tabs, Textarea, ThemeToggle, TimeAgo, Toast, Toggle, Tooltip.

**Blocks:** AppHeader, Dropzone.

Full API + live demos: [ui.hotfix.jobs/docs](https://ui.hotfix.jobs/docs).

## Design tokens

Tokens live in `src/theme/tokens.css` as plain CSS custom properties. Override any of them in your own CSS after the token import to customize the theme; every component picks up the change at runtime.

| Group | Tokens |
|-------|--------|
| Base | `--base` (page background — everything sits on this) |
| Layers (lifted panels + popups + chrome) | `--layer-1`, `--layer-2` |
| Fills (tinted chip fills) | `--fill-1`, `--fill-2` |
| Interaction overlay | `--layer-hover` |
| Ink (text) | `--ink`, `--ink-muted`, `--ink-subtle`, `--ink-tertiary` |
| Hairlines (all alpha, Radix grayA 3/6/7/8) | `--hairline-soft` (whisper edge for elevated Card), `--hairline` (default), `--hairline-strong`, `--hairline-tertiary` |
| Primary (monochrome) | `--primary`, `--on-primary`, `--primary-hover`, `--primary-active` |
| Semantic status | `--error*`, `--warning*`, `--success*` (each with `-hover`, `-active`, `-fg`, plus `-soft-bg` / `-soft-fg` theme-adaptive pair for the soft Badge variant) |
| Focus | `--focus-ring-color` (defaults to `var(--primary)`), `--focus-ring-width`, `--focus-ring-offset` |
| Radius | `--radius-4/6/8/10/12/16/full` |
| Shadow | `--shadow-card` (soft two-stack in light), `--shadow-menu`, `--shadow-modal`, `--shadow-tooltip` |
| Motion | `--duration-state`, `--duration-overlay`, `--ease-standard` |
| Type | `--font-size-{micro,mini,small,regular,large,title3,title2,title1}`, `--font-weight-{light,normal,medium,semibold,bold}` |

Full spec: [`DESIGN.md`](./DESIGN.md).

## License

MIT
