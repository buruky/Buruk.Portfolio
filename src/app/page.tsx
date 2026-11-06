import Link from "next/link";
import {
  profile,
  projects,
  skillGroups,
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
import CopyEmailButton from "@/components/CopyEmailButton";

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
              {profile.intro}
            </p>
            <div className="mt-10 flex flex-wrap items-start justify-center gap-x-12 gap-y-6">
              <StatCounter value={projects.length} label="Projects" />
              <StatCounter value={2} label="Majors" />
              <StatCounter value={parseFloat(education.gpa)} decimals={2} label="GPA" />
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="bk-web-studios" className="border-t border-border py-16">
            <div className="rounded-2xl border border-accent/30 bg-surface p-8 sm:p-12">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                Founder &amp; Lead Developer
              </p>
              <h2 className="mt-3 font-serif text-4xl italic text-foreground sm:text-5xl">
                {bkWebStudios.name}
              </h2>
              <p className="mt-2 text-base font-medium text-foreground/80">{bkWebStudios.tagline}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{bkWebStudios.description}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <MagneticButton strength={10}>
                  <a
                    href={bkWebStudios.siteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
                  >
                    Book a free call &#8599;
                  </a>
                </MagneticButton>
                <Link
                  href="/bk-web-studios"
                  className="text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
                >
                  View client sites &rarr;
                </Link>
              </div>
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
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-serif text-3xl italic text-foreground sm:text-4xl">Let&apos;s talk</h2>
                <p className="mt-3 text-sm text-muted">
                  Open to entry-level roles. Email is the fastest way to reach me.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-block rounded-sm bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
                  >
                    Email me
                  </a>
                  <CopyEmailButton email={profile.email} />
                </div>
              </div>
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
