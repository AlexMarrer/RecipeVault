# Phase 22 – Screenshots & Wireframes

**Status:** ⬜ offen · **Typ:** Doku-Vorbereitung · **baut auf:** Phase 0 (Keycloak), 7, 21

## Ziel & Anforderungen

Das Bildmaterial für die Projektdokumentation erzeugen. Die Projektdefinition verlangt
**skizzierte Wireframes der wichtigsten Ansichten** und eine **Kurzanleitung mit Screenshots**
je Rolle. Diese Phase liefert beides als Dateien, die Phase 23 nur noch einbindet.

**Voraussetzung:** Backend `:9090`, Keycloak `:8080` (Realm `recipevault`) und Frontend `:4200`
laufen, und es existieren Test-User für die Rollen `user`, `chef`, `admin` (siehe Phase 0).

- **Screenshots (Kurzanleitung), pro Rolle die Kernfunktion:**
  - Login über Keycloak
  - Rezeptliste + Filter (Titel/Kategorie/Schwierigkeit)
  - Rezept-Detail inkl. Bewertungen
  - Rezept anlegen/bearbeiten – inkl. Drag&Drop und Inline-Anlage (chef)
  - „Meine Rezepte" + Löschen mit Bestätigungsdialog (chef)
  - Kategorien/Zutaten verwalten (admin)
  - Bewertung abgeben (user)
  - 403/Forbidden-Fall (Rolle fehlt)
- **Wireframes** der wichtigsten Ansichten (Liste, Detail, Rezept-Formular). Skizze genügt
  (Tool frei: Excalidraw, draw.io, Stift+Scan). Als PNG/SVG ablegen.

## Betroffene Dateien

- `docs/screenshots/` (neu) – nummerierte PNGs, sprechende Namen
- `docs/wireframes/` (neu) – Wireframe-Skizzen
- App muss dafür laufen (verwende die Preview-/Run-Tools, nicht manuell den User bitten)
