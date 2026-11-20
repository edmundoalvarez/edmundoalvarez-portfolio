import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n";
import { education, experience, profile, skills, spokenLanguages, ui } from "@/content/site";
import { archiveProjects, clientProjects, studio, valoo } from "@/content/projects";
import { contact } from "@/content/contact";
import { ArchiveRow, ProjectCard } from "@/components/project-card";
import { ArrowIcon, SectionHeading, TagList } from "@/components/ui";

const container = "mx-auto max-w-5xl px-4 sm:px-6";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      {/* Hero */}
      <section className={`${container} grid gap-10 pt-16 pb-20 sm:pt-24 md:grid-cols-[1fr_auto] md:items-center`}>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {profile.role[lang]}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {profile.headline[lang]}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted text-pretty">{profile.summary[lang]}</p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            {profile.facts.map((fact) => (
              <li key={fact.en} className="rounded-full bg-accent-soft px-3 py-1 text-fg">
                {fact[lang]}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={profile.cv[lang]}
              download
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              {ui.downloadCv[lang]}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg"
            >
              {ui.contactMe[lang]}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="px-2 text-sm font-medium text-muted hover:text-fg">
              LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="px-2 text-sm font-medium text-muted hover:text-fg">
              GitHub
            </a>
          </div>
        </div>
        <Image
          src="/brand/perfil.svg"
          alt=""
          width={220}
          height={220}
          priority
          className="hidden size-56 rounded-full border border-border bg-surface p-4 md:block"
        />
      </section>

      {/* Proyectos */}
      <section id="work" aria-labelledby="work-title" className={`${container} pb-24`}>
        <SectionHeading id="work-title" eyebrow={ui.featured[lang]} title={valoo.name} />
        <article className="grid overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-[2fr_3fr]">
          <div className="relative aspect-[4/3] bg-[#111312] md:aspect-auto md:min-h-80">
            <Image
              src="/projects/valoo-app.webp"
              alt={lang === "es" ? "La app Valoo dentro del sitio valoo.la" : "The Valoo app on the valoo.la website"}
              fill
              sizes="(min-width: 768px) 400px, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted">{ui.role[lang]}</dt>
                <dd className="font-medium">{valoo.role[lang]}</dd>
              </div>
              <div>
                <dt className="text-muted">{ui.platforms[lang]}</dt>
                <dd className="font-medium">{valoo.platforms[lang]}</dd>
              </div>
            </dl>
            <p className="text-muted text-pretty">{valoo.summary[lang]}</p>
            <TagList items={valoo.stack} />
            <Link
              href={`/${lang}/projects/${valoo.slug}`}
              className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              {ui.readCase[lang]}
              <ArrowIcon />
            </Link>
          </div>
        </article>

        <div className="mt-24">
          <SectionHeading title={ui.clientWork[lang]} intro={ui.clientWorkIntro[lang]} />
          <div className="grid gap-6 sm:grid-cols-2">
            <ProjectCard project={studio} lang={lang} wide />
            {clientProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} />
            ))}
          </div>
        </div>

        <details className="group mt-16 rounded-2xl border border-border px-5 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="block font-semibold">{ui.archive[lang]}</span>
              <span className="block text-sm text-muted">{ui.archiveIntro[lang]}</span>
            </span>
            <span aria-hidden className="text-2xl text-muted transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <ul className="pb-2">
            {archiveProjects.map((p) => (
              <ArchiveRow key={p.slug} project={p} lang={lang} />
            ))}
          </ul>
        </details>
      </section>

      {/* Experiencia */}
      <section id="experience" aria-labelledby="experience-title" className="border-y border-border bg-surface py-24">
        <div className={container}>
          <SectionHeading id="experience-title" title={ui.experience[lang]} />
          <ol className="space-y-12">
            {experience.map((job) => (
              <li key={job.company} className="grid gap-3 md:grid-cols-[14rem_1fr] md:gap-10">
                <div>
                  <p className="font-mono text-xs text-muted">{job.period[lang]}</p>
                  <p className="mt-1 text-sm text-muted">{job.location[lang]}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {job.role[lang]} <span className="text-accent">@</span> {job.company}
                  </h3>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-border">
                    {job.bullets.map((b) => (
                      <li key={b.en} className="text-pretty">
                        {b[lang]}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <TagList items={job.stack} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" aria-labelledby="skills-title" className={`${container} py-24`}>
        <SectionHeading id="skills-title" title={ui.skills[lang]} />
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group.en}>
              <dt className="mb-3 text-sm font-semibold">{s.group[lang]}</dt>
              <dd>
                <TagList items={s.items} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 text-sm font-semibold">{ui.education[lang]}</h3>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="font-medium">{e.title[lang]}</p>
                  <p className="text-sm text-muted">
                    {e.school} · {e.year[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">{ui.languages[lang]}</h3>
            <ul className="space-y-2">
              {spokenLanguages.map((l) => (
                <li key={l.en}>{l[lang]}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" aria-labelledby="contact-title" className={`${container} pb-24`}>
        <div className="rounded-3xl bg-fg px-6 py-14 text-bg sm:px-12">
          <h2 id="contact-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {ui.contactTitle[lang]}
          </h2>
          <p className="mt-4 max-w-xl opacity-75 text-pretty">{ui.contactBody[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              {contact.email}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-bg/30 px-5 py-2.5 text-sm font-medium transition-colors hover:border-bg"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
