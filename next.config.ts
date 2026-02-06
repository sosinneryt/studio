import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // CRITICAL: This allows the app to run inside the APK
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // CRITICAL: Static exports don't support Next.js Image Optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      // Increase timeout for slow video generation
      // serverActionsTimeout: 120, // Note: Server actions may not work in a static APK
    },
  },
};

export default nextConfig;