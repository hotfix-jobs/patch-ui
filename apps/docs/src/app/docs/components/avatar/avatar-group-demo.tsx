"use client";

import { AvatarGroup } from "@patchui/react";

const members = [
  { id: "ada", letter: "AL", alt: "Ada Lovelace" },
  { id: "alan", letter: "AT", alt: "Alan Turing" },
  { id: "grace", letter: "GH", alt: "Grace Hopper" },
  { id: "katherine", letter: "KJ", alt: "Katherine Johnson" },
  { id: "linus", letter: "LT", alt: "Linus Torvalds" },
];

export function AvatarGroupDemo() {
  return <AvatarGroup members={members} limit={4} size="md" />;
}
