
import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',
  
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'app')],
  },

  
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  
};

export default nextConfig;