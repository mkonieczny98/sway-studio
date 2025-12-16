import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import'],
  },
};

export default withPayload(nextConfig);
