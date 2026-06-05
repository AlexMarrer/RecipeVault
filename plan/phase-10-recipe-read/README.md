# Phase 10 – Rezepte lesen: Liste aufwerten + Detailseite

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 7 + 9

## Ziel & Anforderungen

Der vollständige Lese-Pfad: Eine echte Rezept-Übersicht mit Filter und Karten sowie eine
Detailseite über einen Routen-Parameter. Damit ist Routing mit Parametern nachgewiesen.

- **`RecipeListPage` aufwerten:** Rezepte als `RecipeCardComponent`-Grid statt nur Titel.
  Filterleiste **`RecipeFilterComponent`** (`app-recipe-filter`) mit Titel-Suche,
  Kategorie-Auswahl (aus `CategoryService`) und Schwierigkeit → `output()` `filterChange`,
  Page ruft `RecipeService.list(filter)`. „Neues Rezept"-Button nur für `chef`/`admin`
  via `*appHasRole`.
- **`RecipeDetailPage`** (`app-recipe-detail`): Route `/recipes/:id` (authGuard). Lädt
  `RecipeService.getById(id)`, zeigt Beschreibung, Eckdaten, **Sektionen → Schritte**
  (geordnet), **Zutatenliste**, Kategorien und Ø-Bewertung über `StarRatingComponent`.
  Aktionen „Bearbeiten/Löschen" nur sichtbar für `admin` oder Eigentümer-`chef`
  (Vergleich `recipe.authorId` mit `AuthService.getUserId()`).

## Routing

- `RoutePath`/`RouteUrl` (in `core/routes.ts`) um `recipeDetail` (`recipes/:id`) ergänzen –
  keine Magic Strings in Templates.

## Betroffene Dateien

- `frontend/src/app/pages/recipe-list/…` (Umbau)
- `frontend/src/app/pages/recipe-detail/…` (neu)
- `frontend/src/app/components/recipe-filter/…` (neu)
- `frontend/src/app/app.routes.ts`, `frontend/src/app/core/routes.ts`
