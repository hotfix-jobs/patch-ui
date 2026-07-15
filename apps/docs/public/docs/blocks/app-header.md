# App Header

A responsive site header that combines brand, primary navigation, and right-aligned actions.

Use App Header when a product needs one primary navigation row that automatically becomes a full-height mobile menu. Keep route-specific search and filtering controls outside the header.

## Installation

```bash
npx shadcn add @patchui/app-header
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/app-header.json). The canonical implementation lives in [packages/react/src/blocks/app-header/index.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/blocks/app-header/index.tsx).

## Usage

```tsx
<AppHeader>
  <AppHeaderBrand render={<a href="/" />}>Patch</AppHeaderBrand>
  <AppHeaderNav>
    <AppHeaderNavItem href="/projects" active>Projects</AppHeaderNavItem>
    <AppHeaderNavItem href="/team">Team</AppHeaderNavItem>
  </AppHeaderNav>
  <AppHeaderRight>
    <Button variant="primary" size="sm">New project</Button>
  </AppHeaderRight>
</AppHeader>
```

Keep Brand, Nav, Mobile Top, and Right as direct children of App Header. The block extracts those slots and reuses the same navigation tree in desktop and mobile layouts.

## Composition

```text
AppHeader
├── AppHeaderBrand
├── AppHeaderNav
│   ├── AppHeaderNavItem
│   └── AppHeaderNavSection
├── AppHeaderMobileTop
└── AppHeaderRight
```

## Examples

### Marketing header

Use a borderless header and grouped navigation for a lighter marketing surface. Section titles appear only in the mobile panel.

## Mobile behavior

Below the `md` breakpoint, navigation moves into a full-height panel and right-side actions move to its footer. App Header Mobile Top stays beside the menu trigger for actions that must remain immediately reachable. Opening the menu moves focus inside, contains keyboard navigation, hides the background from assistive technology, and locks background scrolling. Escape and the close control return focus to the menu trigger.

Set `--header-height` when the header differs from the default 64 pixel height so the mobile panel begins below the top row.

## API reference

| Prop                             | Type                  | Default | Description                                             |
| -------------------------------- | --------------------- | ------- | ------------------------------------------------------- |
| AppHeader.bordered               | boolean               | true    | Adds the structural bottom hairline.                    |
| AppHeader.sticky                 | boolean               | false   | Pins the header to the top of its scroll container.     |
| AppHeaderNavItem.active          | boolean               | false   | Marks the current destination and applies aria-current. |
| AppHeaderNavItem.prefix / suffix | ReactNode / ReactNode | -       | Adds leading context or trailing metadata.              |
| AppHeaderNavSection.title        | ReactNode             | -       | Labels a navigation group inside the mobile panel.      |

Brand and navigation items support Patch UI’s `render` pattern for framework link components. Build a custom header from primitives when the product needs a drawer or a different mobile navigation model.

## Accessibility

* Render Brand as a home link when the logo navigates to the product root.
* Mark exactly one current navigation item with `active` when appropriate.
* Keep mobile menu labels concise and preserve visible focus for every action.
* Use Mobile Top only for a small number of high-priority actions.
