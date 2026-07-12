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
