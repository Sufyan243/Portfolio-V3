"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import SectionWrapper from "@/components/SectionWrapper";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const stack = [
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "OpenAI", icon: "https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png" },
  { name: "Groq", icon: "https://cdn.simpleicons.org/databricks/FF3621" },
  { name: "LangChain", icon: "https://cdn.simpleicons.org/chainlink/375BD2" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
];

const marqueeItems = [
  "Java", "Spring Boot", "Python", "FastAPI", "PHP", "Node.js",
  "React", "Next.js", "PostgreSQL", "Docker", "OpenAI", "Groq",
  "LangChain", "Redis", "MySQL", "Tailwind CSS", "TypeScript",
];

const faqs = [
  {
    q: "What technology stack do you specialize in?",
    a: "Python, Java, JavaScript, TypeScript, and PHP on the backend. FastAPI and Spring Boot for APIs. React on the frontend. PostgreSQL, MySQL, Redis for databases. Docker for deployment. I work across the full stack with a backend and AI focus.",
  },
  {
    q: "Do you work on AI and machine learning projects?",
    a: "Yes — I've built PostIdea, a multi-agent AI pipeline for architecture validation, and Terra Debugger, a Python learning platform with sandboxed execution. I integrate AI into practical production systems.",
  },
  {
    q: "What kind of projects do you build?",
    a: "Full-stack applications — from backend logic and REST APIs to clean, usable frontends. Examples include PostIdea and Terra Debugger.",
  },
  {
    q: "What is your approach to software development?",
    a: "I break complex problems into simple, reliable solutions and refine things until they work properly — not just 'good enough'. I care about clean code, correctness, and performance. I focus on clarity, structure, and reliability over hype.",
  },
];

