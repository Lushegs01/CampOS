import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, Geist_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import { ContactDialogProvider } from "@/components/cta/ContactDialogProvider";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import "./globals.css";

/*
 * Three families, each loaded once. Instrument Sans carries the whole
 * interface; the serif is an accent used a handful of times below the fold and
 * the mono is small-label only, so neither is preloaded — that keeps the
 * critical font payload to a single variable file.
 */
const sans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
  preload: false,
  variable: "--font-serif",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "CampOS — The digital infrastructure behind the modern university",
    template: "%s — CampOS",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "CampOS",
    "university operating system",
    "university digital infrastructure",
    "student management platform",
    "higher education technology",
    "university administration software",
    "campus operating system",
  ],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: SITE.name, statusBarStyle: "default" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "CampOS — The digital infrastructure behind the modern university",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "CampOS — The digital infrastructure behind the modern university",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        {/* Without JavaScript the reveal system never flips, so make everything
            visible up front rather than shipping an invisible page. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.draw{stroke-dashoffset:0!important}.fade-node{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body className="overflow-x-hidden bg-paper font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only left-4 top-4 z-50 rounded-tile bg-ink px-4 py-2.5 text-paper focus:not-sr-only focus:absolute"
        >
          Skip to content
        </a>
        <ContactDialogProvider>{children}</ContactDialogProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
