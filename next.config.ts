import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nstolhiubsvipm77.public.blob.vercel-storage.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds:true
  },
};

export default nextConfig;
