import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media-exp1.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-000.backblazeb2.com',
      },
      {
        protocol: 'https',
        hostname: 'static-exp1.licdn.com',
      },
    ],
  },
};

export default nextConfig;
