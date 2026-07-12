# Slider

A continuous or stepped control for choosing one numeric value or a bounded range.

Use Slider when relative position matters more than exact entry, such as volume, opacity, or a price range. Use Input when precision is the primary task.

```tsx
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

```

## Installation

```bash
npx shadcn add @patchui/slider
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/slider.json). The canonical implementation lives in [packages/react/src/components/slider.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/slider.tsx).

## Usage

```tsx
<div className="flex flex-col gap-2">
  <span className="text-small font-medium text-ink">Volume</span>
  <Slider defaultValue={60} ariaLabel="Volume">
    <SliderValue />
  </Slider>
</div>
```

Render SliderValue or nearby text so the current value is visible. Set bounds and step to real product constraints rather than arbitrary percentages.

## Examples

### Range with numeric inputs

An array creates one thumb per value. Numeric start and end inputs provide precise entry alongside the range track.

```tsx
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

```

## API reference

| Prop                          | Type                                           | Default       | Description                                                   |
| ----------------------------- | ---------------------------------------------- | ------------- | ------------------------------------------------------------- |
| value / onValueChange         | number \| number\[] / (value, details) => void | -             | Controls one value or an array of range values.               |
| defaultValue                  | number \| number\[]                            | min           | Sets the initial uncontrolled value and number of thumbs.     |
| min / max                     | number / number                                | 0 / 100       | Sets the allowed numeric bounds.                              |
| step                          | number                                         | 1             | Sets the increment used by pointer and keyboard interaction.  |
| onValueCommitted              | (value, details) => void                       | -             | Runs when a drag or keyboard change is committed.             |
| showStartInput / showEndInput | boolean / boolean                              | false / false | Adds precise numeric inputs for a two-value range.            |
| ariaLabel                     | string \| string\[]                            | -             | Names one thumb or each range thumb for assistive technology. |

SliderValue is an optional child that formats and displays the current value. The underlying Base UI Slider props remain available for advanced formatting, form integration, and thumb collision behavior.

## Accessibility

* Provide `ariaLabel` for one thumb or an ordered label array for every range thumb.
* Keep a visible label and value near the track; accessible names do not replace visible context.
* Arrow keys change by `step`. Page Up and Page Down make larger changes, while Home and End move to the bounds.
* Use `onValueChange` for live preview and `onValueCommitted` for expensive persistence.
* Pair range sliders with numeric inputs when exact values matter.
