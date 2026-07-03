"use client";

/**
 * Color scale swatch rows. Class names must be written out literally so
 * Tailwind's compile-time scanner sees them; a `bg-${token}` template
 * string would be purged.
 */
export function ColorScales() {
  return (
    <div className="flex flex-col gap-6 rounded-[var(--radius-12)] border-[0.5px] border-gray-alpha-400 bg-background-100 p-6">
      <Scale name="Gray">
        <Swatch className="bg-gray-100" label="100" />
        <Swatch className="bg-gray-200" label="200" />
        <Swatch className="bg-gray-300" label="300" />
        <Swatch className="bg-gray-400" label="400" />
        <Swatch className="bg-gray-500" label="500" />
        <Swatch className="bg-gray-600" label="600" />
        <Swatch className="bg-gray-700" label="700" />
        <Swatch className="bg-gray-800" label="800" />
        <Swatch className="bg-gray-900" label="900" />
        <Swatch className="bg-gray-1000" label="1000" />
      </Scale>
      <Scale name="Blue">
        <Swatch className="bg-blue-100" label="100" />
        <Swatch className="bg-blue-200" label="200" />
        <Swatch className="bg-blue-300" label="300" />
        <Swatch className="bg-blue-400" label="400" />
        <Swatch className="bg-blue-500" label="500" />
        <Swatch className="bg-blue-600" label="600" />
        <Swatch className="bg-blue-700" label="700" />
        <Swatch className="bg-blue-800" label="800" />
        <Swatch className="bg-blue-900" label="900" />
        <Swatch className="bg-blue-1000" label="1000" />
      </Scale>
      <Scale name="Red">
        <Swatch className="bg-red-100" label="100" />
        <Swatch className="bg-red-200" label="200" />
        <Swatch className="bg-red-300" label="300" />
        <Swatch className="bg-red-400" label="400" />
        <Swatch className="bg-red-500" label="500" />
        <Swatch className="bg-red-600" label="600" />
        <Swatch className="bg-red-700" label="700" />
        <Swatch className="bg-red-800" label="800" />
        <Swatch className="bg-red-900" label="900" />
        <Swatch className="bg-red-1000" label="1000" />
      </Scale>
      <Scale name="Amber">
        <Swatch className="bg-amber-100" label="100" />
        <Swatch className="bg-amber-200" label="200" />
        <Swatch className="bg-amber-300" label="300" />
        <Swatch className="bg-amber-400" label="400" />
        <Swatch className="bg-amber-500" label="500" />
        <Swatch className="bg-amber-600" label="600" />
        <Swatch className="bg-amber-700" label="700" />
        <Swatch className="bg-amber-800" label="800" />
        <Swatch className="bg-amber-900" label="900" />
        <Swatch className="bg-amber-1000" label="1000" />
      </Scale>
      <Scale name="Green">
        <Swatch className="bg-green-100" label="100" />
        <Swatch className="bg-green-200" label="200" />
        <Swatch className="bg-green-300" label="300" />
        <Swatch className="bg-green-400" label="400" />
        <Swatch className="bg-green-500" label="500" />
        <Swatch className="bg-green-600" label="600" />
        <Swatch className="bg-green-700" label="700" />
        <Swatch className="bg-green-800" label="800" />
        <Swatch className="bg-green-900" label="900" />
        <Swatch className="bg-green-1000" label="1000" />
      </Scale>
      <Scale name="Teal">
        <Swatch className="bg-teal-100" label="100" />
        <Swatch className="bg-teal-200" label="200" />
        <Swatch className="bg-teal-300" label="300" />
        <Swatch className="bg-teal-400" label="400" />
        <Swatch className="bg-teal-500" label="500" />
        <Swatch className="bg-teal-600" label="600" />
        <Swatch className="bg-teal-700" label="700" />
        <Swatch className="bg-teal-800" label="800" />
        <Swatch className="bg-teal-900" label="900" />
        <Swatch className="bg-teal-1000" label="1000" />
      </Scale>
      <Scale name="Purple">
        <Swatch className="bg-purple-100" label="100" />
        <Swatch className="bg-purple-200" label="200" />
        <Swatch className="bg-purple-300" label="300" />
        <Swatch className="bg-purple-400" label="400" />
        <Swatch className="bg-purple-500" label="500" />
        <Swatch className="bg-purple-600" label="600" />
        <Swatch className="bg-purple-700" label="700" />
        <Swatch className="bg-purple-800" label="800" />
        <Swatch className="bg-purple-900" label="900" />
        <Swatch className="bg-purple-1000" label="1000" />
      </Scale>
      <Scale name="Pink">
        <Swatch className="bg-pink-100" label="100" />
        <Swatch className="bg-pink-200" label="200" />
        <Swatch className="bg-pink-300" label="300" />
        <Swatch className="bg-pink-400" label="400" />
        <Swatch className="bg-pink-500" label="500" />
        <Swatch className="bg-pink-600" label="600" />
        <Swatch className="bg-pink-700" label="700" />
        <Swatch className="bg-pink-800" label="800" />
        <Swatch className="bg-pink-900" label="900" />
        <Swatch className="bg-pink-1000" label="1000" />
      </Scale>
    </div>
  );
}

