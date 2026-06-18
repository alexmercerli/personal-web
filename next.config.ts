import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/ai-pmo/:path*",
        destination: "/ai-pmo/index.html",
      },
    ];
  },
};

export default nextConfig;
