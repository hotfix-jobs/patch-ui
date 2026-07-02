import { Sidebar } from "@/components/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:flex">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
      </main>
    </div>
  );
}
