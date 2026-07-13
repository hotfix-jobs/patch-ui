# Command

A searchable command list for quickly finding and running application actions.

Use Command for a compact action index with keyboard navigation and filtering. Use CommandDialog when the list should open as a global palette.

```tsx
"use client";

import {
  Card,
  Command,
  CommandCollection,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  Kbd,
} from "@patchui/react";
import { FilePlus, FolderOpen, FloppyDisk } from "@phosphor-icons/react/dist/ssr";

type CommandEntry = {
  label: string;
  icon: React.ReactNode;
  shortcut: React.ReactNode;
};

const commands: CommandEntry[] = [
  { label: "New file", icon: <FilePlus />, shortcut: <Kbd meta>N</Kbd> },
  { label: "Open file", icon: <FolderOpen />, shortcut: <Kbd meta>O</Kbd> },
  { label: "Save file", icon: <FloppyDisk />, shortcut: <Kbd meta>S</Kbd> },
];

export function CommandDemo() {
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <Command
        items={commands}
        itemToStringValue={(item) => (item as CommandEntry).label}
      >
        <CommandInput placeholder="Search commands" />
        <CommandList>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandCollection>
            {(value) => {
              const command = value as CommandEntry;
              return (
                <CommandItem
                  key={command.label}
                  value={command}
                  prefix={command.icon}
                  suffix={command.shortcut}
                >
                  {command.label}
                </CommandItem>
              );
            }}
          </CommandCollection>
        </CommandList>
      </Command>
    </Card>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/command
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/command.json). The canonical implementation lives in [packages/react/src/components/command.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/command.tsx).

## Usage

```tsx
const commands = ["New file", "Open file", "Save file"];

<Command items={commands}>
  <CommandInput placeholder="Search commands" />
  <CommandList>
    <CommandEmpty>No commands found.</CommandEmpty>
    <CommandCollection>
      {(command) => (
        <CommandItem key={command} value={command}>
          {command}
        </CommandItem>
      )}
    </CommandCollection>
  </CommandList>
</Command>
```

Pass `items` for built-in filtering. Pass `filteredItems` when an external search index owns matching and ranking.

## Composition

```text
Command or CommandDialog
├── CommandInput
└── CommandList
    ├── CommandEmpty
    ├── CommandSection
    │   └── CommandItem
    ├── CommandCollection
    └── CommandSeparator
```

## Examples

### Dialog palette

CommandDialog provides the modal surface and dismissal behavior. The application owns the trigger and any global keyboard shortcut.

```tsx
"use client";

import { useState } from "react";
import {
  Button,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  Kbd,
} from "@patchui/react";

const commands = ["Go to dashboard", "Go to projects", "Open settings"];

export function CommandDialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open command menu
        <Kbd meta>K</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} items={commands}>
        <CommandInput placeholder="Search commands" />
        <CommandList>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandCollection>
            {(value) => {
              const command = String(value);
              return <CommandItem
                key={command}
                value={command}
                onClick={() => setOpen(false)}
              >
                {command}
              </CommandItem>;
            }}
          </CommandCollection>
        </CommandList>
      </CommandDialog>
    </>
  );
}

```

## API reference

| Prop                    | Type                       | Default       | Description                                                              |
| ----------------------- | -------------------------- | ------------- | ------------------------------------------------------------------------ |
| CommandInput.action     | ReactNode                  | -             | Adds trailing content. The consumer wires any interaction.               |
| CommandList.density     | "compact" \| "comfortable" | "comfortable" | Selects dense or larger result rows.                                     |
| CommandItem.selected    | boolean                    | false         | Displays a trailing check without changing filtering or highlight state. |
| CommandItem.description | ReactNode                  | -             | Adds a secondary line below the item label.                              |

Command and CommandDialog otherwise expose the underlying Autocomplete state. Use `items` for built-in filtering, `filteredItems` for external results, and `open` with `onOpenChange` to control the dialog.

## Keyboard behavior

* Typing filters the supplied items. No result is highlighted automatically.
* Arrow Down or Arrow Up establishes and moves the highlighted result.
* Enter selects the highlighted result.
* Escape dismisses CommandDialog. The application must register shortcuts such as Command K or Control K to open it.
* CommandItem `selected` marks persistent application state and is separate from the temporary keyboard highlight.

## Mobile behavior

CommandDialog stays centered with narrow viewport gutters and caps its result height. The modal branch locks body scrolling while open.
