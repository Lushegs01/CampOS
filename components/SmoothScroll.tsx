"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    // Touch devices already scroll smoothly, and Lenis' wheel interception does
    // nothing for them — it just pinned a rAF callback to every frame for the
    // life of the page. Restrict it to devices that actually have a wheel.
    const enabled =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enabled) return;

    let lenis: import("lenis").default | undefined;
    let raf = 0;
    let cancelled = false;

    // Keeping Lenis out of the entry bundle: nothing above the fold needs it,
    // and it never loads at all on phones.
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        // Was 1.2s, which is long enough that a wheel tick visibly lags the
        // input it came from.
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      const frame = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    });

    // A background tab still fires rAF in some browsers; stop driving Lenis
    // when nothing is visible.
    const onVisibility = () => {
      if (document.hidden) lenis?.stop();
      else lenis?.start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      // The original cleanup destroyed the Lenis instance but left this rAF
      // loop rescheduling itself forever against the destroyed object.
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      lenis?.destroy();
    };
  }, []);

  return null;
}
