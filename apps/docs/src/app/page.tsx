import Link from "next/link";
import { ArrowRight, Mail, Search, Settings } from "lucide-react";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderRight,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  Badge,
  Button,
  Checkbox,
  Input,
  Switch,
} from "@patchui/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-patch-bg text-patch-text">
      <AppHeader sticky>
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
            variant="outline"
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

      {/* Hero — viewport-height, centered */}
      <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="max-w-3xl text-balance text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] text-patch-text sm:text-[56px] md:text-[68px]">
          Components for the modern web.
        </h1>

        <p className="mt-6 max-w-xl text-balance text-[length:var(--text-patch-body)] leading-relaxed text-patch-text-secondary md:text-[18px]">
          Accessible, token-driven React components built on Base UI and
          Floating UI. Copy & paste into your app. Edit freely.
        </p>

        {/* Install command */}
        <div className="mt-10 inline-flex items-center gap-2 rounded-[var(--radius-patch-sm)] border-[0.5px] border-patch-border bg-patch-surface px-4 py-2 font-mono text-[length:var(--text-patch-control)]">
          <span className="text-patch-text-tertiary">$</span>
          <span>npx shadcn add @patchui/button</span>
        </div>

        <div className="mt-8 flex gap-3">
          <Button
            icon={<ArrowRight />}
            iconPosition="right"
            render={<Link href="/docs/getting-started" />}
          >
            Get started
          </Button>
          <Button
            variant="outline"
            render={<Link href="/docs/components/button" />}
          >
            Browse components
          </Button>
        </div>
      </section>

      {/* Showcase wall — live component previews in a hairline grid */}
      <section className="px-6 pb-24 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-patch-lg)] border-[0.5px] border-patch-border bg-patch-border md:grid-cols-2 lg:grid-cols-3">
            {/* Buttons */}
            <ShowcaseCell label="Buttons">
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="outline">
                  Outline
                </Button>
                <Button size="sm" variant="ghost">
                  Ghost
                </Button>
                <Button size="sm" variant="danger">
                  Danger
                </Button>
              </div>
            </ShowcaseCell>

            {/* Badges */}
            <ShowcaseCell label="Badges">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warningOutline">Warning</Badge>
                <Badge variant="dangerOutline">Danger</Badge>
              </div>
            </ShowcaseCell>

            {/* Input */}
            <ShowcaseCell label="Input">
              <Input
                icon={<Search className="size-4" />}
                placeholder="Search components..."
              />
            </ShowcaseCell>

            {/* Avatar group */}
            <ShowcaseCell label="Avatar group">
              <AvatarGroup size="md" max={4}>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>LF</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>BV</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </ShowcaseCell>

            {/* Toggles */}
            <ShowcaseCell label="Switch & Checkbox">
              <div className="flex items-center gap-4">
                <Switch defaultChecked />
                <Switch />
                <Checkbox defaultChecked />
                <Checkbox />
              </div>
            </ShowcaseCell>

            {/* Icon row */}
            <ShowcaseCell label="Composition">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" icon={<Mail />}>
                  Email
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  icon={<Settings className="size-4" />}
                  aria-label="Settings"
                />
              </div>
            </ShowcaseCell>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t-[0.5px] border-patch-border bg-patch-surface px-6 py-20 md:px-12 lg:px-16">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-3">
          <Feature
            title="Open source"
            body="MIT licensed. Source-of-truth lives on GitHub. File issues, send PRs, fork freely."
          />
          <Feature
            title="Accessible"
            body="WAI-ARIA patterns and keyboard navigation by default via Base UI and floating-ui primitives."
          />
          <Feature
            title="Motion-driven"
            body="Custom overlays on @floating-ui/react with motion-driven spring physics for both open and close."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[0.5px] border-patch-border px-6 py-8 md:px-12 lg:px-16">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 text-[length:var(--text-patch-mini)] text-patch-text-tertiary">
          <span>
            Built on Base UI, Floating UI, and motion. MIT licensed.
          </span>
          <div className="flex items-center gap-5">
            <Link href="/docs" className="font-medium hover:text-patch-text">
              Docs
            </Link>
            <Link
              href="/docs/components/button"
              className="font-medium hover:text-patch-text"
            >
              Components
            </Link>
            <a
              href="https://github.com/hotfix-jobs/patch-ui"
              target="_blank"
              rel="noreferrer"
              className="font-medium hover:text-patch-text"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ShowcaseCell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 bg-patch-bg px-6 py-8 md:px-8 md:py-10">
      <div className="text-[length:var(--text-patch-micro)] font-semibold uppercase tracking-[var(--tracking-patch-label)] text-patch-text-tertiary">
        {label}
      </div>
      <div className="flex min-h-[64px] items-center">{children}</div>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-[length:var(--text-patch-lead)] font-semibold tracking-tight text-patch-text">
        {title}
      </h3>
      <p className="mt-2 text-[length:var(--text-patch-control)] leading-relaxed text-patch-text-secondary">
        {body}
      </p>
    </div>
  );
}