function Scale({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-label-12 text-gray-800">{name}</div>
      <div className="grid grid-cols-10 gap-1">{children}</div>
    </div>
  );
}

function Swatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`aspect-square w-full rounded-[var(--radius-6)] border-[0.5px] border-gray-alpha-400 ${className}`}
      />
      <div className="text-label-11 text-gray-700">{label}</div>
    </div>
  );
}

export function TypographySamples() {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-12)] border-[0.5px] border-gray-alpha-400 bg-background-100 p-6">
      <Sample cls="text-heading-56" name="text-heading-56" text="Heading 56" />
      <Sample cls="text-heading-40" name="text-heading-40" text="Heading 40" />
      <Sample cls="text-heading-24" name="text-heading-24" text="Heading 24" />
      <Sample cls="text-heading-16" name="text-heading-16" text="Heading 16" />
      <Sample cls="text-copy-18" name="text-copy-18" text="Copy 18: lead paragraphs" />
      <Sample cls="text-copy-14" name="text-copy-14" text="Copy 14: default body text" />
      <Sample cls="text-copy-13" name="text-copy-13" text="Copy 13: body inside dense surfaces" />
      <Sample cls="text-label-14" name="text-label-14" text="Label 14: form labels" />
      <Sample cls="text-label-12" name="text-label-12" text="Label 12: metadata + captions" />
      <Sample cls="text-button-14" name="text-button-14" text="Button 14: control label text" />
    </div>
  );
}

function Sample({
  cls,
  name,
  text,
}: {
  cls: string;
  name: string;
  text: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-4">
      <span className={`${cls} text-gray-1000`}>{text}</span>
      <span className="text-label-11 text-gray-700">.{name}</span>
    </div>
  );
}

export function RadiusSamples() {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-[var(--radius-12)] border-[0.5px] border-gray-alpha-400 bg-background-100 p-6 sm:grid-cols-4">
      <RadiusCell label="radius-6" cls="rounded-[var(--radius-6)]" />
      <RadiusCell label="radius-12" cls="rounded-[var(--radius-12)]" />
      <RadiusCell label="radius-16" cls="rounded-[var(--radius-16)]" />
      <RadiusCell label="radius-full" cls="rounded-full" />
    </div>
  );
}

function RadiusCell({ label, cls }: { label: string; cls: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`h-16 w-full border-[0.5px] border-gray-alpha-400 bg-gray-alpha-100 ${cls}`}
      />
      <div className="text-label-11 text-gray-700">{label}</div>
    </div>
  );
}
