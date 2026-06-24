"use client";
import { useState } from "react";
import { Calendar, type DateRange } from "@patchui/react";

export function CalendarDemo() {
  const [single, setSingle] = useState<Date | null>(new Date());
  const [range, setRange] = useState<DateRange>({});

  return (
    <div className="flex flex-wrap items-start gap-8">
      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Single
        </p>
        <Calendar
          mode="single"
          value={single}
          onValueChange={setSingle}
          className="border-[0.5px] border-patch-border"
        />
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-patch-text-tertiary">
          Range
        </p>
        <Calendar
          mode="range"
          value={range}
          onValueChange={setRange}
          className="border-[0.5px] border-patch-border"
        />
      </div>
    </div>
  );
}
