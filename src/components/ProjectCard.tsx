import Image from "next/image";
import { Project, laneColors } from "@/lib/site-config";

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
  return (
    <article className="py-10">
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-[#f0e9df] px-3 text-center text-xs text-muted ${
          project.demoVideo ? "aspect-video" : "aspect-19/8"
        }`}
      >
        {project.demoVideo ? (
          <video
            controls
            preload="metadata"
            poster={project.screenshot}
            className="h-full w-full object-cover"
          >
            <source src={project.demoVideo} type="video/mp4" />
          </video>
        ) : hasScreenshot ? (
          <Image
            src={project.screenshot!}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className={
              project.screenshotFit === "contain"
                ? "object-contain p-4"
                : `object-cover ${positionClass[project.screenshotPosition ?? "top"]}`
            }
          />
        ) : (
          project.screenshotPlaceholder
        )}
      </div>

      <div className="mt-5">
        <p
          className={`text-xs font-medium uppercase tracking-widest ${laneColors[project.lane]}`}
        >
          {project.lane}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-foreground">{project.name}</h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <dl className="mt-4 space-y-1 text-sm text-muted">
          <div>
            <dt className="inline text-foreground/70">Tech: </dt>
            <dd className="inline">{project.techStack.join(", ")}</dd>
          </div>
          <div>
            <dt className="inline text-foreground/70">Role: </dt>
            <dd className="inline">{project.role}</dd>
          </div>
        </dl>

        <div className="mt-4 flex gap-5 text-sm">
          {project.paperUrl && (
            <a
              href={project.paperUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
            >
              Read the paper &#8599;
            </a>
          )}
          {!project.paperUrl && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
            >
              Live site &#8599;
            </a>
          )}
          {!project.paperUrl && project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
            >
              Code &#8599;
            </a>
          )}
          {!project.paperUrl && project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
            >
              In-depth guide &#8599;
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
    </article>
  );
}
