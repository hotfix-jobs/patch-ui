# Theme Toggle

An icon button that switches between light and dark color themes.

Use Theme Toggle for a compact theme control in a header, sidebar, or settings surface. It can manage the document theme itself or integrate with an existing theme provider.

```tsx
"use client";

import { ThemeToggle } from "@patchui/react";

export function ThemeToggleDemo() {
  return <ThemeToggle />;
}

```

## Installation

```bash
npx shadcn add @patchui/theme-toggle
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/theme-toggle.json). The canonical implementation lives in [packages/react/src/components/theme-toggle.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/theme-toggle.tsx).

## Usage

```tsx
<ThemeToggle />
```

In uncontrolled mode, Theme Toggle reads the saved theme or system preference, updates the `.dark` class on the document, and persists later changes to local storage.

## Examples

### Controlled

Control the theme when an application already owns theme state. Disable class application and storage when a provider handles those responsibilities.

```tsx
"use client";

import { useState } from "react";
import { ThemeToggle, type ResolvedTheme } from "@patchui/react";

export function ThemeToggleControlledDemo() {
  const [theme, setTheme] = useState<ResolvedTheme>("light");

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle
        theme={theme}
        onThemeChange={setTheme}
        storageKey={false}
        applyClass={false}
      />
      <span className="text-small text-ink-muted">Current theme: {theme}</span>
    </div>
  );
}

```

### Sizes

Choose the size that matches the surrounding controls.

```tsx
"use client";

import { ThemeToggle } from "@patchui/react";

export function ThemeToggleSizesDemo() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle theme="light" size="sm" storageKey={false} applyClass={false} />
      <ThemeToggle theme="light" size="md" storageKey={false} applyClass={false} />
      <ThemeToggle theme="light" size="lg" storageKey={false} applyClass={false} />
    </div>
  );
}

```

## Prevent theme flash

Add a small inline script to the document head so the saved or system theme is applied before the page paints.

```html
<script>
  (function () {
    var theme = localStorage.getItem("patch-ui-theme");
    if (!theme) {
      theme = matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    if (theme === "dark") document.documentElement.classList.add("dark");
  })();
</script>
```

## API reference

| Prop          | Type                           | Default          | Description                                                       |
| ------------- | ------------------------------ | ---------------- | ----------------------------------------------------------------- |
| theme         | "light" \| "dark" \| "system"  | -                | Controls the requested theme. Omit for uncontrolled behavior.     |
| onThemeChange | (theme: ResolvedTheme) => void | -                | Runs with the resolved light or dark theme after activation.      |
| storageKey    | string \| false                | "patch-ui-theme" | Sets the local storage key, or disables persistence.              |
| applyClass    | boolean                        | true             | Controls whether the component updates the document’s dark class. |
| size          | "sm" \| "md" \| "lg"           | "md"             | Matches the shared control size scale.                            |

## Accessibility

* The button label announces the theme that activation will switch to.
* The icon is decorative and does not replace the accessible button name.
* Theme changes should preserve readable contrast in both modes.
* Icon motion is removed when reduced motion is preferred.
