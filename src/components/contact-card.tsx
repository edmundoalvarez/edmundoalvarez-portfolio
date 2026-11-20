import type { Locale } from "@/i18n";
import { profile, ui } from "@/content/site";
import { contact } from "@/content/contact";
import { Card } from "@/components/motion/reveal";
import { SoundLink } from "@/components/sound/sound-link";
import { LinkedInIcon } from "@/components/ui";

/** Tarjeta oscura de contacto: cierre de la home y del caso de estudio. */
export function ContactCard({ lang, id, className = "" }: { lang: Locale; id?: string; className?: string }) {
  return (
    <Card
      as="section"
      id={id}
      aria-labelledby="contact-title"
      className={`glass-dark flex flex-col gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-14 ${className}`}
    >
      <div className="min-w-0">
        <h2 id="contact-title" className="text-[clamp(1.9rem,5vw,2.75rem)] leading-tight font-extrabold tracking-[-0.04em] text-balance">
          {ui.hiringTitle[lang]}
        </h2>
        <p className="mt-3 max-w-xl text-[#a8a8a8] text-pretty sm:text-[17px]">{ui.hiringBody[lang]}</p>
        <p className="mt-4 font-mono text-sm text-accent-bright">{contact.email}</p>
      </div>
      {/* Mobile: email a ancho completo, CV y LinkedIn en dos mitades. */}
      <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap lg:shrink-0 lg:flex-nowrap">
        <SoundLink href={`mailto:${contact.email}`} className="btn col-span-2 bg-[#f2f2f2] text-ink">
          {ui.emailMe[lang]}
        </SoundLink>
        <SoundLink href={profile.cv[lang]} download className="btn btn-ghost-dark">
          <span className="sm:hidden">CV</span>
          <span className="hidden sm:inline">{ui.downloadCv[lang]}</span> <span aria-hidden>↓</span>
        </SoundLink>
        <SoundLink href={contact.linkedin} className="btn btn-ghost-dark">
          <LinkedInIcon /> LinkedIn
        </SoundLink>
      </div>
    </Card>
  );
}
