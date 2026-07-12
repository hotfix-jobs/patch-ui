import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, type ReactNode } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@patchui/react";
import { ComponentPreview, SourceCode, Usage, CopyPage, CopyCommand, PageNavigation, PageHeader, PropsTable, CompoundComponents, CodeFigure, Callout, Install, ResponsiveBlockPreview } from "@/components/mdx";
import { HeadingAnchor } from "@/components/mdx/heading-anchor";

type CellAlign = "left" | "center" | "right" | undefined;
const narrowAlign = (a: string | undefined): CellAlign =>
  a === "center" || a === "right" || a === "left" ? a : undefined;

function headingText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (isValidElement<{ children?: ReactNode }>(child)) return headingText(child.props.children);
      return "";
    })
    .join("");
}

function headingId(children: ReactNode): string {
  return headingText(children)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const headingCounts = new Map<string, number>();
  const resolveHeadingId = (children: ReactNode, explicitId?: string) => {
    if (explicitId) return explicitId;
    const base = headingId(children);
    const count = headingCounts.get(base) ?? 0;
    headingCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  return {
    ComponentPreview,
    SourceCode,
    Usage,
    CopyPage,
    CopyCommand,
    PageNavigation,
    PageHeader,
    PropsTable,
    CompoundComponents,
    Callout,
    Install,
    ResponsiveBlockPreview,

    figure: (props: React.ComponentProps<"figure">) => {
      if ("data-rehype-pretty-code-figure" in props) {
        return <CodeFigure {...props} />;
      }
      return <figure {...props} />;
    },

    h1: ({ children, id, ...props }: React.ComponentProps<"h1">) => (
      <h1 id={id ?? headingId(children)} className="text-title1 text-ink" {...props}>{children}</h1>
    ),
    h2: ({ children, id, ...props }: React.ComponentProps<"h2">) => {
      const resolvedId = resolveHeadingId(children, id);
      const label = headingText(children);
      return (
        <h2 id={resolvedId} className="group/heading mt-10 mb-4 flex scroll-mt-6 items-center gap-2 text-title2 text-ink first:mt-0" {...props}>
          <span>{children}</span><HeadingAnchor id={resolvedId} label={label} />
        </h2>
      );
    },
    h3: ({ children, id, ...props }: React.ComponentProps<"h3">) => {
      const resolvedId = resolveHeadingId(children, id);
      const label = headingText(children);
      return (
        <h3 id={resolvedId} className="group/heading mt-8 mb-3 flex scroll-mt-6 items-center gap-2 text-title3 text-ink" {...props}>
          <span>{children}</span><HeadingAnchor id={resolvedId} label={label} />
        </h3>
      );
    },
    h4: ({ children, id, ...props }: React.ComponentProps<"h4">) => (
      <h4 id={id ?? headingId(children)} className="mt-6 mb-2 text-regular font-medium text-ink" {...props}>{children}</h4>
    ),
    p: (props: React.ComponentProps<"p">) => (
      <p
        className="mb-4 text-regular text-ink [&:first-child]:mt-0"
        {...props}
      />
    ),
    ul: (props: React.ComponentProps<"ul">) => (
      <ul
        className="mb-4 ml-6 list-disc text-regular text-ink [&>li]:mt-1.5"
        {...props}
      />
    ),
    ol: (props: React.ComponentProps<"ol">) => (
      <ol
        className="mb-4 ml-6 list-decimal text-regular text-ink [&>li]:mt-1.5"
        {...props}
      />
    ),
    li: (props: React.ComponentProps<"li">) => (
      <li {...props} />
    ),
    blockquote: (props: React.ComponentProps<"blockquote">) => (
      <blockquote
        className="mb-4 border-l-2 border-hairline pl-4 text-regular text-ink italic"
        {...props}
      />
    ),
    hr: (props: React.ComponentProps<"hr">) => (
      <hr className="my-8 border-hairline" {...props} />
    ),
    a: (props: React.ComponentProps<"a">) => (
      <a
        className="text-small font-medium text-ink underline underline-offset-4 decoration-hairline-tertiary transition-colors duration-[var(--duration-state)] ease-[var(--ease-standard)] hover:decoration-ink"
        {...props}
      />
    ),
    strong: (props: React.ComponentProps<"strong">) => (
      <strong className="font-semibold text-ink" {...props} />
    ),
    table: (props: React.ComponentProps<"table">) => (
      <div className="my-6">
        <Table bordered {...props} />
      </div>
    ),
    thead: (props: React.ComponentProps<"thead">) => <TableHeader {...props} />,
    tbody: (props: React.ComponentProps<"tbody">) => <TableBody {...props} />,
    tr: (props: React.ComponentProps<"tr">) => <TableRow {...props} />,
    th: ({ align, ...props }: React.ComponentProps<"th">) => (
      <TableHead align={narrowAlign(align)} {...props} />
    ),
    td: ({ align, ...props }: React.ComponentProps<"td">) => (
      <TableCell align={narrowAlign(align)} {...props} />
    ),

    ...components,
  };
}
