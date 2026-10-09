import Link from "next/link";
import { profile } from "@/lib/site-config";
import CopyEmailButton from "@/components/CopyEmailButton";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import Logo from "@/components/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3 sm:px-10">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo />
            <p className="font-serif text-lg italic text-foreground">{profile.name}</p>
          </div>
          <p className="mt-3 max-w-48 text-sm leading-relaxed text-muted">{profile.tagline}</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Index</p>
          <ul className="mt-3 space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-foreground/80 transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Contact</p>
          <div className="mt-3 flex flex-col items-start gap-3">
            <CopyEmailButton email={profile.email} />
            <div className="flex items-center gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-muted transition-all hover:-translate-y-0.5 hover:text-foreground"
              >
                <GitHubIcon className="h-4.25 w-4.25" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-muted transition-all hover:-translate-y-0.5 hover:text-foreground"
              >
                <LinkedInIcon className="h-4.25 w-4.25" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-5 text-xs text-muted sm:px-10">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
