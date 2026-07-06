"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@patchui/react";
import { SectionLabel } from "@patchui/react";

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
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-3">
        <SectionLabel>Default</SectionLabel>
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
        <SectionLabel>Interactive rows (opt-in hover)</SectionLabel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody interactive>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody striped>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody bordered>
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
        <SectionLabel>Flat variant (no outer chrome)</SectionLabel>
        <Table variant="flat">
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
        <SectionLabel>Missing values</SectionLabel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ada Lovelace</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell align="right">2m ago</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pending invite</TableCell>
              <TableCell>
                <span className="text-ink-subtle">None</span>
              </TableCell>
              <TableCell align="right">
                <span className="text-ink-subtle">None</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
