import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n";
import { profile, skills, ui } from "@/content/site";
import { SITE_URL } from "@/i18n";
import { contact } from "@/content/contact";
import { clientProjects, studio } from "@/content/projects";
import { HeroCard, ProfileColumn } from "@/components/home/intro";
import { ClientsCard, ExperienceCard, StackCard, ValooCard } from "@/components/home/details";
import { ProjectCard } from "@/components/project-card";
import { Card } from "@/components/motion/reveal";
import { SoundLink } from "@/components/sound/sound-link";
import { LinkedInIcon } from "@/components/ui";

const shell = "mx-auto w-full max-w-[1328px] px-4 sm:px-6 lg:px-14";
const grid = "grid grid-cols-1 gap-3.5 sm:grid-cols-6 sm:gap-[18px] lg:grid-cols-12";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role[lang],
    description: profile.metaDescription[lang],
    url: `${SITE_URL}/${lang}`,
    image: `${SITE_URL}/brand/edmundo.jpg`,
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
    nationality: [{ "@type": "Country", name: "Argentina" }, { "@type": "Country", name: "Spain" }],
    worksFor: { "@type": "Organization", name: "Lengar Studio", url: "https://lengarstudio.com" },
    knowsLanguage: ["es", "en"],
    knowsAbout: skills.slice(0, 3).flatMap((g) => g.items),
    sameAs: [contact.linkedin, contact.github],
  };

  return (
    <div className={`${shell} flex flex-col gap-3.5 pt-4 pb-6 sm:gap-[18px] sm:pt-6`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }} />

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
          <p className="text-[15px] text-muted text-pretty">
            {ui.clientWorkIntro[lang]}
            <span className="ml-1.5 font-mono text-xs whitespace-nowrap text-ink sm:hidden">
              {ui.swipe[lang]} →
            </span>
          </p>
        </div>
        {/* Mobile: carrusel horizontal con scroll-snap. Desde sm: grilla. */}
        <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pt-1 pb-8 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-[18px] sm:overflow-visible sm:p-0 lg:grid-cols-12 [&::-webkit-scrollbar]:hidden">
          {[studio, ...clientProjects].map((p, i) => (
            <ProjectCard key={p.slug} project={p} lang={lang} index={i % 3} className="w-[84%] shrink-0 snap-start sm:w-auto" />
          ))}
        </div>
      </section>

      {/* Contacto */}
      <Card
        as="section"
        id="contact"
        aria-labelledby="contact-title"
        className="glass-dark mt-10 flex flex-col gap-8 p-7 sm:mt-14 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-14"
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
    </div>
  );
}
