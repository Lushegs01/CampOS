import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "CampOS — One operating system for the whole campus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "90px",
          background: "radial-gradient(120% 120% at 75% 0%, #14213F 0%, #090B11 45%, #05060A 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* mark */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 48 }}>
          <svg width="84" height="84" viewBox="0 0 56 56" fill="none">
            <path
              d="M46 20 V13 a5 5 0 0 0-5-5 H13 a5 5 0 0 0-5 5 V43 a5 5 0 0 0 5 5 H41 a5 5 0 0 0 5-5 V36"
              stroke="#2E6BFF"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="0" y="22.5" width="9" height="11" rx="3" fill="#2E6BFF" />
          </svg>
          <span style={{ marginLeft: 22, fontSize: 40, fontWeight: 700, color: "#F4F7FF", letterSpacing: "-0.02em" }}>
            CampOS
          </span>
        </div>

        <h1
          style={{
            fontSize: 92,
            fontWeight: 700,
            color: "#F4F7FF",
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            margin: 0,
          }}
        >
          The whole campus,
        </h1>
        <h1
          style={{
            fontSize: 92,
            fontWeight: 700,
            color: "#5B8CFF",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            margin: 0,
            fontStyle: "italic",
          }}
        >
          running as one.
        </h1>
        <p style={{ fontSize: 32, color: "#828C9E", marginTop: 36, letterSpacing: "-0.01em" }}>
          Attendance · Housing · Social · Enrollment — unified and verified.
        </p>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 90,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 24,
            color: "#34D399",
            fontFamily: "monospace",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#34D399" }} />
          Live across 60+ campuses
        </div>
      </div>
    ),
    { ...size }
  );
}
