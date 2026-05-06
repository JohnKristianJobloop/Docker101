# 06 – Docker Compose med database

## Hva lærer vi her?

Vi kobler en Node.js-app til en PostgreSQL-database med persistent lagring, og ser hvordan helsesjekker sikrer korrekt oppstartsrekkefølge.

## Nytt i dette steget

| Konsept              | Hva det gjør |
|----------------------|--------------|
| `volumes`            | Navngitte volumer som overlever `docker compose down` |
| `healthcheck`        | Lar andre tjenester vente til tjenesten faktisk er klar |
| `depends_on: condition: service_healthy` | Starter app kun etter at DB har bestått helsesjekk |
| `.env`-fil           | Holder hemmelige verdier utenfor `docker-compose.yml` |
| `environment`        | Sender miljøvariabler inn i containeren |

## Kommandoer

**Start:**
```bash
docker compose up --build
```

**Test API-et:**
```bash
# Hent alle meldinger
curl http://localhost:3000/meldinger

# Legg til en melding
curl -X POST http://localhost:3000/meldinger \
  -H "Content-Type: application/json" \
  -d '{"tekst": "Hei fra curl!"}'
```

**Stopp uten å slette data:**
```bash
docker compose stop
```

**Stopp og slett containere, men behold volumer:**
```bash
docker compose down
```

**Slett alt inkludert volumer (mister data!):**
```bash
docker compose down -v
```

## Persistent lagring med volumer

Uten et navngitt volum vil databasedata forsvinne når containeren slettes. Med `db-data:/var/lib/postgresql/data` lagres dataene på host-maskinen og monteres inn i containeren ved neste oppstart.

## Hvorfor healthcheck?

`depends_on` uten `condition` venter bare til containerprosessen er startet – ikke til databasen er klar til å ta imot koblinger. `pg_isready` sjekker at Postgres faktisk svarer.
