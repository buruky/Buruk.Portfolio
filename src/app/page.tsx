import Image from "next/image";
import Link from "next/link";
import {
  profile,
  projects,
  skillGroups,
  laneColors,
  currentRole,
  heroPhoto,
} from "@/lib/site-config";
import { hasPublicFile } from "@/lib/media";
import { FileIcon } from "@/components/icons";
import ProjectCard from "@/components/ProjectCard";

const lanes: { name: keyof typeof laneColors; blurb: string }[] = [
  {
    name: "Salesforce/CRM",
    blurb: "Building on the Salesforce platform — Apex, LWC, and NPSP-based case management.",
  },
  {
    name: "Full Stack",
    blurb: "End-to-end web apps and games, from UI to backend, with React and JavaScript/Python.",
  },
  {
    name: "Data Science & Research",
    blurb: "Applied research spanning quantum computing and NASA climate data analysis.",
  },
];

export default function Home() {
  const hasHeroPhoto = hasPublicFile("images/city-bg.jpg");
  const hasProfilePhoto = hasPublicFile("images/profile.jpg");

  return (
    <>
      <section className="relative flex h-[85vh] max-h-[780px] min-h-[560px] w-full items-end">
        {hasHeroPhoto ? (
          <Image src={heroPhoto} alt="" fill priority className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#e7dfd1] text-sm text-muted">
            [BACKGROUND PHOTO: your city]
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#1c1712]/85 via-[#1c1712]/25 to-[#1c1712]/10" />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-6 pb-16 text-center">
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-[#faf7f2] shadow-md sm:h-52 sm:w-52">
            {hasProfilePhoto ? (
              <Image src={profile.photo} alt={profile.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#e7dfd1] px-2 text-center text-[10px] text-muted">
                [YOUR PHOTO]
              </div>
            )}
          </div>

          {currentRole && (
            <div className="flex items-center gap-2 text-sm text-[#faf7f2]/85">
              {currentRole.logo && (
                <span className="relative h-5 w-5 overflow-hidden rounded-sm">
                  <Image src={currentRole.logo} alt={currentRole.company} fill className="object-contain" />
                </span>
              )}
              <span>
                {currentRole.title} @ {currentRole.company}
              </span>
            </div>
          )}

          <h1 className="font-serif text-5xl text-[#faf7f2] sm:text-6xl">{profile.name}</h1>
          <p className="font-serif text-lg italic text-[#e8b98e]">{profile.tagline}</p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              href="#projects"
              className="rounded-sm bg-[#faf7f2] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-[#e8b98e]"
            >
              View Projects
            </Link>
            <a
              href={profile.resumeUrl}
              className="flex items-center gap-2 text-sm font-medium text-[#faf7f2] transition-colors hover:text-[#e8b98e]"
            >
              <FileIcon className="h-4 w-4" />
              Resume
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <section className="py-14 text-center">
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.bio}
          </p>
        </section>

        <section className="border-t border-border py-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
            Three lanes
          </h2>
          <div className="mt-6 divide-y divide-border">
            {lanes.map((lane) => (
              <div key={lane.name} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
                <p className={`w-48 shrink-0 text-sm font-medium ${laneColors[lane.name]}`}>
                  {lane.name}
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {lane.blurb}{" "}
                  <span className="text-foreground/60">
                    ({projects.filter((p) => p.lane === lane.name).length} project
                    {projects.filter((p) => p.lane === lane.name).length === 1 ? "" : "s"})
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="border-t border-border py-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
            Projects
          </h2>
          <div className="mt-2 divide-y divide-border">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="border-t border-border py-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
            Skills
          </h2>
          <div className="mt-6 space-y-3">
            {skillGroups.map((group) => (
              <p key={group.category} className="text-sm leading-relaxed">
                <span className="text-foreground/70">{group.category}: </span>
                <span className="text-muted">{group.skills.join(", ")}</span>
              </p>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-14">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              More on my background, education, and how to reach me.
            </p>
            <Link
              href="/about"
              className="text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
            >
              About &amp; Contact &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
