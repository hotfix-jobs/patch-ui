# NavigationMenu

A horizontal site-navigation list with top-level links and shared morphing dropdown panels.

Use NavigationMenu for primary desktop navigation with a small number of stable categories. Use Menu for contextual actions related to a local trigger.

```tsx
"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@patchui/react";

const links = [
  {
    href: "/docs/components/button",
    title: "Button",
    description: "Action hierarchy, icons, and loading states.",
  },
  {
    href: "/docs/components/input",
    title: "Input",
    description: "Single-line text entry and inline adornments.",
  },
  {
    href: "/docs/components/table",
    title: "Table",
    description: "Structured data with sorting and selection.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-80 gap-1 p-1">
              {links.map((link) => (
                <NavigationMenuLink key={link.href} href={link.href}>
                  <span className="block font-medium text-ink">
                    {link.title}
                  </span>
                  <span className="mt-0.5 block text-mini text-ink-muted">
                    {link.description}
                  </span>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs" variant="trigger">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/navigation-menu
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/navigation-menu.json). The canonical implementation lives in [packages/react/src/components/navigation-menu.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/navigation-menu.tsx).

## Usage

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/docs/components/button">
          Button
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs" variant="trigger">
        Docs
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

Each NavigationMenuItem contains either a top-level NavigationMenuLink or a NavigationMenuTrigger paired with NavigationMenuContent.

## Composition

```text
NavigationMenu
└── NavigationMenuList
    └── NavigationMenuItem
        ├── NavigationMenuLink
        └── NavigationMenuTrigger
            └── NavigationMenuContent
                └── NavigationMenuLink
```

NavigationMenu renders the shared portal, positioner, popup, and viewport internally. Content panels reuse that popup and animate its size and position between triggers.

## API reference

| Prop                            | Type                | Default | Description                                                             |
| ------------------------------- | ------------------- | ------- | ----------------------------------------------------------------------- |
| NavigationMenuLink.variant      | "item" \| "trigger" | "item"  | Selects an in-panel link or a top-level trigger-aligned link treatment. |
| NavigationMenuLink.closeOnClick | boolean             | true    | Controls whether activating a link closes the open content panel.       |

The remaining parts expose their underlying Base UI Navigation Menu props. Use NavigationMenuLink `render` to integrate a framework router link while preserving menu behavior and styling.

## Keyboard behavior

* Tab moves into and out of the navigation menu.
* Arrow keys move between top-level items and through links in an open content panel.
* Enter or Space opens a trigger. Escape closes its panel and restores focus through Base UI.
* Top-level destinations remain links; do not use a disclosure trigger when activation should navigate directly.

## Responsive behavior

NavigationMenu does not provide a mobile transformation. Hide or replace it at the application breakpoint with a mobile navigation pattern such as Sheet. Keep the same destinations and hierarchy across both versions.
