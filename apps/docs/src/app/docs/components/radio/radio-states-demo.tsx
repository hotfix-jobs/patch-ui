"use client";

import { Radio, RadioGroup } from "@patchui/react";

export function RadioStatesDemo() {
  return (
    <div className="flex flex-col gap-3">
      <p id="radio-region-label" className="text-small font-medium text-ink">
        Data region
      </p>
      <RadioGroup aria-labelledby="radio-region-label" defaultValue="central">
        <Radio value="east">East</Radio>
        <Radio value="central">Central</Radio>
        <Radio value="west" disabled>
          West, unavailable
        </Radio>
      </RadioGroup>
    </div>
  );
}
