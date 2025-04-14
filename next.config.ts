import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  output: 'export',
  basePath: '/adminx/docs',
  assetPrefix: '/adminx/docs',
  images: {
    unoptimized: true, // ✅ Add this
  },
};

export default nextConfig;
