"use client";

import { useState } from "react";
import { Select } from "@patchui/react";
import { SectionLabel } from "@/components/demo/section-label";
import { Globe } from "lucide-react";

export function SelectDemo() {
  const [framework, setFramework] = useState("react");
  const [region, setRegion] = useState("us-east");

  return (
    <div className="flex flex-col gap-8">
      {/* Basic */}
      <div>
        <SectionLabel>Basic</SectionLabel>
        <div className="max-w-sm">
          <Select
            id="framework"
            label="Framework"
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
          >
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="svelte">Svelte</option>
            <option value="solid">Solid</option>
            <option value="qwik">Qwik</option>
          </Select>
        </div>
      </div>

      {/* With region */}
      <div>
        <SectionLabel>Region</SectionLabel>
        <div className="max-w-sm">
          <Select
            id="region"
            label="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="us-east">US East (Virginia)</option>
            <option value="us-west">US West (Oregon)</option>
            <option value="eu-west">EU West (Ireland)</option>
            <option value="ap-south">Asia Pacific (Singapore)</option>
          </Select>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <SectionLabel>Sizes</SectionLabel>
        <div className="flex flex-col gap-3 max-w-sm">
          <Select id="size-sm" label="Small" size="sm" defaultValue="a">
            <option value="a">One</option>
            <option value="b">Two</option>
          </Select>
          <Select id="size-md" label="Medium" size="md" defaultValue="a">
            <option value="a">One</option>
            <option value="b">Two</option>
          </Select>
          <Select id="size-lg" label="Large" size="lg" defaultValue="a">
            <option value="a">One</option>
            <option value="b">Two</option>
          </Select>
        </div>
      </div>

      {/* With prefix */}
      <div>
        <SectionLabel>With prefix icon</SectionLabel>
        <div className="max-w-sm">
          <Select id="locale" label="Locale" prefix={<Globe />} defaultValue="en">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </Select>
        </div>
      </div>

      {/* Grouped options */}
      <div>
        <SectionLabel>Grouped options</SectionLabel>
        <div className="max-w-sm">
          <Select id="assignee" label="Assignee" defaultValue="ana">
            <optgroup label="Design">
              <option value="ana">Ana</option>
              <option value="ben">Ben</option>
            </optgroup>
            <optgroup label="Engineering">
              <option value="chris">Chris</option>
              <option value="dana">Dana</option>
              <option value="eli">Eli</option>
            </optgroup>
          </Select>
        </div>
      </div>

      {/* Disabled */}
      <div>
        <SectionLabel>Disabled</SectionLabel>
        <div className="max-w-sm">
          <Select id="disabled" label="Plan" disabled defaultValue="hobby">
            <option value="hobby">Hobby</option>
            <option value="pro">Pro</option>
          </Select>
        </div>
      </div>

      {/* Error state */}
      <div>
        <SectionLabel>Error state</SectionLabel>
        <div className="max-w-sm">
          <Select
            id="plan"
            label="Plan"
            required
            error="Please select a plan."
            defaultValue=""
            placeholder="Select a plan…"
          >
            <option value="hobby">Hobby</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
