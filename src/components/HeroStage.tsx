"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import HeroParallax from "@/components/HeroParallax";
import LiquidBackground from "@/components/LiquidBackground";
import ScrambleText from "@/components/ScrambleText";
import MagneticButton from "@/components/MagneticButton";
import CornerBrackets from "@/components/CornerBrackets";
import { FileIcon } from "@/components/icons";
import type { KeycapControls } from "@/components/Keycaps3D";
import { splitNameIntoLetters } from "@/lib/name-letters";
import { MELT_STAGGER, LETTER_REVEAL_AT } from "@/lib/keycap-letter-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const MOBILE_QUERY = "(max-width: 767px)";
// if the 3D scene hasn't drawn by then (slow network), drop the intro and show the hero
const BAIL_MS = 2500;
const SAFETY_MS = 15000;
const HIDDEN = { opacity: 0, y: 18 };
const SHOWN = { opacity: 1, y: 0 };

const KeycapScene = dynamic(() => import("@/components/KeycapScene"), { ssr: false });

export default function HeroStage({
  name,
  tagline,
  photoSrc,
  hasProfilePhoto,
  heroPhoto,
  hasHeroPhoto,
  currentRole,
  resumeUrl,
}: {
  name: string;
  tagline: string;
  photoSrc: string;
  hasProfilePhoto: boolean;
  heroPhoto: string;
  hasHeroPhoto: boolean;
  currentRole: { title: string; company: string; logo: string } | null;
  resumeUrl: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [introWanted, setIntroWanted] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [melting, setMelting] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [legendFont, setLegendFont] = useState<string | null>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const controlRef = useRef<KeycapControls | null>(null);
  const sceneStartedRef = useRef(false);

  const letters = splitNameIntoLetters(name);
  const words = [...new Set(letters.map((l) => l.word))];
  const introRunning = introWanted && !introDone;
  const lettersHidden = introRunning && !melting;
  const revealed = mounted && !introRunning;

  const getTargets = () =>
    Array.from(h1Ref.current?.querySelectorAll("[data-letter]") ?? []).map((el) => el.getBoundingClientRect());

  useEffect(() => {
    const t = setTimeout(() => {
      const desktop = !window.matchMedia(MOBILE_QUERY).matches;
      const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // a reload restored mid-page would send the keys flying to a name that's off screen
      const wanted = desktop && motionOk && window.scrollY < 40;
      // start fetching the 3D bundle now rather than when the scene first renders
      if (wanted) import("@/components/KeycapScene");
      setIntroWanted(wanted);
      setMounted(true);
    }, 0);
    // legend textures are drawn on a canvas, so the serif must be loaded first
    document.fonts.ready.then(() => {
      const letter = h1Ref.current?.querySelector("[data-letter]");
      setLegendFont(letter ? getComputedStyle(letter).fontFamily : "serif");
    });
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!introRunning) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const skip = () => controlRef.current?.skip();
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    const bail = setTimeout(() => {
      if (!sceneStartedRef.current) setIntroDone(true);
    }, BAIL_MS);
    const safety = setTimeout(() => setIntroDone(true), SAFETY_MS);
    return () => {
      root.style.overflow = prev;
      events.forEach((e) => window.removeEventListener(e, skip));
      clearTimeout(bail);
      clearTimeout(safety);
    };
  }, [introRunning]);

  return (
    <section id="home" className="relative flex min-h-[85dvh] max-h-210 w-full items-center overflow-hidden">
      {hasHeroPhoto ? (
        <>
          <HeroParallax src={heroPhoto} alt="" />
          <div className="absolute inset-0 bg-linear-to-t from-[#1c1712]/85 via-[#1c1712]/25 to-[#1c1712]/10" />
        </>
      ) : (
        <LiquidBackground />
      )}
      <div
        aria-hidden="true"
        className="scan-sweep pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-transparent via-[#e8b98e]/20 to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-6 py-10 text-center">
        <motion.div
          initial={HIDDEN}
          animate={revealed ? SHOWN : HIDDEN}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="group relative h-40 w-40 overflow-hidden rounded-full border-4 border-[#faf7f2] shadow-[0_12px_32px_rgba(28,23,18,0.45)] sm:h-52 sm:w-52"
        >
          {hasProfilePhoto ? (
            <Image src={photoSrc} alt={name} fill sizes="(min-width: 640px) 13rem, 10rem" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#e7dfd1] px-2 text-center text-[10px] text-muted">
              [YOUR PHOTO]
            </div>
          )}
          <CornerBrackets color="#e8b98e" inset="inset-1" />
        </motion.div>

        {currentRole && (
          <motion.div
            initial={HIDDEN}
            animate={revealed ? SHOWN : HIDDEN}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
            className="flex items-center gap-2 text-sm text-[#faf7f2]/85"
          >
            {currentRole.logo && (
              <span className="relative h-5 w-5 overflow-hidden rounded-sm">
                <Image src={currentRole.logo} alt={currentRole.company} fill className="object-contain" />
              </span>
            )}
            <span>
              {currentRole.title} @ {currentRole.company}
            </span>
          </motion.div>
        )}

        {/* split into letters so each one can appear as its keycap melts away on top of it */}
        <h1
          ref={h1Ref}
          className={`font-serif text-5xl text-[#faf7f2] sm:text-6xl ${!mounted ? "motion-safe:md:opacity-0" : ""}`}
        >
          {words.map((w, wi) => (
            <span key={w}>
              {wi > 0 && " "}
              <span className="whitespace-nowrap">
                {letters
                  .filter((l) => l.word === w)
                  .map((letter) => (
                    <span
                      key={letter.indexInWord}
                      data-letter
                      className="inline-block"
                      style={{
                        opacity: lettersHidden ? 0 : 1,
                        transition: melting
                          ? `opacity 260ms ease-out ${letter.globalIndex * MELT_STAGGER + LETTER_REVEAL_AT}ms`
                          : undefined,
                      }}
                    >
                      {letter.char}
                    </span>
                  ))}
              </span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={HIDDEN}
          animate={revealed ? SHOWN : HIDDEN}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE_OUT }}
          className="font-mono text-sm tracking-tight text-[#e8b98e] sm:text-base"
        >
          {revealed ? <ScrambleText text={tagline} delay={0.1} /> : tagline}
        </motion.p>

        <motion.div
          initial={HIDDEN}
          animate={revealed ? SHOWN : HIDDEN}
          transition={{ duration: 0.6, delay: 0.24, ease: EASE_OUT }}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <MagneticButton strength={10}>
            <Link
              href="#projects"
              className="inline-block rounded-sm bg-[#faf7f2] px-5 py-2.5 text-sm font-medium text-[#2b2420] shadow-[0_4px_16px_rgba(28,23,18,0.25)] transition-all duration-200 hover:bg-[#e8b98e] hover:shadow-[0_8px_24px_rgba(28,23,18,0.3)] active:scale-[0.98]"
            >
              View Projects
            </Link>
          </MagneticButton>
          <a
            href={resumeUrl}
            className="flex items-center gap-2 text-sm font-medium text-[#faf7f2] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#e8b98e] active:translate-y-0"
          >
            <FileIcon className="h-4 w-4" />
            Resume
          </a>
        </motion.div>
      </div>

      {/* CSS-gated so it covers first paint on desktop before JS decides; never shows on mobile or reduced motion */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-15 hidden bg-[#1c1712] motion-safe:md:block"
        initial={{ opacity: 0.92 }}
        animate={{ opacity: !mounted || lettersHidden ? 0.92 : 0 }}
        transition={{ duration: melting ? 1.1 : 0.6, ease: EASE_OUT }}
      />

      {mounted && introRunning && legendFont && !webglFailed && (
        <KeycapScene
          name={name}
          getTargets={getTargets}
          legendFont={legendFont}
          controlRef={controlRef}
          onFirstFrame={() => {
            sceneStartedRef.current = true;
          }}
          onMeltStart={() => setMelting(true)}
          onDone={() => setIntroDone(true)}
          onError={() => {
            setWebglFailed(true);
            setIntroDone(true);
          }}
        />
      )}
    </section>
  );
}
