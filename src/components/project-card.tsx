import Image from "next/image";
import type { Locale } from "@/i18n";
import type { Project } from "@/content/projects";
import { ui } from "@/content/site";
import { ExternalLink, TagList } from "./ui";

export function ProjectCard({
  project,
  lang,
  wide = false,
}: {
  project: Project;
  lang: Locale;
  wide?: boolean;
}) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface ${
        wide ? "sm:col-span-2 md:grid md:grid-cols-[3fr_2fr]" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden border-border bg-bg ${
          wide ? "aspect-[40/21] self-start border-b md:border-r md:border-b-0" : "aspect-[16/10] border-b"
        }`}
      >
        <Image
          src={project.image}
          alt={project.imageAlt[lang]}
          fill
          sizes={wide ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"}
          className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none ${
            project.imagePosition === "center" ? "object-center" : "object-top"
          }`}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="text-lg font-semibold">
            {project.name}
            {project.client && (
              <span className="font-normal text-muted"> · {project.client}</span>
            )}
          </h3>
          <p className="mt-1.5 text-sm text-muted text-pretty">{project.summary[lang]}</p>
        </div>
        <TagList items={project.stack} />
        {(project.url || project.repo) && (
          <div className="mt-auto flex gap-5 pt-1">
            {project.url && (
              <ExternalLink href={project.url}>
                {ui.visit[lang]}
                <span className="sr-only">: {project.name}</span>
              </ExternalLink>
            )}
            {project.repo && (
              <ExternalLink href={project.repo}>
                {ui.code[lang]}
                <span className="sr-only">: {project.name}</span>
              </ExternalLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function ArchiveRow({ project, lang }: { project: Project; lang: Locale }) {
  return (
    <li className="grid gap-2 border-t border-border py-4 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-6">
      <span className="font-medium">{project.name}</span>
      <div className="space-y-2">
        <p className="text-sm text-muted">{project.summary[lang]}</p>
        <p className="font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
      </div>
      <div className="flex gap-4">
        {project.url && (
          <ExternalLink href={project.url}>
            {ui.visit[lang]}
            <span className="sr-only">: {project.name}</span>
          </ExternalLink>
        )}
        {project.repo && (
          <ExternalLink href={project.repo}>
            {ui.code[lang]}
            <span className="sr-only">: {project.name}</span>
          </ExternalLink>
        )}
      </div>
    </li>
  );
}
