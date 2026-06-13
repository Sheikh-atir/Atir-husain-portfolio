import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // Static export → out/ folder → Netlify
  compress: true,
  trailingSlash: true,       // Netlify requires trailing slashes for static sites
  images: {
    unoptimized: true,       // Required for static export (no server-side image processing)
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
  },
  turbopack: {
    root: __dirname,         // Suppress workspace root warning in dev
  },
};

export default nextConfig;
