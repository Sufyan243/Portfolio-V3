"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container";
import FilterBar from "@/components/FilterBar";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const filters = ["All", "Backend", "AI", "Frontend", "Full Stack"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = projects.filter((p) => {
    if (activeFilter === "All") return true;
    return p.type.toLowerCase() === activeFilter.toLowerCase() ||
      (activeFilter === "Full Stack" && p.type === "fullstack");
  });

  const featured = filtered.filter((p) => p.category === "featured");
  const secondary = filtered.filter((p) => p.category === "secondary");
  const archive = filtered.filter((p) => p.category === "archive");

  return (
    <div className="py-[120px]">
      <Container>
        <p className="text-[11px] tracking-[0.14em] uppercase text-fg3 mb-3">Portfolio</p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-4 text-fg">
          All Projects
        </h1>
        <p className="text-fg2 text-[14px] mb-12 leading-[1.75] max-w-[500px]">
          A complete collection of backend systems, AI integrations, and full-stack applications.
        </p>

        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} filters={filters} />

        {featured.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] mb-6 text-fg">
              Featured
            </h2>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {featured.map((project) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {secondary.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] mb-6 text-fg">
              More Projects
            </h2>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {secondary.map((project) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {archive.length > 0 && (
          <div>
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] mb-6 text-fg">Archive</h2>
            <div className="border border-border">
              {archive.map((project) => (
                <a
                  key={project.slug}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-6 py-4 border-b border-border last:border-b-0 hover:bg-bg2 transition-colors relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] origin-left" />
                  <span className="font-display text-[15px] font-medium text-fg">{project.title}</span>
                  <span className="text-fg3 group-hover:text-accent transition-colors text-sm">→</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {featured.length === 0 && secondary.length === 0 && archive.length === 0 && (
          <div className="border border-border py-16 text-center">
            <p className="text-fg3 text-[13px] tracking-[0.06em] uppercase">No projects found for this filter.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
