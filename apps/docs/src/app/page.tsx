import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  AppHeader,
  AppHeaderBrand,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderRight,
} from "@patchui/react";

const features = [
  {
    title: "Copy-in, you own it",
    description:
      "Add a component with the shadcn CLI and its source lands in your repo. Edit it freely, no version lock, no black box.",
  },
  {
    title: "Base UI primitives",
    description:
      "Built on Base UI's unstyled, accessible components. WAI-ARIA patterns and keyboard navigation out of the box.",
  },
  {
    title: "Tailwind CSS v4",
    description:
      "Native Tailwind v4 via @theme and a --patch-* token system. Use utilities like bg-patch-surface anywhere.",
  },
  {
    title: "Light & dark mode",
    description:
      "Theme via CSS custom properties, no JavaScript engine and no flash of unstyled content.",
  },
];

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col"
      style={{ background: "var(--patch-bg)", color: "var(--patch-text)" }}
    >
      {/* Top nav (dogfoods AppHeader) */}
      <AppHeader>
        <AppHeaderBrand render={<Link href="/" />}>Patch UI</AppHeaderBrand>
        <AppHeaderNav className="hidden sm:flex">
          <AppHeaderNavItem render={<Link href="/docs/getting-started" />}>
            Docs
          </AppHeaderNavItem>
          <AppHeaderNavItem render={<Link href="/docs/components/button" />}>
            Components
          </AppHeaderNavItem>
        </AppHeaderNav>
        <AppHeaderRight>
          <Button
            variant="secondary"
            size="sm"
            render={
              <a
                href="https://github.com/hotfix-jobs/patch-ui"
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            GitHub
          </Button>
        </AppHeaderRight>
      </AppHeader>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1
          className="text-5xl font-bold tracking-tight sm:text-6xl"
          style={{ color: "var(--patch-text)" }}
        >
          Patch UI
        </h1>
        <p
          className="mt-4 max-w-xl text-lg leading-relaxed"
          style={{ color: "var(--patch-text-secondary)" }}
        >
          Accessible, token-driven React components built on Base UI and Tailwind
          CSS v4. Copy them into your repo with one command, then make them yours.
        </p>

        {/* Install command */}
        <div
          className="mt-8 inline-flex items-center gap-2 rounded-md border px-4 py-2 font-mono text-sm"
          style={{
            borderColor: "var(--patch-border)",
            background: "var(--patch-surface)",
            color: "var(--patch-text)",
          }}
        >
          <span style={{ color: "var(--patch-text-tertiary)" }}>$</span>
          npx shadcn add @patchui/button
        </div>

        <div className="mt-8 flex gap-3">
          <Button render={<Link href="/docs/getting-started" />}>
            Get started
          </Button>
          <Button
            variant="secondary"
            render={<Link href="/docs/components/button" />}
          >
            Browse components
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t px-6 py-6 text-center text-sm"
        style={{
          borderColor: "var(--patch-border)",
          color: "var(--patch-text-tertiary)",
        }}
      >
        Built on Base UI &middot; Styled with Tailwind CSS v4
      </footer>
    </main>
  );
}
