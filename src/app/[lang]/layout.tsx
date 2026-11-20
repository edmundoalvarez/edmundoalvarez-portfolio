import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, locales, SITE_URL } from "@/i18n";
import { profile } from "@/content/site";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const title = `${profile.name} · ${profile.role[lang]}`;
  const description = profile.summary[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ${profile.name}` },
    description,
    authors: [{ name: profile.name, url: SITE_URL }],
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
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <SiteHeader lang={lang} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
