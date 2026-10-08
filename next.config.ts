import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // the page was Achievements for a while; old links still land on Student Programs
      { source: "/achievements", destination: "/student-programs", permanent: true },
      // the FAQ page became Register Your Interest
      { source: "/admissions/faqs", destination: "/admissions/register-your-interest", permanent: true },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Pictures are resized by Sanity's CDN instead of Vercel's optimizer,
    // whose free-plan allowance ran out and started returning 402s.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
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
