import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  experimental: {},
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
