"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";

export function BookingModal() {
  const { isOpen, closeModal } = useModal();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", institution: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatus("idle");
      setErrorMessage("");
      setFormData({ name: "", email: "", institution: "" });
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setStatus("success");
      setTimeout(() => {
        closeModal();
      }, 2500);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-line bg-white/[0.04] px-4 py-2.5 text-[0.95rem] text-hi outline-none transition-all placeholder:text-faint focus:border-primary/70 focus:bg-white/[0.06]";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[clamp(16px,4vw,32px)]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-void/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="edge relative w-full max-w-[500px] overflow-hidden rounded-xl2 glass-strong shadow-lift ring-glow"
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/[0.04] text-mute transition-colors hover:bg-white/[0.1] hover:text-hi"
              aria-label="Close modal"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="p-[clamp(26px,5vw,40px)]">
              <span className="eyebrow eyebrow-primary mb-4">Get started</span>
              <h3 className="display-sm mb-2 mt-4 text-[1.8rem]">Book a demo</h3>
              <p className="mb-8 text-[0.95rem] leading-relaxed text-mute">
                See how CampOS unifies your campus infrastructure. We'll be in touch to schedule a guided tour.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mint/15 text-mint ring-1 ring-mint/30">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="display-sm text-[1.4rem]">Request sent</h4>
                  <p className="mt-1 text-mute">We'll contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-[0.8rem] font-semibold text-body">Full name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputCls}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[0.8rem] font-semibold text-body">Work email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputCls}
                      placeholder="jane@university.edu"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[0.8rem] font-semibold text-body">Institution name</label>
                    <input
                      required
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className={inputCls}
                      placeholder="CampOS University"
                    />
                  </div>
                  {status === "error" && (
                    <div className="text-[0.85rem] font-medium text-rose">{errorMessage}</div>
                  )}
                  <button
                    disabled={status === "submitting"}
                    type="submit"
                    className="btn btn-primary mt-2 w-full disabled:opacity-70"
                  >
                    {status === "submitting" ? "Sending…" : "Request demo"}
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
