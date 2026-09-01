"use client";

import { useEffect } from "react";

// Registers the service worker in production. It's the piece that lets Android
// offer "Install app" and makes CampOS work offline once installed. Disabled in
// development so it doesn't cache Next.js HMR assets.
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failures are non-fatal — the site still works.
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
