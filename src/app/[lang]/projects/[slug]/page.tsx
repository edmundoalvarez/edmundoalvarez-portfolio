import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n";
import { valoo, type CaseStudy } from "@/content/projects";
import { ui } from "@/content/site";
import { Card } from "@/components/motion/reveal";
import { SoundLink } from "@/components/sound/sound-link";

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
          <dl className="grid gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl bg-white px-4 py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <dt className="mono-label text-[11px]!">{f.label}</dt>
                <dd className="mt-1 text-[15px] leading-snug font-bold">{f.value}</dd>
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
          {study.links.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {study.links.map((link, i) => (
                <SoundLink key={link.href} href={link.href} className={`btn ${i === 0 ? "btn-dark" : "btn-light"}`}>
                  {link.label[lang]} <span aria-hidden>↗</span>
                </SoundLink>
              ))}
            </div>
          )}
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

      <div className="grid gap-3.5 sm:gap-[18px] lg:grid-cols-2">
        {study.sections.map((section, i) => (
          <Card key={section.title.en} as="section" index={i % 2} className="glass p-6 sm:p-9">
            <p className="mono-label">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em]">{section.title[lang]}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-body">
              {section.body.map((p) => (
                <p key={p.en} className="text-pretty">{p[lang]}</p>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </article>
  );
}
