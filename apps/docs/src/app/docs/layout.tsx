import { Sidebar } from "@/components/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
      </main>
    </>
  );
}
