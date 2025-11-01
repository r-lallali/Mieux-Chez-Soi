# Étape 1: Le "Builder" - Construit l'application
# Utilise une image Node.js 20 légère (Alpine)
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code source
COPY . .

# Construire l'application (en utilisant le output: 'standalone' de next.config.mjs)
RUN npm run build

# ---

# Étape 2: Le "Runner" - L'image finale de production
FROM node:20-alpine AS runner
WORKDIR /app

# Définir l'environnement sur "production"
ENV NODE_ENV=production
# Next.js démarre sur le port 3000 par défaut
ENV PORT 3000

# Copier les fichiers "standalone" depuis l'étape "builder"
# Cela inclut le 'server.js' et les 'node_modules' minimaux
COPY --from=builder /app/.next/standalone ./

# Copier les assets statiques (CSS, polices, JS client)
COPY --from=builder /app/.next/static ./.next/static

# Copier les images et autres fichiers du dossier 'public'
COPY --from=builder /app/public ./public

# Exposer le port sur lequel l'application tournera
EXPOSE 3000

# La commande pour démarrer le serveur Next.js optimisé
CMD ["node", "server.js"]