import type { MetadataRoute } from "next";
import { locales, SITE_URL } from "@/i18n";
import { valoo } from "@/content/projects";

const paths = ["", `/projects/${valoo.slug}`];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    })),
  );
}
