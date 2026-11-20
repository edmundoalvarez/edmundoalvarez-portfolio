import Image from "next/image";
import type { Locale } from "@/i18n";
import { profile, ui } from "@/content/site";
import { contact } from "@/content/contact";
import { Card } from "@/components/motion/reveal";
import { SoundLink } from "@/components/sound/sound-link";
import { GitHubIcon, LinkedInIcon } from "@/components/ui";

export function HeroCard({ lang }: { lang: Locale }) {
  return (
    <Card
      immediate
      index={0}
      className="glass flex flex-col justify-between gap-8 p-6 sm:order-1 sm:col-span-6 sm:p-10 lg:order-none lg:col-span-8 lg:p-12"
    >
      <p className="inline-flex items-start gap-2.5 self-start rounded-[18px] bg-white px-3.5 py-2 text-[13px] leading-snug font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:items-center sm:rounded-full sm:text-sm">
        <span className="pulse-dot mt-[5px] size-2 shrink-0 rounded-full bg-[#1fa855] sm:mt-0" />
        {profile.availability[lang]}
      </p>
      <div>
        <div className="mb-3 flex items-center gap-3 sm:mb-4">
          {/* En mobile la foto grande se oculta: queda este avatar junto al saludo. */}
          <Image
            src="/brand/edmundo.jpg"
            alt=""
            width={88}
            height={88}
            priority
            className="size-11 rounded-full object-cover shadow-[0_0_0_2px_#fff,0_6px_14px_rgba(0,0,0,0.2)] sm:hidden"
          />
          <p className="font-mono text-[13px] font-medium text-accent sm:text-sm">{ui.hello[lang]}</p>
        </div>
        <h1 className="text-[clamp(2.4rem,7.5vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance">
          {profile.role[lang]}.
        </h1>
      </div>
      <p className="max-w-[640px] text-base leading-relaxed text-body text-pretty sm:text-lg">{profile.summary[lang]}</p>
      {/* Mobile: CV a ancho completo y redes en dos mitades. */}
      <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
        <SoundLink href={profile.cv[lang]} download className="btn btn-accent col-span-2">
          {ui.downloadCv[lang]} <span aria-hidden>↓</span>
        </SoundLink>
        <SoundLink href={contact.linkedin} className="btn btn-light">
          <LinkedInIcon className="text-[#0a66c2]" /> LinkedIn
        </SoundLink>
        <SoundLink href={contact.github} className="btn btn-light">
          <GitHubIcon /> GitHub
        </SoundLink>
      </div>
    </Card>
  );
}

export function ProfileColumn({ lang }: { lang: Locale }) {
  return (
    <div className="flex flex-col gap-3.5 sm:order-2 sm:col-span-3 sm:gap-[18px] lg:order-none lg:col-span-4">
      <Card immediate index={1} interactive className="glass hidden p-2.5 sm:block sm:p-3">
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
      <Card immediate index={2} className="glass flex flex-1 flex-col justify-center divide-y divide-black/[0.07] rounded-[22px]! px-5 py-1.5 sm:rounded-[26px]! lg:px-6 lg:py-2">
        {profile.quickFacts.map((f) => (
          <div key={f.label.en} className="flex items-baseline justify-between gap-4 py-2.5">
            <p className="mono-label text-[11px]!">{f.label[lang]}</p>
            <p className="text-right text-[15px] leading-tight font-bold">{f.value[lang]}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}
