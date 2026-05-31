import { ImageResponse } from "next/og";

export const alt = "Patch UI - accessible React components, copy-in";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: "-0.04em" }}>
          Patch UI
        </div>
        <div
          style={{
            fontSize: 38,
            marginTop: 28,
            color: "#a1a1a1",
            lineHeight: 1.35,
            maxWidth: 920,
          }}
        >
          Accessible, token-driven React components. Copy them into your repo
          with one command.
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 56,
            color: "#737373",
            fontFamily: "monospace",
          }}
        >
          npx shadcn add @patchui/button
        </div>
      </div>
    ),
    { ...size },
  );
}
