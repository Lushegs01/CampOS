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

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const init = () => {
      const count = Math.min(maxParticles, Math.floor((width * height) / density));
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

    const drawNodes = (alpha: number) => {
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      const maxDist = 132;
      const mouseDist = 168;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(${lineColor},${(1 - dist / maxDist) * 0.32})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < mouseDist) {
          ctx.strokeStyle = `rgba(${lineColor},${(1 - mdist / mouseDist) * 0.5})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
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

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, color, lineColor, density, maxParticles, speed]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
