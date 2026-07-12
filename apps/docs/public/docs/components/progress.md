# Progress

A determinate or indeterminate bar that communicates the status of ongoing work.

Use Progress when the work has a meaningful duration or measurable total. Use Spinner for short waits where a bar would imply unavailable precision.

```tsx
"use client";

import { Progress } from "@patchui/react";

export function ProgressDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-small font-medium text-ink">Uploading files</span>
        <span className="text-mini tabular-nums text-ink-muted">12 of 20</span>
      </div>
      <Progress value={12} max={20} label="Uploading files" />
    </div>
  );
}

```

## Installation

```bash
npx shadcn add @patchui/progress
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/progress.json). The canonical implementation lives in [packages/react/src/components/progress.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/progress.tsx).

## Usage

```tsx
<div className="flex flex-col gap-2">
  <div className="flex justify-between text-small">
    <span>Uploading files</span>
    <span>12 of 20</span>
  </div>
  <Progress value={12} max={20} label="Uploading files" />
</div>
```

Pass the real total through `max`, and pair the visual bar with text that names the work and its current units.

## Examples

### Status and indeterminate progress

Semantic variants communicate outcomes or risk. Pass `value={null}` only when the total cannot be measured.

```tsx
"use client";

import { Progress } from "@patchui/react";

export function ProgressStatesDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-small text-ink">Sync complete</span>
        <Progress value={100} variant="success" size="sm" label="Sync complete" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-small text-ink">Approaching storage limit</span>
        <Progress value={82} variant="warning" size="sm" label="Storage used" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-small text-ink">Preparing export</span>
        <Progress value={null} size="sm" label="Preparing export" />
      </div>
    </div>
  );
}

```

## API reference

| Prop    | Type                                           | Default    | Description                                                |
| ------- | ---------------------------------------------- | ---------- | ---------------------------------------------------------- |
| value   | number \| null                                 | 0          | Sets current progress, or null for indeterminate progress. |
| max     | number                                         | 100        | Sets the upper bound used to calculate completion.         |
| variant | "default" \| "success" \| "warning" \| "error" | "default"  | Selects the semantic fill color.                           |
| size    | "sm" \| "md" \| "lg"                           | "md"       | Sets a 4, 6, or 10 pixel track height.                     |
| label   | string                                         | "Progress" | Provides the progress bar’s accessible name.               |

Use numeric `height` and numeric or CSS-length `width` only when Progress must align to fixed external geometry. These values override the size preset or default full width.

## Accessibility

* Provide a specific `label`, such as `Uploading files`, rather than relying on the default.
* Keep visible text near the bar so everyone can identify the task and current units.
* Use the real `value` and `max`; Base UI exposes the resulting progress semantics to assistive technology.
* Throttle rapid updates so screen readers are not flooded with changing values.
* Indeterminate animation stops under reduced-motion preferences.
