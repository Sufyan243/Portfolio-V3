import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import TechBadge from "@/components/TechBadge";
import { projects, getProjectBySlug } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description, type: "article" },
  };
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-[18px] font-semibold tracking-[-0.02em] mb-4 text-fg border-b border-border pb-3">
    {children}
  </h2>
);

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const hasRealLoom = project.loomUrl && !project.loomUrl.includes("REPLACE_WITH");

  return (
    <div className="py-[120px]">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[11px] text-fg3 tracking-[0.1em] uppercase hover:text-accent transition-colors mb-12"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          All Projects
        </Link>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
          {/* Main */}
          <div className="space-y-12">
            <div>
              <span className="text-[11px] tracking-[0.14em] uppercase text-fg3 mb-3 block">{project.type}</span>
              <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-4 text-fg">
                {project.title}
              </h1>
              <p className="text-[15px] text-fg2 leading-[1.8]">{project.description}</p>
            </div>

            {project.screenshot && (
              <div className="border border-border overflow-hidden">
                <div className="relative aspect-[16/9] bg-bg3">
                  <Image
                    src={project.screenshot}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            )}

            {hasRealLoom && (
              <section>
                <SectionHeading>Project Walkthrough</SectionHeading>
                <div className="relative aspect-video border border-border overflow-hidden bg-bg3">
                  <iframe
                    src={project.loomUrl!.replace("loom.com/share/", "loom.com/embed/")}
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <p className="text-[11px] text-fg3 mt-2 tracking-[0.06em]">Video walkthrough — recorded with Loom</p>
              </section>
            )}

            <section>
              <SectionHeading>Problem Statement</SectionHeading>
              <p className="text-[14px] text-fg2 leading-[1.9]">{project.longDescription}</p>
            </section>

            <section>
              <SectionHeading>Architecture Overview</SectionHeading>
              <ol className="space-y-3">
                {project.architecture.map((item, i) => (
                  <li key={i} className="flex gap-4 text-[14px]">
                    <span className="text-accent font-semibold font-mono w-5 flex-shrink-0">{i + 1}.</span>
                    <span className="text-fg2 leading-[1.75]">{item}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <SectionHeading>Tech Stack</SectionHeading>
              <div className="flex flex-wrap gap-[6px]">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>
            </section>

            <section>
              <SectionHeading>Engineering Challenges</SectionHeading>
              <ul className="space-y-3">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-4 text-[14px]">
                    <span className="w-[6px] h-[6px] bg-accent rounded-full mt-[7px] flex-shrink-0" />
                    <span className="text-fg2 leading-[1.75]">{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionHeading>Source Code &amp; README</SectionHeading>
              {project.isPrivate ? (
                <div className="border border-border2 p-6 bg-bg2">
                  <p className="text-[13px] text-fg2 mb-4 leading-[1.75]">
                    <span className="text-accent font-semibold">Oops — this repository is private.</span>
                    {" "}The source code is not publicly available. To review the code or discuss the implementation, reach out directly.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:syedmuhammadsufyan237@gmail.com"
                      className="inline-flex items-center gap-2 text-[11px] px-4 py-2 border border-accent text-accent tracking-[0.08em] uppercase hover:bg-accent hover:text-background transition-all duration-200"
                    >
                      Email Sufyan
                    </a>
                    <a
                      href="https://wa.me/923332271321"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] px-4 py-2 border border-border2 text-fg2 tracking-[0.08em] uppercase hover:border-accent hover:text-accent transition-all duration-200"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`${project.githubUrl}/blob/main/README.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] px-4 py-2 border border-border2 text-fg2 tracking-[0.08em] uppercase hover:border-accent hover:text-accent transition-all duration-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
                    </svg>
                    View README
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] px-4 py-2 border border-border2 text-fg2 tracking-[0.08em] uppercase hover:border-accent hover:text-accent transition-all duration-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 space-y-4">
              <div className="border border-border bg-surface p-6 space-y-6">
                <h3 className="font-display text-[14px] font-semibold text-fg border-b border-border pb-4">
                  Project Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] tracking-[0.1em] uppercase text-fg3 mb-2">Type</p>
                    <span className="text-[11px] px-3 py-1 border border-accent/30 text-accent tracking-[0.06em] uppercase">
                      {project.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.1em] uppercase text-fg3 mb-2">Repository</p>
                    <span className={`text-[11px] px-3 py-1 border tracking-[0.06em] uppercase ${project.isPrivate ? "border-fg3/30 text-fg3" : "border-accent/30 text-accent"}`}>
                      {project.isPrivate ? "Private" : "Public"}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.1em] uppercase text-fg3 mb-2">Technologies</p>
                    <span className="text-[13px] text-fg2">{project.techStack.length} used</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-border">
                  {hasRealLoom && (
                    <a
                      href={project.loomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-[11px] border border-border2 text-[11px] text-fg tracking-[0.08em] uppercase hover:border-accent hover:text-accent transition-all duration-200"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 8.5l-5 3A.5.5 0 016 11V5a.5.5 0 01.5-.5l5 3a.5.5 0 010 .866z" />
                      </svg>
                      Watch Loom Demo
                    </a>
                  )}
                  {!project.isPrivate && project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-[11px] border border-border2 text-[11px] text-fg tracking-[0.08em] uppercase hover:border-accent hover:text-accent transition-all duration-200"
                    >
                      View on GitHub ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-[11px] bg-accent text-background text-[11px] tracking-[0.08em] uppercase hover:opacity-85 transition-opacity font-medium"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="border border-border bg-surface p-6">
                <p className="text-[11px] tracking-[0.1em] uppercase text-fg3 mb-3">Questions about this project?</p>
                <div className="space-y-3">
                  <a href="mailto:syedmuhammadsufyan237@gmail.com" className="flex items-center gap-2 text-[12px] text-fg2 hover:text-accent transition-colors">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    syedmuhammadsufyan237@gmail.com
                  </a>
                  <a href="https://wa.me/923332271321" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[12px] text-fg2 hover:text-accent transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    +92 333 2271321
                  </a>
                  <a href="https://www.linkedin.com/in/syed-muhammad-sufyan786/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[12px] text-fg2 hover:text-accent transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
