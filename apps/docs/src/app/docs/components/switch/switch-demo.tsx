"use client";

import { Switch } from "@patchui/react";
import { useState } from "react";
import { Lock, Unlock } from "lucide-react";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 text-gray-800">{children}</p>;
}

export function SwitchDemo() {
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Label>Controlled</Label>
        <div className="flex items-center gap-3">
          <Switch checked={checked} onCheckedChange={(c) => setChecked(c)} />
          <span className="text-copy-14 text-gray-1000">{checked ? "On" : "Off"}</span>
        </div>
      </div>

      <div>
        <Label>Sizes</Label>
        <div className="flex items-center gap-4">
          <Switch size="sm" defaultChecked />
          <Switch size="md" defaultChecked />
          <Switch size="lg" defaultChecked />
        </div>
      </div>

      <div>
        <Label>Variants</Label>
        <div className="flex items-center gap-4">
          <Switch defaultChecked />
          <Switch variant="success" defaultChecked />
          <Switch variant="warning" defaultChecked />
          <Switch variant="error" defaultChecked />
        </div>
      </div>

      <div>
        <Label>With icons in the thumb</Label>
        <div className="flex items-center gap-3">
          <Switch
            checked={locked}
            onCheckedChange={setLocked}
            variant="success"
            icon={{
              checked: <Lock />,
              unchecked: <Unlock />,
            }}
          />
          <span className="text-copy-14 text-gray-1000">
            {locked ? "Locked" : "Unlocked"}
          </span>
        </div>
      </div>

      <div>
        <Label>Disabled</Label>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Switch disabled />
            <span className="text-copy-14 text-gray-1000">Disabled off</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch disabled defaultChecked />
            <span className="text-copy-14 text-gray-1000">Disabled on</span>
          </div>
        </div>
      </div>
    </div>
  );
}
