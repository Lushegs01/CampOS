"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
  titleClassName?: string;
  eyebrowVariant?: "default" | "primary" | "accent-light";
}

export function SectionHeading({
  eyebrow,
  title,
  className = "",
  titleClassName = "",
  eyebrowVariant = "default",
}: SectionHeadingProps) {
  const variantClass =
    eyebrowVariant === "primary"
      ? "eyebrow-primary"
      : eyebrowVariant === "accent-light"
        ? "eyebrow-accent-light"
        : "";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`max-w-[30ch] ${className}`}
    >
      <span className={`eyebrow mb-[1.2rem] ${variantClass}`}>{eyebrow}</span>
      <h2 className={`display mt-[1.2rem] text-[clamp(2rem,4.4vw,3.5rem)] ${titleClassName}`}>
        {title}
      </h2>
    </motion.div>
  );
}
