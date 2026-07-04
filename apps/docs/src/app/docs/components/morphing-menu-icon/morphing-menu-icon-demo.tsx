"use client";

import { useState } from "react";
import { Button, MorphingMenuIcon, SectionLabel } from "@patchui/react";

export function MorphingMenuIconDemo() {
  const [open, setOpen] = useState(false);
  const [openSm, setOpenSm] = useState(false);
  const [openLg, setOpenLg] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Inside a Button (typical usage)</SectionLabel>
        <div className="flex items-center gap-3">
          <Button
            variant="tertiary"
            size="sm"
            shape="circle"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            icon={<MorphingMenuIcon open={open} />}
          />
          <span className="text-copy-14 text-gray-800">
            State: {open ? "open" : "closed"}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Standalone (any icon slot)</SectionLabel>
        <div className="flex items-center gap-4 text-gray-1000">
          <button
            type="button"
            aria-label={openSm ? "Close menu" : "Open menu"}
            onClick={() => setOpenSm((v) => !v)}
            className="inline-flex size-8 items-center justify-center rounded-full border border-gray-alpha-400 text-gray-1000 hover:bg-gray-alpha-100"
          >
            <MorphingMenuIcon open={openSm} />
          </button>
          <button
            type="button"
            aria-label={openLg ? "Close menu" : "Open menu"}
            onClick={() => setOpenLg((v) => !v)}
            className="inline-flex size-12 items-center justify-center rounded-full border border-gray-alpha-400 text-gray-1000 hover:bg-gray-alpha-100"
          >
            <MorphingMenuIcon
              open={openLg}
              className="h-[24px] w-[24px] [&>span]:!w-[22px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
