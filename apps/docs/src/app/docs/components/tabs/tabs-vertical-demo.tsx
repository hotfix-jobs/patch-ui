"use client";

import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from "@patchui/react";

export function TabsVerticalDemo() {
  return (
    <Tabs
      orientation="vertical"
      defaultValue="profile"
      className="w-full max-w-xl"
    >
      <TabsList aria-label="Account sections" className="w-36">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsPanel value="profile">
        <p className="text-small text-ink">Name and contact details.</p>
      </TabsPanel>
      <TabsPanel value="billing">
        <p className="text-small text-ink">Payment method and invoices.</p>
      </TabsPanel>
      <TabsPanel value="team">
        <p className="text-small text-ink">Members and roles.</p>
      </TabsPanel>
    </Tabs>
  );
}
