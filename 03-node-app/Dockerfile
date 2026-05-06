# Bruk en offisiell Node.js Alpine-image for et lite fotavtrykk
FROM node:20-alpine

# Sett arbeidsmappen inne i containeren
WORKDIR /app

# Kopier kun avhengighetsfiler først – Docker cacher dette laget
# så lenge package.json ikke endres, slipper vi å kjøre npm install på nytt
COPY package.json .
RUN npm install

# Kopier resten av kildekoden etter at avhengigheter er installert
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
