import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

// All three are variable fonts, so omitting `weight` ships one file spanning the
// whole axis instead of a static instance per weight. The italic axis of
// Fraunces is not requested — `.serif-em` is the only italic style in the sheet
// and nothing uses it.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

// Only ever used for small uppercase labels, so it can wait for first paint.
const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-spline-mono",
});

export const metadata: Metadata = {
  title: "CampOS",
  applicationName: "CampOS",
  description:
    "CampOS unifies attendance, housing, records, and identity into one verified ecosystem. One student login opens every door on campus — and nothing along the way can be forged.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "CampOS",
    statusBarStyle: "black-translucent",
  },
  other: {
    // Next only emits the modern `mobile-web-app-capable`; older iOS (< 15.4)
    // still needs the Apple-prefixed tag to launch full-screen from the home screen.
    "apple-mobile-web-app-capable": "yes",
  },
  // Favicon + apple-touch-icon come from app/icon.png and app/apple-icon.png.
  openGraph: {
    title: "CampOS",
    description:
      "Attendance, housing, records, and identity — unified, verified, and connected.",
    type: "website",
  },
};

export const viewport: Viewport = {
  // Matches the dark hero the app opens on, so the mobile browser bar and the
  // installed-app status bar blend into the page.
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

import { ModalProvider } from "@/context/ModalContext";
import { BookingModal } from "@/components/BookingModal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No `scroll-smooth` on <html>: it fights Lenis for control of programmatic
    // scrolling, which is what made anchor jumps stutter.
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${splineMono.variable}`}
    >
      <body className="overflow-x-hidden bg-paper font-body text-ink antialiased">
        <SmoothScroll />
        <ServiceWorkerRegister />
        <ModalProvider>
          <MotionProvider>{children}</MotionProvider>
          <BookingModal />
        </ModalProvider>

        {/* Fine grain noise overlay for premium cinematic texture. A pre-baked
            tiling texture rather than an feTurbulence filter: the filter had to
            be procedurally rasterised across the full viewport on every resize
            and zoom, which alone cost more than the rest of the page combined
            on mid-range phones. */}
        <div className="noise-overlay" aria-hidden />
      </body>
    </html>
  );
}
