import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#07080B",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(61,107,255,0.35), transparent 45%), radial-gradient(circle at 85% 85%, rgba(198,255,62,0.18), transparent 40%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #3D6BFF, #C6FF3E)",
              color: "#07080B",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            Z
          </div>
          <span style={{ fontSize: 32, fontWeight: 700, color: "#F4F6FA", letterSpacing: -0.5 }}>
            ZYNEX
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 48,
            maxWidth: 920,
          }}
        >
          <span style={{ fontSize: 66, fontWeight: 700, color: "#F4F6FA", lineHeight: 1.08 }}>
            AI-built software.
          </span>
          <span style={{ fontSize: 66, fontWeight: 700, color: "#F4F6FA", lineHeight: 1.08 }}>
            Shipped in days.
          </span>
        </div>

        <span style={{ marginTop: 32, fontSize: 26, color: "#8B93A7" }}>
          Websites, apps, dashboards and AI agents — built by ZYNEX.
        </span>
      </div>
    ),
    { ...size },
  );
}
