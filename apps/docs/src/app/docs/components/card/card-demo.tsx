"use client";

import { Card , SectionLabel } from "@patchui/react";


export function CardDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Surface (default)</SectionLabel>
        <Card className="p-4 max-w-sm">
          <p className="text-small text-ink">
            A clear content surface without decorative border chrome.
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Outlined</SectionLabel>
        <Card variant="outlined" className="p-4 max-w-sm">
          <p className="text-small text-ink">
            An explicit boundary for dense or administrative layouts.
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Elevated</SectionLabel>
        <Card variant="elevated" className="p-4 max-w-sm">
          <p className="text-small text-ink">
            Uses the same surface with a quiet shadow when the object needs
            additional separation.
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Interactive</SectionLabel>
        <Card interactive className="p-4 max-w-sm">
          <p className="text-small text-ink">
            Hover to see the surface lift without adding a border.
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Selected (multi-pick highlight)</SectionLabel>
        <Card selected className="p-4 max-w-sm">
          <p className="text-small text-ink">Selected plan: grouped surface fill.</p>
        </Card>
      </div>
    </div>
  );
}
