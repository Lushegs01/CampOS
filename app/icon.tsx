import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(140deg, #0E1730, #06070B)",
          borderRadius: "44px",
          border: "4px solid rgba(46,107,255,0.5)",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 56 56" fill="none">
          <path
            d="M46 20 V13 a5 5 0 0 0-5-5 H13 a5 5 0 0 0-5 5 V43 a5 5 0 0 0 5 5 H41 a5 5 0 0 0 5-5 V36"
            stroke="#2E6BFF"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="0" y="22.5" width="9" height="11" rx="3" fill="#2E6BFF" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
