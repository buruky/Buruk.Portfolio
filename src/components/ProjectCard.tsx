"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { Project, laneColors } from "@/lib/site-config";
import DemoVideoPlayer from "./DemoVideoPlayer";
import CornerBrackets from "./CornerBrackets";

const positionClass = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
};

export default function ProjectCard({
  project,
  hasScreenshot,
}: {
  project: Project;
  hasScreenshot: boolean;
}) {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, rgba(169,74,42,0.16), transparent 72%)`;

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      className="relative flex h-full flex-col rounded-2xl border border-border bg-background p-5 shadow-[0_1px_2px_rgba(43,36,32,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-[0_20px_48px_rgba(43,36,32,0.12)] sm:p-6"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -4 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        onPointerMove={reduce ? undefined : handlePointerMove}
        className={`group relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-surface text-center text-xs text-muted ${
          project.demoVideo ? "aspect-video" : "aspect-19/8 px-3"
        }`}
      >
        {!reduce && (
          <motion.div
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <CornerBrackets color="var(--accent)" />
        {project.demoVideo ? (
          <DemoVideoPlayer src={project.demoVideo} />
        ) : hasScreenshot ? (
          <Image
            src={project.screenshot!}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className={
              project.screenshotFit === "contain"
                ? "object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                : `object-cover transition-transform duration-500 group-hover:scale-[1.03] ${positionClass[project.screenshotPosition ?? "top"]}`
            }
          />
        ) : (
          project.screenshotPlaceholder
        )}
      </motion.div>

      <div className="mt-5 flex flex-1 flex-col">
        <p
          className={`font-mono text-xs font-medium uppercase tracking-widest ${laneColors[project.lane]}`}
        >
          {project.lane}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-foreground">{project.name}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <p className="mt-3 font-mono text-xs text-muted">
          <span className="text-foreground/60">role/</span> {project.role}
        </p>

        <div className="mt-auto flex flex-wrap gap-5 pt-5 text-sm">
          {project.paperUrl && (
            <a
              href={project.paperUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
            >
              Read the paper
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          )}
          {!project.paperUrl && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
            >
              Live site
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          )}
          {!project.paperUrl && project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
            >
              Code
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          )}
          {!project.paperUrl && project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
            >
              In-depth guide
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          )}
        </div>

        {project.demoLogin && (
          <p className="mt-2 text-xs text-muted">
            Demo login: <span className="font-mono">{project.demoLogin.email}</span> /{" "}
            <span className="font-mono">{project.demoLogin.password}</span>
          </p>
        )}
      </div>
    </motion.article>
  );
}
