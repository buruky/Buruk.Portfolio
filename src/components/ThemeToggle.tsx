"use client";

import { AnimatePresence, motion } from "motion/react";
import { applyTheme } from "@/lib/theme";
import { useTheme } from "@/components/useTheme";
import { SunIcon, MoonIcon } from "@/components/icons";

export default function ThemeToggle() {
  const theme = useTheme();

  const toggle = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={theme === "dark"}
      className="text-muted transition-all hover:-translate-y-0.5 hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="block"
          >
            <SunIcon className="h-4.25 w-4.25" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="block"
          >
            <MoonIcon className="h-4.25 w-4.25" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
