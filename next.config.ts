import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // the page was Achievements for a while; old links still land on Student Programs
      { source: "/achievements", destination: "/student-programs", permanent: true },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    qualities: [75, 82, 84],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;
