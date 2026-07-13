"use client";

import { Avatar } from "@patchui/react";

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar letter="AL" size="lg" />
      <Avatar letter="AT" size="lg" />
      <Avatar letter="GH" size="lg" />
    </div>
  );
}
