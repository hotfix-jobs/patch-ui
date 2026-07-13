# Calendar

A month grid for selecting one date, a date range, or multiple dates.

Use Calendar when date selection benefits from visible month context. Compose it inside a Popover, Modal, or Sheet when the calendar should open from another control.

```tsx
"use client";

import { Calendar } from "@patchui/react";

const selectedDate = new Date(2026, 6, 15);

export function CalendarDemo() {
  return (
    <Calendar
      mode="single"
      defaultMonth={selectedDate}
      defaultValue={selectedDate}
    />
  );
}

```

## Installation

```bash
npx shadcn add @patchui/calendar
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/calendar.json). The canonical implementation lives in [packages/react/src/components/calendar.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/components/calendar.tsx).

## Usage

```tsx
const [date, setDate] = useState<Date | null>(null);

<Calendar mode="single" value={date} onValueChange={setDate} />
```

The value type follows `mode`: `Date | null` for single, `DateRange` for range, and `Date[]` for multiple selection.

## Examples

### Range and multiple selection

Range selection builds an inclusive start and end. Multiple selection independently toggles each chosen date.

```tsx
"use client";

import { Calendar } from "@patchui/react";

const july = new Date(2026, 6, 1);

export function CalendarModesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <Calendar
        mode="range"
        defaultMonth={july}
        defaultValue={{
          from: new Date(2026, 6, 13),
          to: new Date(2026, 6, 17),
        }}
      />
      <Calendar
        mode="multiple"
        defaultMonth={july}
        defaultValue={[
          new Date(2026, 6, 7),
          new Date(2026, 6, 14),
          new Date(2026, 6, 21),
        ]}
      />
    </div>
  );
}

```

### Date constraints

Combine minimum, maximum, and predicate constraints. Disabled dates remain visible but cannot be selected.

```tsx
"use client";

import { Calendar } from "@patchui/react";

export function CalendarConstraintsDemo() {
  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 6, 1)}
      fromDate={new Date(2026, 6, 6)}
      toDate={new Date(2026, 6, 24)}
      disabledDates={(date) => date.getDay() === 0 || date.getDay() === 6}
    />
  );
}

```

## API reference

| Prop                  | Type                                                   | Default  | Description                                                    |
| --------------------- | ------------------------------------------------------ | -------- | -------------------------------------------------------------- |
| mode                  | "single" \| "range" \| "multiple"                      | "single" | Selects the value contract and selection behavior.             |
| value / onValueChange | Date \| null \| DateRange \| Date\[] / (value) => void | -        | Controls selection using the value shape associated with mode. |
| defaultValue          | Date \| null \| DateRange \| Date\[]                   | -        | Sets initial selection when state is uncontrolled.             |
| weekStartsOn          | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6                        | 0        | Sets the first weekday, where 0 is Sunday and 1 is Monday.     |
| fromDate / toDate     | Date / Date                                            | -        | Sets inclusive minimum and maximum selectable dates.           |
| disabledDates         | (date: Date) => boolean                                | -        | Disables dates for which the predicate returns true.           |

Use `defaultMonth` when the initially visible month should differ from the selected value. The native `disabled` prop disables the complete calendar.

## Selection behavior

* In range mode, the first selection sets `from`. The second sets `to`, or swaps the endpoints when it precedes `from`.
* Selecting the same range start twice clears the range.
* Days from adjacent months remain selectable and move the visible month when chosen.
* Today receives a neutral outline when it is not selected.

## Accessibility

* Month navigation buttons have accessible Previous month and Next month labels.
* Every date is a native button named with its full date and exposes selection through `aria-pressed`.
* Tab moves through the interactive buttons. Enter or Space activates the focused navigation or date button.
* Constrained dates use the native disabled state and cannot receive focus.
* Provide a visible field label outside Calendar when it participates in a form.
