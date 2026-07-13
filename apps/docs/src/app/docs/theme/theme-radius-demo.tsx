"use client";

const radii = [
  ["rounded-[var(--radius-4)]", "radius-4", "Tiny controls"],
  ["rounded-[var(--radius-6)]", "radius-6", "Metadata"],
  ["rounded-[var(--radius-8)]", "radius-8", "Controls"],
  ["rounded-[var(--radius-12)]", "radius-12", "Surfaces"],
  ["rounded-[var(--radius-16)]", "radius-16", "Large chrome"],
  ["rounded-full", "radius-full", "Pills and circles"],
] as const;

export function ThemeRadiusDemo() {
  return (
    <div className="my-6 grid w-full grid-cols-2 gap-4 rounded-[var(--radius-12)] bg-base p-6 sm:grid-cols-3">
      {radii.map(([className, token, role]) => (
        <div key={token} className={`bg-layer-1 p-4 ${className}`}>
          <p className="text-mini font-medium text-ink">{token}</p>
          <p className="mt-1 text-micro text-ink-muted">{role}</p>
        </div>
      ))}
    </div>
  );
}
