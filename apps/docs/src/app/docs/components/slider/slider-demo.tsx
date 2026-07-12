"use client";

import { useState } from "react";
import { Slider, SliderValue } from "@patchui/react";

export function SliderDemo() {
  const [volume, setVolume] = useState(60);

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <span className="text-small font-medium text-ink">Volume</span>
      <Slider
        value={volume}
        onValueChange={(value) => setVolume(value as number)}
        ariaLabel="Volume"
      >
        <SliderValue />
      </Slider>
    </div>
  );
}
