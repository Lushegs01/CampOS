"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ContactDialogContext = { open: () => void };

const Ctx = createContext<ContactDialogContext | null>(null);

export function useContactDialog() {
  const value = useContext(Ctx);
  if (!value) throw new Error("useContactDialog must be used inside ContactDialogProvider");
  return value;
}

type Status = "idle" | "sending" | "sent" | "error";

const ROLES = [
  "University management",
  "Registry / academic affairs",
  "ICT / technology",
  "Bursary / finance",
  "Student affairs",
  "Other",
];

/**
 * "Talk to CampOS" — a native <dialog>, so focus trapping, Escape and inert
 * background come from the platform rather than from a dependency.
 */
export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(() => {
    setStatus("idle");
    setError(null);
    ref.current?.showModal();
  }, []);

  const close = useCallback(() => ref.current?.close(), []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // Lock background scrolling only while the dialog is actually open.
    const observer = new MutationObserver(() => {
      document.body.style.overflow = dialog.open ? "hidden" : "";
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => {
      observer.disconnect();
      document.body.style.overflow = "";
    };
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("sent");
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "Something went wrong.");
    }
  }

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="contact-dialog-title"
        className="contact-dialog w-[min(34rem,calc(100vw-2rem))] rounded-panel border border-line bg-paper p-0 text-ink"
        onClick={(event) => {
          if (event.target === ref.current) close();
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <p className="label text-faint">Talk to CampOS</p>
            <h2 id="contact-dialog-title" className="subheading mt-2.5">
              Start the institutional conversation
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mr-2 -mt-1 inline-flex h-10 w-10 flex-none items-center justify-center rounded-tile text-muted hover:bg-paper-2 hover:text-ink"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </button>
        </div>

        {status === "sent" ? (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-forest-tint text-forest">
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="m4.5 10.5 3.5 3.5 7.5-8" />
              </svg>
            </div>
            <p className="subheading mt-5">Request received</p>
            <p className="body mt-2 text-muted">
              We will reply to arrange an architecture walkthrough and a live demonstration
              for your institution.
            </p>
            <button type="button" onClick={close} className="btn btn-secondary mt-6">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="px-6 py-6">
            <p className="body text-muted">
              Tell us about your institution. We respond with an architecture walkthrough
              and a demonstration — not a sales sequence.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" required />
              <Field
                label="Work email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
              <div className="sm:col-span-2">
                <Field label="Institution" name="institution" required />
              </div>
              <div className="sm:col-span-2">
                <label className="label block text-faint" htmlFor="contact-role">
                  Your role
                </label>
                <select
                  id="contact-role"
                  name="role"
                  defaultValue={ROLES[0]}
                  className="mt-2 h-11 w-full rounded-tile border border-line bg-paper px-3 text-[0.95rem] text-ink"
                >
                  {ROLES.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="label block text-faint" htmlFor="contact-message">
                  What are you trying to solve? <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  className="mt-2 w-full rounded-tile border border-line bg-paper px-3 py-2.5 text-[0.95rem] text-ink"
                />
              </div>
            </div>

            {error ? (
              <p role="alert" className="body mt-4 text-clay-deep">
                {error}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-70">
                {status === "sending" ? "Sending…" : "Send request"}
              </button>
              <p className="mono-xs text-faint">We reply from a person, not a queue.</p>
            </div>
          </form>
        )}
      </dialog>
    </Ctx.Provider>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label className="label block text-faint" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full rounded-tile border border-line bg-paper px-3 text-[0.95rem] text-ink"
      />
    </div>
  );
}
