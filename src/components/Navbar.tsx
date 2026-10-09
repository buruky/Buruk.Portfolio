"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/lib/site-config";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const navLinks = [
  { href: "/", label: "Home", section: "home" },
  { href: "/#projects", label: "Projects", section: "projects" },
  { href: "/about", label: "About", section: null },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY, scrollYProgress } = useScroll();
  const navBackground = useTransform(scrollY, [0, 80], ["rgba(250, 247, 242, 0)", "rgba(250, 247, 242, 0.92)"]);
  const navBorder = useTransform(scrollY, [0, 80], ["rgba(43, 36, 32, 0)", "rgba(43, 36, 32, 0.1)"]);
  const navBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(12px)"]);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = ["home", "projects"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (link: (typeof navLinks)[number]) => {
    if (link.section === null) return pathname === link.href;
    return pathname === "/" && activeSection === link.section;
  };

  return (
    <motion.header
      style={{ backgroundColor: navBackground, borderColor: navBorder, backdropFilter: navBlur }}
      className="sticky top-0 z-50 border-b"
    >
      <a href="#main-content" className="skip-link fixed left-4 top-4 z-[100] rounded-sm bg-accent px-4 py-2 text-sm font-medium text-background">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-serif text-lg italic text-foreground">
          Buruk Yimesgen
        </Link>
        <nav className="flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative py-1 transition-colors ${
                    isActive(link) ? "font-medium text-foreground" : "hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive(link) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-1 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
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
        </nav>
      </div>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
      />
    </motion.header>
  );
}
