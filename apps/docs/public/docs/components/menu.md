# Menu

A contextual list of actions and choices with groups, persistent selection, and nested submenus.

Use Menu for actions related to a trigger or nearby object. Use Select when the control’s primary purpose is choosing a form value.

```tsx
"use client";

import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@patchui/react";
import { Copy, PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";

export function MenuDemo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        Actions
      </MenuTrigger>
      <MenuPopup>
        <MenuItem prefix={<Copy />}>Duplicate</MenuItem>
        <MenuItem prefix={<PencilSimple />}>Rename</MenuItem>
        <MenuDivider />
        <MenuItem type="error" prefix={<Trash />}>
          Delete
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/menu
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/menu.json). The canonical implementation lives in [packages/react/src/components/menu.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/menu.tsx).

## Usage

```tsx
<Menu>
  <MenuTrigger render={<Button variant="secondary" />}>
    Actions
  </MenuTrigger>
  <MenuPopup>
    <MenuItem>Duplicate</MenuItem>
    <MenuItem>Rename</MenuItem>
    <MenuDivider />
    <MenuItem type="error">Delete</MenuItem>
  </MenuPopup>
</Menu>
```

MenuTrigger supplies open-state semantics to the rendered trigger. MenuItem closes the menu by default unless `closeOnClick={false}` is set.

## Composition

```text
Menu
├── MenuTrigger
└── MenuPopup
    ├── MenuSection
    │   ├── MenuGroupLabel
    │   └── MenuItem
    ├── MenuCheckboxItem
    ├── MenuRadioGroup
    │   └── MenuRadioItem
    ├── MenuDivider
    └── MenuSub
        ├── MenuSubTrigger
        └── MenuSubPopup
```

## Examples

### Persistent choices

Use checkbox items for independent toggles and a radio group for one choice from a set. These communicate persistent state rather than temporary pointer or keyboard highlight.

```tsx
"use client";

import { useState } from "react";
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuDivider,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSection,
  MenuTrigger,
} from "@patchui/react";

export function MenuSelectionDemo() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [theme, setTheme] = useState("system");

  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        View Options
      </MenuTrigger>
      <MenuPopup>
        <MenuSection title="Layout">
          <MenuCheckboxItem
            checked={showSidebar}
            onCheckedChange={setShowSidebar}
          >
            Show Sidebar
          </MenuCheckboxItem>
        </MenuSection>
        <MenuDivider />
        <MenuSection title="Theme">
          <MenuRadioGroup value={theme} onValueChange={setTheme}>
            <MenuRadioItem value="light">Light</MenuRadioItem>
            <MenuRadioItem value="dark">Dark</MenuRadioItem>
            <MenuRadioItem value="system">System</MenuRadioItem>
          </MenuRadioGroup>
        </MenuSection>
      </MenuPopup>
    </Menu>
  );
}

```

### Submenu

Use a submenu when a related action set would make the top-level menu difficult to scan. Keep nesting shallow.

```tsx
"use client";

import {
  Button,
  Menu,
  MenuItem,
  MenuPopup,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from "@patchui/react";

export function MenuSubmenuDemo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        Organize
      </MenuTrigger>
      <MenuPopup>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuSub>
          <MenuSubTrigger>Move to</MenuSubTrigger>
          <MenuSubPopup>
            <MenuItem>Inbox</MenuItem>
            <MenuItem>Archive</MenuItem>
            <MenuItem>Trash</MenuItem>
          </MenuSubPopup>
        </MenuSub>
      </MenuPopup>
    </Menu>
  );
}

```

## API reference

| Prop                                       | Type                                 | Default       | Description                                                         |
| ------------------------------------------ | ------------------------------------ | ------------- | ------------------------------------------------------------------- |
| MenuPopup.density                          | "compact" \| "comfortable"           | "comfortable" | Selects dense or larger item rows.                                  |
| MenuItem.type                              | "default" \| "error"                 | "default"     | Adds destructive action presentation.                               |
| MenuItem.selected                          | boolean                              | false         | Displays a trailing check for a current single choice.              |
| MenuItem.description                       | ReactNode                            | -             | Adds a secondary line below the item label.                         |
| MenuItem.href                              | string                               | -             | Renders the item as an anchor while preserving menu behavior.       |
| MenuCheckboxItem.checked / onCheckedChange | boolean / (checked: boolean) => void | -             | Controls an independent persistent choice without closing the menu. |
| MenuRadioGroup.value / onValueChange       | string / (value: string) => void     | -             | Controls one selected value across MenuRadioItem children.          |

MenuPopup inherits Base UI positioning props and defaults to `side="bottom"`, `align="start"`, and `sideOffset={4}`. MenuSection supplies a labeled group, while `prefix`, `suffix`, and MenuShortcut add supporting content to an item.

## Keyboard behavior

* Arrow keys move through enabled menu items. Home and End move to the first or last item.
* Enter or Space activates the highlighted item. Typing moves to a matching item.
* Escape closes the current menu and returns focus through the underlying Base UI behavior.
* Arrow Right opens a submenu from its trigger; Arrow Left returns to the parent menu.
* `selected`, checked, and radio state are persistent application state and remain distinct from temporary highlight.

## Mobile behavior

Below the `md` breakpoint, a top-level MenuPopup becomes a centered panel with narrow viewport gutters, a backdrop, comfortable density, and locked body scrolling. Submenus remain anchored to their parent item.
