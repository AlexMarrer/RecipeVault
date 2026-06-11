# Phase 23 – Projektdokumentation (PDF)

**Status:** ⬜ offen · **Typ:** Doku · **baut auf:** Phase 21 (Nachweis), 22 (Bilder)

## Ziel & Anforderungen

Das eigentliche Abgabedokument erstellen. Es **basiert auf der M295-Dokumentation** und wird um
den Frontend-Teil ergänzt. Abgabeformat: **PDF**.

Pflichtinhalte (Projektdefinition „Projektabgabe"):

- **Deckblatt:** Kursname **M294** und aktuelles **Datum** anpassen (M295-Deckblatt übernehmen
  und anpassen), Autor (Alex Uscata, INA-23A).
- **Beschreibung des Frontends:** Zweck, Tech-Stack (Angular 22 Standalone, SCSS, Signals,
  angular-oauth2-oidc), Projektstruktur (`components` vs. `pages`, `service`, `guards`,
  `directives`, `models`).
- **Komponentenübersicht:** Tabelle mit Spalten *Name · Typ (Page/Komponente) · Zweck · Rolle*.
  Alle 16 Komponenten/Pages aufführen, Mindestzahl ≥ 8 damit klar belegt.
- **Skizzierte Wireframes** der wichtigsten Ansichten (aus Phase 22).
- **Benutzer-Anleitung** mit Screenshots (aus Phase 22), pro Rolle die Kernfunktionen
  (Login, Liste/Filter, Detail, CRUD, Admin, Rating, 403).
- **Konfigurationsangaben:**
  - Keycloak: Realm `recipevault`, Client `recipevault` (Werte aus `app.config`/`app.auth`
    bzw. Backend gegenprüfen)
  - API: URL/Port (Backend `:9090`)
  - Backend: Datenbankname und -port (PostgreSQL `:5432` – exakten Namen aus
    `backend/src/main/resources/application.yaml` übernehmen)

## Hinweise

- Wenn ein Word-Quelldokument aus M295 existiert, dieses als Basis kopieren und ergänzen,
  dann als PDF exportieren. Für die Word-Bearbeitung die `docx`-Skill nutzen, für den
  PDF-Schritt die `pdf`-Skill.
- Konkrete Werte (Realm, Client, DB-Name) **nicht raten** – aus den Konfig-Dateien ziehen.

## Betroffene Dateien

- `docs/` – Quelldokument (Word/Markdown) + finale `RecipeVault_Frontend_Doku.pdf`
- nur lesend: `frontend/src/app/app.config.ts`, `frontend/src/app/app.auth.ts`,
  `backend/src/main/resources/application.yaml`
