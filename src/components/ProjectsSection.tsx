"use client";

import { useState } from "react";
import { Lane, Project, laneColors } from "@/lib/site-config";
import ProjectCard from "@/components/ProjectCard";

const lanes: Lane[] = ["Salesforce/CRM", "Full Stack", "Data Science & Research"];

type ProjectWithScreenshot = Project & { hasScreenshot: boolean };

export default function ProjectsSection({ projects }: { projects: ProjectWithScreenshot[] }) {
  const [filter, setFilter] = useState<Lane | "All">("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.lane === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <button
          type="button"
          onClick={() => setFilter("All")}
          className={`transition-colors ${
            filter === "All" ? "font-medium text-foreground" : "text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        {lanes.map((lane) => (
          <button
            key={lane}
            type="button"
            onClick={() => setFilter(lane)}
            className={`transition-colors ${
              filter === lane ? `font-medium ${laneColors[lane]}` : "text-muted hover:text-foreground"
            }`}
          >
            {lane}
          </button>
        ))}
      </div>

      <div className="mt-2 divide-y divide-border">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} hasScreenshot={project.hasScreenshot} />
        ))}
      </div>
    </div>
  );
}
