// next.config.ts
import type { NextConfig } from "next";

// Ambil URL dari env, jika tidak ada gunakan fallback agar tidak error saat build
const envUrl = process.env.NEXT_PUBLIC_API_URL || "https://undangan.undesia.com";
const domainHostname = new URL(envUrl).hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: domainHostname, // Mengambil otomatis 'undangan.undesia.com' dari .env
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;