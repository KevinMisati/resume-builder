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
    ignoreDuringBuilds:
      process.env.NEXT_PUBLIC_ESLINT_IGNORE_DURING_BUILD === "true",
  },
};

export default nextConfig;
