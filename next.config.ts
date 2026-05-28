// next.config.ts
import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://undangan.undesia.com";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://bancendundesia.undesia.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: new URL(apiUrl).hostname,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: new URL(apiBaseUrl).hostname,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;