const full = [...marqueeItems, ...marqueeItems];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // PostIdea first, then Terra Debugger, then the rest of featured
  const postIdea = projects.find((p) => p.slug === "postidea");
  const terraDebugger = projects.find((p) => p.slug === "terra-debugger");
  const otherFeatured = projects.filter(
    (p) => p.category === "featured" && p.slug !== "postidea" && p.slug !== "terra-debugger"
  );
  const featuredProjects = [postIdea, terraDebugger, ...otherFeatured].filter(Boolean);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden">
        {/* Social media banner as full hero background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/socail-media-banner.png"
            alt=""
            fill
            className="object-cover object-center opacity-[0.07]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-10 pt-24 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile photo + availability badge */}
            <div className="flex items-center gap-4 mb-10">
              <div className="relative w-[52px] h-[52px] rounded-full overflow-hidden border border-border2 flex-shrink-0">
                <Image
                  src="/profile.jpg.png"
                  alt="Syed Muhammad Sufyan"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="inline-flex items-center gap-2 border border-border2 px-[14px] py-[6px] text-[11px] tracking-[0.1em] uppercase text-fg3">
                <span className="w-[6px] h-[6px] rounded-full bg-accent animate-pulse-dot" />
                Open to Full Stack Roles
              </div>
            </div>

            {/* H1 */}
            <h1 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-8">
              I&apos;m a Full Stack<br />
              <span className="stroke-accent">Developer</span><br />
              <span className="text-accent">&amp; SaaS Builder.</span>
            </h1>

            {/* Desc + CTAs */}
            <div className="flex items-end justify-between gap-12 flex-wrap mt-8">
              <p className="text-[15px] text-fg2 max-w-[360px] leading-[1.8] border-l border-border2 pl-6">
                I build full stack products from scratch — architecture, backend, frontend, and deployment. Shipped{" "}
                <a 
                  href="https://terradebugger.me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline transition-all"
                >
                  Terra Debugger
                </a>
                {" "}· Currently building{" "}
                <a 
                  href="https://postidea.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline transition-all"
                >
                  PostIdea
                </a>
              </p>
              <div className="flex gap-[10px] flex-wrap flex-shrink-0">
                <a
                  href="#projects"
                  className="px-[30px] py-[13px] bg-accent text-background text-[12px] font-medium tracking-[0.06em] uppercase hover:opacity-85 transition-opacity rounded-[3px] font-mono"
                >
                  View Work
                </a>
                <a
                  href="/Resume.pdf"
                  download
                  className="px-[30px] py-[13px] border border-border2 text-fg text-[12px] tracking-[0.06em] uppercase hover:border-fg2 transition-colors rounded-[3px] font-mono"
                >
                  Download CV
                </a>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="mt-20 flex items-center gap-[14px] text-fg3 text-[11px] tracking-[0.1em] uppercase">
              <div className="w-[60px] h-[1px] bg-border2 relative overflow-hidden scan-line" />
              <span>Scroll to explore</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="border-t border-b border-border py-6 overflow-hidden">
        <div className="flex gap-16 items-center animate-marquee w-max">
          {full.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-[11px] font-mono text-fg3 tracking-[0.12em] uppercase whitespace-nowrap">
                {item}
              </span>
              <span className="text-border2 text-[8px]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STACK ── */}
      <SectionWrapper id="stack">
        <Container>
          <div className="grid md:grid-cols-[1fr_2fr] gap-24 items-start">
            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-fg3 mb-3">What I use</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-4 text-fg">
                Technologies I work with
              </h2>
              <p className="text-fg2 text-[14px] max-w-[400px] leading-[1.75]">
                A curated stack built for performance, scalability, and clean architecture.
              </p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-[1px] bg-border">
              {stack.map((s) => (
                <div
                  key={s.name}
                  className="group bg-background hover:bg-bg2 px-4 py-7 flex flex-col items-center gap-[10px] cursor-default transition-colors duration-200 relative overflow-hidden"
                >
                  <Image src={s.icon} alt={s.name} width={28} height={28} className="object-contain" unoptimized />
                  <span className="text-[11px] text-fg3 tracking-[0.06em] uppercase text-center group-hover:text-accent transition-colors duration-200 font-mono">
                    {s.name}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms] origin-left" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <hr className="border-border" />

      {/* ── PROJECTS ── */}
      <SectionWrapper id="projects">
        <Container>
          <div className="flex justify-between items-end flex-wrap gap-4 mb-12">
            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-fg3 mb-3">Portfolio</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.04em] leading-[1.05] text-fg">
                Selected projects
              </h2>
            </div>
            <p className="text-fg2 text-[14px] max-w-[300px] leading-[1.75]">
              Full stack SaaS products, AI tools, and production systems.
            </p>
          </div>

          {/* PostIdea — hero project, full width */}
          {postIdea && (
            <div className="mb-6">
              <div className="group relative bg-surface hover:bg-bg2 transition-colors duration-200 border border-border overflow-hidden">
                <div className="grid md:grid-cols-[1fr_1fr] gap-0">
                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] bg-bg3 overflow-hidden">
                    {postIdea.screenshot ? (
                      <Image
                        src={postIdea.screenshot}
                        alt={postIdea.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-fg3 text-[11px] tracking-[0.1em] uppercase">
                        Screenshot coming soon
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/60 group-hover:to-bg2/60 transition-all duration-200" />
                  </div>
                  {/* Content */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] px-[9px] py-[3px] border border-accent/30 text-accent tracking-[0.06em] uppercase">
                          In Progress
                        </span>
                        <span className="text-[10px] text-fg3 tracking-[0.06em] uppercase">Featured #1</span>
                      </div>
                      <h3 className="font-display text-[26px] font-bold tracking-[-0.03em] mb-3 text-fg">
                        {postIdea.title}
                      </h3>
                      <p className="text-[13px] text-fg2 leading-[1.8] mb-6">
                        {postIdea.description}
                      </p>
                      <div className="flex flex-wrap gap-[5px] mb-6">
                        {postIdea.techStack.slice(0, 6).map((t) => (
                          <span key={t} className="text-[10px] font-mono px-[9px] py-[3px] border border-border2 text-fg3 tracking-[0.06em] uppercase">
                            {t}
                          </span>
                        ))}
                        {postIdea.techStack.length > 6 && (
                          <span className="text-[10px] text-fg3 self-center">+{postIdea.techStack.length - 6}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      {postIdea.liveUrl && (
                        <a href={postIdea.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[11px] px-4 py-2 bg-accent text-background tracking-[0.08em] uppercase hover:opacity-85 transition-opacity font-mono">
                          Live ↗
                        </a>
                      )}
                      <Link href={`/projects/${postIdea.slug}`}
                        className="text-[11px] text-accent tracking-[0.08em] uppercase flex items-center gap-1 hover:gap-2 transition-all duration-200">
                        Full case study
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="neon-border">
                  <span className="nb-t" /><span className="nb-b" />
                  <span className="nb-l" /><span className="nb-r" />
                </div>
              </div>
            </div>
          )}

          {/* Terra Debugger — hero project #2, full width */}
          {terraDebugger && (
            <div className="mb-6">
              <div className="group relative bg-surface hover:bg-bg2 transition-colors duration-200 border border-border overflow-hidden">
                <div className="grid md:grid-cols-[1fr_1fr] gap-0">
                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] bg-bg3 overflow-hidden">
                    {terraDebugger.screenshot ? (
                      <Image
                        src={terraDebugger.screenshot}
                        alt={terraDebugger.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-fg3 text-[11px] tracking-[0.1em] uppercase">
                        Screenshot coming soon
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/60 group-hover:to-bg2/60 transition-all duration-200" />
                  </div>
                  {/* Content */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] px-[9px] py-[3px] border border-accent/30 text-accent tracking-[0.06em] uppercase">
                          {terraDebugger.type}
                        </span>
                        <span className="text-[10px] text-fg3 tracking-[0.06em] uppercase">Featured #2</span>
                      </div>
                      <h3 className="font-display text-[26px] font-bold tracking-[-0.03em] mb-3 text-fg">
                        {terraDebugger.title}
                      </h3>
                      <p className="text-[13px] text-fg2 leading-[1.8] mb-6">
                        {terraDebugger.description}
                      </p>
                      <div className="flex flex-wrap gap-[5px] mb-6">
                        {terraDebugger.techStack.slice(0, 6).map((t) => (
                          <span key={t} className="text-[10px] font-mono px-[9px] py-[3px] border border-border2 text-fg3 tracking-[0.06em] uppercase">
                            {t}
                          </span>
                        ))}
                        {terraDebugger.techStack.length > 6 && (
                          <span className="text-[10px] text-fg3 self-center">+{terraDebugger.techStack.length - 6}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      {terraDebugger.liveUrl && (
                        <a href={terraDebugger.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[11px] px-4 py-2 bg-accent text-background tracking-[0.08em] uppercase hover:opacity-85 transition-opacity font-mono">
                          Live Demo ↗
                        </a>
                      )}
                      <Link href={`/projects/${terraDebugger.slug}`}
                        className="text-[11px] text-accent tracking-[0.08em] uppercase flex items-center gap-1 hover:gap-2 transition-all duration-200">
                        Full case study
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="neon-border">
                  <span className="nb-t" /><span className="nb-b" />
                  <span className="nb-l" /><span className="nb-r" />
                </div>
              </div>
            </div>
          )}

          {/* Rest of featured projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherFeatured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[11px] text-fg3 tracking-[0.1em] uppercase hover:text-accent transition-colors duration-200"
            >
              View all projects
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </Container>
      </SectionWrapper>

      <hr className="border-border" />

      {/* ── FAQ ── */}
      <SectionWrapper id="faq">
        <Container>
          <div className="grid md:grid-cols-[1fr_2fr] gap-24 items-start">
            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-fg3 mb-3">Questions</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-4 text-fg">
                FAQs
              </h2>
              <p className="text-fg2 text-[14px] max-w-[400px] leading-[1.75]">
                Everything you might want to know before reaching out.
              </p>
            </div>
            <div className="border border-border">
              {faqs.map((f, i) => (
                <div key={i} className="border-b border-border last:border-b-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="group w-full px-6 py-6 flex items-center justify-between gap-4 text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] origin-left" />
                    <span className={`font-display text-[16px] font-medium tracking-[-0.01em] transition-colors ${openFaq === i ? "text-accent" : "text-fg group-hover:text-accent"}`}>
                      {f.q}
                    </span>
                    <svg
                      className={`w-[18px] h-[18px] flex-shrink-0 transition-transform duration-[350ms] ${openFaq === i ? "rotate-180 text-accent" : "text-fg3"}`}
                      viewBox="0 0 32 32" fill="none"
                    >
                      <path d="M7.82 12.18a.75.75 0 011.06 0L16 19.3l7.12-7.12a.75.75 0 111.06 1.06l-7.65 7.65a.75.75 0 01-1.06 0L7.82 13.24a.75.75 0 010-1.06z" fill="currentColor" />
                    </svg>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-[400ms] ease-in-out"
                    style={{ maxHeight: openFaq === i ? "300px" : "0px" }}
                  >
                    <p className="px-6 pb-6 text-[13px] text-fg2 leading-[1.9]">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <hr className="border-border" />

      {/* ── CONTACT ── */}
      <SectionWrapper id="contact">
        <Container>
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-24 items-start">
            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-fg3 mb-3">Contact</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-4 text-fg">
                Get in touch
              </h2>
              <p className="text-fg2 text-[14px] leading-[1.75] mb-10">
                Drop me a line, give me a call, or send a message using the form.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                    text: "syedmuhammadsufyan237@gmail.com",
                    href: "mailto:syedmuhammadsufyan237@gmail.com",
                  },
                  {
                    icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                    text: "+92 312 2734008",
                    href: "tel:+923122734008",
                  },
                  {
                    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
                    text: "WhatsApp",
                    href: "https://wa.me/923122734008",
                  },
                ].map((item, i) => (
                  <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[13px] text-fg2 hover:text-accent transition-colors">
                    <div className="w-[34px] h-[34px] border border-border2 flex items-center justify-center flex-shrink-0 text-fg3">
                      {item.icon}
                    </div>
                    {item.text}
                  </a>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const json = await res.json();
        setErrorMsg(json.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border p-8 text-center">
        <div className="text-accent text-4xl mb-4">✓</div>
        <p className="font-display text-lg font-semibold text-fg mb-2">Message sent!</p>
        <p className="text-fg2 text-sm">I&#39;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {[
        { label: "Name", name: "name", type: "text", placeholder: "Your name" },
        { label: "Email", name: "email", type: "email", placeholder: "your@email.com" },
      ].map((field) => (
        <div key={field.label}>
          <label className="block text-[11px] tracking-[0.1em] uppercase text-fg3 mb-2">{field.label}</label>
          <input name={field.name} type={field.type} placeholder={field.placeholder} required
            className="w-full bg-surface border border-border2 px-[14px] py-3 text-[13px] text-fg font-mono focus:border-accent outline-none transition-colors duration-200 rounded-[3px] placeholder:text-fg3" />
        </div>
      ))}
      <div>
        <label className="block text-[11px] tracking-[0.1em] uppercase text-fg3 mb-2">Message</label>
        <textarea name="message" placeholder="Tell me about your project…" required rows={5}
          className="w-full bg-surface border border-border2 px-[14px] py-3 text-[13px] text-fg font-mono focus:border-accent outline-none transition-colors duration-200 resize-none rounded-[3px] placeholder:text-fg3" />
      </div>
      {status === "error" && (
        <p className="text-[12px] text-red-400">{errorMsg}</p>
      )}
      <button type="submit" disabled={status === "loading"}
        className="w-full py-[14px] bg-accent text-background text-[12px] font-medium tracking-[0.08em] uppercase transition-opacity font-mono rounded-[3px] disabled:opacity-50">
        {status === "loading" ? "Sending…" : "Send Message →"}
      </button>
    </form>
  );
}
