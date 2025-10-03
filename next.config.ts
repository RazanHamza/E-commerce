import { NextConfig } from "next";
import { tr } from "zod/v4/locales";
const nextConfig:NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/**', 
      },
    ],
  },
  typescript:{
    ignoreBuildErrors:true,
  },
  eslint:{
    ignoreDuringBuilds:true,
  },
};

export default nextConfig;
