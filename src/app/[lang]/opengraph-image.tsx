import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "@/i18n";
import { profile } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} · ${profile.role.en}`;

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : "en";
  const photo = await readFile(join(process.cwd(), "public/brand/edmundo.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const facts = lang === "es" ? "Buenos Aires · Ciudadano UE · Inglés B2" : "Buenos Aires · EU citizen · English B2";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 48,
          gap: 32,
          background: "#ededed",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#121212",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            borderRadius: 40,
            background: "rgba(255,255,255,0.75)",
            border: "2px solid #ffffff",
            boxShadow: "0 30px 60px -24px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#5e5e5e", letterSpacing: 3 }}>EDMUNDOALVAREZ.COM.AR</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>{profile.name}</div>
            <div style={{ display: "flex", fontSize: 38, marginTop: 20, color: "#474747" }}>{profile.role[lang]}</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5e5e5e" }}>{facts}</div>
        </div>
        <div style={{ display: "flex", width: 380, borderRadius: 40, padding: 14, background: "rgba(255,255,255,0.75)", border: "2px solid #ffffff" }}>
          <img src={photoSrc} alt="" width={352} height={506} style={{ borderRadius: 28, objectFit: "cover", width: 352, height: 506 }} />
        </div>
      </div>
    ),
    size,
  );
}
