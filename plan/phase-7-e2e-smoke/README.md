# Phase 7 – End-to-End-Nachweis

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 1,3,5,6 + Phase 0

## Ziel & Anforderungen

Beweis, dass die gesamte Kette greift: **Login → Token → CORS → Daten**. Eine minimale Navbar
mit Login/Logout (+ Username) und eine `RecipeListPage`, die echte Rezepte über den
`RecipeService` vom Backend holt und die Titel anzeigt. Die Route ist per `authGuard`
geschützt; zusätzlich gibt es `/403` und eine Wildcard-Route.

Das ist der Abschluss des Grund-Setups: Erscheinen nach dem Login echte Rezepte, sind CORS,
Token-Weitergabe und Service-Anbindung bewiesen.

## Betroffene Dateien

- `frontend/src/app/components/navbar/…`
- `frontend/src/app/pages/recipe-list/…`
- `frontend/src/app/app.routes.ts`, `app.ts`
