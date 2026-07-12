# Tabs

A borderless selected-navigation control for switching between related panels in one view.

Use Tabs when a small set of peer sections shares the same context and switching should not navigate to a new page. Use links when each destination needs its own URL.

```tsx
"use client";

import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from "@patchui/react";

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-xl">
      <TabsList aria-label="Project sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsPanel value="overview">
        <p className="text-small text-ink">Project summary and members.</p>
      </TabsPanel>
      <TabsPanel value="activity">
        <p className="text-small text-ink">Recent project changes.</p>
      </TabsPanel>
      <TabsPanel value="settings">
        <p className="text-small text-ink">Project preferences.</p>
      </TabsPanel>
    </Tabs>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/tabs
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/tabs.json). The canonical implementation lives in [packages/react/src/components/tabs.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/tabs.tsx).

## Usage

```tsx
<Tabs defaultValue="overview">
  <TabsList aria-label="Project sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsPanel value="overview">Project summary</TabsPanel>
  <TabsPanel value="activity">Recent changes</TabsPanel>
</Tabs>
```

Each TabsTrigger and its TabsPanel share a unique value. Give TabsList an accessible name that describes the section set.

## Composition

```text
Tabs
├── TabsList
│   └── TabsTrigger
└── TabsPanel
```

## Examples

### Icons and badge

Use an icon to reinforce a short label and a badge for compact, useful metadata. Keep both supplemental to the text label.

```tsx
"use client";

import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from "@patchui/react";
import { Clock, Gear, Users } from "@phosphor-icons/react/dist/ssr";

export function TabsIconsDemo() {
  return (
    <Tabs defaultValue="members" className="w-full max-w-xl">
      <TabsList aria-label="Workspace sections">
        <TabsTrigger value="members" icon={<Users />} badge={4}>
          Members
        </TabsTrigger>
        <TabsTrigger value="activity" icon={<Clock />}>
          Activity
        </TabsTrigger>
        <TabsTrigger value="settings" icon={<Gear />}>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsPanel value="members">
        <p className="text-small text-ink">Four members have workspace access.</p>
      </TabsPanel>
      <TabsPanel value="activity">
        <p className="text-small text-ink">Recent workspace changes.</p>
      </TabsPanel>
      <TabsPanel value="settings">
        <p className="text-small text-ink">Workspace preferences.</p>
      </TabsPanel>
    </Tabs>
  );
}

```

### Vertical tabs

Vertical orientation places the list beside a flexible panel while preserving the same selection and focus treatment.

```tsx
"use client";

import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from "@patchui/react";

export function TabsVerticalDemo() {
  return (
    <Tabs
      orientation="vertical"
      defaultValue="profile"
      className="w-full max-w-xl"
    >
      <TabsList aria-label="Account sections" className="w-36">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsPanel value="profile">
        <p className="text-small text-ink">Name and contact details.</p>
      </TabsPanel>
      <TabsPanel value="billing">
        <p className="text-small text-ink">Payment method and invoices.</p>
      </TabsPanel>
      <TabsPanel value="team">
        <p className="text-small text-ink">Members and roles.</p>
      </TabsPanel>
    </Tabs>
  );
}

```

## API reference

| Prop                     | Type                             | Default      | Description                                                                 |
| ------------------------ | -------------------------------- | ------------ | --------------------------------------------------------------------------- |
| value / onValueChange    | string / (value: string) => void | -            | Controls the active tab.                                                    |
| defaultValue             | string                           | -            | Sets the initial uncontrolled tab.                                          |
| orientation              | "horizontal" \| "vertical"       | "horizontal" | Places the list above or beside its panels.                                 |
| TabsList.activateOnFocus | boolean                          | false        | Activates tabs immediately as arrow-key focus moves.                        |
| TabsTrigger.icon / badge | ReactNode / ReactNode \| number  | -            | Adds leading context and trailing metadata; a numeric zero badge is hidden. |
| TabsTrigger.tooltip      | ReactNode                        | -            | Explains why a disabled tab is unavailable.                                 |
| TabsPanel.keepMounted    | boolean                          | false        | Keeps inactive panel content mounted while hidden.                          |

## Keyboard behavior

* Tab enters the active tab and then continues into the active panel.
* Left and Right move focus in horizontal lists. Up and Down move focus in vertical lists.
* Home and End move to the first or last enabled tab.
* By default, Enter or Space activates the focused tab. Set `activateOnFocus` when arrow navigation should also activate immediately.
* Disabled tabs are skipped during keyboard navigation.

## Accessibility

* Put the accessible name on TabsList with `aria-label` or `aria-labelledby`.
* Keep labels concise and ensure each panel remains understandable when reached from its tab.
* Use `keepMounted` only when preserving panel state or expensive content is important; hidden panels must not remain interactable.
