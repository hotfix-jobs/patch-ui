import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  clean: true,
  target: "es2018",
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@base-ui/react",
    /^@base-ui\/react\//,
    "motion",
    /^motion\//,
    "@floating-ui/react",
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});
