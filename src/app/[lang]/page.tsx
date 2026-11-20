import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n";
import { profile, ui } from "@/content/site";
import { contact } from "@/content/contact";
import { archiveProjects, clientProjects, studio } from "@/content/projects";
import { HeroCard, ProfileColumn } from "@/components/home/intro";
import { ClientsCard, ExperienceCard, StackCard, ValooCard } from "@/components/home/details";
import { ArchiveCard, ProjectCard } from "@/components/project-card";
import { Card } from "@/components/motion/reveal";
import { SoundLink } from "@/components/sound/sound-link";

const shell = "mx-auto w-full max-w-[1328px] px-4 sm:px-6 lg:px-14";
const grid = "grid grid-cols-1 gap-3.5 sm:grid-cols-6 sm:gap-[18px] lg:grid-cols-12";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className={`${shell} flex flex-col gap-3.5 pt-4 pb-6 sm:gap-[18px] sm:pt-6`}>
      {/* Bento principal. En tablet se reordena con `order`; en mobile y desktop sigue el orden del DOM. */}
      <div className={grid}>
        <HeroCard lang={lang} />
        <ProfileColumn lang={lang} />
        <ValooCard lang={lang} />
        <ExperienceCard lang={lang} />
        <StackCard lang={lang} />
        <ClientsCard lang={lang} />
      </div>

      {/* Trabajos */}
      <section aria-labelledby="projects-title" id="projects" className="pt-10 sm:pt-14">
        <div className="mb-5 flex flex-col gap-2 px-1 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="projects-title" className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            {ui.selectedWork[lang]}
          </h2>
          <p className="max-w-md text-[15px] text-muted text-pretty">{ui.clientWorkIntro[lang]}</p>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-[18px] lg:grid-cols-12">
          <ProjectCard project={studio} lang={lang} wide />
          {clientProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} lang={lang} index={(i % 3) + 1} />
          ))}
          <ArchiveCard projects={archiveProjects} lang={lang} />
        </div>
      </section>

      {/* Contacto */}
      <Card
        as="section"
        id="contact"
        aria-labelledby="contact-title"
        className="glass-dark mt-10 flex flex-col gap-8 p-7 sm:mt-14 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-14"
      >
        <div>
          <h2 id="contact-title" className="text-[clamp(1.9rem,5vw,2.75rem)] leading-tight font-extrabold tracking-[-0.04em] text-balance">
            {ui.hiringTitle[lang]}
          </h2>
          <p className="mt-3 max-w-xl text-[#a8a8a8] text-pretty sm:text-[17px]">{ui.hiringBody[lang]}</p>
          <p className="mt-4 font-mono text-sm text-[#d6d6d6]">{contact.email}</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <SoundLink href={`mailto:${contact.email}`} className="btn grow bg-[#f2f2f2] text-ink sm:grow-0">
            {ui.emailMe[lang]}
          </SoundLink>
          <SoundLink href={profile.cv[lang]} download className="btn btn-ghost-dark grow sm:grow-0">
            {ui.downloadCv[lang]} <span aria-hidden>↓</span>
          </SoundLink>
          <SoundLink href={contact.linkedin} className="btn btn-ghost-dark grow sm:grow-0">
            LinkedIn <span aria-hidden>↗</span>
          </SoundLink>
        </div>
      </Card>
    </div>
  );
}
