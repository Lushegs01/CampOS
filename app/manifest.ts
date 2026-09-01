import type { MetadataRoute } from "next";

/** Web app manifest — served at /manifest.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "CampOS",
    short_name: "CampOS",
    description:
      "The institutional infrastructure layer for universities — identity, academic operations, attendance, finance, records and campus services on one foundation.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    // The site opens on the warm-white ground, so match the splash to it.
    background_color: "#F7F6F2",
    theme_color: "#F7F6F2",
    lang: "en",
    dir: "ltr",
    categories: ["education", "productivity", "business"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
