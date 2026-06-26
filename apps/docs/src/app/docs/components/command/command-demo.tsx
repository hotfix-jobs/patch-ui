"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandSection,
  CommandSeparator,
  Button,
} from "@patchui/react";

type CommandEntry = {
  id: string;
  label: string;
  group: "Navigate" | "Actions" | "Settings";
  description?: string;
};

const COMMANDS: CommandEntry[] = [
  { id: "go-dashboard", label: "Go to dashboard", group: "Navigate" },
  { id: "go-projects", label: "Go to projects", group: "Navigate" },
  { id: "go-settings", label: "Go to settings", group: "Navigate" },
  { id: "new-file", label: "New file", group: "Actions", description: "Create an empty file in this workspace" },
  { id: "open-file", label: "Open file", group: "Actions", description: "Browse and open a file from disk" },
  { id: "save", label: "Save", group: "Actions", description: "Save the active file" },
  { id: "toggle-theme", label: "Toggle theme", group: "Settings", description: "Switch between light and dark" },
  { id: "invite-teammate", label: "Invite a teammate", group: "Settings" },
];

export function CommandDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [ran, setRan] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const results = q
    ? COMMANDS.filter((c) => c.label.toLowerCase().includes(q))
    : COMMANDS;

  const grouped = {
    Navigate: results.filter((r) => r.group === "Navigate"),
    Actions: results.filter((r) => r.group === "Actions"),
    Settings: results.filter((r) => r.group === "Settings"),
  };

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

  const runCommand = (entry: CommandEntry) => {
    setRan(entry.label);
    setOpen(false);
    setQuery("");
  };

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
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {grouped.Navigate.length > 0 && (
            <CommandSection label="Navigate">
              {grouped.Navigate.map((entry) => (
                <CommandItem
                  key={entry.id}
                  value={entry.label}
                  selected={ran === entry.label}
                  onClick={() => runCommand(entry)}
                >
                  {entry.label}
                </CommandItem>
              ))}
            </CommandSection>
          )}
          {grouped.Actions.length > 0 && (
            <>
              {grouped.Navigate.length > 0 && <CommandSeparator />}
              <CommandSection label="Actions">
                {grouped.Actions.map((entry) => (
                  <CommandItem
                    key={entry.id}
                    value={entry.label}
                    description={entry.description}
                    selected={ran === entry.label}
                    onClick={() => runCommand(entry)}
                  >
                    {entry.label}
                  </CommandItem>
                ))}
              </CommandSection>
            </>
          )}
          {grouped.Settings.length > 0 && (
            <>
              {(grouped.Navigate.length > 0 || grouped.Actions.length > 0) && (
                <CommandSeparator />
              )}
              <CommandSection label="Settings">
                {grouped.Settings.map((entry) => (
                  <CommandItem
                    key={entry.id}
                    value={entry.label}
                    description={entry.description}
                    selected={ran === entry.label}
                    onClick={() => runCommand(entry)}
                  >
                    {entry.label}
                  </CommandItem>
                ))}
              </CommandSection>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
