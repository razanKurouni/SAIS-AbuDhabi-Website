import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // the page was Student Programs before it became Achievements
      { source: "/student-programs", destination: "/achievements", permanent: true },
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
