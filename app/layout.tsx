import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  title: "CampOS — One operating system for the whole campus",
  description:
    "CampOS unifies attendance, housing, records, and identity into one verified ecosystem. One student login opens every door on campus — and nothing along the way can be forged.",
  openGraph: {
    title: "CampOS — One operating system for the whole campus",
    description:
      "Attendance, housing, records, and identity — unified, verified, and connected.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F9FC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${hanken.variable} ${splineMono.variable} scroll-smooth`}
    >
      <body className="overflow-x-hidden bg-paper font-body text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
