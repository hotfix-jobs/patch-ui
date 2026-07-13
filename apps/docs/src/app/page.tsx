import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card } from "@patchui/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CopyCommand } from "@/components/mdx";
import directory from "@/lib/component-directory.json";
import { HomeShowcase } from "./home-showcase";
import { HomeHeader } from "./home-header";

export const metadata: Metadata = {
  title: "Patch UI: application components you own",
  description: "Accessible React application components built on Base UI and Tailwind CSS v4. Copy them into your project through the shadcn registry.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-svh w-full bg-base" data-slot="home-shell">
      <HomeHeader />

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 text-center sm:pb-20 sm:pt-28">
          <p className="text-small font-medium text-ink-muted">React · Base UI · Tailwind CSS v4</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-title1 font-medium text-ink">
            Application components you own.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-large text-ink-muted">
            Accessible, token-driven components copied directly into your project through the shadcn registry.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" render={<Link href="/docs/components" />}>Browse components</Button>
            <Button variant="secondary" size="lg" icon={<ArrowRight />} iconPosition="right" render={<Link href="/docs/getting-started" />}>Get started</Button>
          </div>
          <div className="mx-auto max-w-xl text-left">
            <CopyCommand command="npx shadcn@latest add @patchui/button" />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <HomeShowcase />
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-3 md:grid-cols-3">
            <Principle title="Copy the source">No Patch UI runtime dependency sits between your product and its components.</Principle>
            <Principle title="Keep the system">Shared tokens and recipes preserve consistent behavior across copied files.</Principle>
            <Principle title="Make it yours">Change interfaces, variants, and styling as the application evolves.</Principle>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <h2 className="text-title1 text-ink">Explore by purpose</h2>
            <p className="mt-3 text-regular text-ink-muted">Start with the part of the interface you are building.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {directory.slice(0, 4).map((group) => (
              <Card key={group.title} actionable className="p-5" render={<Link href="/docs/components" />}>
                <p className="text-regular font-medium text-ink">{group.title}</p>
                <p className="mt-2 text-small text-ink-muted">{group.items.slice(0, 4).map(([title]) => title).join(", ")}, and more.</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-title1 text-ink">Built for application patterns</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Card actionable className="p-6" render={<Link href="/docs/blocks/app-header" />}>
              <p className="text-title3 font-medium text-ink">App Header</p>
              <p className="mt-2 text-small text-ink-muted">Responsive brand, navigation, actions, and mobile menu behavior.</p>
            </Card>
            <Card actionable className="p-6" render={<Link href="/docs/blocks/search-suggestions" />}>
              <p className="text-title3 font-medium text-ink">Search Suggestions</p>
              <p className="mt-2 text-small text-ink-muted">Coordinated multi-field search with responsive suggestion surfaces.</p>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="text-title1 text-ink">Start with one component.</h2>
          <p className="mt-4 text-regular text-ink-muted">Register Patch UI, copy the source, and build from there.</p>
          <div className="mt-7 flex justify-center">
            <Button size="lg" icon={<ArrowRight />} iconPosition="right" render={<Link href="/docs/getting-started" />}>Read installation</Button>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-8 text-small text-ink-muted">
        <span>Patch UI by Hotfix</span>
        <Link href="/docs" className="hover:text-ink">Documentation</Link>
      </footer>
    </div>
  );
}

function Principle({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-6">
      <p className="text-title3 font-medium text-ink">{title}</p>
      <p className="mt-3 text-small text-ink-muted">{children}</p>
    </Card>
  );
}
