"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export default function StatCounter({
  value,
  decimals = 0,
  suffix = "",
  label,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div className="flex flex-col items-center gap-1 sm:items-start">
      <span ref={ref} className="font-mono text-3xl tabular-nums text-foreground sm:text-4xl">
        {display.toFixed(decimals)}
        {suffix}
      </span>
      <span className="text-xs uppercase tracking-widest text-muted">{label}</span>
    </div>
  );
}
