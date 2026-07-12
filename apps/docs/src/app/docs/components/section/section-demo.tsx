"use client";

import { useState, type ReactNode } from "react";
import {
  Section,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  Switch,
} from "@patchui/react";

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="min-w-0 flex-1">
        <p className="text-small font-medium text-ink">{title}</p>
        <p className="mt-1 text-small text-ink-muted">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function SectionDemo() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);

  return (
    <Section variant="card" dividers className="w-full max-w-xl">
      <SectionHeader className="p-5">
        <SectionTitle>Notifications</SectionTitle>
        <SectionSubtitle>Choose how project updates reach you.</SectionSubtitle>
      </SectionHeader>
      <SettingRow title="Email updates" description="Receive a weekly summary.">
        <Switch
          aria-label="Enable email updates"
          checked={email}
          onCheckedChange={setEmail}
        />
      </SettingRow>
      <SettingRow title="Push notifications" description="Receive timely alerts.">
        <Switch
          aria-label="Enable push notifications"
          checked={push}
          onCheckedChange={setPush}
        />
      </SettingRow>
    </Section>
  );
}
