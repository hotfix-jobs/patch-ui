"use client";

import { Tabs, TabsList, TabsTrigger, TabsPanel } from "@patchui/react";

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[length:var(--text-patch-control)] leading-relaxed text-patch-text-secondary">
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[length:var(--text-patch-mini)] font-medium text-patch-text-tertiary">
      {children}
    </p>
  );
}

export function TabsDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      {/* Underline variant (default) - content tabs */}
      <div>
        <Label>Underline (default)</Label>
        <Tabs defaultValue="overview">
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

      {/* Pill variant - same look across orientations */}
      <div>
        <Label>Pill - same look, orientation flips by breakpoint</Label>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
          <div>
            <p className="mb-2 text-[length:var(--text-patch-micro)] uppercase tracking-[0.06em] text-patch-text-quaternary">
              Desktop (vertical)
            </p>
            <Tabs variant="pill" orientation="vertical" defaultValue="profile">
              <TabsList className="w-44">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div>
            <p className="mb-2 text-[length:var(--text-patch-micro)] uppercase tracking-[0.06em] text-patch-text-quaternary">
              Mobile (horizontal)
            </p>
            <Tabs variant="pill" defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
