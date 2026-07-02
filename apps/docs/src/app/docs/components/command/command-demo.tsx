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
  Kbd,
} from "@patchui/react";
import {
  Bell,
  FilePlus,
  FolderOpen,
  LayoutDashboard,
  Save,
  Settings,
  SunMoon,
  UserPlus,
} from "lucide-react";

type CommandEntry = {
  id: string;
  label: string;
  group: "Navigate" | "Actions" | "Settings";
  description?: string;
  icon: React.ReactNode;
  shortcut?: React.ReactNode;
};

const COMMANDS: CommandEntry[] = [
  { id: "go-dashboard", label: "Go to dashboard", group: "Navigate", icon: <LayoutDashboard /> },
  { id: "go-projects", label: "Go to projects", group: "Navigate", icon: <FolderOpen /> },
  { id: "go-notifications", label: "Go to notifications", group: "Navigate", icon: <Bell /> },
  { id: "new-file", label: "New file", group: "Actions", icon: <FilePlus />, shortcut: <Kbd meta>N</Kbd>, description: "Create an empty file in this workspace" },
  { id: "open-file", label: "Open file", group: "Actions", icon: <FolderOpen />, shortcut: <Kbd meta>O</Kbd>, description: "Browse and open a file from disk" },
  { id: "save", label: "Save", group: "Actions", icon: <Save />, shortcut: <Kbd meta>S</Kbd>, description: "Save the active file" },
  { id: "toggle-theme", label: "Toggle theme", group: "Settings", icon: <SunMoon />, description: "Switch between light and dark" },
  { id: "invite-teammate", label: "Invite a teammate", group: "Settings", icon: <UserPlus /> },
  { id: "open-settings", label: "Open settings", group: "Settings", icon: <Settings /> },
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
        <Kbd meta>K</Kbd>
      </Button>
      {ran && (
        <p className="text-label-12 text-gray-800">
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
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          {results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {grouped.Navigate.length > 0 && (
            <CommandSection label="Navigate">
              {grouped.Navigate.map((entry) => (
                <CommandItem
                  key={entry.id}
                  value={entry.label}
                  prefix={entry.icon}
                  suffix={entry.shortcut}
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
                    prefix={entry.icon}
                    suffix={entry.shortcut}
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
                    prefix={entry.icon}
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
