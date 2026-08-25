import Link from "next/link";
import { profile } from "@/lib/site-config";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-serif text-lg italic text-foreground">
          Buruk Yimesgen
        </Link>
        <nav className="flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 border-l border-border pl-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-foreground"
            >
              <GitHubIcon className="h-4.25 w-4.25" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-foreground"
            >
              <LinkedInIcon className="h-4.25 w-4.25" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
