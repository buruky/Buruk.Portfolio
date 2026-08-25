import { profile } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <a
          href={`mailto:${profile.email}`}
          className="transition-colors hover:text-foreground"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
