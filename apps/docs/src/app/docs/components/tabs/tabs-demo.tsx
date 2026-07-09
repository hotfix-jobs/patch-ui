"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsPanel, SectionLabel } from "@patchui/react";
import { Envelope, Gear, Users } from "@phosphor-icons/react/dist/ssr";
function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-small leading-relaxed text-ink">
      {children}
    </div>
  );
}

export function TabsDemo() {
  const [memberCount, setMemberCount] = useState(4);

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="space-y-3">
        <SectionLabel>Horizontal (default)</SectionLabel>
        <Tabs defaultValue="overview" aria-label="Project sections">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsPanel value="overview">
            <Body>A high-level summary lives here.</Body>
          </TabsPanel>
          <TabsPanel value="activity">
            <Body>Recent activity lives here.</Body>
          </TabsPanel>
          <TabsPanel value="settings">
            <Body>Settings live here.</Body>
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
              Settings
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
        <SectionLabel>Vertical</SectionLabel>
        <Tabs orientation="vertical" defaultValue="profile" aria-label="Account">
          <TabsList className="w-44">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsPanel value="profile">
            <Body>Name, avatar, and contact details.</Body>
          </TabsPanel>
          <TabsPanel value="billing">
            <Body>Payment method and invoice history.</Body>
          </TabsPanel>
          <TabsPanel value="team">
            <Body>Members, invites, and role settings.</Body>
          </TabsPanel>
        </Tabs>
      </div>
    </div>
  );
}
