"use client";

import { useState } from "react";
import {
  Button,
  Menu,
  MenuTrigger,
  MenuPopup,
  MenuItem,
  MenuGroup,
  MenuSection,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuDivider,
  MenuShortcut,
  MenuSub,
  MenuSubTrigger,
  MenuSubPopup,
} from "@patchui/react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Calendar,
  Clock,
  CreditCard,
  LogOut,
  Settings,
  User,
} from "lucide-react";

export function MenuDemo() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [theme, setTheme] = useState("system");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az" | "za">(
    "newest",
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Basic: plain items, no icons */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Basic
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="primary" />}>Actions</MenuTrigger>
          <MenuPopup>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
            <MenuItem href="/test">Test for Link</MenuItem>
            <MenuItem type="error">Delete</MenuItem>
          </MenuPopup>
        </Menu>
      </div>

      {/* With prefix icons and shortcuts */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Prefix icons + shortcuts
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="secondary" />}>
            My Account
          </MenuTrigger>
          <MenuPopup>
            <MenuItem prefix={<User />} suffix={<MenuShortcut>⇧⌘P</MenuShortcut>}>
              Profile
            </MenuItem>
            <MenuItem prefix={<CreditCard />} suffix={<MenuShortcut>⌘B</MenuShortcut>}>
              Billing
            </MenuItem>
            <MenuItem prefix={<Settings />} suffix={<MenuShortcut>⌘S</MenuShortcut>}>
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem prefix={<LogOut />} type="error">
              Log out
            </MenuItem>
          </MenuPopup>
        </Menu>
      </div>

      {/* Sections with titles */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Sections
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="secondary" />}>
            View Options
          </MenuTrigger>
          <MenuPopup>
            <MenuSection title="Appearance">
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
              <MenuCheckboxItem checked disabled>
                Full Width Layout
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
      </div>

      {/* Selected indicator (single-select via regular MenuItem) */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Selected indicator
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="secondary" />}>
            Sort by
          </MenuTrigger>
          <MenuPopup>
            <MenuItem
              prefix={<Clock />}
              selected={sortBy === "newest"}
              onClick={() => setSortBy("newest")}
            >
              Newest first
            </MenuItem>
            <MenuItem
              prefix={<Calendar />}
              selected={sortBy === "oldest"}
              onClick={() => setSortBy("oldest")}
            >
              Oldest first
            </MenuItem>
            <MenuItem
              prefix={<ArrowDownAZ />}
              selected={sortBy === "az"}
              onClick={() => setSortBy("az")}
            >
              A to Z
            </MenuItem>
            <MenuItem
              prefix={<ArrowUpAZ />}
              selected={sortBy === "za"}
              onClick={() => setSortBy("za")}
            >
              Z to A
            </MenuItem>
          </MenuPopup>
        </Menu>
      </div>

      {/* Nested sub-menu */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Sub-menu
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="secondary" />}>
            More
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
            <MenuDivider />
            <MenuItem type="error">Delete</MenuItem>
          </MenuPopup>
        </Menu>
      </div>
    </div>
  );
}
