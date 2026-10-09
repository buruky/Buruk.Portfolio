"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useState } from "react";
import { ArrowUpIcon } from "@/components/icons";

export default function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 720);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-[0_8px_24px_rgba(43,36,32,0.18)] transition-colors hover:border-accent hover:text-accent sm:bottom-8 sm:right-8"
        >
          <ArrowUpIcon className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
