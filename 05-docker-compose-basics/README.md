# 05 – Docker Compose grunnleggende

## Hva lærer vi her?

Vi introduserer `docker-compose.yml` for å orkestrere flere containere som én enhet. Her kjører vi en Node.js-app sammen med Redis.

## Nytt i dette steget

| Konsept        | Hva det gjør |
|----------------|--------------|
| `docker-compose.yml` | Definerer alle tjenester, nettverk og volumer |
| `services`     | Én blokk per container |
| `depends_on`   | Styrer oppstartsrekkefølge |
| Internt nettverk | Tjenester når hverandre via tjenestenavnet som hostname |

## Kommandoer

**Start alle tjenester:**
```bash
docker compose up
```

**Start i bakgrunnen:**
```bash
docker compose up -d
```

**Se logger:**
```bash
docker compose logs -f
```

**Se kjørende tjenester:**
```bash
docker compose ps
```

**Stopp og fjern containere:**
```bash
docker compose down
```

**Rebuild etter kodeendring:**
```bash
docker compose up --build
```

## Internett mellom tjenester

Docker Compose lager automatisk et privat nettverk der tjenester kan nå hverandre via tjenestenavnet. I `index.js` kobler vi til Redis med `host: 'redis'` – det er tjenestenavnet fra `docker-compose.yml`.
