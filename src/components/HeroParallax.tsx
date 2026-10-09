"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function HeroParallax({ src, alt }: { src: string; alt: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const scale = useTransform(scrollY, [0, 700], [1, 1.08]);

  return (
    <motion.div style={{ y, scale }} className="absolute -inset-x-0 -top-16 -bottom-16">
      <Image src={src} alt={alt} fill priority className="object-cover" />
    </motion.div>
  );
}
