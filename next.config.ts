import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qxkhdchzgyiglwmwczbu.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/covers/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
