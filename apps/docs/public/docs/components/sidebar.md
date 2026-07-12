# Sidebar

A responsive application sidebar with shared desktop, mobile, navigation, and trigger state.

Use Sidebar for persistent application or documentation navigation. SidebarProvider coordinates desktop collapse, the mobile drawer, triggers, and an optional global keyboard shortcut.

```tsx
"use client";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@patchui/react";
import {
  FileText,
  Gear,
  House,
  SquaresFour,
} from "@phosphor-icons/react/dist/ssr";

const items = [
  { label: "Overview", href: "/docs", icon: House, active: true },
  { label: "Projects", href: "/docs/components/card", icon: SquaresFour },
  { label: "Documentation", href: "/docs/getting-started", icon: FileText },
  { label: "Settings", href: "/docs/theme", icon: Gear },
];

export function SidebarDemo() {
  return (
    <aside className="flex h-96 w-64 flex-col overflow-hidden rounded-[var(--radius-12)] bg-layer-1">
      <SidebarHeader className="h-14 justify-center px-3">
        <span className="px-2 text-regular font-medium text-ink">Workspace</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    active={item.active}
                    render={<a href={item.href} />}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="px-2 text-mini text-ink-muted">Ada Lovelace</span>
      </SidebarFooter>
    </aside>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/sidebar
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/sidebar.json). The canonical implementation lives in [packages/react/src/components/sidebar.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/sidebar.tsx).

## Usage

```tsx
<SidebarProvider>
  <Sidebar rounded>
    <SidebarHeader>Workspace</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton active render={<Link href="/" />}>
              Overview
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    {children}
  </SidebarInset>
</SidebarProvider>
```

SidebarProvider must wrap Sidebar, SidebarInset, and every SidebarTrigger or `useSidebar` consumer. The bounded preview above demonstrates the real navigation slots without mounting the fixed Sidebar root inside the docs viewport.

## Composition

```text
SidebarProvider
├── Sidebar
│   ├── SidebarHeader
│   ├── SidebarContent
│   │   └── SidebarGroup
│   │       ├── SidebarGroupLabel
│   │       └── SidebarMenu
│   │           └── SidebarMenuItem
│   │               └── SidebarMenuButton
│   └── SidebarFooter
└── SidebarInset
    └── SidebarTrigger
```

## API reference

| Prop                                | Type                              | Default     | Description                                                           |
| ----------------------------------- | --------------------------------- | ----------- | --------------------------------------------------------------------- |
| SidebarProvider.open / onOpenChange | boolean / (open: boolean) => void | -           | Controls desktop visibility.                                          |
| SidebarProvider.defaultOpen         | boolean                           | true        | Sets initial uncontrolled desktop visibility.                         |
| SidebarProvider.side                | "left" \| "right"                 | "left"      | Selects the desktop edge and mobile drawer side.                      |
| SidebarProvider.shortcut            | string \| null                    | "mod+b"     | Sets or disables the global toggle shortcut.                          |
| Sidebar.collapsible                 | "offcanvas" \| "none"             | "offcanvas" | Slides closed or remains permanently visible on desktop.              |
| Sidebar.width / topOffset           | number / number                   | 256 / 0     | Sets desktop width and fixed-header offset in pixels.                 |
| SidebarMenuButton.active            | boolean                           | false       | Marks current navigation with aria-current and selected presentation. |

Use Sidebar `rounded` for an inset surface and `bordered` only when a visible structural boundary is required. SidebarMenuButton `render` composes a router link while preserving navigation styling.

## Responsive behavior

At `lg` and above, Sidebar is fixed while a spacer reserves its width beside SidebarInset. Below `lg`, the same content renders inside a Sheet drawer with separate mobile open state. SidebarTrigger toggles the appropriate state for the current viewport.

## Accessibility

* Render navigation destinations as links and mark only the current destination `active`.
* SidebarMenuButton adds `aria-current="page"` for active navigation.
* SidebarTrigger has an accessible Toggle sidebar name.
* Mobile focus containment, Escape dismissal, backdrop behavior, and focus return come from Sheet.
* Avoid shortcut collisions. Set `shortcut={null}` when the application already owns Command B or Control B.
