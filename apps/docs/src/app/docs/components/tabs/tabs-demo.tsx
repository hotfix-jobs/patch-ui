"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsPanel } from "@patchui/react";
import { Bell, Settings, User } from "lucide-react";

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-copy-14 leading-relaxed text-gray-1000">
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-label-12 font-medium text-gray-800">
      {children}
    </p>
  );
}

export function TabsDemo() {
  const [watchingCount, setWatchingCount] = useState(4);

  return (
    <div className="flex w-full flex-col gap-10">
      {/* Underline (default) */}
      <div>
        <Label>Underline (default)</Label>
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

      {/* With icons + badge */}
      <div>
        <Label>With icons and count badges</Label>
        <Tabs defaultValue="watching" aria-label="Feed">
          <TabsList>
            <TabsTrigger value="watching" icon={<User />} badge={watchingCount}>
              Watching
            </TabsTrigger>
            <TabsTrigger value="notifications" icon={<Bell />} badge={0}>
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" icon={<Settings />}>
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsPanel value="watching">
            <Body>
              You're watching {watchingCount} items.{" "}
              <button
                type="button"
                onClick={() => setWatchingCount((n) => n + 1)}
                className="underline decoration-gray-alpha-400 underline-offset-4 hover:decoration-gray-alpha-600"
              >
                Watch one more
              </button>
              .
            </Body>
          </TabsPanel>
          <TabsPanel value="notifications">
            <Body>No new notifications — badge is hidden at 0.</Body>
          </TabsPanel>
          <TabsPanel value="settings">
            <Body>Adjust feed preferences here.</Body>
          </TabsPanel>
        </Tabs>
      </div>

      {/* Disabled with tooltip */}
      <div>
        <Label>Disabled tab with tooltip explaining why</Label>
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

      {/* Pill variant */}
      <div>
        <Label>Pill — orientation flips by breakpoint</Label>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
          <div>
            <p className="mb-2 text-label-12 uppercase tracking-[0.06em] text-gray-700">
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
            <p className="mb-2 text-label-12 uppercase tracking-[0.06em] text-gray-700">
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
