"use client";

import { useState } from "react";
import {
  Button,
  EmptyState,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  SectionLabel,
} from "@patchui/react";
import { Users } from "@phosphor-icons/react/dist/ssr";

const MEMBERS = [
  { name: "Ada Lovelace", role: "Owner", status: "Active", lastActive: "2m ago" },
  { name: "Alan Turing", role: "Admin", status: "Active", lastActive: "12m ago" },
  { name: "Grace Hopper", role: "Member", status: "Invited", lastActive: "1h ago" },
  { name: "Katherine Johnson", role: "Member", status: "Active", lastActive: "3h ago" },
  { name: "Linus Torvalds", role: "Member", status: "Suspended", lastActive: "5d ago" },
];

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Active"
      ? "text-[var(--success)]"
      : status === "Suspended"
        ? "text-[var(--error)]"
        : "text-ink-muted";
  return <span className={color}>{status}</span>;
}

export function TableDemo() {
  const [selected, setSelected] = useState("Ada Lovelace");
  const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("none");
  const sortedMembers =
    sortDir === "none"
      ? MEMBERS
      : [...MEMBERS].sort((a, b) =>
          sortDir === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name),
        );

  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-3">
        <SectionLabel>Flat (default)</SectionLabel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.map((m) => (
              <TableRow key={m.name}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>
                  <StatusBadge status={m.status} />
                </TableCell>
                <TableCell align="right">{m.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <SectionLabel>Elevated (bg-layer-1 + hairline-soft)</SectionLabel>
        <Table variant="elevated">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.slice(0, 3).map((m) => (
              <TableRow key={m.name}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell align="right">{m.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <SectionLabel>Interactive rows (opt-in hover)</SectionLabel>
        <Table interactive>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.slice(0, 4).map((m) => (
              <TableRow key={m.name}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>
                  <StatusBadge status={m.status} />
                </TableCell>
                <TableCell align="right">{m.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <SectionLabel>Striped rows</SectionLabel>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.map((m) => (
              <TableRow key={m.name}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell align="right">{m.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <SectionLabel>Bordered cells</SectionLabel>
        <Table bordered>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.slice(0, 3).map((m) => (
              <TableRow key={m.name}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell align="right">{m.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <SectionLabel>Dense (size="sm")</SectionLabel>
        <Table size="sm" variant="elevated">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.map((m) => (
              <TableRow key={m.name}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>
                  <StatusBadge status={m.status} />
                </TableCell>
                <TableCell align="right">{m.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <SectionLabel>Selected row</SectionLabel>
        <Table interactive>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.slice(0, 4).map((m) => (
              <TableRow
                key={m.name}
                selected={selected === m.name}
                onClick={() => setSelected(m.name)}
              >
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell align="right">{m.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <SectionLabel>Sortable column</SectionLabel>
        <Table variant="elevated">
          <TableHeader>
            <TableRow>
              <TableHead
                sortable
                direction={sortDir}
                onSort={() =>
                  setSortDir(
                    sortDir === "none"
                      ? "asc"
                      : sortDir === "asc"
                      ? "desc"
                      : "none",
                  )
                }
              >
                Name
              </TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMembers.map((m) => (
              <TableRow key={m.name}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell align="right">{m.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <SectionLabel>Sticky header (scroll inside container)</SectionLabel>
        <div className="h-56 overflow-y-auto rounded-[var(--radius-8)] border border-hairline-soft bg-layer-1">
          <Table variant="flat" scrollable={false} stickyHeader>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead align="right">Last active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...MEMBERS, ...MEMBERS, ...MEMBERS].map((m, i) => (
                <TableRow key={`${m.name}-${i}`}>
                  <TableCell>{m.name}</TableCell>
                  <TableCell>{m.role}</TableCell>
                  <TableCell align="right">{m.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Empty state</SectionLabel>
        <Table variant="elevated">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty colSpan={3}>
              <EmptyState
                icon={<Users />}
                title="No members yet"
                description="Invite teammates to get started."
                action={<Button size="md">Invite members</Button>}
              />
            </TableEmpty>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
