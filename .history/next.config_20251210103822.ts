import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swaypoledancestudio.pl',
      },
    ],
  },
  // Optymalizacja dla nowoczesnych przeglądarek
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  // Kompresja i cache
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
