# Phase 5 – Services (1 pro Controller)

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 3 + 4

## Ziel & Anforderungen

Pro Backend-Controller eine Angular-Service-Klasse, die die HTTP-Aufrufe kapselt – exakt nach
den verifizierten Endpoints. Filter-Parameter und Sonderpfade müssen mit dem Backend
übereinstimmen, sonst laufen die Komponenten später ins Leere. `AuthService` kapselt den
`OAuthService` und stellt eine schlanke API für Login-Status und Rollen bereit.

## Endpoint-Mapping (verifiziert)

- `RecipeService` → `/api/recipes`: `list({title?,categoryId?,difficulty?})`, `getById`,
  `create`, `update`, `delete`, `myRecipes()` → `GET /api/recipes/me`
- `CategoryService` → `/api/categories`: list/getById/create/update/delete
- `IngredientService` → `/api/ingredients`: list/getById/create/update/delete
- `RatingService` → `/api/ratings`: `listForRecipe(id)` → `GET ?recipeId=`, `myRatings()` → `/me`,
  create/update/delete
- `AuthService` → `login/logout/isLoggedIn/hasRole/getUserId/roles`

## Betroffene Dateien

- `frontend/src/app/service/*.service.ts`
