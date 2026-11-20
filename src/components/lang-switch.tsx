"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n";

export function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname();
  const other: Locale = lang === "es" ? "en" : "es";
  const href = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${other}`);

  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      className="rounded-full border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-fg hover:text-fg"
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden>{other.toUpperCase()}</span>
    </Link>
  );
}
