import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #3a3a3a, #0e0e0e)",
          color: "#fff",
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        EA
      </div>
    ),
    size,
  );
}
