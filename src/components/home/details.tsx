import Image from "next/image";
import type { Locale } from "@/i18n";
import { experience, skills, ui } from "@/content/site";
import { valoo } from "@/content/projects";
import { clients } from "@/content/clients";
import { Card } from "@/components/motion/reveal";
import { SoundLink } from "@/components/sound/sound-link";

const VALOO_CHIPS = ["React Native", "Expo", "TypeScript", "Laravel", "Mercado Pago"];

export function ValooCard({ lang }: { lang: Locale }) {
  return (
    <Card
      as="article"
      id="work"
      aria-labelledby="valoo-title"
      interactive
      className="glass group grid overflow-hidden bg-[linear-gradient(160deg,#fff,#e4e4e4)]! sm:order-4 sm:col-span-6 sm:grid-cols-[1fr_260px] lg:order-none lg:col-span-8 lg:grid-cols-[1fr_340px]"
    >
      <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-9 lg:p-11">
        <div>
          <p className="mono-label">
            {ui.featuredLabel[lang]} · {valoo.period[lang]}
          </p>
          <h2 id="valoo-title" className="mt-3 text-5xl font-extrabold tracking-[-0.045em] sm:text-6xl">
            {valoo.name}
          </h2>
          <p className="mt-3 max-w-[440px] leading-relaxed text-body text-pretty sm:text-[17px]">{valoo.summary[lang]}</p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {VALOO_CHIPS.map((c) => (
            <li key={c} className="chip">
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2.5">
          <SoundLink internal href={`/${lang}/projects/${valoo.slug}`} className="btn btn-dark">
            {ui.readCase[lang]} <span aria-hidden>→</span>
          </SoundLink>
          <SoundLink href="https://valoo.la/" className="btn btn-light">
            valoo.la <span aria-hidden>↗</span>
          </SoundLink>
        </div>
      </div>

      {/* Teléfono: debajo del texto en mobile, a la derecha e inclinado desde sm */}
      <div className="relative h-[300px] sm:h-auto sm:min-h-[460px]">
        <div className="absolute top-2 left-1/2 h-[460px] w-[220px] -translate-x-1/2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-10 sm:left-6 sm:w-[240px] sm:translate-x-0 sm:rotate-[5deg] sm:group-hover:-translate-y-2 sm:group-hover:rotate-[2deg] lg:left-12 lg:h-[540px] lg:w-[270px]">
          <div className="relative size-full overflow-hidden rounded-[38px] border-[9px] border-[#121212] bg-[#121212] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.45)]">
            <Image
              src="/projects/valoo-app.webp"
              alt={lang === "es" ? "Pantalla de la app Valoo" : "Valoo app screen"}
              fill
              sizes="280px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ExperienceCard({ lang }: { lang: Locale }) {
  return (
    <Card
      as="section"
      id="experience"
      aria-labelledby="experience-title"
      className="glass p-6 sm:order-3 sm:col-span-3 sm:p-8 lg:order-none lg:col-span-4"
    >
      <h2 id="experience-title" className="mono-label mb-6">
        {ui.experience[lang]}
      </h2>
      <ol className="timeline">
        {experience.map((job, i) => (
          <li key={job.company} {...(i === 0 ? { "data-current": "" } : {})}>
            <p className="font-bold leading-snug">{job.role[lang]}</p>
            <p className="mt-0.5 text-sm text-muted">
              {job.company} · {job.period[lang]}
            </p>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export function StackCard({ lang }: { lang: Locale }) {
  return (
    <Card
      as="section"
      id="stack"
      aria-labelledby="stack-title"
      className="glass p-6 sm:order-5 sm:col-span-6 sm:p-8 lg:order-none lg:col-span-12 lg:p-10"
    >
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 id="stack-title" className="mono-label">
          {ui.skills[lang]}
        </h2>
        <p className="font-mono text-xs text-muted">
          {skills.reduce((n, g) => n + g.items.length, 0)} tools
        </p>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <div key={group.group.en} className="rounded-[22px] bg-white/45 p-5 shadow-[inset_0_1px_0_#fff] ring-1 ring-black/[0.04]">
            <dt className="mb-3.5 flex items-center justify-between">
              <span className="text-[15px] font-bold">{group.group[lang]}</span>
              <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
            </dt>
            <dd className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span key={item} className="chip chip-hover text-[13px]!">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function LogoRow({ clone = false }: { clone?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20" {...(clone ? { "aria-hidden": true, "data-clone": "" } : {})}>
      {clients.map((c) => (
        <li key={c.name} className="flex h-16 shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG livianos, no necesitan optimización */}
          <img
            src={c.logo}
            alt={clone ? "" : c.name}
            style={{ height: Math.round(c.h * 1.25) }}
            className="w-auto opacity-80 transition-opacity duration-300 hover:opacity-100"
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientsCard({ lang }: { lang: Locale }) {
  return (
    <Card
      as="section"
      aria-labelledby="clients-title"
      className="glass flex flex-col gap-4 overflow-hidden py-6 sm:order-6 sm:col-span-6 sm:py-8 lg:order-none lg:col-span-12 lg:flex-row lg:items-center lg:gap-10 lg:py-6 lg:pl-10"
    >
      <h2 id="clients-title" className="mono-label shrink-0 px-6 sm:px-8 lg:px-0">
        {ui.clients[lang]}
      </h2>
      <div className="marquee min-w-0 flex-1">
        <div className="marquee-track">
          <LogoRow />
          <LogoRow clone />
        </div>
      </div>
    </Card>
  );
}
