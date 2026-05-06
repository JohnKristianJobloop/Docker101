# 03 – Node.js-app

## Hva lærer vi her?

Vi dockeriserer en ekte Node.js/Express-app og ser på viktige best practices som lag-caching og `.dockerignore`.

## Nytt i dette steget

| Instruksjon / konsept | Hva det gjør |
|-----------------------|--------------|
| `WORKDIR`             | Setter arbeidsmappen inne i containeren |
| `ENV`                 | Setter miljøvariabler som er tilgjengelige under bygging og kjøring |
| `.dockerignore`       | Hindrer at unødvendige filer (f.eks. `node_modules`) kopieres inn |
| Lag-caching           | Rekkefølgen på `COPY`/`RUN` påvirker hvor mye som må rebuildes |

## Kommandoer

**Bygg image:**
```bash
docker build -t node-app .
```

**Kjør:**
```bash
docker run -p 3000:3000 node-app
```

Besøk [http://localhost:3000](http://localhost:3000).

**Sett en miljøvariabel ved kjøring:**
```bash
docker run -p 3000:3000 -e NODE_ENV=production node-app
```

**Se logger fra en kjørende container:**
```bash
docker logs <container-id>
```

**Åpne et shell inne i containeren:**
```bash
docker exec -it <container-id> sh
```

## Lag-caching forklart

```dockerfile
COPY package.json .   # ← Dette laget caches
RUN npm install       # ← og dette – helt til package.json endres

COPY . .              # ← Kildekodeendringer treffer kun hit og nedover
```

Hvis vi hadde kopiert alt med `COPY . .` først, ville `npm install` kjørt på nytt ved _hver eneste_ kodeendring.
