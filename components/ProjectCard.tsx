"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import TechBadge from "./TechBadge";

export default function ProjectCard({ project }: { project: Project }) {
  const displayTechs = project.techStack.slice(0, 3);
  const remaining = project.techStack.length - 3;

  return (
    <div className="group relative bg-surface flex flex-col cursor-pointer overflow-hidden hover:bg-bg2 transition-colors duration-200 border border-border h-full">
      {/* Screenshot */}
      <div className="aspect-[16/10] relative overflow-hidden bg-bg3 flex-shrink-0">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-fg3 text-[11px] tracking-[0.1em] uppercase">
            Screenshot coming soon
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/80 group-hover:to-bg2/80 transition-all duration-200" />
        {/* Loom badge */}
        {project.loomUrl && (
          <a
            href={project.loomUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 flex items-center gap-[6px] bg-background/80 backdrop-blur-sm border border-border2 px-[10px] py-[5px] text-[10px] text-fg2 tracking-[0.06em] uppercase hover:border-accent hover:text-accent transition-all duration-200"
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 8.5l-5 3A.5.5 0 016 11V5a.5.5 0 01.5-.5l5 3a.5.5 0 010 .866z" />
            </svg>
            Watch demo
          </a>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-display text-[17px] font-semibold tracking-[-0.02em] mb-2 text-fg">
            {project.title}
          </h3>
          <p className="text-[12px] text-fg2 mb-4 leading-[1.75] line-clamp-3">{project.description}</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-[5px] mb-5">
            {displayTechs.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
            {remaining > 0 && (
              <span className="text-[10px] text-fg3 self-center">+{remaining}</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.isPrivate ? undefined : project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { if (project.isPrivate) e.preventDefault(); e.stopPropagation(); }}
                className="text-[11px] text-fg3 tracking-[0.08em] uppercase hover:text-fg transition-colors"
              >
                {project.isPrivate ? "Private ↗" : "GitHub ↗"}
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] text-fg3 tracking-[0.08em] uppercase hover:text-fg transition-colors"
              >
                Live ↗
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="text-[11px] text-accent tracking-[0.08em] uppercase ml-auto flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
            >
              View project
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Neon border */}
      <div className="neon-border">
        <span className="nb-t" />
        <span className="nb-b" />
        <span className="nb-l" />
        <span className="nb-r" />
      </div>
    </div>
  );
}
