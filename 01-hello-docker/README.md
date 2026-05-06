# 01 – Hello Docker

## Hva lærer vi her?

Dette er den absolutte grunnmuren. Vi lager en minimal `Dockerfile` og bruker den til å bygge og kjøre vår første container.

---

## Hva er et Docker-image?

Et Docker-image er et **uforanderlig øyeblikksbilde** av et filsystem – med alt en applikasjon trenger for å kjøre: operativsystemfiler, avhengigheter, konfigurasjon og kode. Imaget i seg selv gjør ingenting; det er bare en beskrivelse.

### Oppskrift og rett

> Et image er **oppskriften**. En container er **retten du lager fra den**.

Oppskriften endrer seg ikke av at du koker. Du kan lage hundre identiske retter fra samme oppskrift. Og to kokker (maskiner) med samme oppskrift lager det samme resultatet – uavhengig av hverandre.


---

## Hva er en container?

En container er en **kjørende instans av et image** – det er her koden faktisk kjører. Men det er mer enn bare en prosess: containeren er **isolert** fra resten av systemet.

### Selve navnet – shipping containers

Navnet er ikke tilfeldig. En internasjonal skipscontainer er en standardisert boks som kan lastes på ethvert skip, tog eller lastebil – innholdet bryr seg ikke om hva som frakter den.

> En Docker-container fungerer på samme måte: applikasjonen inni bryr seg ikke om det er din laptop, en CI-server eller en skyinstans som kjører den. Omgivelsene er alltid de samme.

### Isolasjon – hva er containeren skjermet fra?

Når en container starter, får den sin egen isolerte versjon av:

| Ressurs | Hva det betyr i praksis |
|---------|------------------------|
| **Filsystem** | Ser bare filene fra imaget + sitt eget skrivbare lag |
| **Prosesser** | Ser ikke prosesser fra host eller andre containere |
| **Nettverk** | Får sitt eget nettverksgrensesnitt og IP-adresse |
| **Brukere** | Har sin egen rot-bruker som ikke er ekte root på host |

Dette gjøres ikke med virtualisering, men med Linux-kjernefeatures kalt **namespaces** og **cgroups**. Containeren deler kjernen med host-maskinen, men tror den er alene.

### Det skrivbare laget

Image-lagene er read-only. Når du starter en container, legger Docker/Podman et tynt **skrivbart lag** på toppen:

```
┌─────────────────────────────────┐
│  Skrivbart lag (container)      │  ← Forsvinner når containeren slettes
├─────────────────────────────────┤
│  CMD ["echo", "Hei fra Docker!"]│  ← Read-only (image)
├─────────────────────────────────┤
│  alpine:3.19 base               │  ← Read-only (image)
└─────────────────────────────────┘
```

Det betyr at to containere fra samme image aldri forstyrrer hverandres data, og at endringer i en container forsvinner når containeren slettes – med mindre du bruker et **volum** (se steg 06).

### Container vs. virtuell maskin

Det er lett å forveksle containere med virtuelle maskiner (VM). Forskjellen er stor:

```
VM                              Container
┌──────────────────────┐        ┌──────────────────────┐
│  App                 │        │  App                 │
├──────────────────────┤        ├──────────────────────┤
│  Guest OS (fullt)    │        │  (ingen guest OS)    │
├──────────────────────┤        ├──────────────────────┤
│  Hypervisor          │        │  Container runtime   │
├──────────────────────┤        ├──────────────────────┤
│  Host OS + kjerne    │        │  Host OS + kjerne    │
└──────────────────────┘        └──────────────────────┘
```

En VM emulerer en hel maskin med sitt eget OS. En container deler kjernen med host og starter derfor på millisekunder – ikke minutter.

---

## Lag – hvordan et image er bygget opp

Et image består ikke av én stor fil, men av **stablede, uforanderlige lag** – ett lag per instruksjon i `Dockerfile`.

> Tenk på det som en **lagkake**: hvert lag legges oppå det forrige, og når kaken er ferdigbakt kan du ikke endre et enkelt lag uten å starte på nytt.

```
┌─────────────────────────────────┐
│  CMD ["echo", "Hei fra Docker!"]│  ← Lag 2 (vår instruksjon)
├─────────────────────────────────┤
│  alpine:3.19 base               │  ← Lag 1 (hentet fra Docker Hub)
└─────────────────────────────────┘
```

Dette har to viktige konsekvenser:

1. **Deling** – to images som begge bruker `alpine:3.19` som base deler det laget på disk. Det lastes ned én gang.
2. **Cache** – når du rebuilder, hopper Docker/Podman over lag som ikke har endret seg. Bare lag fra første endring og nedover bygges på nytt.

---

## Image vs. container – oppsummert

| | Image | Container |
|---|---|---|
| **Hva er det?** | Mal / øyeblikksbilde | Kjørende instans av imaget |
| **Tilstand** | Uforanderlig (read-only) | Har eget skrivbart lag på toppen |
| **Analogi** | Oppskrift / klasse | Rett / objekt |
| **Lages med** | `docker build` | `docker run` |
| **Kan ha mange?** | Mange images på maskinen | Mange containere fra samme image |

---

## Nøkkelinstruksjoner

| Instruksjon | Hva den gjør |
|-------------|--------------|
| `FROM`      | Velger base-image vi bygger på toppen av |
| `CMD`       | Kommandoen som kjøres når containeren starter |

---

## Kommandoer

**Bygg image:**
```bash
docker build -t hello-docker .
```

**Kjør container:**
```bash
docker run hello-docker
```

Du skal se: `Hei fra Docker!`

**Se alle images på maskinen:**
```bash
docker images
```

**Se lagene i et image:**
```bash
docker history hello-docker
```

**Se kjørende containere:**
```bash
docker ps
```

**Se alle containere (inkl. stoppede):**
```bash
docker ps -a
```

**Slett en container:**
```bash
docker rm <container-id>
```

**Slett et image:**
```bash
docker rmi hello-docker
```

---

## Hva skjer under panseret?

1. `docker build` leser `Dockerfile` linje for linje og lager et lag per instruksjon
2. Hvert lag lagres separat og kan deles mellom images
3. Resultatet er et ferdig image tagget som `hello-docker`
4. `docker run hello-docker` starter en ny container – en kjørende instans av imaget
5. Containeren kjører `echo "Hei fra Docker!"` og avslutter

---

## Prøv selv: se lagene

Kjør dette etter du har bygget imaget:

```bash
docker history hello-docker
```

Du vil se flere rader. Øverst ligger laget du la til (`CMD`-instruksjonen). Under det kommer lagene som følger med `alpine`-basen – disse er merket `<missing>` fordi de ble bygget utenfor din maskin og bare er lagret som metadata. Til sammen utgjør de det ferdige imaget.
