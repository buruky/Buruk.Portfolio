"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lane, Project, laneColors } from "@/lib/site-config";
import ProjectCard from "@/components/ProjectCard";

const lanes: Lane[] = ["Salesforce/CRM", "Full Stack", "Data Science & Research"];

type ProjectWithScreenshot = Project & { hasScreenshot: boolean };

export default function ProjectsSection({ projects }: { projects: ProjectWithScreenshot[] }) {
  const [filter, setFilter] = useState<Lane | "All">("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.lane === filter);

  return (
    <div className="lg:grid lg:grid-cols-[180px_1fr] lg:items-start lg:gap-10">
      <div className="lg:sticky lg:top-28">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Filter</p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-sm lg:flex-col lg:items-start lg:gap-0.5">
          <button
            type="button"
            onClick={() => setFilter("All")}
            className={`relative rounded-full px-3 py-1.5 transition-colors lg:w-full lg:rounded-sm lg:px-2 lg:text-left ${
              filter === "All" ? "font-medium text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {filter === "All" && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-surface lg:rounded-sm"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">All</span>
          </button>
          {lanes.map((lane) => (
            <button
              key={lane}
              type="button"
              onClick={() => setFilter(lane)}
              className={`relative rounded-full px-3 py-1.5 transition-colors lg:w-full lg:rounded-sm lg:px-2 lg:text-left ${
                filter === lane ? `font-medium ${laneColors[lane]}` : "text-muted hover:text-foreground"
              }`}
            >
              {filter === lane && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-surface lg:rounded-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{lane}</span>
            </button>
          ))}
        </div>
        <p className="mt-6 hidden font-mono text-xs text-foreground/60 lg:block">
          {filtered.length.toString().padStart(2, "0")} / {projects.length.toString().padStart(2, "0")}
        </p>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:mt-0">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} hasScreenshot={project.hasScreenshot} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
