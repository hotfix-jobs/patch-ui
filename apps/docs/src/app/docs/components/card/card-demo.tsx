"use client";

import { Card } from "@patchui/react";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function CardDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <Label>Bare (subtle bg only)</Label>
        <Card className="p-4 max-w-sm">
          <p className="text-copy-14 text-gray-900">A simple card with just a subtle bg.</p>
        </Card>
      </div>

      <div>
        <Label>Bordered</Label>
        <Card border className="p-4 max-w-sm">
          <p className="text-copy-14 text-gray-900">Bordered surface.</p>
        </Card>
      </div>

      <div>
        <Label>Hoverable + border</Label>
        <Card border hoverable className="p-4 max-w-sm">
          <p className="text-copy-14 text-gray-900">Hover to see the bg and border shift.</p>
        </Card>
      </div>

      <div>
        <Label>Shadow</Label>
        <Card border shadow className="p-4 max-w-sm">
          <p className="text-copy-14 text-gray-900">Elevated with shadow-card.</p>
        </Card>
      </div>

      <div>
        <Label>Secondary surface</Label>
        <Card secondary className="p-4 max-w-sm">
          <p className="text-copy-14 text-gray-900">
            Nested surface — gray-100 fill instead of background-100.
          </p>
        </Card>
      </div>

      <div>
        <Label>Border between children (list container)</Label>
        <Card border borderBetween className="max-w-sm">
          <div className="p-4"><p className="text-copy-14 text-gray-900">Option 1</p></div>
          <div className="p-4"><p className="text-copy-14 text-gray-900">Option 2</p></div>
          <div className="p-4"><p className="text-copy-14 text-gray-900">Option 3</p></div>
        </Card>
      </div>

      <div>
        <Label>Row direction with dividers</Label>
        <Card border borderBetween direction="row" className="max-w-md">
          <div className="p-4 flex-1"><p className="text-copy-14 text-gray-900">Left</p></div>
          <div className="p-4 flex-1"><p className="text-copy-14 text-gray-900">Middle</p></div>
          <div className="p-4 flex-1"><p className="text-copy-14 text-gray-900">Right</p></div>
        </Card>
      </div>

      <div>
        <Label>Selected (multi-pick highlight)</Label>
        <Card border selected className="p-4 max-w-sm">
          <p className="text-copy-14 text-gray-1000">Selected plan — border stands out.</p>
        </Card>
      </div>
    </div>
  );
}
