"use client";

import { useState } from "react";
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuDivider,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSection,
  MenuTrigger,
} from "@patchui/react";

export function MenuSelectionDemo() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [theme, setTheme] = useState("system");

  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        View Options
      </MenuTrigger>
      <MenuPopup>
        <MenuSection title="Layout">
          <MenuCheckboxItem
            checked={showSidebar}
            onCheckedChange={setShowSidebar}
          >
            Show Sidebar
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
  );
}
