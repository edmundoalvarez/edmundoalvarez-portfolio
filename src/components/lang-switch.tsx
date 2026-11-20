"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n";
import { useSound } from "./sound/sound-provider";

/** Cambia de idioma y recuerda la elección (el proxy la usa; sin cookie, siempre inglés). */
export function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname();
  const { playClick, playHover } = useSound();
  const other: Locale = lang === "es" ? "en" : "es";
  const href = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${other}`);

  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      onPointerEnter={playHover}
      onClick={() => {
        playClick();
        document.cookie = `NEXT_LOCALE=${other}; path=/; max-age=31536000; samesite=lax`;
      }}
      className="rounded-full px-3 py-2.5 whitespace-nowrap font-mono text-[13px] text-muted transition-colors hover:bg-white/70 hover:text-ink"
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden>
        <span className={lang === "en" ? "text-ink" : ""}>EN</span> / <span className={lang === "es" ? "text-ink" : ""}>ES</span>
      </span>
    </Link>
  );
}
