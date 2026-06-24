"use client";

import { useState } from "react";
import {
  Button,
  Menu,
  MenuTrigger,
  MenuPopup,
  MenuItem,
  MenuGroup,
  MenuGroupLabel,
  MenuSection,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubTrigger,
  MenuSubPopup,
} from "@patchui/react";
import {
  Archive,
  ArrowDownAZ,
  ArrowUpAZ,
  Calendar,
  Clock,
  Cloud,
  Command,
  CreditCard,
  FileText,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

/** Showcases Menu with items, groups, checkboxes, radios, shortcuts, and sub-menus. */
export function MenuDemo() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [theme, setTheme] = useState("system");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az" | "za">(
    "newest",
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Basic Menu */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Basic
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="secondary" />}>
            Open Menu
          </MenuTrigger>
          <MenuPopup>
            <MenuGroup>
              <MenuGroupLabel>My Account</MenuGroupLabel>
              <MenuItem>
                <User className="size-4" />
                Profile
                <MenuShortcut>⇧⌘P</MenuShortcut>
              </MenuItem>
              <MenuItem>
                <CreditCard className="size-4" />
                Billing
                <MenuShortcut>⌘B</MenuShortcut>
              </MenuItem>
              <MenuItem>
                <Settings className="size-4" />
                Settings
                <MenuShortcut>⌘S</MenuShortcut>
              </MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuGroup>
              <MenuItem>
                <Users className="size-4" />
                Team
              </MenuItem>
              <MenuSub>
                <MenuSubTrigger>
                  <UserPlus className="size-4" />
                  Invite Users
                </MenuSubTrigger>
                <MenuSubPopup>
                  <MenuItem>
                    <Mail className="size-4" />
                    Email
                  </MenuItem>
                  <MenuItem>
                    <MessageSquare className="size-4" />
                    Message
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem>
                    <Plus className="size-4" />
                    More...
                  </MenuItem>
                </MenuSubPopup>
              </MenuSub>
            </MenuGroup>
            <MenuSeparator />
            <MenuItem>
              <Cloud className="size-4" />
              API
            </MenuItem>
            <MenuSeparator />
            <MenuItem variant="destructive">
              <LogOut className="size-4" />
              Log out
              <MenuShortcut>⇧⌘Q</MenuShortcut>
            </MenuItem>
          </MenuPopup>
        </Menu>
      </div>

      {/* Checkbox Items */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Checkbox Items
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="secondary" />}>
            View Options
          </MenuTrigger>
          <MenuPopup>
            <MenuGroup>
              <MenuGroupLabel>Appearance</MenuGroupLabel>
              <MenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Status Bar
              </MenuCheckboxItem>
              <MenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Activity Panel
              </MenuCheckboxItem>
              <MenuSeparator />
              <MenuCheckboxItem checked disabled>
                Full Width Layout
              </MenuCheckboxItem>
            </MenuGroup>
          </MenuPopup>
        </Menu>
      </div>

      {/* Radio Items */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Radio Items
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="secondary" />}>
            Theme: {theme}
          </MenuTrigger>
          <MenuPopup>
            <MenuGroup>
              <MenuGroupLabel>Theme</MenuGroupLabel>
              <MenuRadioGroup value={theme} onValueChange={setTheme}>
                <MenuRadioItem value="light">Light</MenuRadioItem>
                <MenuRadioItem value="dark">Dark</MenuRadioItem>
                <MenuRadioItem value="system">System</MenuRadioItem>
              </MenuRadioGroup>
            </MenuGroup>
          </MenuPopup>
        </Menu>
      </div>

      {/* Selected indicator (single-select via regular MenuItem) */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Selected indicator
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>
            Sort by
          </MenuTrigger>
          <MenuPopup>
            <MenuItem
              selected={sortBy === "newest"}
              onClick={() => setSortBy("newest")}
            >
              <Clock className="size-4" />
              Newest first
            </MenuItem>
            <MenuItem
              selected={sortBy === "oldest"}
              onClick={() => setSortBy("oldest")}
            >
              <Calendar className="size-4" />
              Oldest first
            </MenuItem>
            <MenuItem
              selected={sortBy === "az"}
              onClick={() => setSortBy("az")}
            >
              <ArrowDownAZ className="size-4" />
              A to Z
            </MenuItem>
            <MenuItem
              selected={sortBy === "za"}
              onClick={() => setSortBy("za")}
            >
              <ArrowUpAZ className="size-4" />
              Z to A
            </MenuItem>
          </MenuPopup>
        </Menu>
      </div>

      {/* Two-line items with description */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Two-line items
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>
            Quick actions
          </MenuTrigger>
          <MenuPopup className="min-w-72">
            <MenuItem description="Open a file from disk">
              <FileText className="size-4" />
              New file
            </MenuItem>
            <MenuItem description="Search across the workspace">
              <Search className="size-4" />
              Search
              <MenuShortcut>⌘K</MenuShortcut>
            </MenuItem>
            <MenuItem description="Run a command from the palette">
              <Command className="size-4" />
              Command palette
              <MenuShortcut>⇧⌘P</MenuShortcut>
            </MenuItem>
            <MenuSeparator />
            <MenuItem
              variant="destructive"
              description="Move this conversation to archive"
            >
              <Archive className="size-4" />
              Archive
            </MenuItem>
          </MenuPopup>
        </Menu>
      </div>

      {/* Sections (sugar for MenuGroup + MenuGroupLabel) */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Sections
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>
            Workspace
          </MenuTrigger>
          <MenuPopup>
            <MenuSection label="Account">
              <MenuItem>
                <User className="size-4" />
                Profile
              </MenuItem>
              <MenuItem>
                <Settings className="size-4" />
                Settings
              </MenuItem>
            </MenuSection>
            <MenuSeparator />
            <MenuSection label="Team">
              <MenuItem>
                <Users className="size-4" />
                Members
              </MenuItem>
              <MenuItem>
                <UserPlus className="size-4" />
                Invite
              </MenuItem>
            </MenuSection>
          </MenuPopup>
        </Menu>
      </div>

      {/* Density */}
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Density
        </p>
        <div className="flex gap-3">
          <Menu>
            <MenuTrigger render={<Button variant="outline" />}>
              Compact
            </MenuTrigger>
            <MenuPopup density="compact">
              <MenuItem>
                <User className="size-4" />
                Profile
              </MenuItem>
              <MenuItem>
                <CreditCard className="size-4" />
                Billing
              </MenuItem>
              <MenuItem>
                <Settings className="size-4" />
                Settings
              </MenuItem>
            </MenuPopup>
          </Menu>
          <Menu>
            <MenuTrigger render={<Button variant="outline" />}>
              Comfortable
            </MenuTrigger>
            <MenuPopup density="comfortable">
              <MenuItem>
                <User className="size-4" />
                Profile
              </MenuItem>
              <MenuItem>
                <CreditCard className="size-4" />
                Billing
              </MenuItem>
              <MenuItem>
                <Settings className="size-4" />
                Settings
              </MenuItem>
            </MenuPopup>
          </Menu>
        </div>
      </div>
    </div>
  );
}
