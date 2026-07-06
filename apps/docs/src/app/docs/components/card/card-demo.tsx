"use client";

import { Card , SectionLabel } from "@patchui/react";


export function CardDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Default (border on)</SectionLabel>
        <Card className="p-4 max-w-sm">
          <p className="text-body-14 text-ink">A simple bordered card.</p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Bare (border={"{false}"})</SectionLabel>
        <Card border={false} className="p-4 max-w-sm">
          <p className="text-body-14 text-ink">Subtle bg only, no border.</p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Hoverable</SectionLabel>
        <Card hoverable className="p-4 max-w-sm">
          <p className="text-body-14 text-ink">Hover to see the bg and border shift.</p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>With shadow</SectionLabel>
        <Card shadow className="p-4 max-w-sm">
          <p className="text-body-14 text-ink">Elevated with shadow-card.</p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Secondary surface</SectionLabel>
        <Card secondary className="p-4 max-w-sm">
          <p className="text-body-14 text-ink">
            Nested surface: gray-100 fill instead of background-200.
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Border between children (list container)</SectionLabel>
        <Card borderBetween className="max-w-sm">
          <div className="p-4"><p className="text-body-14 text-ink">Option 1</p></div>
          <div className="p-4"><p className="text-body-14 text-ink">Option 2</p></div>
          <div className="p-4"><p className="text-body-14 text-ink">Option 3</p></div>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Row direction with dividers</SectionLabel>
        <Card borderBetween direction="row" className="max-w-md">
          <div className="p-4 flex-1"><p className="text-body-14 text-ink">Left</p></div>
          <div className="p-4 flex-1"><p className="text-body-14 text-ink">Middle</p></div>
          <div className="p-4 flex-1"><p className="text-body-14 text-ink">Right</p></div>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Selected (multi-pick highlight)</SectionLabel>
        <Card selected className="p-4 max-w-sm">
          <p className="text-body-14 text-ink">Selected plan: border stands out.</p>
        </Card>
      </div>
    </div>
  );
}
