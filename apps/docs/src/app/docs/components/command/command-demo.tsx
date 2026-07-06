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
  Monitor,
  Moon,
  Save,
  Settings,
  Sun,
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
  { id: "invite-teammate", label: "Invite a teammate", group: "Settings", icon: <UserPlus /> },
  { id: "open-settings", label: "Open settings", group: "Settings", icon: <Settings /> },
];

const THEMES = [
  { value: "light", label: "Light", icon: <Sun /> },
  { value: "dark", label: "Dark", icon: <Moon /> },
  { value: "system", label: "System", icon: <Monitor /> },
] as const;

type ThemeValue = (typeof THEMES)[number]["value"];

export function CommandDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [ran, setRan] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeValue>("system");

  const q = query.trim().toLowerCase();
  const results = q
    ? COMMANDS.filter((c) => c.label.toLowerCase().includes(q))
    : COMMANDS;

  const themeMatches = q
    ? THEMES.filter((t) => t.label.toLowerCase().includes(q))
    : THEMES;

  const grouped = {
    Navigate: results.filter((r) => r.group === "Navigate"),
    Actions: results.filter((r) => r.group === "Actions"),
    Settings: results.filter((r) => r.group === "Settings"),
  };

  const totalCount = results.length + themeMatches.length;

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

  const pickTheme = (value: ThemeValue) => {
    setTheme(value);
    setRan(`Theme → ${THEMES.find((t) => t.value === value)?.label}`);
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
        <p className="text-caption-12 text-ink-muted">Ran: {ran}</p>
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
          {totalCount === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {grouped.Navigate.length > 0 && (
            <CommandSection title="Navigate">
              {grouped.Navigate.map((entry) => (
                <CommandItem
                  key={entry.id}
                  value={entry.label}
                  prefix={entry.icon}
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
              <CommandSection title="Actions">
                {grouped.Actions.map((entry) => (
                  <CommandItem
                    key={entry.id}
                    value={entry.label}
                    prefix={entry.icon}
                    suffix={entry.shortcut}
                    description={entry.description}
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
              <CommandSection title="Settings">
                {grouped.Settings.map((entry) => (
                  <CommandItem
                    key={entry.id}
                    value={entry.label}
                    prefix={entry.icon}
                    description={entry.description}
                    onClick={() => runCommand(entry)}
                  >
                    {entry.label}
                  </CommandItem>
                ))}
              </CommandSection>
            </>
          )}

          {themeMatches.length > 0 && (
            <>
              {results.length > 0 && <CommandSeparator />}
              <CommandSection title="Theme">
                {themeMatches.map((t) => (
                  <CommandItem
                    key={t.value}
                    value={`Theme ${t.label}`}
                    prefix={t.icon}
                    selected={theme === t.value}
                    onClick={() => pickTheme(t.value)}
                  >
                    {t.label}
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
