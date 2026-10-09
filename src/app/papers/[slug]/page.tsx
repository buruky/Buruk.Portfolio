import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, laneColors } from "@/lib/site-config";
import { FileIcon, ExternalLinkIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";

function getPaper(slug: string) {
  return projects.find((p) => p.slug === slug && p.paperUrl);
}

export function generateStaticParams() {
  return projects.filter((p) => p.paperUrl).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) return {};
  return { title: paper.name, description: paper.description };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <Reveal>
        <a
          href="/#projects"
          className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          ← Back to projects
        </a>

        <p className={`mt-6 font-mono text-xs font-medium uppercase tracking-widest ${laneColors[paper.lane]}`}>
          {paper.lane}
        </p>
        <h1 className="mt-2 font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl">
          {paper.name}
        </h1>
        <p className="mt-3 font-mono text-xs text-muted">
          <span className="text-foreground/60">authors/</span> {paper.role}
        </p>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">{paper.description}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {paper.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-5 text-sm">
          <a
            href={paper.paperUrl!}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-foreground transition-colors hover:border-accent/30 hover:text-accent"
          >
            <FileIcon className="h-4 w-4" />
            Open full PDF
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
          <object
            data={paper.paperUrl!}
            type="application/pdf"
            className="h-[80vh] w-full"
            aria-label={`${paper.name} PDF preview`}
          >
            <p className="p-6 text-sm text-muted">
              Your browser can&apos;t preview this PDF inline.{" "}
              <a href={paper.paperUrl!} className="text-accent underline underline-offset-4">
                Open it directly
              </a>
              .
            </p>
          </object>
        </div>
      </Reveal>
    </div>
  );
}
