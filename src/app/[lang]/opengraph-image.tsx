import { ImageResponse } from "next/og";
import { hasLocale } from "@/i18n";
import { profile } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} · ${profile.role.en}`;

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#111218",
          color: "#f1f1f1",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#f5574b", letterSpacing: 4 }}>
          EDMUNDOALVAREZ.COM.AR
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1 }}>
            {profile.name}
            <span style={{ color: "#f5574b" }}>.</span>
          </div>
          <div style={{ fontSize: 44, marginTop: 24, color: "#c9cad3" }}>{profile.role[lang]}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9c9eab" }}>
          React Native · React · TypeScript · Node.js · Laravel
        </div>
      </div>
    ),
    size,
  );
}
