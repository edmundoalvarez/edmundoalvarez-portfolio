export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Texto bilingüe. Todo el contenido del sitio se escribe con este tipo. */
export type L = Record<Locale, string>;

export const SITE_URL = "https://edmundoalvarez.com.ar";
