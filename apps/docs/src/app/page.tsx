import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  Grid,
  GridCell,
  Input,
  Switch,
} from "@patchui/react";
import {
  AppHeader,
  AppHeaderBrand,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderRight,
} from "@patchui/react/blocks/app-header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background-100 text-gray-1000">
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
      <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="max-w-3xl text-balance text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] text-gray-1000 sm:text-[56px] md:text-[68px]">
          Components you own,
          <br className="hidden sm:inline" /> not import.
        </h1>

        <p className="mt-6 max-w-xl text-balance text-copy-14 leading-relaxed text-gray-900 md:text-[18px]">
          A copy-in React component library with taste. Accessible primitives
          from Base UI, a tokenized crisp-minimal look, and source that lives
          in your repo the moment you install it.
        </p>

        {/* Install command */}
        <div className="mt-10 inline-flex items-center gap-2 rounded-[var(--radius-6)] border-[0.5px] border-gray-alpha-400 bg-background-100 px-4 py-2 font-mono text-label-13">
          <span className="text-gray-800">$</span>
          <span>npx shadcn add @patchui/button</span>
        </div>

        <div className="mt-8 flex gap-3">
          <Button
            icon={<ArrowRight className="size-4" />}
            iconPosition="right"
            render={<Link href="/docs/getting-started" />}
          >
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

      {/* Showcase wall */}
      <section className="px-6 pb-24 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-[1200px]">
          <Grid columns={{ sm: 1, md: 2, lg: 3 }}>
            <ShowcaseCell label="Buttons">
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
                <Button size="sm" variant="tertiary">
                  Tertiary
                </Button>
                <Button size="sm" variant="error">
                  Error
                </Button>
              </div>
            </ShowcaseCell>

            <ShowcaseCell label="Badges">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
            </ShowcaseCell>

            <ShowcaseCell label="Input">
              <Input
                prefix={<Search className="size-4" />}
                placeholder="Search components…"
              />
            </ShowcaseCell>

            <ShowcaseCell label="Avatar group">
              <AvatarGroup size="md" max={4}>
                <Avatar>
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>GH</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </ShowcaseCell>

            <ShowcaseCell label="Switch & Checkbox">
              <div className="flex items-center gap-4">
                <Switch defaultChecked />
                <Switch />
                <Checkbox defaultChecked />
                <Checkbox />
              </div>
            </ShowcaseCell>

            <ShowcaseCell label="Breadcrumb">
              <Breadcrumb
                items={[
                  { name: "Home", href: "/" },
                  { name: "Docs", href: "/docs" },
                  { name: "Overview" },
                ]}
              />
            </ShowcaseCell>
          </Grid>
        </div>
      </section>

      {/* Features */}
      <section className="border-t-[0.5px] border-gray-alpha-400 bg-background-100 px-6 py-20 md:px-12 lg:px-16">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-3">
          <Feature
            title="Copy-in, not npm"
            body="Components ship through the shadcn registry. Run add, get the source, and own the file from that moment forward. No package to bump, no breaking changes to chase."
          />
          <Feature
            title="Accessible by default"
            body="Built on Base UI. Keyboard navigation, focus management, ARIA relationships, and portal rendering are handled correctly before we style anything."
          />
          <Feature
            title="Tokenized end-to-end"
            body="A single stylesheet drives colors, radii, motion, and typography. Light and dark switch from one class. No hardcoded values, no magic numbers."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[0.5px] border-gray-alpha-400 px-6 py-8 md:px-12 lg:px-16">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 text-label-12 text-gray-800">
          <span>MIT licensed. Copyright © Hotfix.</span>
          <div className="flex items-center gap-5">
            <Link href="/docs" className="font-medium hover:text-gray-1000">
              Docs
            </Link>
            <Link
              href="/docs/components/button"
              className="font-medium hover:text-gray-1000"
            >
              Components
            </Link>
            <Link
              href="/docs/credits"
              className="font-medium hover:text-gray-1000"
            >
              Credits
            </Link>
            <a
              href="https://github.com/hotfix-jobs/patch-ui"
              target="_blank"
              rel="noreferrer"
              className="font-medium hover:text-gray-1000"
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
    <div className="flex flex-col gap-4 bg-background-100 px-6 py-8 md:px-8 md:py-10">
      <div className="text-label-12 font-medium text-gray-800">
        {label}
      </div>
      <div className="flex min-h-[64px] items-center">{children}</div>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-copy-16 font-semibold tracking-[-0.01em] text-gray-1000">
        {title}
      </h3>
      <p className="mt-2 text-copy-14 leading-relaxed text-gray-900">
        {body}
      </p>
    </div>
  );
}
