# @patchui/react

The source of truth for Patch UI: a React component library built on [Base UI](https://base-ui.com/) primitives with Tailwind CSS v4 and a `--patch-*` design-token system.

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
@import "./styles/patch-tokens.css";
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
      <Button variant="danger">Delete</Button>
    </div>
  );
}
```

## Components

| Component | Description |
|-----------|-------------|
| `Accordion` | Collapsible sections with animated height and rotating chevron |
| `AppHeader` | App-level header with brand, nav, and right-aligned actions |
| `Badge` | Status/label badge with semantic variants; optional dismissible clear via `onRemove` |
| `Button` | Primary, secondary, outline, ghost, danger, link, and uppercase variants with loading state |
| `Card` | Card container with header, title, description, content, meta, footer |
| `Dialog` | Modal dialog with header, footer, close |
| `DisplayHeading` | Large display typography with tracking presets |
| `EmptyState` | Empty/zero-state layout with icon, title, description, action |
| `Field` / `Form` | Form field wrapper with label, description, error, validation |
| `Input` | Text input with Base UI primitives |
| `Label` | Form label |
| `Menu` | Dropdown menu with items, checkboxes, radio groups, submenus |
| `Pagination` | Page navigation control |
| `SectionLabel` | Small uppercase label for section headers |
| `Select` | Dropdown select with popup, items, groups |
| `Sheet` | Slide-out drawer panel (right, left, top, bottom) |
| `Skeleton` | Loading placeholder |
| `Slider` | Range slider with value display |
| `Spinner` | Loading spinner |
| `Switch` | Toggle switch |
| `Table` | Composable table primitives (header, body, row, cell) |
| `Tabs` | Tabs with list, triggers, and panels; underline and pill variants |
| `Textarea` | Multi-line text input |
| `ThemeToggle` | Light/dark theme toggle |
| `TimeAgo` | Relative time display that updates automatically |
| `Toast` | Toast notifications with position options |
| `Tooltip` | Hover tooltip |

## Design Tokens

The library uses CSS custom properties (`--patch-*`) for theming:

| Token | Light | Dark |
|-------|-------|------|
| `--patch-bg` | `#fafafa` | `#09090b` |
| `--patch-surface` | `#ffffff` | `#111113` |
| `--patch-text` | `#171717` | `#ededed` |
| `--patch-text-secondary` | `#525252` | `#a1a1a1` |
| `--patch-border` | `#e5e5e5` | `rgba(255,255,255,0.06)` |
| `--patch-error` | `#dc2626` | `#f87171` |
| `--patch-success` | `#16a34a` | `#4ade80` |
| `--patch-warning` | `#d97706` | `#fbbf24` |

Override any token in your own CSS to customize the theme.

## License

MIT
