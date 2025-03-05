import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/widget",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // Allows embedding in iframes
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *", // Allow embedding from any domain
          },
        ],
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
