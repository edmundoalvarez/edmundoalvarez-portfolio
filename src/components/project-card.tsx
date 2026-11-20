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
  className = "",
}: {
  project: Project;
  lang: Locale;
  index?: number;
  className?: string;
}) {
  return (
    <Card
      as="article"
      index={index}
      interactive
      className={`glass group flex flex-col p-2.5 sm:p-3 lg:col-span-4 ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[#e4e4e4] sm:rounded-[22px]">
        <Image
          src={project.image}
          alt={project.imageAlt[lang]}
          fill
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"
          className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
            project.imagePosition === "center" ? "object-center" : "object-top"
          }`}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-3 pt-4 pb-3">
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
            <span className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-muted transition-colors group-hover:text-accent">
              {ui.openSite[lang]}
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
        {project.client && <p className="-mt-1.5 text-[13px] text-muted">{project.client}</p>}
        <p className="line-clamp-3 text-[15px] leading-relaxed text-body text-pretty">{project.summary[lang]}</p>
        <p className="mt-auto pt-1 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
      </div>
    </Card>
  );
}
