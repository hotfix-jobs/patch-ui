"use client";

import { Slider, SliderValue } from "@patchui/react";
import { useState } from "react";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function SliderDemo() {
  const [range, setRange] = useState<number[]>([50, 75]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label>Single value</Label>
        <div className="max-w-md">
          <Slider defaultValue={40} />
        </div>
      </div>

      <div>
        <Label>With value display</Label>
        <div className="max-w-md">
          <Slider defaultValue={60}>
            <SliderValue />
          </Slider>
        </div>
      </div>

      <div>
        <Label>Range (two thumbs)</Label>
        <div className="max-w-md">
          <Slider defaultValue={[20, 80]}>
            <SliderValue />
          </Slider>
        </div>
      </div>

      <div>
        <Label>Range with numeric inputs</Label>
        <div className="max-w-md">
          <Slider
            value={range}
            onValueChange={(v) => setRange(Array.isArray(v) ? v : [v as number])}
            showStartInput
            showEndInput
          />
        </div>
      </div>

      <div>
        <Label>Custom step</Label>
        <div className="max-w-md">
          <Slider defaultValue={50} step={10} min={0} max={100}>
            <SliderValue />
          </Slider>
        </div>
      </div>

      <div>
        <Label>Disabled</Label>
        <div className="max-w-md">
          <Slider defaultValue={30} disabled />
        </div>
      </div>
    </div>
  );
}
