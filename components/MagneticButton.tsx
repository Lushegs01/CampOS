"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  /** How strongly the whole button is pulled toward the cursor. */
  strength?: number;
  /** Extra pull applied to the inner content for a layered, lively feel. */
  innerStrength?: number;
  ariaLabel?: string;
  type?: "button" | "submit";
}

const spring = { stiffness: 170, damping: 15, mass: 0.12 };

/**
 * A button that is magnetically attracted to the cursor while hovered, with
 * the label drifting slightly further than the body for depth. Disables the
 * effect entirely under prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  onClick,
  className,
  strength = 0.32,
  innerStrength = 0.14,
  ariaLabel,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);

  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const six = useSpring(ix, spring);
  const siy = useSpring(iy, spring);

  const handleMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
    ix.set(relX * innerStrength);
    iy.set(relY * innerStrength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    ix.set(0);
    iy.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      aria-label={ariaLabel}
      className={className}
    >
      <motion.span
        style={{ x: six, y: siy }}
        className="inline-flex items-center justify-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
