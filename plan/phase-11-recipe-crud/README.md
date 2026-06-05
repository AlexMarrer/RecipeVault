# Phase 11 – Rezept-CRUD: Anlegen / Bearbeiten / Löschen

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 9 + 10

## Ziel & Anforderungen

Voller CRUD-Schreibpfad für Rezepte – die zentrale CRUD-Anforderung der Projektarbeit. Inkl.
verschachtelter Sektionen/Schritte/Zutaten. Schreibende Routen sind per `roleGuard` auf
`chef`/`admin` beschränkt.

- **`RecipeFormPage`** (`app-recipe-form`): eine Page für Anlegen **und** Bearbeiten.
  - Routen `recipes/new` (roleGuard `['chef','admin']`) und `recipes/:id/edit`
    (roleGuard `['chef','admin']`; Eigentümer-Prüfung serverseitig, Frontend versteckt fremde
    Edit-Buttons bereits in Phase 10).
  - Reactive Form / Signal-State für `RecipeRequest`: Stammdaten + **dynamische** Sektionen
    (hinzufügen/entfernen), je Sektion dynamische Schritte, dynamische Zutatenzeilen
    (`ingredientId` aus `IngredientService`, `amount`, `unit`), Mehrfach-Kategorienauswahl.
  - Validierung passend zu den DTO-Regeln (Pflichtfelder, `servings ≥ 1`, Sterne/Zeiten ≥ 0).
  - Submit → `create` bzw. `update`, danach Navigation zur Detailseite.
- **`MyRecipesPage`** (`app-my-recipes`): Route `my-recipes` (roleGuard `['chef','admin']`),
  listet `RecipeService.myRecipes()` mit Edit-/Löschaktion.
- **Löschen:** `ConfirmDialogComponent` (Phase 9) auf Detail- und „Meine Rezepte"-Seite →
  `RecipeService.delete(id)`.

## Routing

- `RoutePath`/`RouteUrl` um `recipeNew`, `recipeEdit`, `myRecipes` erweitern.

## Betroffene Dateien

- `frontend/src/app/pages/recipe-form/…` (neu)
- `frontend/src/app/pages/my-recipes/…` (neu)
- `frontend/src/app/app.routes.ts`, `frontend/src/app/core/routes.ts`
