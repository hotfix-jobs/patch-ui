"use client";

import { Badge, Button, cn } from "@patchui/react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookmarkSimple,
  CaretDown,
  Check,
  Clock,
  CurrencyDollar,
  FunnelSimple,
  MagnifyingGlass,
  MapPin,
  Moon,
  SlidersHorizontal,
  Star,
  Sun,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const variants = [
  { key: "A", name: "Hotfix shell, softer surfaces" },
  { key: "B", name: "Editorial feed" },
  { key: "C", name: "Focused search" },
] as const;

type VariantKey = (typeof variants)[number]["key"];

const jobs = [
  {
    company: "Northstar",
    title: "Senior Product Designer",
    location: "Remote, US",
    salary: "$155k – $185k",
    age: "2h",
    tags: ["Design systems", "B2B SaaS"],
    mark: "N",
    featured: true,
  },
  {
    company: "Relay Health",
    title: "Staff Frontend Engineer",
    location: "New York, NY",
    salary: "$180k – $215k",
    age: "5h",
    tags: ["React", "TypeScript"],
    mark: "R",
    featured: false,
  },
  {
    company: "Fieldwork",
    title: "Product Manager, Growth",
    location: "Remote",
    salary: "$145k – $175k",
    age: "1d",
    tags: ["Growth", "Marketplace"],
    mark: "F",
    featured: false,
  },
  {
    company: "Canopy",
    title: "Senior Data Analyst",
    location: "Chicago, IL",
    salary: "$125k – $150k",
    age: "1d",
    tags: ["SQL", "Analytics"],
    mark: "C",
    featured: false,
  },
] as const;

function Logo() {
  return (
    <div className="grid size-8 place-items-center text-title3 font-bold tracking-[-0.12em]" aria-label="Hotfix">
      H
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("patch-ui-theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <Button
      aria-label={dark ? "Use light mode" : "Use dark mode"}
      variant="tertiary"
      icon={dark ? <Sun /> : <Moon />}
      onClick={toggleTheme}
    />
  );
}

function Header({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between bg-layer-1 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-8">
        <Logo />
        {!minimal && (
          <nav className="hidden items-center gap-6 text-small text-ink-muted md:flex">
            <a className="font-medium text-ink" href="#">Jobs</a>
            <a href="#">Companies</a>
            <a href="#">Employers</a>
          </nav>
        )}
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button aria-label="Job alerts" variant="tertiary" icon={<Bell />} />
        <Button>Sign in</Button>
      </div>
    </header>
  );
}

function SearchBox({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("flex bg-layer-1 shadow-[var(--shadow-card)]", compact ? "rounded-[var(--radius-8)] p-2" : "rounded-[var(--radius-12)] p-2.5")}>
      <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
        <MagnifyingGlass className="size-5 shrink-0 text-ink-subtle" />
        <input className="min-w-0 flex-1 bg-transparent text-small outline-none placeholder:text-ink-subtle" defaultValue="Product designer" aria-label="Search jobs" />
      </label>
      <div className="hidden w-px bg-hairline-soft sm:block" />
      <label className="hidden min-w-0 flex-1 items-center gap-3 px-4 sm:flex">
        <MapPin className="size-5 shrink-0 text-ink-subtle" />
        <input className="min-w-0 flex-1 bg-transparent text-small outline-none placeholder:text-ink-subtle" defaultValue="Remote" aria-label="Location" />
      </label>
      <Button icon={<MagnifyingGlass />} className="sm:px-6">Search</Button>
    </div>
  );
}

function FilterControl({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <button className={cn(
      "inline-flex h-9 items-center gap-2 rounded-[var(--radius-8)] px-3.5 text-small font-medium transition-colors",
      active ? "bg-fill-2 text-ink" : "bg-layer-1 text-ink-muted hover:bg-layer-2",
    )}>
      {children}
      <CaretDown className="size-3.5" />
    </button>
  );
}

function CompanyMark({ job, size = "md" }: { job: (typeof jobs)[number]; size?: "md" | "lg" }) {
  return <span className={cn("grid shrink-0 place-items-center rounded-[var(--radius-8)] bg-fill-1 font-semibold text-ink-muted", size === "lg" ? "size-14 text-title3" : "size-11 text-regular")}>{job.mark}</span>;
}

