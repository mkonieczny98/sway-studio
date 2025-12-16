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
    // Nowoczesne formaty obrazków (AVIF jest mniejszy niż WebP)
    formats: ['image/avif', 'image/webp'],
    // Optymalizacja rozmiaru
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dni cache
  },
  // Kompresja i cache
  compress: true,
  poweredByHeader: false,
  // Headers dla cache
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable', // 30 dni
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 rok
          },
        ],
      },
    ];
  },
};

export default nextConfig;
