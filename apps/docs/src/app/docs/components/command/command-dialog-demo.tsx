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
