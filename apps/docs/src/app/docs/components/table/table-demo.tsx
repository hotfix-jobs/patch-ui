"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@patchui/react";
import { SectionLabel } from "@/components/demo/section-label";

const DEPLOYMENTS = [
  { name: "acme-web", branch: "main", status: "Ready", lastUsed: "2m ago" },
  { name: "acme-api", branch: "main", status: "Building", lastUsed: "5m ago" },
  { name: "acme-docs", branch: "feat/redesign", status: "Ready", lastUsed: "1h ago" },
  { name: "acme-marketing", branch: "main", status: "Failed", lastUsed: "3h ago" },
  { name: "acme-cli", branch: "main", status: "Ready", lastUsed: "1d ago" },
];

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Ready"
      ? "text-[var(--success)]"
      : status === "Failed"
        ? "text-[var(--error)]"
        : "text-gray-800";
  return <span className={color}>{status}</span>;
}

export function TableDemo() {
  return (
    <div className="flex flex-col gap-10">
      {/* Default */}
      <div>
        <SectionLabel>Default</SectionLabel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEPLOYMENTS.map((d) => (
              <TableRow key={d.name}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.branch}</TableCell>
                <TableCell>
                  <StatusBadge status={d.status} />
                </TableCell>
                <TableCell align="right">{d.lastUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Interactive */}
      <div>
        <SectionLabel>Interactive rows (opt-in hover)</SectionLabel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody interactive>
            {DEPLOYMENTS.slice(0, 4).map((d) => (
              <TableRow key={d.name}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.branch}</TableCell>
                <TableCell>
                  <StatusBadge status={d.status} />
                </TableCell>
                <TableCell align="right">{d.lastUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Striped */}
      <div>
        <SectionLabel>Striped rows</SectionLabel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead align="right">Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody striped>
            {DEPLOYMENTS.map((d) => (
              <TableRow key={d.name}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.branch}</TableCell>
                <TableCell align="right">{d.lastUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Bordered */}
      <div>
        <SectionLabel>Bordered cells</SectionLabel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead align="right">Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody bordered>
            {DEPLOYMENTS.slice(0, 3).map((d) => (
              <TableRow key={d.name}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.branch}</TableCell>
                <TableCell align="right">{d.lastUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Flat variant */}
      <div>
        <SectionLabel>Flat variant (no outer chrome)</SectionLabel>
        <Table variant="flat">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead align="right">Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEPLOYMENTS.slice(0, 3).map((d) => (
              <TableRow key={d.name}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.branch}</TableCell>
                <TableCell align="right">{d.lastUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Unknown values as em-dash */}
      <div>
        <SectionLabel>Unknown values render as em-dash (—)</SectionLabel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead align="right">Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>acme-web</TableCell>
              <TableCell>Ada</TableCell>
              <TableCell align="right">2m ago</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>orphan-repo</TableCell>
              <TableCell>
                <span className="text-gray-700">—</span>
              </TableCell>
              <TableCell align="right">
                <span className="text-gray-700">—</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
