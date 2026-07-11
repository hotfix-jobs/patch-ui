import type { MDXComponents } from "mdx/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@patchui/react";
import { ComponentPreview, PropsTable, CompoundComponents, CodeFigure, Callout, Install } from "@/components/mdx";

type CellAlign = "left" | "center" | "right" | undefined;
const narrowAlign = (a: string | undefined): CellAlign =>
  a === "center" || a === "right" || a === "left" ? a : undefined;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ComponentPreview,
    PropsTable,
    CompoundComponents,
    Callout,
    Install,

    figure: (props: React.ComponentProps<"figure">) => {
      if ("data-rehype-pretty-code-figure" in props) {
        return <CodeFigure {...props} />;
      }
      return <figure {...props} />;
    },

    h1: (props: React.ComponentProps<"h1">) => (
      <h1 className="text-title1 text-ink" {...props} />
    ),
    h2: (props: React.ComponentProps<"h2">) => (
      <h2
        className="mt-10 mb-4 text-title2 text-ink first:mt-0"
        {...props}
      />
    ),
    h3: (props: React.ComponentProps<"h3">) => (
      <h3 className="mt-8 mb-3 text-title3 text-ink" {...props} />
    ),
    h4: (props: React.ComponentProps<"h4">) => (
      <h4 className="mt-6 mb-2 text-regular font-medium text-ink" {...props} />
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
        <Table {...props} />
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
