import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-hanken",
});

const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-spline-mono",
});

export const metadata: Metadata = {
  title: "CampOS",
  description:
    "CampOS unifies attendance, housing, records, and identity into one verified ecosystem. One student login opens every door on campus — and nothing along the way can be forged.",
  openGraph: {
    title: "CampOS",
    description:
      "Attendance, housing, records, and identity — unified, verified, and connected.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F5",
  width: "device-width",
  initialScale: 1,
};

import { ModalProvider } from "@/context/ModalContext";
import { BookingModal } from "@/components/BookingModal";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${splineMono.variable} scroll-smooth`}
    >
      <body className="overflow-x-hidden bg-paper font-body text-ink antialiased">
        <SmoothScroll />
        <ModalProvider>
          <MotionProvider>{children}</MotionProvider>
          <BookingModal />
        </ModalProvider>
        
        {/* Fine grain noise overlay for premium cinematic texture */}
        <svg className="pointer-events-none fixed inset-0 z-[200] h-full w-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </body>
    </html>
  );
}
