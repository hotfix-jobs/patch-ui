"use client";
import { useState } from "react";
import {
  DatePicker,
  DateRangePicker,
  type DateRange,
} from "@patchui/react";

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(null);
  const [range, setRange] = useState<DateRange>({});

  return (
    <div className="flex flex-col gap-8 max-w-md">
      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          DatePicker
        </p>
        <DatePicker value={date} onValueChange={setDate} />
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          DateRangePicker
        </p>
        <DateRangePicker value={range} onValueChange={setRange} />
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-gray-800">
          With constraints (no past, no Sundays)
        </p>
        <DatePicker
          fromDate={new Date()}
          disabledDates={(d) => d.getDay() === 0}
        />
      </div>
    </div>
  );
}
