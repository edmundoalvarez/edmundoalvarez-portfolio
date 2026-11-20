import Image from "next/image";
import type { Locale } from "@/i18n";
import type { Project } from "@/content/projects";
import { ui } from "@/content/site";
import { Card } from "./motion/reveal";
import { SoundLink } from "./sound/sound-link";
import { ArrowIcon } from "./ui";

/** Tarjeta de proyecto. Si tiene URL, toda la tarjeta es clickeable (enlace estirado sobre el título). */
export function ProjectCard({
  project,
  lang,
  index = 0,
  wide = false,
}: {
  project: Project;
  lang: Locale;
  index?: number;
  wide?: boolean;
}) {
  return (
    <Card
      as="article"
      index={index}
      interactive
      className={`glass group flex flex-col p-2.5 sm:p-3 ${wide ? "sm:col-span-2 lg:col-span-8 lg:grid lg:grid-cols-[1.35fr_1fr] lg:gap-2" : "lg:col-span-4"}`}
    >
      <div className={`relative overflow-hidden rounded-[18px] bg-[#e4e4e4] sm:rounded-[22px] ${wide ? "aspect-[40/21] lg:self-start" : "aspect-[16/10]"}`}>
        <Image
          src={project.image}
          alt={project.imageAlt[lang]}
          fill
          sizes={wide ? "(min-width: 1024px) 720px, (min-width: 640px) 90vw, 100vw" : "(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"}
          className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
            project.imagePosition === "center" ? "object-center" : "object-top"
          }`}
        />
      </div>
      <div className={`flex flex-1 flex-col gap-2.5 px-3 pt-4 pb-3 ${wide ? "lg:justify-center lg:px-6" : ""}`}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[19px] font-bold tracking-tight">
            {project.url ? (
              <SoundLink href={project.url} className="before:absolute before:inset-0 before:z-10 before:rounded-[inherit]">
                {project.name}
              </SoundLink>
            ) : (
              project.name
            )}
          </h3>
          {project.url && (
            <span className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-muted transition-colors group-hover:text-ink">
              {ui.openSite[lang]}
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
        {project.client && <p className="-mt-1.5 text-[13px] text-muted">{project.client}</p>}
        <p className={`text-[15px] leading-relaxed text-body text-pretty ${wide ? "" : "line-clamp-3"}`}>{project.summary[lang]}</p>
        <p className="mt-auto pt-1 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
      </div>
    </Card>
  );
}

/** Proyectos de los primeros años: lista compacta dentro de una tarjeta. */
export function ArchiveCard({ projects, lang }: { projects: Project[]; lang: Locale }) {
  return (
    <Card as="section" aria-labelledby="archive-title" index={2} className="glass flex flex-col p-6 sm:col-span-2 sm:p-8 lg:col-span-4">
      <h3 id="archive-title" className="mono-label">
        {ui.archive[lang]}
      </h3>
      <p className="mt-2 text-sm text-muted text-pretty">{ui.archiveIntro[lang]}</p>
      <ul className="mt-5 divide-y divide-black/[0.07]">
        {projects.map((p) => (
          <li key={p.slug} className="flex items-baseline justify-between gap-4 py-2.5">
            <span className="font-semibold">{p.name}</span>
            <span className="flex shrink-0 gap-3 text-[13px] font-semibold text-muted">
              {p.url && (
                <SoundLink href={p.url} className="hover:text-ink">
                  {ui.visit[lang]} <span className="sr-only">: {p.name}</span>↗
                </SoundLink>
              )}
              {p.repo && (
                <SoundLink href={p.repo} className="hover:text-ink">
                  {ui.code[lang]} <span className="sr-only">: {p.name}</span>↗
                </SoundLink>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
