import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-6 py-28">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">404</p>
      <h1 className="mt-4 font-serif text-4xl italic text-foreground">
        This page wandered off.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist, or it moved. Head back home or
        check out the projects.
      </p>
      <div className="mt-8 flex items-center gap-6 text-sm">
        <Link
          href="/"
          className="rounded-sm bg-foreground px-5 py-2.5 font-medium text-background transition-colors hover:bg-accent"
        >
          Back home
        </Link>
        <Link
          href="/#projects"
          className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
        >
          View projects &rarr;
        </Link>
      </div>
    </div>
  );
}
