"use client";

import {
  Button,
  Menu,
  MenuItem,
  MenuPopup,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from "@patchui/react";

export function MenuSubmenuDemo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        Organize
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
      </MenuPopup>
    </Menu>
  );
}
