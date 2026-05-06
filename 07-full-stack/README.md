# 07 – Full-stack applikasjon

## Hva lærer vi her?

Vi setter opp en komplett tre-lags applikasjon: Nginx som reverse proxy og statisk filserver, Node.js/Express som API-backend, og PostgreSQL som database. Kun frontend-porten er eksponert utad.

## Arkitektur

```
Internett
    │
    ▼
┌─────────────┐
│  Frontend   │  Nginx – port 80 (eneste eksponerte port)
│  (Nginx)    │  Serverer HTML og proxyer /api/ til backend
└──────┬──────┘
       │ internt Docker-nettverk
       ▼
┌─────────────┐
│   Backend   │  Node.js/Express – port 3000 (kun intern)
│  (Node.js)  │  REST API mot databasen
└──────┬──────┘
       │ internt Docker-nettverk
       ▼
┌─────────────┐
│  Database   │  PostgreSQL – port 5432 (kun intern)
│ (Postgres)  │  Persistent lagring via navngitt volum
└─────────────┘
```

## Nytt i dette steget

| Konsept                | Hva det gjør |
|------------------------|--------------|
| Nginx `proxy_pass`     | Videresender `/api/`-kall til backend-tjenesten |
| Intern trafikk         | Backend og DB er ikke tilgjengelige utenfra |
| Fler-lags arkitektur   | Separation of concerns mellom lag |

## Kommandoer

**Start hele stacken:**
```bash
docker compose up --build
```

Åpne [http://localhost:8080](http://localhost:8080) i nettleseren.

**Se logger per tjeneste:**
```bash
docker compose logs frontend
docker compose logs backend
docker compose logs db
```

**Stopp:**
```bash
docker compose down
```

## Nettverksisolering

Selv om alle tjenester er i samme Compose-nettverk, er kun port 80 eksponert mot host-maskinen. Backend og database er kun tilgjengelige for andre tjenester i det interne nettverket – ikke fra internett.

## Nginx som reverse proxy

Nettleseren sender alle kall til port 80. Nginx bestemmer hva som skjer:

- `GET /` → serverer `index.html` lokalt
- `GET /api/messages` → proxyer til `http://backend:3000/messages`
- `POST /api/messages` → proxyer til `http://backend:3000/messages`

Frontend-koden trenger aldri å vite hvilken port backend kjører på.
