"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface ParticleFieldProps {
  className?: string;
  /** "r,g,b" used for nodes. */
  color?: string;
  /** "r,g,b" used for the connecting lines. */
  lineColor?: string;
  /** Lower = denser (one particle per `density` px²). */
  density?: number;
  maxParticles?: number;
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * A lightweight canvas particle network: drifting nodes linked by lines when
 * close, plus links to the cursor. GPU work is avoided (2D canvas), the loop
 * pauses when off-screen, and it renders a single static frame under
 * prefers-reduced-motion.
 */
export function ParticleField({
  className,
  color = "129,140,248",
  lineColor = "120,135,255",
  density = 15000,
  maxParticles = 64,
  speed = 0.22,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // A decorative field of 1.5px dots does not need a 3x backing store; on a
    // phone that was three times the fill cost for no visible difference.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const init = () => {
      // Pair testing is O(n²), so halving the cap on phones quarters the work.
      const cap = coarse ? Math.floor(maxParticles / 2) : maxParticles;
      const count = Math.min(cap, Math.floor((width * height) / density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    // One path and one fill for every node, rather than a beginPath/fillStyle/
    // fill triple per particle. The alpha is uniform, so there is nothing to
    // gain from separate calls.
    const drawNodes = (alpha: number) => {
      const path = new Path2D();
      for (const p of particles) {
        path.moveTo(p.x + p.r, p.y);
        path.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      ctx.fillStyle = `rgba(${color},${alpha})`;
      ctx.fill(path);
    };

    /* Lines are bucketed by rounded opacity and drawn as one path per bucket.
       Previously every candidate pair got its own strokeStyle assignment,
       beginPath and stroke — up to ~2,000 state changes and draw calls per
       frame, which is what pinned the main thread while the hero was visible.
       Eight buckets are indistinguishable from continuous alpha at these
       opacities but cost eight draw calls. */
    const BUCKETS = 8;
    const buckets: Path2D[] = [];

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      const maxDist = 132;
      const maxDistSq = maxDist * maxDist;
      const mouseDist = 168;
      const mouseDistSq = mouseDist * mouseDist;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      for (let i = 0; i < BUCKETS; i++) buckets[i] = new Path2D();

      // Comparing squared distances keeps the inner loop free of Math.hypot,
      // which is materially slower than a multiply for this many calls.
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const strength = 1 - Math.sqrt(distSq) / maxDist;
            const bucket = Math.min(BUCKETS - 1, (strength * BUCKETS) | 0);
            buckets[bucket].moveTo(a.x, a.y);
            buckets[bucket].lineTo(b.x, b.y);
          }
        }
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < BUCKETS; i++) {
        const alpha = ((i + 0.5) / BUCKETS) * 0.32;
        ctx.strokeStyle = `rgba(${lineColor},${alpha})`;
        ctx.stroke(buckets[i]);
      }

      // Cursor links stay separate: there are only `particles.length` of them
      // and they use a different width and alpha ramp.
      if (mouse.x > -9999) {
        const cursorPath = new Path2D();
        let linked = 0;
        for (const a of particles) {
          const mdx = a.x - mouse.x;
          const mdy = a.y - mouse.y;
          if (mdx * mdx + mdy * mdy < mouseDistSq) {
            cursorPath.moveTo(a.x, a.y);
            cursorPath.lineTo(mouse.x, mouse.y);
            linked++;
          }
        }
        if (linked) {
          ctx.strokeStyle = `rgba(${lineColor},0.28)`;
          ctx.lineWidth = 0.7;
          ctx.stroke(cursorPath);
        }
      }

      drawNodes(0.55);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduced) {
        ctx.clearRect(0, 0, width, height);
        drawNodes(0.4);
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const stop = () => cancelAnimationFrame(raf);

    resize();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) start();
    });
    ro.observe(parent);

    let onScreen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    // Without this the loop keeps running in a backgrounded tab on browsers
    // that still service rAF there, draining battery behind the user's back.
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    // Only wire cursor tracking where there is a cursor.
    if (!coarse) {
      parent.addEventListener("mousemove", onMove);
      parent.addEventListener("mouseleave", onLeave);
    }

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, color, lineColor, density, maxParticles, speed]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
