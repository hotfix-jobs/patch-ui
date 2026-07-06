"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  SectionLabel,
} from "@patchui/react";
import { Bell, Funnel } from "@phosphor-icons/react/dist/ssr";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "Ada Lovelace commented on your review",
    body: "Thanks for the callouts. Pushed a fix.",
    when: "2m",
    unread: true,
  },
  {
    id: "2",
    title: "Alan Turing invited you to a workspace",
    body: "Applied theory: get access when you accept.",
    when: "18m",
    unread: true,
  },
  {
    id: "3",
    title: "Grace Hopper approved the schema change",
    body: "Ready to merge whenever you are.",
    when: "1h",
    unread: false,
  },
];

export function PopoverDemo() {
  const [width, setWidth] = useState("480");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Notifications</SectionLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="tertiary"
                shape="circle"
                aria-label="Notifications"
              >
                <span className="relative flex items-center justify-center">
                  <Bell />
                  {unreadCount > 0 && (
                    <span
                      aria-hidden
                      className="absolute -end-0.5 -top-0.5 size-2 rounded-full bg-primary"
                    />
                  )}
                </span>
              </Button>
            }
          />
          <PopoverContent align="end" className="w-[360px] p-0">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-button-14 text-ink">Notifications</span>
                {unreadCount > 0 && (
                  <Badge>{unreadCount}</Badge>
                )}
              </div>
              <button
                type="button"
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((n) => ({ ...n, unread: false })),
                  )
                }
                disabled={unreadCount === 0}
                className="text-caption-12 text-ink-muted transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:text-ink disabled:opacity-40"
              >
                Mark all read
              </button>
            </div>
            <ul className="max-h-72 overflow-y-auto py-1">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="flex gap-3 border-b border-hairline px-4 py-3 last:border-b-0"
                >
                  <span
                    aria-hidden
                    className={
                      "mt-1.5 size-2 shrink-0 rounded-full " +
                      (n.unread ? "bg-primary" : "bg-transparent")
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-button-14 text-ink">{n.title}</p>
                    <p className="mt-0.5 text-body-13 text-ink-muted">
                      {n.body}
                    </p>
                    <p className="mt-1 text-caption-12 text-ink-subtle">
                      {n.when} ago
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-3">
        <SectionLabel>Mini form</SectionLabel>
        <Popover>
          <PopoverTrigger
            render={<Button variant="secondary">Set width</Button>}
          />
          <PopoverContent className="w-72 p-4">
            <p className="text-button-14 text-ink">Dimensions</p>
            <p className="mt-1 text-body-13 text-ink-muted">
              Set a value in pixels.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Input
                id="popover-width"
                label="Width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <PopoverClose render={<Button variant="tertiary" size="sm" />}>
                Cancel
              </PopoverClose>
              <PopoverClose
                render={<Button variant="primary" size="sm" />}
              >
                Save
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-3">
        <SectionLabel>Filter panel</SectionLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="secondary" icon={<Funnel />}>
                Filters
              </Button>
            }
          />
          <PopoverContent align="start" className="w-64 p-4">
            <p className="text-button-14 text-ink">Status</p>
            <div className="mt-3 flex flex-col gap-2">
              <label className="flex items-center gap-2 text-body-14 text-ink">
                <Checkbox defaultChecked />
                Active
              </label>
              <label className="flex items-center gap-2 text-body-14 text-ink">
                <Checkbox defaultChecked />
                Draft
              </label>
              <label className="flex items-center gap-2 text-body-14 text-ink">
                <Checkbox />
                Archived
              </label>
              <label className="flex items-center gap-2 text-body-14 text-ink">
                <Checkbox />
                Suspended
              </label>
            </div>
            <div className="mt-4 flex justify-between border-t border-hairline pt-3">
              <PopoverClose render={<Button variant="tertiary" size="sm" />}>
                Reset
              </PopoverClose>
              <PopoverClose render={<Button variant="primary" size="sm" />}>
                Apply
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
