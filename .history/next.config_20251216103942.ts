import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Static export - nie wymaga Node.js na serwerze
  images: {
    unoptimized: true, // Wymagane dla static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swaypoledancestudio.pl',
      },
      {
        protocol: 'https',
        hostname: 'studiosway.pl',
      },
    ],
  },
};

export default nextConfig;
