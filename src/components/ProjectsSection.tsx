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
    <div>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm">
        <button
          type="button"
          onClick={() => setFilter("All")}
          className={`relative rounded-full px-3 py-1.5 transition-colors ${
            filter === "All" ? "font-medium text-foreground" : "text-muted hover:text-foreground"
          }`}
        >
          {filter === "All" && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-[#f0e9df]"
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
            className={`relative rounded-full px-3 py-1.5 transition-colors ${
              filter === lane ? `font-medium ${laneColors[lane]}` : "text-muted hover:text-foreground"
            }`}
          >
            {filter === lane && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-[#f0e9df]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{lane}</span>
          </button>
        ))}
      </div>

      <div className="mt-2 divide-y divide-border">
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
