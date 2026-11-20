import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n";
import { valoo, type CaseStudy } from "@/content/projects";
import { ui } from "@/content/site";
import { ExternalLink, TagList } from "@/components/ui";

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
    <article className="mx-auto max-w-3xl px-4 pt-12 pb-24 sm:px-6">
      <Link href={`/${lang}#work`} className="text-sm text-muted hover:text-fg">
        ← {ui.back[lang]}
      </Link>

      <header className="mt-8">
        <div className="flex items-center justify-center rounded-3xl bg-[#063634] px-8 py-16">
          <Image src="/projects/logo-valoo.svg" alt={study.name} width={1062} height={325} priority className="h-auto w-64" />
        </div>
        <h1 className="mt-10 text-4xl font-semibold tracking-tight sm:text-5xl">{study.name}</h1>
        <p className="mt-4 text-lg text-muted text-pretty">{study.summary[lang]}</p>

        <dl className="mt-8 grid gap-4 border-y border-border py-6 text-sm sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-muted">{f.label}</dt>
              <dd className="mt-0.5 font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <p className="mb-3 text-sm text-muted">{ui.stack[lang]}</p>
          <TagList items={study.stack} />
        </div>

        {study.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-5">
            {study.links.map((link) => (
              <ExternalLink key={link.href} href={link.href}>
                {link.label[lang]}
              </ExternalLink>
            ))}
          </div>
        )}
      </header>

      <figure className="mt-12">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-[#111312]">
          <Image
            src="/projects/valoo-desktop.webp"
            alt={lang === "es" ? "Home del sitio valoo.la" : "valoo.la home page"}
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover object-top"
          />
        </div>
        <figcaption className="mt-3 text-sm text-muted">valoo.la</figcaption>
      </figure>

      <div className="mt-14 space-y-12">
        {study.sections.map((section) => (
          <section key={section.title.en}>
            <h2 className="text-2xl font-semibold tracking-tight">{section.title[lang]}</h2>
            <div className="mt-4 space-y-4 text-muted">
              {section.body.map((p) => (
                <p key={p.en} className="text-pretty leading-relaxed">
                  {p[lang]}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
