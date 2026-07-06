"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Label,
  SectionLabel,
} from "@patchui/react";
import { Funnel, Plus } from "@phosphor-icons/react/dist/ssr";

export function CollapsibleDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Inline "Show more"</SectionLabel>
        <div className="max-w-lg space-y-2">
          <p className="text-body-14 text-ink">
            Ada Lovelace joined the team last week as a founding designer. She
            previously led product design at three early-stage companies and
            shipped a hardware product that ran in every household in Britain.
          </p>
          <Collapsible>
            <CollapsibleTrigger
              render={
                <button className="text-body-14 text-ink-muted hover:text-ink transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] data-[panel-open]:hidden" />
              }
            >
              Show more
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="pt-2 text-body-14 text-ink">
                She most recently ran design at Grace Hopper's compiler
                consultancy and mentors early-career designers at Katherine
                Johnson's foundation. Outside of work, she flies gliders and
                maintains an obscure but well-loved font foundry.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Filter panel</SectionLabel>
        <div className="max-w-lg">
          <Collapsible>
            <CollapsibleTrigger
              render={
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Funnel />}
                  iconPosition="left"
                >
                  Filters
                </Button>
              }
            />
            <CollapsibleContent>
              <div className="mt-3 rounded-[var(--radius-12)] border border-hairline bg-surface-elevated p-4">
                <p className="text-caption-12 text-ink-muted mb-3">Status</p>
                <div className="flex flex-col gap-2">
                  <FilterCheck label="Active" defaultChecked />
                  <FilterCheck label="Draft" />
                  <FilterCheck label="Archived" />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Add optional field</SectionLabel>
        <div className="max-w-lg">
          <Collapsible>
            <CollapsibleTrigger
              render={
                <Button
                  variant="tertiary"
                  size="sm"
                  icon={<Plus />}
                  iconPosition="left"
                  className="data-[panel-open]:hidden"
                >
                  Add description
                </Button>
              }
            />
            <CollapsibleContent>
              <textarea
                placeholder="Describe this project…"
                rows={3}
                className="mt-2 w-full rounded-[var(--radius-6)] border border-hairline bg-surface-elevated p-3 text-body-14 text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-none"
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}

function FilterCheck({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState<boolean>(defaultChecked ?? false);
  return (
    <Label className="inline-flex items-center gap-2">
      <Checkbox
        checked={checked}
        onCheckedChange={(next) => setChecked(next === true)}
      />
      <span className="text-body-14 text-ink">{label}</span>
    </Label>
  );
}
