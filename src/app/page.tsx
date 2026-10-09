import Image from "next/image";
import Link from "next/link";
import {
  profile,
  projects,
  skillGroups,
  laneColors,
  currentRole,
  heroPhoto,
  education,
} from "@/lib/site-config";
import { hasPublicFile } from "@/lib/media";
import { FileIcon } from "@/components/icons";
import ProjectsSection from "@/components/ProjectsSection";
import Reveal from "@/components/Reveal";
import HeroParallax from "@/components/HeroParallax";
import ScrambleText from "@/components/ScrambleText";
import MagneticButton from "@/components/MagneticButton";
import StatCounter from "@/components/StatCounter";
import SkillsMarquee from "@/components/SkillsMarquee";
import SkillsGrid from "@/components/SkillsGrid";
import CornerBrackets from "@/components/CornerBrackets";

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
  const projectsWithScreenshots = projects.map((project) => ({
    ...project,
    hasScreenshot: Boolean(project.screenshot) && hasPublicFile(project.screenshot!.replace(/^\//, "")),
  }));
  const allSkills = [...new Set(skillGroups.flatMap((group) => group.skills))];

  return (
    <>
      <section id="home" className="relative flex min-h-[85dvh] max-h-210 w-full items-center overflow-hidden">
        {hasHeroPhoto ? (
          <HeroParallax src={heroPhoto} alt="" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#e7dfd1] text-sm text-muted">
            [BACKGROUND PHOTO: your city]
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#1c1712]/85 via-[#1c1712]/25 to-[#1c1712]/10" />
        <div
          aria-hidden="true"
          className="scan-sweep pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-[#e8b98e]/25 via-[#e8b98e]/5 to-transparent"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-6 py-10 text-center">
          <Reveal>
            <div className="group relative h-40 w-40 overflow-hidden rounded-full border-4 border-[#faf7f2] shadow-[0_12px_32px_rgba(28,23,18,0.45)] sm:h-52 sm:w-52">
              {hasProfilePhoto ? (
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  sizes="(min-width: 640px) 13rem, 10rem"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#e7dfd1] px-2 text-center text-[10px] text-muted">
                  [YOUR PHOTO]
                </div>
              )}
              <CornerBrackets color="#e8b98e" inset="inset-1" />
            </div>
          </Reveal>

          {currentRole && (
            <Reveal delay={0.08}>
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
            </Reveal>
          )}

          <Reveal delay={0.14}>
            <h1 className="font-serif text-5xl text-[#faf7f2] sm:text-6xl">{profile.name}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-mono text-sm tracking-tight text-[#e8b98e] sm:text-base">
              <ScrambleText text={profile.tagline} delay={0.6} />
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <MagneticButton strength={10}>
                <Link
                  href="#projects"
                  className="inline-block rounded-sm bg-[#faf7f2] px-5 py-2.5 text-sm font-medium text-[#2b2420] shadow-[0_4px_16px_rgba(28,23,18,0.25)] transition-all duration-200 hover:bg-[#e8b98e] hover:shadow-[0_8px_24px_rgba(28,23,18,0.3)] active:scale-[0.98]"
                >
                  View Projects
                </Link>
              </MagneticButton>
              <a
                href={profile.resumeUrl}
                className="flex items-center gap-2 text-sm font-medium text-[#faf7f2] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#e8b98e] active:translate-y-0"
              >
                <FileIcon className="h-4 w-4" />
                Resume
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="border-b border-border bg-surface/60 py-4">
        <SkillsMarquee skills={allSkills} />
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <section className="py-14 text-center">
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.bio}
            </p>
            <div className="mt-10 flex flex-wrap items-start justify-center gap-x-12 gap-y-6">
              <StatCounter value={projects.length} label="Projects shipped" />
              <StatCounter value={2} label="Majors" />
              <StatCounter value={parseFloat(education.gpa)} decimals={2} label="GPA" />
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="border-t border-border py-16">
            <h2 className="font-serif text-3xl italic text-foreground sm:text-4xl">Three lanes</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {lanes.map((lane) => (
                <div
                  key={lane.name}
                  className="group relative overflow-hidden rounded-2xl border border-border p-6 transition-colors duration-300 hover:border-accent/30"
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full ${laneColors[lane.name]}`}
                  />
                  <p className={`font-mono text-xs font-medium uppercase tracking-widest ${laneColors[lane.name]}`}>
                    {lane.name}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{lane.blurb}</p>
                  <p className="mt-4 font-mono text-xs text-foreground/60">
                    {projects.filter((p) => p.lane === lane.name).length} project
                    {projects.filter((p) => p.lane === lane.name).length === 1 ? "" : "s"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <section id="projects" className="border-t border-border py-16">
          <Reveal>
            <h2 className="font-serif text-3xl italic text-foreground sm:text-4xl">Projects</h2>
          </Reveal>
          <div className="mt-8">
            <ProjectsSection projects={projectsWithScreenshots} />
          </div>
        </section>

        <Reveal>
          <section className="border-t border-border py-16">
            <h2 className="font-serif text-3xl italic text-foreground sm:text-4xl">Skills</h2>
            <div className="mt-8">
              <SkillsGrid />
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="border-t border-border py-14">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                More on my background, education, and how to reach me.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-1 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
              >
                About &amp; Contact
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
