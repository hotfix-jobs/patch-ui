"use client";

import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from "@patchui/react";

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-xl">
      <TabsList aria-label="Project sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsPanel value="overview">
        <p className="text-small text-ink">Project summary and members.</p>
      </TabsPanel>
      <TabsPanel value="activity">
        <p className="text-small text-ink">Recent project changes.</p>
      </TabsPanel>
      <TabsPanel value="settings">
        <p className="text-small text-ink">Project preferences.</p>
      </TabsPanel>
    </Tabs>
  );
}
