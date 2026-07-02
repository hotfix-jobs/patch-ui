"use client";

import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  ListRow,
  ListRowContent,
  ListRowList,
} from "@patchui/react";
import { GitBranch, MessageSquare, Send } from "lucide-react";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label-12 font-medium text-gray-800">{children}</p>;
}

const MEMBERS = [
  { letter: "A", name: "Ada Lovelace", email: "ada@example.com", role: "Owner" },
  { letter: "T", name: "Alan Turing", email: "alan@example.com", role: "Admin" },
  { letter: "G", name: "Grace Hopper", email: "grace@example.com", role: "Member" },
];

const INTEGRATIONS = [
  { id: "gh", name: "GitHub", desc: "Sync repositories and PR events", icon: <GitBranch className="size-5" />, connected: true },
  { id: "slack", name: "Slack", desc: "Post deploy status to a channel", icon: <MessageSquare className="size-5" />, connected: false },
  { id: "linkedin", name: "LinkedIn", desc: "Share posts to a company page", icon: <Send className="size-5" />, connected: false },
];

export function ListRowDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Members list */}
      <div>
        <SectionLabel>Members</SectionLabel>
        <ListRowList as="ul">
          {MEMBERS.map((m) => (
            <ListRow
              key={m.email}
              as="li"
              left={<Avatar letter={m.letter} />}
              right={
                <>
                  <Badge>{m.role}</Badge>
                  <Button variant="tertiary" size="sm">
                    Manage
                  </Button>
                </>
              }
            >
              <ListRowContent title={m.name} description={m.email} />
            </ListRow>
          ))}
        </ListRowList>
      </div>

      {/* Integrations with checkbox + primary action on right */}
      <div>
        <SectionLabel>Integrations</SectionLabel>
        <ListRowList>
          {INTEGRATIONS.map((i) => (
            <ListRow
              key={i.id}
              left={
                <span className="flex size-9 items-center justify-center rounded-[var(--radius-6)] bg-background-200 text-gray-1000">
                  {i.icon}
                </span>
              }
              right={
                i.connected ? (
                  <Button variant="secondary" size="sm">
                    Disconnect
                  </Button>
                ) : (
                  <Button variant="primary" size="sm">
                    Connect
                  </Button>
                )
              }
            >
              <ListRowContent title={i.name} description={i.desc} />
            </ListRow>
          ))}
        </ListRowList>
      </div>

      {/* Interactive (hover fill) — actionable rows */}
      <div>
        <SectionLabel>Interactive rows (hover fill)</SectionLabel>
        <ListRowList interactive>
          <ListRow
            left={<Checkbox />}
            right={<span className="text-label-13 text-gray-800">2m ago</span>}
          >
            <ListRowContent
              title="New job matches your search"
              description="4 senior React roles in San Francisco"
            />
          </ListRow>
          <ListRow
            left={<Checkbox />}
            right={<span className="text-label-13 text-gray-800">1h ago</span>}
          >
            <ListRowContent
              title="Interview scheduled"
              description="Loop with Acme on Thursday 2pm"
            />
          </ListRow>
          <ListRow
            left={<Checkbox />}
            right={<span className="text-label-13 text-gray-800">1d ago</span>}
          >
            <ListRowContent
              title="Application status update"
              description="Moved to phone screen"
            />
          </ListRow>
        </ListRowList>
      </div>

      {/* Unbordered — sits inside another surface */}
      <div>
        <SectionLabel>Unbordered (nested inside another surface)</SectionLabel>
        <div className="rounded-[var(--radius-12)] border border-gray-alpha-400 bg-background-100 p-4">
          <p className="mb-2 text-label-13 font-medium text-gray-1000">Team roster</p>
          <ListRowList bordered={false}>
            <ListRow
              size="sm"
              left={<Avatar size="xs" letter="A" />}
              right={<span className="text-label-13 text-gray-800">Owner</span>}
            >
              <ListRowContent title="Ada Lovelace" />
            </ListRow>
            <ListRow
              size="sm"
              left={<Avatar size="xs" letter="T" />}
              right={<span className="text-label-13 text-gray-800">Admin</span>}
            >
              <ListRowContent title="Alan Turing" />
            </ListRow>
            <ListRow
              size="sm"
              left={<Avatar size="xs" letter="G" />}
              right={<span className="text-label-13 text-gray-800">Member</span>}
            >
              <ListRowContent title="Grace Hopper" />
            </ListRow>
          </ListRowList>
        </div>
      </div>
    </div>
  );
}
