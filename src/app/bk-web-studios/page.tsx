import type { Metadata } from "next";
import Image from "next/image";
import { bkWebStudios, clientSites } from "@/lib/site-config";
import { hasPublicFile } from "@/lib/media";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: bkWebStudios.name,
};

export default function BkWebStudiosPage() {
  const hasLogo = hasPublicFile(bkWebStudios.logo.replace(/^\//, ""));
  const sitesWithScreenshots = clientSites.map((site) => ({
    ...site,
    hasScreenshot: Boolean(site.screenshot) && hasPublicFile(site.screenshot!.replace(/^\//, "")),
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <Reveal>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-border bg-surface text-center text-[10px] text-muted">
            {hasLogo ? (
              <Image src={bkWebStudios.logo} alt={bkWebStudios.name} width={80} height={80} className="object-contain" />
            ) : (
              "[LOGO]"
            )}
          </div>
          <div>
            <h1 className="font-serif text-4xl italic leading-[1.1] text-foreground sm:text-5xl">
              {bkWebStudios.name}
            </h1>
            <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted">
              {bkWebStudios.tagline}
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">{bkWebStudios.description}</p>
        <a
          href={bkWebStudios.siteUrl}
          target="_blank"
          rel="noreferrer"
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
        >
          Book a website at bkwebstudios.com
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            &#8599;
          </span>
        </a>
      </Reveal>

      <Reveal>
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
            Sites I&apos;ve built
          </h2>
          <div className="mt-6 grid gap-6">
            {sitesWithScreenshots.map((site) => (
              <ProjectCard key={site.slug} project={site} hasScreenshot={site.hasScreenshot} />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
