import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "@/i18n";
import { profile } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} · ${profile.role.en}`;

const STACK = ["React", "React Native", "TypeScript", "Node.js", "Laravel"];

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : "en";
  const photo = await readFile(join(process.cwd(), "public/brand/edmundo.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const facts =
    lang === "es"
      ? ["Buenos Aires, Argentina", "Ciudadano UE", "Inglés B2"]
      : ["Buenos Aires, Argentina", "EU citizen", "English B2"];
  const available = lang === "es" ? "Disponible para posiciones full-time en remoto" : "Open to full-time remote roles";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 44,
          gap: 28,
          background: "#ededed",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#121212",
        }}
      >
        {/* Tarjeta de texto */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "44px 52px",
            borderRadius: 40,
            background: "rgba(255,255,255,0.8)",
            border: "2px solid #ffffff",
            boxShadow: "0 30px 60px -24px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              background: "#ffffff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: "#1fa855" }} />
            {available}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 80, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
              <span>Edmundo</span>
              <span style={{ fontWeight: 400, color: "#555555", marginLeft: 20 }}>Alvarez</span>
            </div>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 700, marginTop: 18, color: "#cf2d21" }}>{profile.role[lang]}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
              {STACK.map((s) => (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    padding: "7px 14px",
                    borderRadius: 999,
                    background: "#ffffff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    fontSize: 19,
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 22, color: "#5e5e5e" }}>
            <div style={{ display: "flex" }}>{facts.join("  ·  ")}</div>
            <div style={{ display: "flex", color: "#121212" }}>edmundoalvarez.com.ar</div>
          </div>
        </div>

        {/* Foto cuadrada, como en el sitio */}
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            padding: 14,
            borderRadius: 40,
            background: "rgba(255,255,255,0.8)",
            border: "2px solid #ffffff",
            boxShadow: "0 30px 60px -24px rgba(0,0,0,0.25)",
          }}
        >
          <img src={photoSrc} alt="" width={330} height={330} style={{ borderRadius: 28, objectFit: "cover", width: 330, height: 330 }} />
        </div>
      </div>
    ),
    size,
  );
}
