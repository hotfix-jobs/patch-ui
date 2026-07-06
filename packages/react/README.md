# @patchui/react

The source of truth for Patch UI: a React component library built on [Base UI](https://base-ui.com/) primitives with Tailwind CSS v4 and a flat design-token system (`--canvas`, `--surface-*`, `--ink*`, `--hairline*`, `--primary`, `--radius-*`, `--text-*`, `--duration-*`).

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
| Canvas + surfaces | `--canvas`, `--surface-1..4`, `--surface-elevated`, `--surface-elevated-hover` |
| Ink (text) | `--ink`, `--ink-muted`, `--ink-subtle`, `--ink-tertiary` |
| Hairlines | `--hairline`, `--hairline-strong`, `--hairline-tertiary` |
| Primary (monochrome) | `--primary`, `--on-primary`, `--primary-hover`, `--primary-active` |
| Semantic status | `--error*`, `--warning*`, `--success*` (each with `-hover`, `-active`, `-fg`) |
| Focus | `--focus-ring-color`, `--focus-ring-width`, `--focus-ring-offset` |
| Radius | `--radius-4/6/12/16/full` |
| Shadow | `--shadow-card`, `--shadow-menu`, `--shadow-modal`, `--shadow-tooltip` |
| Motion | `--duration-state`, `--duration-overlay`, `--ease-standard` |

Full spec: [`DESIGN.md`](./DESIGN.md).

## License

MIT
