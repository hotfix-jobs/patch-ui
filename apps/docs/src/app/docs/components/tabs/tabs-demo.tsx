"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsPanel, SectionLabel } from "@patchui/react";
import { Envelope, Gear, Users } from "@phosphor-icons/react/dist/ssr";
function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-body-14 leading-relaxed text-ink">
      {children}
    </div>
  );
}

export function TabsDemo() {
  const [memberCount, setMemberCount] = useState(4);

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="space-y-3">
        <SectionLabel>Underline (default)</SectionLabel>
        <Tabs defaultValue="overview" aria-label="Project sections">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Gear</TabsTrigger>
          </TabsList>
          <TabsPanel value="overview">
            <Body>A high-level summary lives here.</Body>
          </TabsPanel>
          <TabsPanel value="activity">
            <Body>Recent activity lives here.</Body>
          </TabsPanel>
          <TabsPanel value="settings">
            <Body>Gear live here.</Body>
          </TabsPanel>
        </Tabs>
      </div>

      <div className="space-y-3">
        <SectionLabel>With icons and count badges</SectionLabel>
        <Tabs defaultValue="members" aria-label="Team">
          <TabsList>
            <TabsTrigger value="members" icon={<Users />} badge={memberCount}>
              Members
            </TabsTrigger>
            <TabsTrigger value="invites" icon={<Envelope />} badge={0}>
              Invites
            </TabsTrigger>
            <TabsTrigger value="settings" icon={<Gear />}>
              Gear
            </TabsTrigger>
          </TabsList>
          <TabsPanel value="members">
            <Body>
              {memberCount} members in this workspace.{" "}
              <button
                type="button"
                onClick={() => setMemberCount((n) => n + 1)}
                className="underline decoration-hairline-strong underline-offset-4 hover:decoration-hairline-tertiary"
              >
                Add one more
              </button>
              .
            </Body>
          </TabsPanel>
          <TabsPanel value="invites">
            <Body>No pending invites. Badges hide when count is zero.</Body>
          </TabsPanel>
          <TabsPanel value="settings">
            <Body>Team-wide preferences live here.</Body>
          </TabsPanel>
        </Tabs>
      </div>

      <div className="space-y-3">
        <SectionLabel>Disabled tab with tooltip explaining why</SectionLabel>
        <Tabs defaultValue="overview" aria-label="Project sections">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger
              value="admin"
              disabled
              tooltip="Only visible to project owners."
            >
              Admin
            </TabsTrigger>
          </TabsList>
          <TabsPanel value="overview">
            <Body>High-level summary.</Body>
          </TabsPanel>
          <TabsPanel value="activity">
            <Body>Recent activity.</Body>
          </TabsPanel>
        </Tabs>
      </div>

      <div className="space-y-3">
        <SectionLabel>Pill (horizontal)</SectionLabel>
        <Tabs variant="pill" defaultValue="all" aria-label="Status filter">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <TabsPanel value="all">
            <Body>Showing every item.</Body>
          </TabsPanel>
          <TabsPanel value="active">
            <Body>Showing active items only.</Body>
          </TabsPanel>
          <TabsPanel value="draft">
            <Body>Showing drafts only.</Body>
          </TabsPanel>
          <TabsPanel value="archived">
            <Body>Showing archived items only.</Body>
          </TabsPanel>
        </Tabs>
      </div>

      <div className="space-y-3">
        <SectionLabel>Pill (vertical)</SectionLabel>
        <Tabs variant="pill" orientation="vertical" defaultValue="profile">
          <TabsList className="w-44">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
