import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n";
import { valoo, type CaseStudy } from "@/content/projects";
import { ui } from "@/content/site";
import { Card } from "@/components/motion/reveal";
import { SoundLink } from "@/components/sound/sound-link";
import { ContactCard } from "@/components/contact-card";
import { AppleIcon, ArrowIcon, GooglePlayIcon } from "@/components/ui";

const caseStudies: Record<string, CaseStudy> = { [valoo.slug]: valoo };

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const study = caseStudies[slug];
  if (!study || !hasLocale(lang)) return {};
  return {
    title: study.name,
    description: study.summary[lang],
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: { es: `/es/projects/${slug}`, en: `/en/projects/${slug}` },
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const study = caseStudies[slug];
  if (!study || !hasLocale(lang)) notFound();

  const facts = [
    { label: ui.role[lang], value: study.role[lang] },
    { label: ui.period[lang], value: study.period[lang] },
    { label: ui.platforms[lang], value: study.platforms[lang] },
  ];

  const sectionCard = (section: CaseStudy["problem"], n: number, className = "") => (
    <Card key={section.title.en} as="section" index={n % 2} className={`glass p-6 sm:p-9 ${className}`}>
      <p className="mono-label">{String(n).padStart(2, "0")}</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em]">{section.title[lang]}</h2>
      <p className="mt-4 leading-relaxed text-body text-pretty">{section.body[lang]}</p>
    </Card>
  );

  return (
    <article className="mx-auto flex w-full max-w-[1328px] flex-col gap-3.5 px-4 pt-4 pb-6 sm:gap-[18px] sm:px-6 sm:pt-6 lg:px-14">
      <SoundLink internal href={`/${lang}#work`} className="btn btn-light self-start">
        <span aria-hidden>←</span> {ui.back[lang]}
      </SoundLink>

      <div className="grid gap-3.5 sm:gap-[18px] lg:grid-cols-12">
        <Card immediate className="glass flex flex-col gap-7 p-6 sm:p-10 lg:col-span-7 lg:p-12">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-[#063634] p-3 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]">
            <Image src="/projects/icon-valoo.png" alt="" width={64} height={64} className="size-full object-contain" />
          </div>
          <div>
            <p className="mono-label">{study.client}</p>
            <h1 className="mt-2 text-[clamp(2.75rem,8vw,4.5rem)] leading-none font-extrabold tracking-[-0.045em]">{study.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body text-pretty">{study.summary[lang]}</p>
          </div>

          {/* Datos en una sola tarjeta con filas */}
          <dl className="divide-y divide-black/[0.07] rounded-2xl bg-white px-5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            {facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="mono-label shrink-0 text-[11px]!">{f.label}</dt>
                <dd className="text-right text-[15px] leading-snug font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className="mono-label mb-3">{ui.stack[lang]}</p>
            <ul className="flex flex-wrap gap-1.5">
              {study.stack.map((s) => (
                <li key={s} className="chip">{s}</li>
              ))}
            </ul>
          </div>

          {/* Sitio a ancho completo en mobile; tiendas en dos mitades */}
          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
            <SoundLink href={study.website} className="btn btn-dark col-span-2">
              {study.website.replace(/^https?:\/\//, "").replace(/\/$/, "")} <ArrowIcon />
            </SoundLink>
            <SoundLink href={study.stores.appStore} className="btn btn-light">
              <AppleIcon /> App Store
            </SoundLink>
            <SoundLink href={study.stores.googlePlay} className="btn btn-light">
              <GooglePlayIcon className="text-[#01875f]" /> Google Play
            </SoundLink>
          </div>
        </Card>

        <Card immediate index={1} interactive className="glass p-2.5 sm:p-3 lg:col-span-5">
          <figure className="relative h-[420px] overflow-hidden rounded-[18px] bg-[#111312] sm:h-[560px] sm:rounded-[24px] lg:h-full lg:min-h-[640px]">
            <Image
              src="/projects/valoo-desktop.webp"
              alt={lang === "es" ? "Home del sitio valoo.la" : "valoo.la home page"}
              fill
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-top"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1.5 font-mono text-xs backdrop-blur">valoo.la</figcaption>
          </figure>
        </Card>
      </div>

      {/* Problema y solución lado a lado; rol y arquitectura debajo */}
      <div className="grid gap-3.5 sm:gap-[18px] lg:grid-cols-2">
        {sectionCard(study.problem, 1)}
        {sectionCard(study.solution, 2)}
        {sectionCard(study.myRole, 3)}
        <Card as="section" index={1} className="glass p-6 sm:p-9">
          <p className="mono-label">04</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em]">{ui.architecture[lang]}</h2>
          <dl className="mt-4 divide-y divide-black/[0.07]">
            {study.architecture.map((row) => (
              <div key={row.label.en} className="flex flex-col gap-2 py-3 first:pt-1 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <dt className="mono-label text-[11px]!">{row.label[lang]}</dt>
                <dd className="flex flex-wrap gap-1.5 sm:justify-end">
                  {row.items.map((item) => (
                    <span key={item} className="chip text-[13px]!">{item}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      {/* Cierre */}
      <SoundLink internal href={`/${lang}#projects`} className="btn btn-light mt-6 self-start sm:mt-8">
        {ui.otherWork[lang]} <span aria-hidden>→</span>
      </SoundLink>
      <ContactCard lang={lang} />
    </article>
  );
}
