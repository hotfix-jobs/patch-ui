"use client";

import { useState } from "react";
import { Slider } from "@patchui/react";

export function SliderRangeDemo() {
  const [range, setRange] = useState<number[]>([25, 75]);

  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <span className="text-small font-medium text-ink">Price range</span>
      <Slider
        value={range}
        onValueChange={(value) =>
          setRange(Array.isArray(value) ? [...value] : [value as number])
        }
        ariaLabel={["Minimum price", "Maximum price"]}
        showStartInput
        showEndInput
        step={5}
      />
    </div>
  );
}
