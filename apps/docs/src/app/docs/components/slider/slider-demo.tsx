"use client";

import { Slider, SliderValue , SectionLabel } from "@patchui/react";
import { useState } from "react";


export function SliderDemo() {
  const [range, setRange] = useState<number[]>([50, 75]);

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Single value</SectionLabel>
        <div className="max-w-md">
          <Slider defaultValue={40} />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>With value display</SectionLabel>
        <div className="max-w-md">
          <Slider defaultValue={60}>
            <SliderValue />
          </Slider>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Range (two thumbs)</SectionLabel>
        <div className="max-w-md">
          <Slider defaultValue={[20, 80]}>
            <SliderValue />
          </Slider>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Range with numeric inputs</SectionLabel>
        <div className="max-w-md">
          <Slider
            value={range}
            onValueChange={(v) => setRange(Array.isArray(v) ? v : [v as number])}
            showStartInput
            showEndInput
          />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Custom step</SectionLabel>
        <div className="max-w-md">
          <Slider defaultValue={50} step={10} min={0} max={100}>
            <SliderValue />
          </Slider>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Disabled</SectionLabel>
        <div className="max-w-md">
          <Slider defaultValue={30} disabled />
        </div>
      </div>
    </div>
  );
}
