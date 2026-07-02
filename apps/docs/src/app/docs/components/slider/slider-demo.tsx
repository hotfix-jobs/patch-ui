"use client";

import { Slider, SliderValue } from "@patchui/react";

/** Showcases Slider with single value, range, SliderValue display, and disabled state. */
export function SliderDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Single Value */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Single Value
        </p>
        <div className="max-w-xs">
          <Slider defaultValue={40} />
        </div>
      </div>

      {/* With Value Display */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          With Value Display
        </p>
        <div className="max-w-xs">
          <Slider defaultValue={60}>
            <SliderValue />
          </Slider>
        </div>
      </div>

      {/* Range (Two Thumbs) */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Range
        </p>
        <div className="max-w-xs">
          <Slider defaultValue={[20, 80]}>
            <SliderValue />
          </Slider>
        </div>
      </div>

      {/* Custom Step */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Custom Step
        </p>
        <div className="max-w-xs">
          <Slider defaultValue={50} step={10} min={0} max={100}>
            <SliderValue />
          </Slider>
        </div>
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          Disabled
        </p>
        <div className="max-w-xs">
          <Slider defaultValue={30} disabled />
        </div>
      </div>
    </div>
  );
}
