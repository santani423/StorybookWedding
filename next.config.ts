// next.config.ts
import type { NextConfig } from "next";

const apiUrl     = process.env.NEXT_PUBLIC_API_URL     || "https://undangan.undesia.com";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://beundesia.undesia.com";

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

  /*
    Proxy semua permintaan /api/proxy/** ke backend.
    Browser hanya melihat same-origin → tidak ada CORS.
    API_BASE_URL di frontend cukup diganti ke "/api/proxy".
  */
  async rewrites() {
    return [
      {
        source:      "/api/proxy/:path*",
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
