"use client";

import { Card , SectionLabel } from "@patchui/react";


export function CardDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Flat (default)</SectionLabel>
        <Card className="p-4 max-w-sm">
          <p className="text-small text-ink">
            Transparent frame with a hairline border. Quiet default for
            search/list/content surfaces.
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Elevated</SectionLabel>
        <Card variant="elevated" className="p-4 max-w-sm">
          <p className="text-small text-ink">
            Fills with <code>bg-layer-1</code>, soft edge, and a light lift
            shadow (light only). Opt-in for auth cards, marketing lifts, or any
            surface that should read as a distinct object.
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Hoverable</SectionLabel>
        <Card hoverable className="p-4 max-w-sm">
          <p className="text-small text-ink">
            Hover to see the border emphasis (quiet — no bg shift).
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Border between children (list container)</SectionLabel>
        <Card borderBetween className="max-w-sm">
          <div className="p-4"><p className="text-small text-ink">Option 1</p></div>
          <div className="p-4"><p className="text-small text-ink">Option 2</p></div>
          <div className="p-4"><p className="text-small text-ink">Option 3</p></div>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Row direction with dividers</SectionLabel>
        <Card borderBetween direction="row" className="max-w-md">
          <div className="p-4 flex-1"><p className="text-small text-ink">Left</p></div>
          <div className="p-4 flex-1"><p className="text-small text-ink">Middle</p></div>
          <div className="p-4 flex-1"><p className="text-small text-ink">Right</p></div>
        </Card>
      </div>

      <div className="space-y-3">
        <SectionLabel>Selected (multi-pick highlight)</SectionLabel>
        <Card selected className="p-4 max-w-sm">
          <p className="text-small text-ink">Selected plan: border stands out.</p>
        </Card>
      </div>
    </div>
  );
}
