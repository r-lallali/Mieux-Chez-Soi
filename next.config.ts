// next.config.ts
import type { NextConfig } from "next";
import path from 'path'; // Ajout nécessaire pour sassOptions

const nextConfig: NextConfig = {
  // La ligne clé pour la build Docker optimisée
  output: 'standalone',

  // Nécessaire pour que Next.js comprenne vos imports .scss
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'app')],
  },

  /* vos autres options de config ici */
};

export default nextConfig;