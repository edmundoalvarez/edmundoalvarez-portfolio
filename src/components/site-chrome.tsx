"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n";
import { profile, ui } from "@/content/site";
import { contact } from "@/content/contact";
import { LangSwitch } from "./lang-switch";
import { SoundToggle } from "./sound/sound-toggle";
import { SoundLink } from "./sound/sound-link";
import { GitHubIcon, LinkedInIcon } from "./ui";

export function SiteHeader({ lang }: { lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sección visible (scroll-spy): marca con un punto de acento el ítem del nav.
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const ids = ["work", "experience", "stack", "projects", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "projects" ? "work" : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const nav = [
    { id: "work", href: `/${lang}#work`, label: ui.nav.work[lang] },
    { id: "experience", href: `/${lang}#experience`, label: ui.nav.experience[lang] },
    { id: "stack", href: `/${lang}#stack`, label: ui.nav.skills[lang] },
    { id: "contact", href: `/${lang}#contact`, label: ui.nav.contact[lang] },
  ];

  return (
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-6">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-40 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        {ui.skipToContent[lang]}
      </a>
      <div
        className={`mx-auto flex h-16 max-w-[1328px] items-center justify-between gap-3 rounded-full px-2 transition-[background-color,box-shadow,backdrop-filter] duration-300 sm:px-3 lg:px-4 ${
          scrolled ? "border border-white/90 bg-white/55 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl" : "border border-transparent"
        }`}
      >
        <Link
          href={`/${lang}`}
          aria-label={profile.name}
          className="shrink-0 rounded-full px-1.5 text-[17px] leading-none tracking-[-0.03em] whitespace-nowrap sm:px-2 sm:text-[19px] lg:text-xl"
        >
          <span className="font-extrabold text-ink">Edmundo</span>
          {/* En tablet el nav ocupa el centro: solo el nombre. */}
          <span className="font-normal text-[#555] md:max-lg:hidden"> Alvarez</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-1 rounded-full border border-white/90 bg-white/55 p-1.5 text-[15px] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            {nav.map((item) => (
              <li key={item.href}>
                <SoundLink
                  internal
                  href={item.href}
                  aria-current={active === item.id ? "location" : undefined}
                  className={`relative block rounded-full px-4 py-2 transition-colors hover:bg-white hover:text-ink lg:px-5 ${
                    active === item.id ? "text-ink" : "text-muted"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-[opacity,transform] duration-300 ${
                      active === item.id ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                </SoundLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LangSwitch lang={lang} label={ui.switchTo[lang]} />
          <SoundToggle labelOn={ui.soundOn[lang]} labelOff={ui.soundOff[lang]} />
          <SoundLink href={`mailto:${contact.email}`} className="btn btn-dark size-11 p-0! lg:h-auto lg:w-auto lg:px-5! lg:py-[13px]!" aria-label={ui.emailMe[lang]}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="size-4 lg:hidden">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            <span className="hidden lg:inline">{ui.emailMe[lang]}</span>
          </SoundLink>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Locale }) {
  return (
    <footer className="mx-auto w-full max-w-[1328px] px-4 pt-4 pb-10 sm:px-6 lg:px-14">
      <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · Buenos Aires, Argentina
        </p>
        <ul className="flex gap-5 font-medium">
          <li>
            <SoundLink href={contact.linkedin} className="inline-flex items-center gap-1.5 hover:text-ink">
              <LinkedInIcon className="size-3.5" /> LinkedIn
            </SoundLink>
          </li>
          <li>
            <SoundLink href={contact.github} className="inline-flex items-center gap-1.5 hover:text-ink">
              <GitHubIcon className="size-3.5" /> GitHub
            </SoundLink>
          </li>
          <li>
            <SoundLink href={`mailto:${contact.email}`} className="hover:text-ink">{ui.emailMe[lang]}</SoundLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}
