// next.config.ts
import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',
  
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'app')],
  },

  // --- AJOUT DE CETTE SECTION ---
  // Autorise Next/Image à charger des images depuis ce domaine
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  /* vos autres options de config ici */
};

export default nextConfig;