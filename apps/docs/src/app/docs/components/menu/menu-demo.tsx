"use client";

import { useState } from "react";
import {
  Button,
  Menu,
  MenuTrigger,
  MenuPopup,
  MenuItem,
  MenuSection,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuDivider,
  MenuSub,
  MenuSubTrigger,
  MenuSubPopup,
} from "@patchui/react";
import { Calendar, Clock, CreditCard, Gear, SignOut, SortAscending, SortDescending, User } from "@phosphor-icons/react/dist/ssr";
export function MenuDemo() {
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [showFullWidth, setShowFullWidth] = useState(false);
  const [theme, setTheme] = useState("system");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az" | "za">(
    "newest",
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-xs font-medium text-ink-muted">
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

      <div>
        <p className="mb-3 text-xs font-medium text-ink-muted">
          Prefix icons
        </p>
        <Menu>
          <MenuTrigger render={<Button variant="secondary" />}>
            My Account
          </MenuTrigger>
          <MenuPopup>
            <MenuItem prefix={<User />}>Profile</MenuItem>
            <MenuItem prefix={<CreditCard />}>Billing</MenuItem>
            <MenuItem prefix={<Gear />}>Gear</MenuItem>
            <MenuDivider />
            <MenuItem prefix={<SignOut />} type="error">
              Log out
            </MenuItem>
          </MenuPopup>
        </Menu>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-ink-muted">
          Sections
        </p>
        <Menu autoFocusFirst>
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
              <MenuCheckboxItem
                checked={showFullWidth}
                onCheckedChange={setShowFullWidth}
              >
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

      <div>
        <p className="mb-3 text-xs font-medium text-ink-muted">
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
              prefix={<SortAscending />}
              selected={sortBy === "az"}
              onClick={() => setSortBy("az")}
            >
              A to Z
            </MenuItem>
            <MenuItem
              prefix={<SortDescending />}
              selected={sortBy === "za"}
              onClick={() => setSortBy("za")}
            >
              Z to A
            </MenuItem>
          </MenuPopup>
        </Menu>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-ink-muted">
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
