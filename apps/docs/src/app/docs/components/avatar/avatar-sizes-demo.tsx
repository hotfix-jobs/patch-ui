"use client";

import { Avatar } from "@patchui/react";

export function AvatarSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar letter="AL" placeholder size="xs" />
      <Avatar letter="AT" placeholder size="sm" />
      <Avatar letter="GH" placeholder size="md" />
      <Avatar letter="KJ" placeholder size="lg" />
      <Avatar letter="LT" placeholder size="xl" />
      <Avatar letter="AL" placeholder shape="square" size="lg" />
    </div>
  );
}
