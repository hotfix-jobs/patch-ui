import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Palette, Package, ShieldCheck } from "lucide-react";
import { Card } from "@patchui/react";

export const metadata: Metadata = { title: "Introduction" };

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-heading-32 text-gray-1000">
        Patch UI
      </h1>
      <p className="mt-3 text-copy-16 leading-relaxed text-gray-900">
        A copy-in React component library with taste. Crisp visual language,
        Base UI accessibility primitives, and a Tailwind v4 token system that
        drives light and dark from a single stylesheet. No npm package to
        install, no CLI to learn: it ships through the standard shadcn
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

      <Card secondary border={false} className="mt-12 p-6">
        <h2 className="text-heading-16 text-gray-1000">
          What Patch UI is not
        </h2>
        <ul className="mt-3 space-y-2 text-copy-14 leading-relaxed text-gray-900">
          <li>
            <strong className="font-medium text-gray-1000">Not a package.</strong>{" "}
            There is no `npm install @patchui/react`. Components are copied
            into your repo through the shadcn registry.
          </li>
          <li>
            <strong className="font-medium text-gray-1000">Not a framework.</strong>{" "}
            No providers to wrap, no context to configure. Import a component
            and use it.
          </li>
          <li>
            <strong className="font-medium text-gray-1000">Not opinionated about your app.</strong>{" "}
            Once copied, the source is yours. Rename props, delete variants,
            restyle. It is your code.
          </li>
        </ul>
      </Card>

      <p className="mt-10 text-copy-13 text-gray-800">
        Curious about influences? See the{" "}
        <Link
          href="/docs/credits"
          className="font-medium text-gray-1000 underline decoration-gray-alpha-400 underline-offset-2 hover:decoration-gray-1000"
        >
          Credits
        </Link>{" "}
        page.
      </p>
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
    <Card hoverable className="p-5" render={<Link href={href} />}>
      <div className="flex items-center gap-2 text-gray-800">
        <span className="inline-flex items-center justify-center">{icon}</span>
        <span className="text-button-14 text-gray-1000">{title}</span>
      </div>
      <p className="mt-2 text-copy-13 leading-relaxed text-gray-800">{body}</p>
    </Card>
  );
}
