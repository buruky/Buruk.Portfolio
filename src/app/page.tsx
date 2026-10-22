import Link from "next/link";
import {
  profile,
  projects,
  skillGroups,
  laneColors,
  currentRole,
  heroPhoto,
  education,
  bkWebStudios,
} from "@/lib/site-config";
import { hasPublicFile } from "@/lib/media";
import ProjectsSection from "@/components/ProjectsSection";
import Reveal from "@/components/Reveal";
import HeroStage from "@/components/HeroStage";
import MagneticButton from "@/components/MagneticButton";
import StatCounter from "@/components/StatCounter";
import SkillsMarquee from "@/components/SkillsMarquee";
import SkillsGrid from "@/components/SkillsGrid";

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
  const hasProfilePhoto = hasPublicFile("images/profile.jpg");
  const hasHeroPhoto = hasPublicFile("images/city-bg.jpg");
  const projectsWithScreenshots = projects.map((project) => ({
    ...project,
    hasScreenshot: Boolean(project.screenshot) && hasPublicFile(project.screenshot!.replace(/^\//, "")),
  }));
  const allSkills = [...new Set(skillGroups.flatMap((group) => group.skills))];

  return (
    <>
      <HeroStage
        name={profile.name}
        tagline={profile.tagline}
        photoSrc={profile.photo}
        hasProfilePhoto={hasProfilePhoto}
        heroPhoto={heroPhoto}
        hasHeroPhoto={hasHeroPhoto}
        currentRole={currentRole}
        resumeUrl={profile.resumeUrl}
      />

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
          <section id="bk-web-studios" className="border-t border-border py-16">
            <div className="rounded-2xl border border-accent/30 bg-surface p-8 sm:p-12">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                Side Business
              </p>
              <h2 className="mt-3 font-serif text-4xl italic text-foreground sm:text-5xl">
                {bkWebStudios.name}
              </h2>
              <p className="mt-2 text-base font-medium text-foreground/80">{bkWebStudios.tagline}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{bkWebStudios.description}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <MagneticButton strength={10}>
                  <Link
                    href="/bk-web-studios"
                    className="inline-block rounded-sm bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
                  >
                    View client sites &rarr;
                  </Link>
                </MagneticButton>
                <a
                  href={bkWebStudios.siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
                >
                  Book a website at bkwebstudios.com
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    &#8599;
                  </span>
                </a>
              </div>
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
