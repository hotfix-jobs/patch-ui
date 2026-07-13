"use client";

import { useState } from "react";
import {
  Button,
  EmptyState,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  TableSortButton,
} from "@patchui/react";
import { Users } from "@phosphor-icons/react/dist/ssr";

const MEMBERS = [
  { name: "Ada Lovelace", role: "Owner", status: "Active", updated: "2m ago" },
  { name: "Alan Turing", role: "Admin", status: "Active", updated: "12m ago" },
  { name: "Grace Hopper", role: "Member", status: "Invited", updated: "1h ago" },
  { name: "Katherine Johnson", role: "Member", status: "Active", updated: "3h ago" },
  { name: "Linus Torvalds", role: "Member", status: "Paused", updated: "5d ago" },
];

type SortDirection = "asc" | "desc";

function Status({ value }: { value: string }) {
  return (
    <span className={value === "Active" ? "text-ink" : "text-ink-muted"}>
      {value}
    </span>
  );
}

function MemberRows({ members = MEMBERS }: { members?: typeof MEMBERS }) {
  return members.map((member) => (
    <TableRow key={member.name}>
      <TableCell className="font-medium">{member.name}</TableCell>
      <TableCell>{member.role}</TableCell>
      <TableCell><Status value={member.status} /></TableCell>
      <TableCell align="right" className="text-ink-muted">{member.updated}</TableCell>
    </TableRow>
  ));
}

export function TableDemo() {
  const [direction, setDirection] = useState<SortDirection>("asc");
  const members = [...MEMBERS].sort((a, b) =>
    direction === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name),
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-3">
        <p className="text-small font-medium text-ink">Default</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead aria-sort={direction === "asc" ? "ascending" : "descending"}>
                <TableSortButton
                  direction={direction}
                  onClick={() => setDirection(direction === "asc" ? "desc" : "asc")}
                >
                  Name
                </TableSortButton>
              </TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <MemberRows members={members} />
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <p className="text-small font-medium text-ink">Bordered container</p>
        <Table bordered>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <MemberRows members={MEMBERS.slice(0, 3)} />
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <p className="text-small font-medium text-ink">Compact</p>
        <Table size="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <MemberRows members={MEMBERS.slice(0, 3)} />
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3">
        <p className="text-small font-medium text-ink">Empty</p>
        <Table bordered>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty colSpan={4}>
              <EmptyState
                icon={<Users />}
                title="No entries yet"
                description="Add an entry to see it here."
                action={<Button size="md">Add entry</Button>}
              />
            </TableEmpty>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
