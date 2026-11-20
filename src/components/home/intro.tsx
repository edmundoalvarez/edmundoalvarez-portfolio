import Image from "next/image";
import type { Locale } from "@/i18n";
import { profile, ui } from "@/content/site";
import { contact } from "@/content/contact";
import { Card } from "@/components/motion/reveal";
import { SoundLink } from "@/components/sound/sound-link";
import { ArrowIcon } from "@/components/ui";

export function HeroCard({ lang }: { lang: Locale }) {
  return (
    <Card
      immediate
      index={0}
      className="glass flex flex-col justify-between gap-8 p-6 sm:order-1 sm:col-span-6 sm:p-10 lg:order-none lg:col-span-8 lg:p-12"
    >
      <p className="inline-flex items-center gap-2.5 self-start rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:text-sm">
        <span className="pulse-dot size-2 shrink-0 rounded-full bg-[#1fa855]" />
        {profile.availability[lang]}
      </p>
      <div>
        <p className="mb-3 font-mono text-[13px] font-medium text-accent sm:mb-4 sm:text-sm">{ui.hello[lang]}</p>
        <h1 className="text-[clamp(2.4rem,7.5vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance">
          {profile.headline[lang]}
        </h1>
      </div>
      <p className="max-w-[640px] text-base leading-relaxed text-body text-pretty sm:text-lg">{profile.summary[lang]}</p>
      <div className="flex flex-wrap gap-2.5">
        <SoundLink href={profile.cv[lang]} download className="btn btn-accent grow sm:grow-0">
          {ui.downloadCv[lang]} <span aria-hidden>↓</span>
        </SoundLink>
        <SoundLink href={contact.linkedin} className="btn btn-light grow sm:grow-0">
          LinkedIn <ArrowIcon />
        </SoundLink>
        <SoundLink href={contact.github} className="btn btn-light grow sm:grow-0">
          GitHub <ArrowIcon />
        </SoundLink>
      </div>
    </Card>
  );
}

export function ProfileColumn({ lang }: { lang: Locale }) {
  return (
    <div className="flex flex-col gap-3.5 sm:order-2 sm:col-span-3 sm:gap-[18px] lg:order-none lg:col-span-4">
      <Card immediate index={1} interactive className="glass p-2.5 sm:p-3">
        <div className="relative aspect-square w-full overflow-hidden rounded-[18px] sm:rounded-[24px]">
          <Image
            src="/brand/edmundo.jpg"
            alt={lang === "es" ? "Retrato de Edmundo Alvarez" : "Portrait of Edmundo Alvarez"}
            fill
            priority
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </Card>
      <Card immediate index={2} className="glass grid flex-1 grid-cols-3 content-center gap-2 rounded-[22px]! px-4 py-4 sm:rounded-[26px]! sm:px-5 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-black/[0.07] lg:px-6 lg:py-2">
        {profile.quickFacts.map((f) => (
          <div key={f.label.en} className="lg:flex lg:items-baseline lg:justify-between lg:gap-4 lg:py-2.5">
            <p className="mono-label text-[11px]!">{f.label[lang]}</p>
            <p className="mt-1 text-[15px] leading-tight font-bold lg:mt-0">{f.value[lang]}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}
