# Section

A semantic structural group with optional header, content, footer, surface, and direct-child dividers.

Use Section to organize related settings or controls under one heading. Use Card when the content represents a discrete object with its own boundary, elevation, selection, or interaction state.

```tsx
"use client";

import { useState, type ReactNode } from "react";
import {
  Section,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  Switch,
} from "@patchui/react";

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="min-w-0 flex-1">
        <p className="text-small font-medium text-ink">{title}</p>
        <p className="mt-1 text-small text-ink-muted">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function SectionDemo() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);

  return (
    <Section variant="card" dividers className="w-full max-w-xl">
      <SectionHeader className="p-5">
        <SectionTitle>Notifications</SectionTitle>
        <SectionSubtitle>Choose how project updates reach you.</SectionSubtitle>
      </SectionHeader>
      <SettingRow title="Email updates" description="Receive a weekly summary.">
        <Switch
          aria-label="Enable email updates"
          checked={email}
          onCheckedChange={setEmail}
        />
      </SettingRow>
      <SettingRow title="Push notifications" description="Receive timely alerts.">
        <Switch
          aria-label="Enable push notifications"
          checked={push}
          onCheckedChange={setPush}
        />
      </SettingRow>
    </Section>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/section
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/section.json). The canonical implementation lives in [packages/react/src/components/section.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/section.tsx).

## Usage

```tsx
<Section variant="card" dividers>
  <SectionHeader className="p-5">
    <SectionTitle>Notifications</SectionTitle>
    <SectionSubtitle>Choose how updates reach you.</SectionSubtitle>
  </SectionHeader>
  <SectionContent>...</SectionContent>
</Section>
```

Section is plain by default. Its slots provide semantics and styling hooks, while the caller owns padding, gaps, alignment, and responsive layout.

## Composition

```text
Section
├── SectionHeader
│   ├── SectionTitle
│   └── SectionSubtitle
├── SectionContent
└── SectionFooter
```

Every slot is optional. Keep the order predictable when several slots are used.

## Examples

### Plain structure

Use the default plain variant when spacing and typography already establish the grouping and another visible surface would add unnecessary chrome.

```tsx
"use client";

import {
  Button,
  Section,
  SectionContent,
  SectionFooter,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from "@patchui/react";

export function SectionPlainDemo() {
  return (
    <Section className="w-full max-w-xl gap-4">
      <SectionHeader>
        <SectionTitle>Project access</SectionTitle>
        <SectionSubtitle>
          Workspace members can view this project by default.
        </SectionSubtitle>
      </SectionHeader>
      <SectionContent>
        <p className="text-small text-ink">
          Invite collaborators when they need editing permission.
        </p>
      </SectionContent>
      <SectionFooter>
        <Button variant="secondary" size="sm">
          Manage Access
        </Button>
      </SectionFooter>
    </Section>
  );
}

```

## API reference

| Prop     | Type              | Default | Description                                              |
| -------- | ----------------- | ------- | -------------------------------------------------------- |
| variant  | "plain" \| "card" | "plain" | Adds no surface or a borderless radius-12 layer surface. |
| dividers | boolean           | false   | Adds a hairline between each pair of direct children.    |

Section and every structural slot support `render` to change the semantic element. SectionTitle defaults to `h3`; choose another heading level when required by the surrounding document outline.

## Accessibility

* Section renders a native `section`. Give it a heading when it represents a distinct document region.
* Choose the SectionTitle heading level according to the page hierarchy, not its visual size.
* Dividers are visual only and do not replace headings or labels.
* Ensure controls inside setting rows retain visible labels and appropriate accessible names.
