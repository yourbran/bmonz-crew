import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.bouldermon.com',
      },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 30,  // 동적 경로를 30초간 캐시
    },
  },
  //reactStrictMode: false,
};

export default nextConfig;
