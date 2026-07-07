import type { MetadataRoute } from "next";

// Web app manifest — served at /manifest.webmanifest. Makes CampOS installable
// as a standalone app on Android/desktop (and drives the iOS home-screen icon).
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "CampOS",
    short_name: "CampOS",
    description:
      "CampOS unifies attendance, housing, records, and identity into one verified ecosystem. One student login opens every door on campus.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    // The app opens on the dark hero, so match the status bar and splash to it.
    background_color: "#030712",
    theme_color: "#030712",
    lang: "en",
    dir: "ltr",
    categories: ["education", "productivity", "business"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/app-mockup.png",
        sizes: "456x1024",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: "/hero-campus.webp",
        sizes: "2400x1600",
        type: "image/webp",
        form_factor: "wide",
      },
    ],
  };
}
