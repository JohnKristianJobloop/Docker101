# 02 – Statisk webserver med Nginx

## Hva lærer vi her?

Vi bruker en ferdiglagd Nginx-image til å serve en HTML-side, og vi ser hvordan portmapping fungerer.

## Nytt i dette steget

| Instruksjon / konsept | Hva det gjør |
|-----------------------|--------------|
| `COPY`                | Kopierer filer fra maskinen din inn i image-laget |
| `EXPOSE`              | Dokumenterer hvilken port containeren lytter på |
| `-p <host>:<container>` | Åpner en port mellom maskinen din og containeren |

## Kommandoer

**Bygg image:**
```bash
docker build -t statisk-web .
```

**Kjør container og map port 8080 på maskinen til port 80 i containeren:**
```bash
docker run -p 8080:80 statisk-web
```

Åpne [http://localhost:8080](http://localhost:8080) i nettleseren.

**Kjør i bakgrunnen (`-d` for detached):**
```bash
docker run -d -p 8080:80 --name min-webserver statisk-web
```

**Stopp containeren:**
```bash
docker stop min-webserver
```

**Slett containeren:**
```bash
docker rm min-webserver
```

## Merk: EXPOSE vs. -p

`EXPOSE 80` i Dockerfilen er kun dokumentasjon – den åpner ingen porter. Det er `-p`-flagget til `docker run` som faktisk kobler porter mellom host og container.
