"use client";

import { useState } from "react";
import { FileText, Gear, House, SidebarSimple, SquaresFour, Users } from "@phosphor-icons/react/dist/ssr";
const NAV = [
  { icon: House, label: "Overview", active: true },
  { icon: SquaresFour, label: "Projects" },
  { icon: Users, label: "Team" },
  { icon: FileText, label: "Docs" },
  { icon: Gear, label: "Settings" },
];

export function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-[420px] w-full overflow-hidden rounded-[var(--radius-12)] border border-hairline bg-base">
      <aside
        className={`flex shrink-0 flex-col overflow-hidden border-r border-hairline bg-base transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-standard)] ${collapsed ? "w-0" : "w-56"}`}
      >
        <div className="flex h-14 shrink-0 flex-row items-center border-b border-hairline px-3">
          <div className="text-regular font-medium text-ink">Acme</div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3">
          <div>
            <div className="px-2 pt-2 text-mini font-medium text-primary">
              Workspace
            </div>
            <ul className="mt-1 flex flex-col gap-0.5">
              {NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-current={item.active ? "page" : undefined}
                      className={`flex w-full items-center gap-2 rounded-[var(--radius-6)] px-2 py-1.5 text-small transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] ${item.active ? "bg-layer-selected font-medium text-ink" : "text-ink-muted hover:bg-layer-hover hover:text-ink"}`}
                    >
                      <Icon className="size-4 shrink-0" aria-hidden />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-hairline px-3">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label="Toggle sidebar"
            className="inline-flex size-8 items-center justify-center rounded-full text-ink-muted transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:bg-layer-hover hover:text-ink"
          >
            <SidebarSimple className="size-4" aria-hidden />
          </button>
          <span className="text-small text-ink-muted">Overview</span>
        </header>
        <div className="min-h-0 flex-1 p-6 text-small text-ink">
          Main content flows here. Click the toggle in the header to collapse
          the sidebar.
        </div>
      </div>
    </div>
  );
}
