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
  Cloud,
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
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
    </div>
  );
}
