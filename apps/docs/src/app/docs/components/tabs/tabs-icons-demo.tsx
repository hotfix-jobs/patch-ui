"use client";

import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from "@patchui/react";
import { Clock, Gear, Users } from "@phosphor-icons/react/dist/ssr";

export function TabsIconsDemo() {
  return (
    <Tabs defaultValue="members" className="w-full max-w-xl">
      <TabsList aria-label="Workspace sections">
        <TabsTrigger value="members" icon={<Users />} badge={4}>
          Members
        </TabsTrigger>
        <TabsTrigger value="activity" icon={<Clock />}>
          Activity
        </TabsTrigger>
        <TabsTrigger value="settings" icon={<Gear />}>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsPanel value="members">
        <p className="text-small text-ink">Four members have workspace access.</p>
      </TabsPanel>
      <TabsPanel value="activity">
        <p className="text-small text-ink">Recent workspace changes.</p>
      </TabsPanel>
      <TabsPanel value="settings">
        <p className="text-small text-ink">Workspace preferences.</p>
      </TabsPanel>
    </Tabs>
  );
}
