import createMDX from "@next/mdx";
import { fileURLToPath } from "node:url";

const headingIdsPlugin = fileURLToPath(
  new URL("./scripts/rehype-heading-ids.mjs", import.meta.url),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [
      headingIdsPlugin,
      [
        "rehype-pretty-code",
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
