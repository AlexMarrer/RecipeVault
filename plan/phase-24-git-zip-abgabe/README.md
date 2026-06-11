# Phase 24 – Git-Abgabe & ZIP

**Status:** ⬜ offen · **Typ:** Abgabe/Organisation · **baut auf:** Phase 21–23

## Ziel & Anforderungen

Das Projekt final versionieren und das Abgabepaket schnüren. Letzte Phase, kein Feature-Code.

- **README aktualisieren** (`frontend/README.md`): Start-Anleitung (Backend `:9090`,
  Keycloak `:8080` Realm `recipevault`, Frontend `:4200`), `npm start` / `npm test`,
  Test-User je Rolle (`user` / `chef` / `admin`).
- **Git:** alles committen und auf GitHub pushen. Arbeitsbaum sauber (`git status` leer).
- **ZIP-Paket** `uscata.alex_m294.zip` (Schema `name.vorname_m294.zip`) erstellen mit:
  - **Frontend** – Angular-Projekt **inkl. `.git`**, **ohne** `node_modules/` und Cache/`dist`.
  - **Backend** – Spring-Boot-Projekt **ohne** `target/`.
  - Die **Projektdokumentation als PDF** (aus Phase 23).
- **Plan-Status** final aktualisieren (alle erledigten Phasen auf ✅).

## Hinweise

- `.gitignore` muss `node_modules/`, `dist/`, `target/` ausschließen – vor dem ZIP prüfen.
- Das `.git`-Verzeichnis **muss** im ZIP enthalten sein (ausdrückliche Anforderung).
- Vor dem ZIP einmal frisch verifizieren: `npm ci && ng build && npm test` grün.

## Betroffene Dateien

- `frontend/README.md`, `frontend/.gitignore`, `backend/.gitignore`
- Git-Repository (Commit/Push)
- Abgabe-ZIP (außerhalb des Repos ablegen)
