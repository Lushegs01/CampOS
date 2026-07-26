"use client";

import { useCallback, useEffect, useRef } from "react";
import { m, type MotionProps } from "framer-motion";

/** Elements that can hold focus inside the dialog, for the focus trap. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface DialogProps {
  onClose: () => void;
  /** Announced as the dialog's name. */
  label: string;
  /** Applied to the panel, not the backdrop. */
  className?: string;
  /** Overrides the scrim. Defaults to the heavy one used by image lightboxes. */
  backdropClassName?: string;
  children: React.ReactNode;
  /** Panel entry/exit animation. Defaults to a gentle scale + rise. */
  panelMotion?: Pick<MotionProps, "initial" | "animate" | "exit" | "transition">;
}

const DEFAULT_MOTION: Pick<MotionProps, "initial" | "animate" | "exit" | "transition"> = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: { type: "spring", damping: 25, stiffness: 300 },
};

/**
 * A modal dialog that behaves like one for keyboard and screen reader users:
 * it is announced as a dialog, closes on Escape, keeps Tab inside itself while
 * open, and hands focus back to whatever opened it on close.
 *
 * Render it only while open — mount/unmount is what drives the focus handling.
 * Wrap it in <AnimatePresence> for exit animations.
 */
export function Dialog({
  onClose,
  label,
  className = "",
  backdropClassName = "bg-black/85 backdrop-blur-md cursor-zoom-out",
  children,
  panelMotion = DEFAULT_MOTION,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  // Latest onClose without re-running the key/focus effect on every render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const focusable = useCallback(
    () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
    [],
  );

  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement | null;

    // Move focus in, so the next Tab lands inside the dialog rather than
    // continuing through the page behind it.
    const first = focusable()[0] ?? panelRef.current;
    first?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // Wrap at both ends, and pull focus back in if it has escaped entirely.
      if (e.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
      restoreTo.current?.focus?.();
    };
  }, [focusable]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-[clamp(16px,4vw,32px)]">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden
        className={`absolute inset-0 ${backdropClassName}`}
      />
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        {...panelMotion}
        className={`relative z-10 outline-none ${className}`}
      >
        {children}
      </m.div>
    </div>
  );
}
