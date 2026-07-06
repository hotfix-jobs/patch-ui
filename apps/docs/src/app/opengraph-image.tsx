import { ImageResponse } from "next/og";

export const alt = "Patch UI: accessible React components, copy-in";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Root OpenGraph image inherited by pages that do not define their own. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#000",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#ededed",
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 600,
            }}
          >
            P
          </div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>Patch UI</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Components you own, not import.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#b8b8b8",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Copy-in React components. Base UI accessibility, Tailwind v4
            tokens, shadcn distribution.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#8f8f8f",
          }}
        >
          <div>ui.hotfix.jobs</div>
          <div
            style={{
              fontFamily: "monospace",
              background: "#171717",
              padding: "10px 18px",
              borderRadius: 6,
              color: "#ededed",
            }}
          >
            $ npx shadcn add @patchui/all
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
