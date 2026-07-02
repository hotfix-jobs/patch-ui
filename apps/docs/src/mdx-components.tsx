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
    // Custom components
    ComponentPreview,
    PropsTable,
    CompoundComponents,
    Callout,
    Install,

    // Override rehype-pretty-code figures
    figure: (props: React.ComponentProps<"figure">) => {
      if ("data-rehype-pretty-code-figure" in props) {
        return <CodeFigure {...props} />;
      }
      return <figure {...props} />;
    },

    // Typography
    h1: (props: React.ComponentProps<"h1">) => (
      <h1
        className="text-3xl font-bold tracking-tight text-gray-1000"
        {...props}
      />
    ),
    h2: (props: React.ComponentProps<"h2">) => (
      <h2
        className="mt-10 mb-4 border-b border-gray-alpha-400 pb-2 text-xl font-semibold tracking-tight text-gray-1000 first:mt-0"
        {...props}
      />
    ),
    h3: (props: React.ComponentProps<"h3">) => (
      <h3
        className="mt-8 mb-3 text-lg font-semibold tracking-tight text-gray-1000"
        {...props}
      />
    ),
    h4: (props: React.ComponentProps<"h4">) => (
      <h4
        className="mt-6 mb-2 text-base font-semibold text-gray-1000"
        {...props}
      />
    ),
    p: (props: React.ComponentProps<"p">) => (
      <p
        className="mb-4 leading-7 text-gray-900 [&:first-child]:mt-0"
        {...props}
      />
    ),
    ul: (props: React.ComponentProps<"ul">) => (
      <ul
        className="mb-4 ml-6 list-disc text-gray-900 [&>li]:mt-1.5 [&>li]:leading-7"
        {...props}
      />
    ),
    ol: (props: React.ComponentProps<"ol">) => (
      <ol
        className="mb-4 ml-6 list-decimal text-gray-900 [&>li]:mt-1.5 [&>li]:leading-7"
        {...props}
      />
    ),
    li: (props: React.ComponentProps<"li">) => (
      <li {...props} />
    ),
    blockquote: (props: React.ComponentProps<"blockquote">) => (
      <blockquote
        className="mb-4 border-l-2 border-gray-alpha-600 pl-4 text-gray-900 italic"
        {...props}
      />
    ),
    hr: (props: React.ComponentProps<"hr">) => (
      <hr className="my-8 border-gray-alpha-400" {...props} />
    ),
    a: (props: React.ComponentProps<"a">) => (
      <a
        className="font-medium text-gray-1000 underline underline-offset-4 decoration-gray-alpha-500 hover:decoration-gray-1000 transition-colors"
        {...props}
      />
    ),
    strong: (props: React.ComponentProps<"strong">) => (
      <strong className="font-semibold text-gray-1000" {...props} />
    ),
    // Markdown tables render with the Patch UI Table primitives (dogfood).
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
