"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

interface AuroraBackgroundProps {
  /** Normalised cursor position (-1..1). Optional; enables parallax drift. */
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

const blobSpring = { stiffness: 50, damping: 20, mass: 0.6 };

/**
 * The ambient backdrop for the hero: a deep base, slow flowing aurora blobs,
 * a faded technical grid, and a vignette. Blobs drift with the cursor on
 * different axes to build depth. All motion stops under reduced-motion.
 */
export function AuroraBackground({ mouseX, mouseY }: AuroraBackgroundProps) {
  const reduced = useReducedMotion();

  const zeroX = useMotionValue(0);
  const zeroY = useMotionValue(0);
  const px = useSpring(mouseX ?? zeroX, blobSpring);
  const py = useSpring(mouseY ?? zeroY, blobSpring);

  // Each blob drifts a different amount and direction for layered parallax.
  const b1x = useTransform(px, (v) => v * 36);
  const b1y = useTransform(py, (v) => v * 28);
  const b2x = useTransform(px, (v) => v * -44);
  const b2y = useTransform(py, (v) => v * 24);
  const b3x = useTransform(px, (v) => v * 26);
  const b3y = useTransform(py, (v) => v * -32);

  const slowDrift = reduced
    ? {}
    : {
        animate: {
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.12, 0.96, 1],
        },
        transition: { duration: 26, repeat: Infinity, ease: "easeInOut" as const },
      };
  const slowDrift2 = reduced
    ? {}
    : {
        animate: {
          x: [0, -50, 30, 0],
          y: [0, 26, -24, 0],
          scale: [1, 0.94, 1.1, 1],
        },
        transition: { duration: 32, repeat: Infinity, ease: "easeInOut" as const },
      };
  const slowDrift3 = reduced
    ? {}
    : {
        animate: {
          x: [0, 36, -28, 0],
          y: [0, -22, 30, 0],
          scale: [1, 1.08, 0.92, 1],
        },
        transition: { duration: 38, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Campus photo base — tinted cool and scrimmed for legibility, fading
          into the deep base so the product ecosystem sits on a clean canvas. */}
      <div className="absolute inset-x-0 top-0 h-[clamp(640px,90vh,1060px)]">
        <img
          src="/hero-campus.webp"
          alt=""
          aria-hidden
          fetchPriority="high"
          className="h-full w-full object-cover object-[center_30%] brightness-[0.6] saturate-[0.8] contrast-[1.05]"
        />
        {/* overall darken */}
        <div className="absolute inset-0 bg-[#030712]/45" />
        {/* cool brand tint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/40 via-transparent to-teal-950/30" />
        {/* darken behind the hero copy (upper-center) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_20%,rgba(3,7,18,0.72)_0%,transparent_68%)]" />
        {/* dark at the very top + fade into the base toward the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-transparent to-[#030712]" />
      </div>

      {/* Flowing aurora blobs */}
      <motion.div style={{ x: b1x, y: b1y }} className="absolute -left-[12%] -top-[14%] h-[640px] w-[640px]">
        <motion.div
          {...slowDrift}
          className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.30)_0%,transparent_68%)] blur-[60px]"
        />
      </motion.div>
      <motion.div style={{ x: b2x, y: b2y }} className="absolute -right-[14%] top-[2%] h-[600px] w-[600px]">
        <motion.div
          {...slowDrift2}
          className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.20)_0%,transparent_68%)] blur-[60px]"
        />
      </motion.div>
      <motion.div style={{ x: b3x, y: b3y }} className="absolute bottom-[-22%] left-[24%] h-[720px] w-[720px]">
        <motion.div
          {...slowDrift3}
          className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.16)_0%,transparent_70%)] blur-[70px]"
        />
      </motion.div>

      {/* Technical grid, faded toward the edges */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_55%,transparent_100%)]" />

      {/* Top highlight + bottom vignette */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />
    </div>
  );
}
