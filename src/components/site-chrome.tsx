import Link from "next/link";
import type { Locale } from "@/i18n";
import { profile, ui } from "@/content/site";
import { contact } from "@/content/contact";
import { LangSwitch } from "./lang-switch";

export function SiteHeader({ lang }: { lang: Locale }) {
  const nav = [
    { href: `/${lang}#work`, label: ui.nav.work[lang] },
    { href: `/${lang}#experience`, label: ui.nav.experience[lang] },
    { href: `/${lang}#skills`, label: ui.nav.skills[lang] },
    { href: `/${lang}#contact`, label: ui.nav.contact[lang] },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-bg/80 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-fg focus:px-3 focus:py-1.5 focus:text-bg"
      >
        {ui.skipToContent[lang]}
      </a>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${lang}`} className="font-semibold tracking-tight">
          {profile.name}
          <span className="text-accent">.</span>
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-7 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} label={ui.switchTo[lang]} />
          <a
            href={profile.cv[lang]}
            download
            className="rounded-full bg-fg px-3.5 py-1.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            CV
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Locale }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {profile.name} · {profile.role[lang]}
        </p>
        <ul className="flex gap-5">
          <li>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className="hover:text-fg">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
