"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Kbd,
  Section,
  SectionContent,
  SectionFooter,
  SectionFooterActions,
  SectionFooterStatus,
  SectionHeader,
  SectionRow,
  SectionSubtitle,
  SectionTitle,
  SectionLabel,
  Switch,
} from "@patchui/react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
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
        <Section>
          <SectionRow
            title="Language"
            description="The language used for the interface"
          >
            <SelectChip value="English" />
          </SectionRow>
          <SectionRow
            title="Time zone"
            description="Set your time zone for accurate timestamps"
          >
            <SelectChip value="Auto-detect" />
          </SectionRow>
          <SectionRow
            title="Date format"
            description="How dates appear across the app"
          >
            <SelectChip value="MMM D, YYYY" />
          </SectionRow>
          <SectionRow
            title="Autosave drafts"
            description="Save your work automatically as you go"
          >
            <Switch checked={emoji} onCheckedChange={setEmoji} />
          </SectionRow>
          <SectionRow
            title="Submit on"
            description="The key press used to submit forms and messages"
          >
            <Kbd meta>Enter</Kbd>
          </SectionRow>
        </Section>
      </div>

      <div className="space-y-4">
        <SectionLabel>Notifications</SectionLabel>
        <Section>
          <SectionRow
            title="Email digests"
            description="Get a summary of activity in your inbox each week"
          >
            <Switch checked={tabs} onCheckedChange={setTabs} />
          </SectionRow>
          <SectionRow
            title="Push notifications"
            description="Receive updates on your mobile and desktop apps"
          >
            <Button variant="tertiary" size="sm">
              Configure
            </Button>
          </SectionRow>
          <SectionRow
            title="Notification frequency"
            description="How often you receive activity summaries"
          >
            <SelectChip value="Daily" />
          </SectionRow>
        </Section>
      </div>

      <div className="space-y-4">
        <SectionLabel>Header + form + footer</SectionLabel>
        <Section>
          <SectionHeader>
            <SectionTitle>Project name</SectionTitle>
            <SectionSubtitle>
              The display name shown in navigation and search results.
            </SectionSubtitle>
          </SectionHeader>
          <SectionContent>
            <Input defaultValue="patch-ui" placeholder="my-project" />
          </SectionContent>
          <SectionFooter>
            <SectionFooterStatus>
              Please use 32 characters at maximum.
            </SectionFooterStatus>
            <SectionFooterActions>
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
              <Button size="sm">Save</Button>
            </SectionFooterActions>
          </SectionFooter>
        </Section>
      </div>

      <div className="space-y-4">
        <SectionLabel>Danger zone</SectionLabel>
        <Section>
          <SectionHeader>
            <SectionTitle>Transfer project</SectionTitle>
            <SectionSubtitle>
              Move this project to another team or workspace.
            </SectionSubtitle>
          </SectionHeader>
          <SectionFooter>
            <SectionFooterActions>
              <Button size="sm" variant="destructive">
                Transfer project
              </Button>
            </SectionFooterActions>
          </SectionFooter>
        </Section>
      </div>
    </div>
  );
}
