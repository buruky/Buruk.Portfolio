import type { Metadata } from "next";
import { profile, education, skillGroups } from "@/lib/site-config";
import { GitHubIcon, LinkedInIcon, FileIcon } from "@/components/icons";
import CopyEmailButton from "@/components/CopyEmailButton";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="font-serif text-4xl italic leading-[1.1] text-foreground">About</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{profile.bio}</p>
      </Reveal>

      <Reveal>
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
            Education
          </h2>
          <div className="mt-4">
            <h3 className="font-serif text-xl text-foreground">{education.school}</h3>
            <p className="mt-1 text-sm text-muted">{education.degree}</p>
            <p className="mt-2 text-sm text-muted">
              GPA {education.gpa} &middot; {education.honors} &middot; Graduated{" "}
              {education.graduation}
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-14 border-t border-border pt-10">
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
      </Reveal>

      <Reveal>
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
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
        </section>
      </Reveal>
    </div>
  );
}
