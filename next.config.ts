import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'golojiscyvxwxehpkqyz.supabase.co' },
    ],
  },
};

export default nextConfig;
