import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
