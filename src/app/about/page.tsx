import type { Metadata } from "next";
import { profile, education } from "@/lib/site-config";
import { GitHubIcon, LinkedInIcon, FileIcon } from "@/components/icons";
import CopyEmailButton from "@/components/CopyEmailButton";
import Reveal from "@/components/Reveal";
import SkillsGrid from "@/components/SkillsGrid";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <Reveal>
        <h1 className="font-serif text-4xl italic leading-[1.1] text-foreground sm:text-5xl">About</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{profile.bio}</p>
      </Reveal>

      <Reveal>
        <section className="mt-16 grid gap-10 border-t border-border pt-10 sm:grid-cols-2">
          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
              Education
            </h2>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-foreground">{education.school}</h3>
              <p className="mt-1 text-sm text-muted">{education.degree}</p>
              <p className="mt-2 font-mono text-xs text-muted">
                GPA {education.gpa} &middot; {education.honors} &middot; {education.graduation}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
              Contact
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              <CopyEmailButton email={profile.email} />
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-foreground transition-all hover:translate-x-0.5 hover:text-accent"
              >
                <LinkedInIcon className="h-4 w-4 text-muted" />
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-foreground transition-all hover:translate-x-0.5 hover:text-accent"
              >
                <GitHubIcon className="h-4 w-4 text-muted" />
                GitHub
              </a>
              <a
                href={profile.resumeUrl}
                className="flex items-center gap-3 text-sm text-foreground transition-all hover:translate-x-0.5 hover:text-accent"
              >
                <FileIcon className="h-4 w-4 text-muted" />
                Download resume (PDF)
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
            Skills
          </h2>
          <div className="mt-6">
            <SkillsGrid />
          </div>
        </section>
      </Reveal>
    </div>
  );
}