function JobRow({ job, selected = false, roomy = false }: { job: (typeof jobs)[number]; selected?: boolean; roomy?: boolean }) {
  return (
    <article className={cn(
      "group rounded-[var(--radius-12)] bg-layer-1 transition-[background-color,box-shadow,transform] duration-[var(--duration-state)]",
      roomy ? "p-6" : "p-4",
      selected ? "bg-layer-2" : "hover:shadow-[var(--shadow-card)]",
    )}>
      <div className="flex gap-3.5">
        <CompanyMark job={job} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className={cn("font-semibold tracking-[-0.01em]", roomy ? "text-large" : "text-regular")}>{job.title}</h2>
              <p className="mt-0.5 text-small text-ink-muted">{job.company}</p>
            </div>
            <button aria-label={`Save ${job.title}`} className="rounded-full p-2 text-ink-subtle hover:bg-layer-2 hover:text-ink">
              <BookmarkSimple className="size-5" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-small text-ink-muted">
            <span className="flex items-center gap-1.5"><MapPin className="size-4" />{job.location}</span>
            <span className="flex items-center gap-1.5"><CurrencyDollar className="size-4" />{job.salary}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {job.tags.map((tag) => <span key={tag} className="rounded-[var(--radius-6)] bg-fill-1 px-2.5 py-1 text-mini text-ink-muted">{tag}</span>)}
            {job.featured && <span className="flex items-center gap-1 rounded-[var(--radius-6)] bg-fill-2 px-2.5 py-1 text-mini font-medium text-ink"><Star weight="fill" /> Featured</span>}
            <span className="ml-auto text-mini text-ink-subtle">{job.age}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function JobDetail() {
  const job = jobs[0];
  return (
    <article className="rounded-[var(--radius-12)] bg-layer-1 p-6 shadow-[var(--shadow-card)] lg:p-8">
      <div className="flex items-start gap-4">
        <CompanyMark job={job} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-small font-medium text-ink-muted">{job.company}</p>
          <h1 className="mt-1 text-title2 font-semibold tracking-[-0.025em]">{job.title}</h1>
          <p className="mt-2 text-small text-ink-muted">Remote, US · Full-time · {job.salary}</p>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <Button className="flex-1">Apply now</Button>
        <Button aria-label="Save job" variant="secondary" icon={<BookmarkSimple />} />
      </div>
      <div className="my-8 h-px bg-hairline-soft" />
      <h2 className="text-large font-semibold">About the role</h2>
      <div className="mt-3 space-y-4 text-small leading-7 text-ink-muted">
        <p>Northstar is looking for a product designer to shape clear, useful workflows for growing teams. You will partner closely with product and engineering from early discovery through launch.</p>
        <p>This role is a great fit for someone who enjoys simplifying complex systems, building strong interaction patterns, and contributing to a thoughtful design culture.</p>
      </div>
      <h2 className="mt-8 text-large font-semibold">What you’ll do</h2>
      <ul className="mt-3 space-y-3 text-small text-ink-muted">
        {["Own end-to-end design for a core product area", "Turn research into focused product decisions", "Help evolve a practical design system"].map((item) => (
          <li className="flex gap-2.5" key={item}><Check className="mt-0.5 size-4 shrink-0 text-primary" weight="bold" />{item}</li>
        ))}
      </ul>
    </article>
  );
}

function VariantA() {
  return (
    <div className="min-h-full overflow-y-auto bg-base pb-28">
      <Header />
      <div className="sticky top-0 z-20 bg-base/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1180px]">
          <SearchBox compact />
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <FilterControl active>Remote</FilterControl><FilterControl>Experience</FilterControl><FilterControl>Salary</FilterControl><FilterControl>Job type</FilterControl>
            <Button variant="tertiary" icon={<SlidersHorizontal />} className="ml-auto">All filters</Button>
          </div>
        </div>
      </div>
      <main className="mx-auto w-full max-w-[1180px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-small font-medium text-ink-muted">248 jobs</p>
          <button className="text-small text-ink-muted">Newest <CaretDown className="inline size-3" /></button>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {[...jobs, ...jobs].map((job, index) => <JobRow key={`${job.title}-${index}`} job={job} />)}
        </div>
      </main>
    </div>
  );
}

function VariantB() {
  return (
    <div className="min-h-full overflow-y-auto bg-base pb-28">
      <Header />
      <section className="bg-layer-1 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <Badge variant="soft" className="mb-5 border-0 bg-fill-1 text-ink-muted">New roles added daily</Badge>
          <h1 className="text-title1 font-semibold tracking-[-0.035em]">Find work worth doing.</h1>
          <p className="mx-auto mt-3 max-w-xl text-regular text-ink-muted">Clear salaries, useful filters, and companies that respect your time.</p>
          <div className="mx-auto mt-8 max-w-3xl"><SearchBox /></div>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[220px_1fr]">
          <aside>
            <div className="flex items-center justify-between lg:block"><h2 className="font-semibold">Refine results</h2><Button variant="tertiary" size="sm" className="lg:hidden" icon={<FunnelSimple />}>Filters</Button></div>
            <div className="mt-5 hidden space-y-7 lg:block">
              {["Date posted", "Experience level", "Workplace", "Salary range"].map((label) => <div key={label}><p className="text-small font-medium">{label}</p><button className="mt-2 flex w-full items-center justify-between rounded-[var(--radius-8)] bg-layer-1 px-3 py-2.5 text-left text-small text-ink-muted">Any <CaretDown /></button></div>)}
              <label className="flex items-center gap-2.5 text-small text-ink-muted"><span className="grid size-5 place-items-center rounded-[var(--radius-4)] bg-primary text-on-primary"><Check className="size-3" weight="bold" /></span>Show salary only</label>
            </div>
          </aside>
          <section>
            <div className="mb-5 flex items-center justify-between"><div><h2 className="text-title2 font-semibold tracking-[-0.02em]">Recommended for you</h2><p className="mt-1 text-small text-ink-muted">Based on product design and remote work</p></div><Button variant="secondary" className="hidden border-0 bg-fill-1 sm:inline-flex" icon={<Bell />}>Create alert</Button></div>
            <div className="grid gap-4 sm:grid-cols-2">{jobs.map((job) => <JobRow key={job.title} job={job} roomy />)}</div>
          </section>
        </div>
      </main>
    </div>
  );
}

function VariantC() {
  return (
    <div className="min-h-full overflow-y-auto bg-layer-1 pb-28">
      <Header minimal />
      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-small font-medium text-ink-muted">248 open roles</p>
          <h1 className="mt-2 text-title1 font-semibold tracking-[-0.04em]">Your next good job is here.</h1>
          <p className="mt-4 text-large text-ink-muted">Search focused roles from companies that share the details up front.</p>
        </div>
        <div className="mt-8 rounded-[var(--radius-12)] bg-base p-3 sm:p-4"><SearchBox compact /></div>
        <div className="mt-5 flex flex-wrap gap-2"><FilterControl>Role</FilterControl><FilterControl active>Remote</FilterControl><FilterControl>$120k+</FilterControl><FilterControl>Company size</FilterControl></div>
        <section className="mt-12">
          <div className="flex items-end justify-between"><div><h2 className="text-title2 font-semibold">Fresh matches</h2><p className="mt-1 text-small text-ink-muted">Updated just now</p></div><button className="text-small font-medium text-ink">View all 248</button></div>
          <div className="mt-5 divide-y divide-hairline-soft">{jobs.map((job) => (
            <article key={job.title} className="group flex gap-4 py-6 first:pt-0">
              <CompanyMark job={job} />
              <div className="min-w-0 flex-1 sm:grid sm:grid-cols-[1fr_auto] sm:gap-8">
                <div><h3 className="text-large font-semibold group-hover:text-ink-muted">{job.title}</h3><p className="mt-1 text-small text-ink-muted">{job.company} · {job.location}</p><div className="mt-3 flex gap-2">{job.tags.map((tag) => <span key={tag} className="text-mini text-ink-subtle">{tag}</span>)}</div></div>
                <div className="mt-3 flex items-center justify-between sm:mt-0 sm:flex-col sm:items-end"><span className="text-small font-medium">{job.salary}</span><span className="flex items-center gap-1 text-mini text-ink-subtle"><Clock />{job.age}</span></div>
              </div>
            </article>
          ))}</div>
        </section>
        <section className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[var(--radius-12)] bg-fill-1 p-6 sm:flex-row sm:items-center">
          <div><h2 className="text-large font-semibold">Let the right jobs come to you</h2><p className="mt-1 text-small text-ink-muted">Get a concise email when a strong match is posted.</p></div><Button icon={<Bell />}>Create an alert</Button>
        </section>
      </main>
    </div>
  );
}

function PrototypeSwitcher({ current }: { current: VariantKey }) {
  const router = useRouter();
  const currentIndex = variants.findIndex((item) => item.key === current);
  const go = (offset: number) => {
    const next = variants[(currentIndex + offset + variants.length) % variants.length];
    router.replace(`?variant=${next.key}`, { scroll: false });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.matches("input, textarea, [contenteditable]")) return;
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (process.env.NODE_ENV === "production") return null;
  const selected = variants[currentIndex];
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-ink p-1.5 text-base shadow-modal">
      <button onClick={() => go(-1)} aria-label="Previous variant" className="grid size-9 place-items-center rounded-full text-base hover:bg-white/10"><ArrowLeft /></button>
      <span className="min-w-44 px-3 text-center text-small font-medium text-base">{selected.key} · {selected.name}</span>
      <button onClick={() => go(1)} aria-label="Next variant" className="grid size-9 place-items-center rounded-full text-base hover:bg-white/10"><ArrowRight /></button>
    </div>
  );
}

export function JobBoardPrototype() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("variant")?.toUpperCase();
  const current: VariantKey = variants.some((item) => item.key === requested) ? requested as VariantKey : "A";

  return (
    <div className="job-board-prototype h-screen overflow-hidden bg-base text-ink">
      {current === "A" && <VariantA />}
      {current === "B" && <VariantB />}
      {current === "C" && <VariantC />}
      <PrototypeSwitcher current={current} />
    </div>
  );
}
