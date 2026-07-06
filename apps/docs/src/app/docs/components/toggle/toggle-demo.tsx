"use client";
import { useState } from "react";
import { SectionLabel, Toggle } from "@patchui/react";
import { PushPin, Star, TextB, TextItalic, TextUnderline } from "@phosphor-icons/react/dist/ssr";
export function ToggleDemo() {
  const [starred, setStarred] = useState(false);
  const [pinned, setPinned] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <Stack label="Icon-only press-to-toggle (circle)">
        <Toggle
          shape="circle"
          pressed={starred}
          onPressedChange={setStarred}
          aria-label="Star"
        >
          <Star className={starred ? "fill-current" : ""} />
        </Toggle>
        <Toggle
          shape="circle"
          pressed={pinned}
          onPressedChange={setPinned}
          aria-label="Pin"
        >
          <PushPin className={pinned ? "fill-current" : ""} />
        </Toggle>
      </Stack>

      <Stack label="Secondary variant (bordered)">
        <Toggle variant="secondary" defaultPressed aria-label="Bold">
          <TextB />
        </Toggle>
        <Toggle variant="secondary" aria-label="Italic">
          <TextItalic />
        </Toggle>
        <Toggle variant="secondary" aria-label="Underline">
          <TextUnderline />
        </Toggle>
      </Stack>

      <Stack label="With text">
        <Toggle defaultPressed>Public</Toggle>
        <Toggle>Private</Toggle>
        <Toggle variant="secondary">Beta</Toggle>
      </Stack>

      <Stack label="Shapes">
        <Toggle defaultPressed shape="square" aria-label="Square shape">
          <TextB />
        </Toggle>
        <Toggle defaultPressed shape="pill">Pill</Toggle>
        <Toggle defaultPressed shape="circle" aria-label="Circle shape">
          <Star />
        </Toggle>
      </Stack>

      <Stack label="Sizes">
        <Toggle defaultPressed size="sm" aria-label="sm">
          <TextB />
        </Toggle>
        <Toggle defaultPressed size="md" aria-label="md">
          <TextB />
        </Toggle>
        <Toggle defaultPressed size="lg" aria-label="lg">
          <TextB />
        </Toggle>
      </Stack>
    </div>
  );
}

function Stack({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
