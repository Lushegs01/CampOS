"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";

/**
 * Desktop navigation with a live position marker.
 *
 * On a page this long, "where am I" is a real question. One
 * IntersectionObserver watches the five anchored sections through a band near
 * the top of the viewport and marks the matching link — no scroll listener, no
 * layout reads.
 */
export function NavLinks() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => {
      const id = link.href.replace("/#", "");
      return document.getElementById(id);
    }).filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-22% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <ul className="flex items-center gap-7">
      {NAV_LINKS.map((link) => {
        const id = link.href.replace("/#", "");
        const on = active === id;
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={on ? "true" : undefined}
              className={`relative text-[0.92rem] font-medium transition-colors duration-200 ease-system ${
                on ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
              <span
                aria-hidden
                className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-forest transition-transform duration-300 ease-system ${
                  on ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
