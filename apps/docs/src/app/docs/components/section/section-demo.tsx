"use client";

import { useState, type ReactNode } from "react";
import {
  Button,
  Input,
  Kbd,
  Section,
  SectionContent,
  SectionFooter,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  SectionLabel,
  Switch,
} from "@patchui/react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

function SettingRow({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <div className="min-w-0 flex-1">
        <div className="text-small font-medium text-ink">{title}</div>
        {description && <div className="mt-1 text-small text-ink-muted">{description}</div>}
      </div>
      {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
    </div>
  );
}

function SelectChip({ value }: { value: string }) {
  return (
    <Button variant="secondary" size="sm">
      {value}
      <CaretDown className="size-3.5 text-ink-muted" aria-hidden />
    </Button>
  );
}

export function SectionDemo() {
  const [emoji, setEmoji] = useState(true);
  const [tabs, setTabs] = useState(false);

  return (
    <div className="flex flex-col gap-12">
      <div className="space-y-4">
        <SectionLabel>General</SectionLabel>
        <Section dividers>
          <SettingRow
            title="Language"
            description="The language used for the interface"
          >
            <SelectChip value="English" />
          </SettingRow>
          <SettingRow
            title="Time zone"
            description="Set your time zone for accurate timestamps"
          >
            <SelectChip value="Auto-detect" />
          </SettingRow>
          <SettingRow
            title="Date format"
            description="How dates appear across the app"
          >
            <SelectChip value="MMM D, YYYY" />
          </SettingRow>
          <SettingRow
            title="Autosave drafts"
            description="Save your work automatically as you go"
          >
            <Switch checked={emoji} onCheckedChange={setEmoji} />
          </SettingRow>
          <SettingRow
            title="Submit on"
            description="The key press used to submit forms and messages"
          >
            <Kbd meta>Enter</Kbd>
          </SettingRow>
        </Section>
      </div>

      <div className="space-y-4">
        <SectionLabel>Notifications</SectionLabel>
        <Section dividers>
          <SettingRow
            title="Email digests"
            description="Get a summary of activity in your inbox each week"
          >
            <Switch checked={tabs} onCheckedChange={setTabs} />
          </SettingRow>
          <SettingRow
            title="Push notifications"
            description="Receive updates on your mobile and desktop apps"
          >
            <Button variant="tertiary" size="sm">
              Configure
            </Button>
          </SettingRow>
          <SettingRow
            title="Notification frequency"
            description="How often you receive activity summaries"
          >
            <SelectChip value="Daily" />
          </SettingRow>
        </Section>
      </div>

      <div className="space-y-4">
        <SectionLabel>Header + form + footer</SectionLabel>
        <Section dividers>
          <SectionHeader className="px-6 py-5">
            <SectionTitle>Project name</SectionTitle>
            <SectionSubtitle>
              The display name shown in navigation and search results.
            </SectionSubtitle>
          </SectionHeader>
          <SectionContent className="px-6 py-5">
            <Input defaultValue="patch-ui" placeholder="my-project" />
          </SectionContent>
          <SectionFooter className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
            <div className="text-small text-ink-muted">
              Please use 32 characters at maximum.
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
              <Button size="sm">Save</Button>
            </div>
          </SectionFooter>
        </Section>
      </div>

      <div className="space-y-4">
        <SectionLabel>Danger zone</SectionLabel>
        <Section>
          <SectionHeader className="px-6 pb-4 pt-5">
            <SectionTitle>Transfer project</SectionTitle>
            <SectionSubtitle>
              Move this project to another team or workspace.
            </SectionSubtitle>
          </SectionHeader>
          <SectionFooter className="flex justify-end px-6 pb-5">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="destructive">
                Transfer project
              </Button>
            </div>
          </SectionFooter>
        </Section>
      </div>
    </div>
  );
}
