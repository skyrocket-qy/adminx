import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ✅ Add this
  },
  // Workaround for https://github.com/vercel/next.js/issues/85374
  // (Next 16 static export writes RSC payloads to paths the client does not request)
  adapterPath: path.join(process.cwd(), "scripts", "fix-rsc-paths-adapter.mjs"),
};

export default nextConfig;
