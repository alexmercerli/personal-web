import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/ai-pmo/:path*",
        destination: "/ai-pmo/index.html",
      },
      {
        source: "/uav-test-showcase/:path*",
        destination: "/uav-test-showcase/index.html",
      },
    ];
  },
};

export default nextConfig;
