# ── Steg 1: Builder ──────────────────────────────────────────────────────────
# Dette steget har alle verktøy vi trenger for å kompilere koden
FROM node:20-alpine AS builder

WORKDIR /app

# Installer alle avhengigheter (inkl. devDependencies som TypeScript)
COPY package*.json tsconfig.json ./
RUN npm ci

# Kopier kildekode og kompiler TypeScript til JavaScript
COPY src/ ./src/
RUN npm run build

# ── Steg 2: Produksjonsimage ──────────────────────────────────────────────────
# Dette steget inneholder kun det som trengs for å kjøre appen
FROM node:20-alpine AS runner

WORKDIR /app

# Kopier kompilert kode og installer kun produksjonsavhengigheter
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

EXPOSE 3000
CMD ["node", "dist/index.js"]
