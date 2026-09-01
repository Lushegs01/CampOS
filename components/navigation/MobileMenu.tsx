"use client";

import { useEffect, useId, useState } from "react";
import { NAV_LINKS, SIGN_IN_HREF } from "@/lib/site";
import { Wordmark } from "@/components/primitives/Wordmark";
import { useContactDialog } from "@/components/cta/ContactDialogProvider";

/**
 * Mobile navigation. A single panel, no nested menus: every destination on the
 * site is one tap away. Escape closes it, body scroll is locked while it is
 * open, and focus moves to the panel so a keyboard user lands inside it.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { open: openContact } = useContactDialog();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-tile text-ink"
      >
        <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          {open ? (
            <path d="m5 5 10 10M15 5 5 15" />
          ) : (
            <>
              <path d="M3 6.5h14" />
              <path d="M3 13.5h14" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <div
          id={panelId}
          tabIndex={-1}
          ref={(node) => node?.focus()}
          className="fixed inset-0 top-0 z-50 flex flex-col bg-paper"
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-gutter">
            <a href="/" onClick={() => setOpen(false)} className="text-forest">
              <Wordmark />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink"
            >
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" />
              </svg>
            </button>
          </div>

          <nav aria-label="Site" className="flex-1 overflow-y-auto px-gutter py-6">
            <ul className="divide-y divide-line border-b border-line">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-[1.35rem] font-medium tracking-[-0.02em]"
                  >
                    {link.label}
                    <span className="label text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-line px-gutter py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openContact();
              }}
              className="btn btn-primary w-full"
            >
              Talk to CampOS
            </button>
            <a
              href={SIGN_IN_HREF}
              onClick={() => setOpen(false)}
              className="btn btn-secondary mt-3 w-full"
            >
              Sign in
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
