import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, locales, SITE_URL } from "@/i18n";
import { profile } from "@/content/site";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Backdrop } from "@/components/backdrop";
import { Providers } from "@/components/motion/motion-root";
import "../globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const viewport: Viewport = { themeColor: "#ededed", colorScheme: "light" };

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const title = `${profile.name} · ${profile.role[lang]}`;
  const description = profile.metaDescription[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ${profile.name}` },
    description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    keywords: [
      "Edmundo Alvarez",
      "Full Stack Developer",
      "React Native Developer",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Laravel",
      "Expo",
      "Buenos Aires",
      "Remote",
      "Lengar Studio",
      "Valoo",
    ],
    category: "technology",
    formatDetection: { email: false, telephone: false, address: false },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      title,
      description,
      url: `/${lang}`,
      locale: lang === "es" ? "es_AR" : "en_US",
      alternateLocale: lang === "es" ? "en_US" : "es_AR",
    },
    twitter: { card: "summary_large_image", title, description },
    other: { "profile:first_name": "Edmundo", "profile:last_name": "Alvarez" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${manrope.variable} ${plexMono.variable} antialiased`}>
      <body className="relative isolate flex min-h-dvh flex-col overflow-x-clip font-sans">
        <Providers>
          <Backdrop />
          <SiteHeader lang={lang} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter lang={lang} />
        </Providers>
      </body>
    </html>
  );
}
