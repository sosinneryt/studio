import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Required for APK: converts the app to static HTML/JS/CSS
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for APK: standard Image Optimization needs a server
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
  /* EXPERIMENTAL BLOCK REMOVED: 
     Server Actions and bodySizeLimits are not supported in static exports/APKs.
  */
};

export default nextConfig;