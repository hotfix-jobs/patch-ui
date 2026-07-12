import Link from "next/link";
import { Card } from "@patchui/react";
import {
  ArrowUpRight,
  Package,
  Palette,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

const links = [
  {
    icon: Package,
    title: "Getting Started",
    description: "Register the namespace, add a component, and wire up the tokens.",
    href: "/docs/getting-started",
  },
  {
    icon: Palette,
    title: "Theme and Tokens",
    description: "Understand the color, radius, motion, and typography system.",
    href: "/docs/theme",
  },
  {
    icon: ShieldCheck,
    title: "Contrast Contract",
    description: "See what the automated accessibility checks guarantee.",
    href: "/docs/contrast",
  },
  {
    icon: ArrowUpRight,
    title: "Browse Components",
    description: "Explore the copy-in components and application blocks.",
    href: "/docs/components",
  },
];

export function IntroductionCards() {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {links.map(({ icon: Icon, title, description, href }) => (
        <Card key={href} actionable className="p-5" render={<Link href={href} />}>
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-ink-muted" aria-hidden />
            <span className="text-small font-medium text-ink">{title}</span>
          </div>
          <p className="mt-2 text-small text-ink-muted">{description}</p>
        </Card>
      ))}
    </div>
  );
}
