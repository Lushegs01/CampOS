"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
  eyebrowVariant?: "default" | "honey" | "blush";
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  className = "",
  eyebrowVariant = "default",
  align = "left",
}: SectionHeadingProps) {
  const variantClass =
    eyebrowVariant === "honey"
      ? "eyebrow-honey"
      : eyebrowVariant === "blush"
        ? "eyebrow-blush"
        : "";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`${
        align === "center" ? "mx-auto max-w-[36ch] text-center" : "max-w-[32ch]"
      } ${className}`}
    >
      <span className={`eyebrow mb-[1.2rem] ${variantClass}`}>{eyebrow}</span>
      <h2 className="display mt-[1.2rem] text-[clamp(2rem,4.2vw,3.2rem)]">
        {title}
      </h2>
    </motion.div>
  );
}
