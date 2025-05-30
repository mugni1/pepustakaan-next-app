import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⛔ Jangan hentikan build meskipun ada error ESLint
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // atau '10mb' sesuai kebutuhan
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apipustaka.vercel.app",
        // port: "8000",
        // pathname: "/my-bucket/**",
        // search: "",
      },
      {
        protocol: "https",
        hostname: "qgovcxiwpbo1tdej.public.blob.vercel-storage.com",
        // port: "8000",
        // pathname: "/my-bucket/**",
        // search: "",
      },
    ],
  },
};

export default nextConfig;
