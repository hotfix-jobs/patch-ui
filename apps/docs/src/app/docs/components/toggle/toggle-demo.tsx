"use client";

import { useState } from "react";
import { Toggle } from "@patchui/react";
import { Star } from "@phosphor-icons/react/dist/ssr";

export function ToggleDemo() {
  const [starred, setStarred] = useState(false);

  return (
    <Toggle
      pressed={starred}
      onPressedChange={setStarred}
      aria-label="Star project"
    >
      <Star className={starred ? "fill-current" : ""} />
      Star
    </Toggle>
  );
}
