"use client";

import { Radio, RadioGroup } from "@patchui/react";
import { useState } from "react";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function RadioDemo() {
  const [plan, setPlan] = useState<string>("standard");
  const [cycle, setCycle] = useState<string>("monthly");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label>Controlled with children labels</Label>
        <RadioGroup value={plan} onValueChange={(v) => setPlan(v as string)}>
          <Radio value="starter">Starter</Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="pro">Pro</Radio>
        </RadioGroup>
      </div>

      <div>
        <Label>Uncontrolled with defaultValue</Label>
        <RadioGroup defaultValue="weekly">
          <Radio value="daily">Daily</Radio>
          <Radio value="weekly">Weekly</Radio>
          <Radio value="monthly">Monthly</Radio>
        </RadioGroup>
      </div>

      <div>
        <Label>Billing cycle (2-option pattern)</Label>
        <RadioGroup value={cycle} onValueChange={(v) => setCycle(v as string)}>
          <Radio value="monthly">Monthly</Radio>
          <Radio value="yearly">Yearly</Radio>
        </RadioGroup>
      </div>

      <div>
        <Label>Disabled group</Label>
        <RadioGroup defaultValue="yes" disabled>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </div>

      <div>
        <Label>Bare radios (custom layout)</Label>
        <RadioGroup defaultValue="a">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-copy-14 text-gray-1000">
              <Radio value="a" aria-label="A" />
              <span>A</span>
            </div>
            <div className="flex items-center gap-2 text-copy-14 text-gray-1000">
              <Radio value="b" aria-label="B" />
              <span>B</span>
            </div>
            <div className="flex items-center gap-2 text-copy-14 text-gray-1000">
              <Radio value="c" aria-label="C" />
              <span>C</span>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
