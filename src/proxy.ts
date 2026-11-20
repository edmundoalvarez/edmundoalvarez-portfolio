import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "./i18n";

/** Inglés por defecto. Solo se usa otro idioma si el visitante lo eligió antes (cookie del selector). */
function chosenLocale(request: NextRequest): Locale {
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  return saved && hasLocale(saved) ? saved : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return;

  request.nextUrl.pathname = `/${chosenLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Todo menos internos de Next y archivos con extensión (imágenes, PDFs, sitemap, etc.)
  matcher: ["/((?!_next|apple-icon|.*\\..*).*)"],
};
