import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@patchui/react";

import { ArrowUpRight, Package, Palette, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
export const metadata: Metadata = { title: "Introduction" };

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-title1 text-ink">
        Patch UI
      </h1>
      <p className="mt-3 text-regular leading-relaxed text-ink">
        A copy-in React component library with taste. Crisp visual language,
        Base UI accessibility primitives, and a Tailwind v4 token system that
        drives light and dark from a single stylesheet. No npm package to
        install and no custom CLI to learn: it ships through the standard shadcn
        registry.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <IntroCard
          icon={<Package className="size-4" />}
          title="Getting Started"
          body="Register the namespace, add your first component, wire up the tokens."
          href="/docs/getting-started"
        />
        <IntroCard
          icon={<Palette className="size-4" />}
          title="Theme & Tokens"
          body="How the token system is organized: colors, radii, motion, typography."
          href="/docs/theme"
        />
        <IntroCard
          icon={<ShieldCheck className="size-4" />}
          title="Contrast Contract"
          body="The check:contrast script enforces WCAG minimums in CI. Understand what's guaranteed and what isn't."
          href="/docs/contrast"
        />
        <IntroCard
          icon={<ArrowUpRight className="size-4" />}
          title="Browse Components"
          body="Buttons, inputs, overlays, tables, calendars, and blocks. All copy-in, all tokenized."
          href="/docs/components/button"
        />
      </div>

      <Card className="mt-12 bg-fill-1 p-6">
        <h2 className="text-regular font-medium text-ink">
          What Patch UI is not
        </h2>
        <ul className="mt-3 space-y-2 text-small leading-relaxed text-ink">
          <li>
            <strong className="font-medium text-ink">Not a package.</strong>{" "}
            There is no `npm install @patchui/react`. Components are copied
            into your repo through the shadcn registry.
          </li>
          <li>
            <strong className="font-medium text-ink">Not a framework.</strong>{" "}
            There is no library-wide provider. Components that coordinate
            state expose a local provider or compound root where needed.
          </li>
          <li>
            <strong className="font-medium text-ink">Not a runtime dependency.</strong>{" "}
            Once copied, the source is yours. Rename props, delete variants,
            or restyle it without waiting on a package release.
          </li>
        </ul>
      </Card>

    </div>
  );
}

function IntroCard({
  icon,
  title,
  body,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Card actionable className="p-5" render={<Link href={href} />}>
      <div className="flex items-center gap-2 text-ink-muted">
        <span className="inline-flex items-center justify-center">{icon}</span>
        <span className="text-small font-medium text-ink">{title}</span>
      </div>
      <p className="mt-2 text-small leading-relaxed text-ink-muted">{body}</p>
    </Card>
  );
}
