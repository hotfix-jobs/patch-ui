"use client";

import { useState } from "react";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SectionLabel,
  Field,
  FieldError,
  FieldLabel,
} from "@patchui/react";
import { Globe } from "@phosphor-icons/react/dist/ssr";

export function SelectDemo() {
  const [framework, setFramework] = useState("react");
  const [region, setRegion] = useState("us-east");

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Basic</SectionLabel>
        <div className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="framework">Framework</FieldLabel>
            <Select id="framework" value={framework} onValueChange={setFramework}>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
              <SelectItem value="svelte">Svelte</SelectItem>
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="qwik">Qwik</SelectItem>
            </Select>
          </Field>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Region</SectionLabel>
        <div className="max-w-sm">
          <Select
            id="region"
            value={region}
            onValueChange={setRegion}
          >
            <SelectItem value="us-east">US East (Virginia)</SelectItem>
            <SelectItem value="us-west">US West (Oregon)</SelectItem>
            <SelectItem value="eu-west">EU West (Ireland)</SelectItem>
            <SelectItem value="ap-south">Asia Pacific (Singapore)</SelectItem>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Sizes</SectionLabel>
        <div className="flex flex-col gap-3 max-w-sm">
          <Select id="size-sm" size="sm" defaultValue="a">
            <SelectItem value="a">One</SelectItem>
            <SelectItem value="b">Two</SelectItem>
          </Select>
          <Select id="size-md" size="md" defaultValue="a">
            <SelectItem value="a">One</SelectItem>
            <SelectItem value="b">Two</SelectItem>
          </Select>
          <Select id="size-lg" size="lg" defaultValue="a">
            <SelectItem value="a">One</SelectItem>
            <SelectItem value="b">Two</SelectItem>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>With prefix icon</SectionLabel>
        <div className="max-w-sm">
          <Select id="locale" prefix={<Globe />} defaultValue="en">
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Grouped options</SectionLabel>
        <div className="max-w-sm">
          <Select id="assignee" defaultValue="ana">
            <SelectGroup>
              <SelectGroupLabel>Design</SelectGroupLabel>
              <SelectItem value="ana">Ana</SelectItem>
              <SelectItem value="ben">Ben</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectGroupLabel>Engineering</SelectGroupLabel>
              <SelectItem value="chris">Chris</SelectItem>
              <SelectItem value="dana">Dana</SelectItem>
              <SelectItem value="eli">Eli</SelectItem>
            </SelectGroup>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Disabled</SectionLabel>
        <div className="max-w-sm">
          <Select id="disabled" disabled defaultValue="hobby">
            <SelectItem value="hobby">Hobby</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Error state</SectionLabel>
        <div className="max-w-sm">
          <Field invalid>
            <FieldLabel htmlFor="plan" required>Plan</FieldLabel>
            <Select
              id="plan"
              aria-describedby="plan-error"
              required
              invalid
              placeholder="Select a plan…"
            >
              <SelectItem value="hobby">Hobby</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </Select>
            <FieldError id="plan-error" match>Please select a plan.</FieldError>
          </Field>
        </div>
      </div>
    </div>
  );
}
