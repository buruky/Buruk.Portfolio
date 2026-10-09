"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=/\\";

export default function ScrambleText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduce) return;

    const totalSteps = 22;
    const stepMs = 35;
    let step = 0;
    let interval: ReturnType<typeof setInterval>;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        step++;
        const revealCount = Math.floor((step / totalSteps) * text.length);
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealCount) return text[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        if (step >= totalSteps) {
          setDisplay(text);
          clearInterval(interval);
        }
      }, stepMs);
    }, delay * 1000);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, reduce]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}
