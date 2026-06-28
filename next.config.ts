import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://avatars.githubusercontent.com/**"),
      new URL("https://ui-avatars.com/**"),
    ],
    qualities: [25, 50, 75, 100],
  },
};

export default nextConfig;
