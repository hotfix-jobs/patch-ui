"use client";

import {
  Button,
  Input,
  Section,
  SectionContent,
  SectionFooter,
  SectionFooterActions,
  SectionFooterStatus,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  SectionLabel,
} from "@patchui/react";


export function SectionDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Default</SectionLabel>
        <Section>
          <SectionHeader>
            <SectionTitle>Account Settings</SectionTitle>
            <SectionSubtitle>Manage your account preferences and settings.</SectionSubtitle>
          </SectionHeader>
          <SectionFooter>
            <SectionFooterStatus>
              Need help? <a href="#" className="text-blue-700 hover:underline">View documentation</a>
            </SectionFooterStatus>
            <SectionFooterActions>
              <Button size="sm">Save Changes</Button>
            </SectionFooterActions>
          </SectionFooter>
        </Section>
      </div>

      <div className="space-y-3">
        <SectionLabel>With content</SectionLabel>
        <Section>
          <SectionHeader>
            <SectionTitle>Project Name</SectionTitle>
            <SectionSubtitle>The display name for your project.</SectionSubtitle>
          </SectionHeader>
          <SectionContent>
            <Input placeholder="my-awesome-project" />
          </SectionContent>
          <SectionFooter>
            <SectionFooterStatus>
              Please use 32 characters at maximum.
            </SectionFooterStatus>
            <SectionFooterActions>
              <Button size="sm" variant="secondary">Cancel</Button>
              <Button size="sm">Save</Button>
            </SectionFooterActions>
          </SectionFooter>
        </Section>
      </div>

      <div className="space-y-3">
        <SectionLabel>Two actions in the footer</SectionLabel>
        <Section>
          <SectionHeader>
            <SectionTitle>Privacy Policy</SectionTitle>
            <SectionSubtitle>
              Read and accept the current privacy policy for your account.
            </SectionSubtitle>
          </SectionHeader>
          <SectionFooter>
            <SectionFooterStatus>Last updated: 2026-06-24</SectionFooterStatus>
            <SectionFooterActions>
              <Button size="sm" variant="secondary">Decline</Button>
              <Button size="sm">Accept</Button>
            </SectionFooterActions>
          </SectionFooter>
        </Section>
      </div>

      <div className="space-y-3">
        <SectionLabel>Action only (no status text)</SectionLabel>
        <Section>
          <SectionHeader>
            <SectionTitle>Transfer Project</SectionTitle>
            <SectionSubtitle>Move this project to another team or account.</SectionSubtitle>
          </SectionHeader>
          <SectionFooter>
            <SectionFooterActions>
              <Button size="sm" variant="error">Transfer Project</Button>
            </SectionFooterActions>
          </SectionFooter>
        </Section>
      </div>
    </div>
  );
}
