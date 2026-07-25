import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP behind it. The portal screenshots are flat UI with large
    // areas of solid colour, which is where AVIF gains the most over WebP.
    formats: ["image/avif", "image/webp"],
    // Nothing on the page is painted wider than the viewport, so the default
    // ladder's very large entries are never requested.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 288, 384],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    // Rewrites barrel imports to deep paths so tree shaking can drop the parts
    // of these packages the page never touches.
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
