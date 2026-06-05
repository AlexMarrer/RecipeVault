# Phase 15 – Unit Tests (Vitest)

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 5 + 11

## Ziel & Anforderungen

Pflicht laut Projektdefinition: **ein** Unit-Test für den wichtigsten **Service** und **ein**
Unit-Test für die wichtigste **Komponente**, jeweils mit Abdeckung **aller** Methoden. Vitest
(v4) + jsdom sind bereits installiert; `npm test` nutzt den Angular-Vitest-Builder.

- **Veralteten Starter-Test ersetzen:** `app.spec.ts` prüft noch den alten Titel
  „Hello, recipevault" – nach dem Umbau (Navbar + `router-outlet`) anpassen oder entfernen,
  damit die Suite grün ist.
- **Service-Test – `RecipeService`** (wichtigster Service): alle Methoden via
  `provideHttpClient(withInterceptorsFromDi())` + `provideHttpClientTesting` /
  `HttpTestingController`:
  - `list()` ohne Filter und mit `title` / `categoryId` / `difficulty` (Query-Params prüfen)
  - `getById`, `myRecipes` (`/me`), `create` (POST), `update` (PUT), `delete` (DELETE)
  - jeweils URL, Methode und Body verifizieren.
- **Komponenten-Test – `RecipeFormPage`** (wichtigste Komponente, meiste Logik): alle Methoden:
  Sektion/Schritt/Zutat hinzufügen & entfernen, Vorbelegung im Edit-Modus, Validierung,
  Submit ruft `create`/`update` (Service gemockt).
  - Alternative, falls schlanker gewünscht: `RecipeListPage` (Lade-/Fehler-/Filter-Pfade).

## Betroffene Dateien

- `frontend/src/app/app.spec.ts` (anpassen)
- `frontend/src/app/service/recipe.service.spec.ts` (neu)
- `frontend/src/app/pages/recipe-form/recipe-form.spec.ts` (neu)
