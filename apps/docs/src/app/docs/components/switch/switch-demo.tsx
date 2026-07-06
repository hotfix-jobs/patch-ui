"use client";

import { Switch , SectionLabel } from "@patchui/react";
import { useState } from "react";
import { Check, X } from "@phosphor-icons/react";
export function SwitchDemo() {
  const [checked, setChecked] = useState(false);
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Controlled</SectionLabel>
        <div className="flex items-center gap-3">
          <Switch checked={checked} onCheckedChange={(c) => setChecked(c)} />
          <span className="text-body-14 text-ink">{checked ? "On" : "Off"}</span>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Sizes</SectionLabel>
        <div className="flex items-center gap-4">
          <Switch size="sm" defaultChecked />
          <Switch size="md" defaultChecked />
          <Switch size="lg" defaultChecked />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Variants</SectionLabel>
        <div className="flex items-center gap-4">
          <Switch defaultChecked />
          <Switch variant="success" defaultChecked />
          <Switch variant="warning" defaultChecked />
          <Switch variant="error" defaultChecked />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>With icons in the thumb</SectionLabel>
        <div className="flex items-center gap-3">
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            icon={{
              checked: <Check />,
              unchecked: <X />,
            }}
          />
          <span className="text-body-14 text-ink">
            {enabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Disabled</SectionLabel>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Switch disabled />
            <span className="text-body-14 text-ink">Disabled off</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch disabled defaultChecked />
            <span className="text-body-14 text-ink">Disabled on</span>
          </div>
        </div>
      </div>
    </div>
  );
}
