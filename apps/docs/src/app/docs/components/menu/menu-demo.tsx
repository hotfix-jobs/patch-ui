"use client";

import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@patchui/react";
import { Copy, PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";

export function MenuDemo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        Actions
      </MenuTrigger>
      <MenuPopup>
        <MenuItem prefix={<Copy />}>Duplicate</MenuItem>
        <MenuItem prefix={<PencilSimple />}>Rename</MenuItem>
        <MenuDivider />
        <MenuItem type="error" prefix={<Trash />}>
          Delete
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
