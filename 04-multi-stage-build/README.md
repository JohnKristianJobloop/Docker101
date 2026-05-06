# 04 – Multi-stage build

## Hva lærer vi her?

Vi kompilerer TypeScript til JavaScript i ett byggsteg, og kopierer kun det kompilerte resultatet inn i et rent og minimalt produksjonsimage. Resultatet er et image uten TypeScript-kompilatoren og andre devDependencies.

## Nytt i dette steget

| Konsept                   | Hva det gjør |
|---------------------------|--------------|
| `AS <navn>`               | Gir et byggsteg et navn så vi kan referere til det |
| `COPY --from=<steg>`      | Kopierer filer fra et tidligere byggsteg |
| `npm ci --only=production`| Installerer kun produksjonsavhengigheter |

## Kommandoer

**Bygg image:**
```bash
docker build -t multi-stage-app .
```

**Kjør:**
```bash
docker run -p 3000:3000 multi-stage-app
```

**Sammenlign imagestørrelse med og uten multi-stage:**
```bash
docker images
```

Et image med TypeScript-kompilatoren inkludert ville vært betraktelig større.

**Se lagene i et image:**
```bash
docker history multi-stage-app
```

## Hvorfor multi-stage?

| Uten multi-stage        | Med multi-stage          |
|-------------------------|--------------------------|
| TypeScript i image      | Kun kompilert JS         |
| devDependencies i image | Kun produksjonsavh.      |
| Større image            | Mindre image             |
| Større angrepsflate     | Mindre angrepsflate      |
