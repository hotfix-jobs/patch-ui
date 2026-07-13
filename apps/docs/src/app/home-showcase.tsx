"use client";

import { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Toggle,
} from "@patchui/react";
import { FilterToolbar } from "@patchui/react/blocks/filter-toolbar";
import { Plus } from "@phosphor-icons/react/dist/ssr";

const projects = [
  { name: "Atlas", owner: "Ada Lovelace", status: "Active", updated: "2m ago" },
  { name: "Relay", owner: "Alan Turing", status: "Review", updated: "18m ago" },
  { name: "Northstar", owner: "Grace Hopper", status: "Active", updated: "1h ago" },
];

export function HomeShowcase() {
  const [activeOnly, setActiveOnly] = useState(false);
  const visibleProjects = activeOnly
    ? projects.filter((project) => project.status === "Active")
    : projects;

  return (
    <div className="overflow-hidden rounded-[var(--radius-16)] bg-base p-3 sm:p-5">
      <div className="rounded-[var(--radius-12)] bg-layer-1 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-title3 font-medium text-ink">Projects</p>
            <p className="mt-1 text-small text-ink-muted">Monitor work across your team.</p>
          </div>
          <Button icon={<Plus />} size="sm">New project</Button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Metric label="Active projects" value="12" />
          <Metric label="In review" value="4" />
          <Metric label="Team members" value="18" />
        </div>

        <div className="mt-6">
          <FilterToolbar count={`${visibleProjects.length} projects`} countVisibility="always">
            <Toggle variant="secondary" pressed={activeOnly} onPressedChange={setActiveOnly}>
              Active only
            </Toggle>
          </FilterToolbar>
        </div>

        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead align="right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleProjects.map((project) => (
                <TableRow key={project.name}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <Avatar size="sm" letter={project.owner.charAt(0)} />
                      <span className="whitespace-nowrap">{project.owner}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge color={project.status === "Active" ? "success" : "default"}>{project.status}</Badge>
                  </TableCell>
                  <TableCell align="right" className="whitespace-nowrap text-ink-muted">{project.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader><CardTitle>{label}</CardTitle></CardHeader>
      <CardContent><p className="text-title2 font-medium text-ink">{value}</p></CardContent>
    </Card>
  );
}
