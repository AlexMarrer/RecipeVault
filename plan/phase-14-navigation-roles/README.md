# Phase 14 – Navigation, Rollen-Sichtbarkeit & Routing-Feinschliff

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 10–13

## Ziel & Anforderungen

Die einzelnen Seiten zu einer zusammenhängenden App verbinden und sichtbar machen, dass
Routing + rollenbasierte Sichtbarkeit konsequent greifen.

- **Navbar erweitern:** Links abhängig von Rolle via `*appHasRole`:
  - alle eingeloggten: „Rezepte"
  - `chef`/`admin`: „Meine Rezepte", „Neues Rezept"
  - `chef`/`admin`: „Kategorien", „Zutaten" (Admin-Bereich)
  - aktiver Link wird hervorgehoben (`routerLinkActive`).
- **Zentrale Routen-Konstanten:** alle Pfade in `core/routes.ts` gebündelt, Templates/Guards
  referenzieren nur diese (keine Magic Strings).
- **Routen-Daten:** `roleGuard` über `data.roles` durchgängig gesetzt; `/403` und Wildcard
  bleiben am Ende.
- Optionale, kleine **`HomePage`**/Landing als Einstieg (zählt als weitere Komponente).

## Styling

Navbar **gleich** als `mat-toolbar` umsetzen (statt eigenem `<nav>`), aktive Links + rollen-
abhängige Einträge darin. Der globale Look (Container, Spacing, Tokens) wird direkt danach in
[Phase 14b](../phase-14b-styling/) finalisiert.

## Betroffene Dateien

- `frontend/src/app/components/navbar/…`
- `frontend/src/app/app.routes.ts`, `frontend/src/app/core/routes.ts`
- optional `frontend/src/app/pages/home/…`
