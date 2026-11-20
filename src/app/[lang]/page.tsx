import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n";
import { profile, skills, ui } from "@/content/site";
import { SITE_URL } from "@/i18n";
import { contact } from "@/content/contact";
import { clientProjects, studio } from "@/content/projects";
import { HeroCard, ProfileColumn } from "@/components/home/intro";
import { ClientsCard, ExperienceCard, StackCard, ValooCard } from "@/components/home/details";
import { ProjectCard } from "@/components/project-card";
import { ContactCard } from "@/components/contact-card";

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
        {/* Mobile: carrusel con scroll-snap; cada tarjeta (80vw) queda centrada con las vecinas asomando. Desde sm: grilla. */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[10vw] pt-1 pb-8 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-[18px] sm:overflow-visible sm:p-0 lg:grid-cols-12 [&::-webkit-scrollbar]:hidden">
          {[studio, ...clientProjects].map((p, i) => (
            <ProjectCard key={p.slug} project={p} lang={lang} index={i % 3} className="w-[80vw] shrink-0 snap-center sm:w-auto" />
          ))}
        </div>
      </section>

      {/* Contacto */}
      <ContactCard lang={lang} id="contact" className="mt-10 sm:mt-14" />
    </div>
  );
}
