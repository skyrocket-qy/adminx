import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  output: 'export',
  // basePath: '/adminx',
  // assetPrefix: '/adminx',
  images: {
    unoptimized: true, // ✅ Add this
  },
};

export default nextConfig;
