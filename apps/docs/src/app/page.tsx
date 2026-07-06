import { redirect } from "next/navigation";

// Patch UI has no marketing landing: the docs are the product. Root
// resolves straight to the docs index.
export default function Home() {
  redirect("/docs");
}
