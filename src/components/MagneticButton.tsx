"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export default function MagneticButton({
  children,
  strength = 14,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 280, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 280, damping: 20, mass: 0.4 });

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rawX.set(relX * strength);
    rawY.set(relY * strength);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}
