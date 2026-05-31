"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandCollection,
  CommandItem,
  Button,
} from "@patchui/react";

const COMMANDS = [
  "New file",
  "Open file",
  "Save",
  "Go to dashboard",
  "Go to settings",
  "Toggle theme",
  "Invite a teammate",
];

export function CommandDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [ran, setRan] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const results = q
    ? COMMANDS.filter((c) => c.toLowerCase().includes(q))
    : COMMANDS;

  // Open with Cmd/Ctrl+K.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open command menu
        <kbd className="ml-1 rounded border border-patch-border bg-patch-bg px-1.5 font-mono text-[length:var(--text-patch-micro)] text-patch-text-quaternary">
          ⌘K
        </kbd>
      </Button>
      {ran && (
        <p className="text-[length:var(--text-patch-mini)] text-patch-text-tertiary">
          Ran: {ran}
        </p>
      )}

      <CommandDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery("");
        }}
        value={query}
        onValueChange={setQuery}
        filteredItems={results}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandCollection>
            {(item: string) => (
              <CommandItem
                key={item}
                value={item}
                onClick={() => {
                  setRan(item);
                  setOpen(false);
                  setQuery("");
                }}
              >
                {item}
              </CommandItem>
            )}
          </CommandCollection>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
