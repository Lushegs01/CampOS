"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  eyebrowVariant?: "default" | "primary" | "mint";
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  className = "",
  titleClassName = "",
  eyebrowVariant = "primary",
  align = "left",
}: SectionHeadingProps) {
  const variantClass =
    eyebrowVariant === "primary"
      ? "eyebrow-primary"
      : eyebrowVariant === "mint"
        ? "eyebrow-mint"
        : "";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`${align === "center" ? "mx-auto max-w-[42ch] text-center" : "max-w-[34ch]"} ${className}`}
    >
      <span className={`eyebrow mb-[1.2rem] ${variantClass}`}>{eyebrow}</span>
      <h2 className={`display mt-[1.1rem] text-[clamp(2.1rem,4.6vw,3.7rem)] ${titleClassName}`}>
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-[1.3rem] text-[1.04rem] leading-[1.6] text-mute ${
            align === "center" ? "mx-auto" : ""
          } max-w-[48ch]`}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}
