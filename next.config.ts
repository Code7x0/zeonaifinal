import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/products/deepprobe",
        destination: "/products/ai-workspace",
        permanent: true,
      },
      {
        source: "/how-we-work",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/security",
        destination: "/trust",
        permanent: true,
      },
      {
        source: "/platform/agent-hub",
        destination: "/agents",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
