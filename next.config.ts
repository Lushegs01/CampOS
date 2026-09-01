import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Nothing on the page is a raster today — every visual is markup or inline
    // SVG — but keep the modern formats configured for whenever real product
    // screenshots are added.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 288, 384],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
