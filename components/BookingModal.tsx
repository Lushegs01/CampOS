"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";

export function BookingModal() {
  const { isOpen, closeModal } = useModal();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatus("idle");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        closeModal();
      }, 1500);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[clamp(16px,4vw,32px)]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-obsidian/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[500px] overflow-hidden rounded-[24px] border border-white/40 glass-light shadow-premium"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-light/50 text-ink-soft transition-colors hover:bg-slate-light hover:text-ink"
              aria-label="Close modal"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="p-[clamp(24px,5vw,40px)]">
              <h3 className="display-sm mb-[0.5rem] text-[1.8rem]">Book a demo</h3>
              <p className="mb-[2rem] text-[0.95rem] text-ink-soft">
                See how CampOS can unify your campus infrastructure. We'll be in touch to schedule a guided tour.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-glow/20 text-emerald-glow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="display-sm text-[1.4rem]">Request Sent</h4>
                  <p className="text-ink-soft">We'll contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1 block text-[0.8rem] font-semibold text-slate-deep">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-[10px] border border-line-soft bg-white/50 px-4 py-2.5 text-[0.95rem] outline-none transition-all focus:border-primary focus:bg-white"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[0.8rem] font-semibold text-slate-deep">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full rounded-[10px] border border-line-soft bg-white/50 px-4 py-2.5 text-[0.95rem] outline-none transition-all focus:border-primary focus:bg-white"
                      placeholder="jane@university.edu"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[0.8rem] font-semibold text-slate-deep">
                      Institution Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-[10px] border border-line-soft bg-white/50 px-4 py-2.5 text-[0.95rem] outline-none transition-all focus:border-primary focus:bg-white"
                      placeholder="CampOS University"
                    />
                  </div>
                  <button
                    disabled={status === "submitting"}
                    type="submit"
                    className="btn btn-primary mt-2 w-full justify-center disabled:opacity-70"
                  >
                    {status === "submitting" ? "Sending..." : "Request Demo"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
