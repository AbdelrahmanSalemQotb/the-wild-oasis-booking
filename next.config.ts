import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fnzzhvgghdnrvjoxkxux.supabase.co",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },

      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.ggpht.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "authjs.dev",
        pathname: "/img/providers/**",
      },
    ],
  },
  logging: {},
  // webpack: (config) => {
  //   // Disable HMR by modifying the devMiddleware settings
  //   config.hot = false; // Disable hot reloading
  //   return config;
  // },
};

export default nextConfig;
