# Phase 12 – Stammdaten-Verwaltung: Kategorien & Zutaten (CRUD)

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 9

## Ziel & Anforderungen

Zwei weitere CRUD-Ressourcen im Frontend und ein klarer Nachweis **abgestufter Rollen in der
UI**: Anlegen/Bearbeiten dürfen `chef`+`admin`, **Löschen nur `admin`** (entspricht der
Backend-Absicherung).

- **`CategoryAdminPage`** (`app-category-admin`): Route `admin/categories`
  (roleGuard `['chef','admin']`). Tabelle aller Kategorien, Inline-/Formular-Anlegen &
  Bearbeiten (`CategoryService`), Löschen über `ConfirmDialogComponent` – Löschen-Button nur
  via `*appHasRole="'admin'"`.
- **`IngredientAdminPage`** (`app-ingredient-admin`): Route `admin/ingredients`
  (roleGuard `['chef','admin']`), analog zu Kategorien mit `IngredientService`.
- Konflikt-Fehler (`409`, Name vergeben) wird dem Nutzer als Meldung angezeigt.

## Routing

- `RoutePath`/`RouteUrl` um `adminCategories`, `adminIngredients` erweitern.

## Betroffene Dateien

- `frontend/src/app/pages/category-admin/…` (neu)
- `frontend/src/app/pages/ingredient-admin/…` (neu)
- `frontend/src/app/app.routes.ts`, `frontend/src/app/core/routes.ts`
