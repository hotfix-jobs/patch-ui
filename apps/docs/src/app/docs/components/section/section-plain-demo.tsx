"use client";

import {
  Button,
  Section,
  SectionContent,
  SectionFooter,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from "@patchui/react";

export function SectionPlainDemo() {
  return (
    <Section className="w-full max-w-xl gap-4">
      <SectionHeader>
        <SectionTitle>Project access</SectionTitle>
        <SectionSubtitle>
          Workspace members can view this project by default.
        </SectionSubtitle>
      </SectionHeader>
      <SectionContent>
        <p className="text-small text-ink">
          Invite collaborators when they need editing permission.
        </p>
      </SectionContent>
      <SectionFooter>
        <Button variant="secondary" size="sm">
          Manage Access
        </Button>
      </SectionFooter>
    </Section>
  );
}
