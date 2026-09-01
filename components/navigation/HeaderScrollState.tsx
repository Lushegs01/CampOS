"use client";

import { useEffect } from "react";

/**
 * Marks the document once the page has moved off the top, so the sticky header
 * can tighten and lift. A one-pixel sentinel watched by IntersectionObserver —
 * no scroll listener, no work on the main thread while scrolling.
 */
export function HeaderScrollState() {
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(([entry]) => {
      document.documentElement.dataset.scrolled = entry.isIntersecting ? "false" : "true";
    });
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
      delete document.documentElement.dataset.scrolled;
    };
  }, []);

  return null;
}
