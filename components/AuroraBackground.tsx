"use client";

import Image from "next/image";
import {
  m,
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

  // The blobs deliberately drift on x/y only. Animating `scale` as well meant
  // the browser could not reuse the cached raster of a 640px element carrying a
  // 60px blur — it had to re-run the blur every frame, three times over, for the
  // entire time the hero was on screen. Translation alone moves an already
  // rasterised layer on the compositor and costs effectively nothing.
  const drift = (duration: number, x: number[], y: number[]) =>
    reduced
      ? {}
      : {
          animate: { x, y },
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
        };

  const slowDrift = drift(26, [0, 40, -20, 0], [0, -30, 20, 0]);
  const slowDrift2 = drift(32, [0, -50, 30, 0], [0, 26, -24, 0]);
  const slowDrift3 = drift(38, [0, 36, -28, 0], [0, -22, 30, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Campus photo base — tinted cool and scrimmed for legibility, fading
          into the deep base so the product ecosystem sits on a clean canvas. */}
      <div className="absolute inset-x-0 top-0 h-[clamp(640px,90vh,1060px)]">
        {/* `priority` because this is the LCP element; `sizes="100vw"` lets a
            phone fetch a ~640px variant instead of the full 1920px master. */}
        <Image
          src="/hero-campus.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover object-[center_30%] brightness-[0.6] saturate-[0.8] contrast-[1.05]"
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

      {/* Flowing aurora blobs. Each is roughly half-size with a smaller blur
          below `sm`, where a phone would otherwise hold three ~640px blurred
          layers in GPU memory for a hero most of which is off-screen anyway. */}
      <m.div style={{ x: b1x, y: b1y }} className="absolute -left-[12%] -top-[14%] h-[340px] w-[340px] sm:h-[640px] sm:w-[640px]">
        <m.div
          {...slowDrift}
          className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.30)_0%,transparent_68%)] blur-[36px] sm:blur-[60px]"
        />
      </m.div>
      <m.div style={{ x: b2x, y: b2y }} className="absolute -right-[14%] top-[2%] h-[320px] w-[320px] sm:h-[600px] sm:w-[600px]">
        <m.div
          {...slowDrift2}
          className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.20)_0%,transparent_68%)] blur-[36px] sm:blur-[60px]"
        />
      </m.div>
      {/* Third blob is pure depth-building and sits mostly below the fold on a
          phone, so it only mounts once there is room for it. */}
      <m.div style={{ x: b3x, y: b3y }} className="absolute bottom-[-22%] left-[24%] hidden h-[720px] w-[720px] sm:block">
        <m.div
          {...slowDrift3}
          className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.16)_0%,transparent_70%)] blur-[70px]"
        />
      </m.div>

      {/* Technical grid, faded toward the edges */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_55%,transparent_100%)]" />

      {/* Top highlight + bottom vignette */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />
    </div>
  );
}
