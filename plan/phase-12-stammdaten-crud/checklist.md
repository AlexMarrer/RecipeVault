# Checkliste – Phase 12

- [x] `CategoryAdminPage` – Liste + Anlegen + Bearbeiten (`CategoryService`)
- [x] `CategoryAdminPage` – Löschen nur `*appHasRole="adminRole"` + `ConfirmDialogComponent`
- [x] `IngredientAdminPage` – Liste + Anlegen + Bearbeiten (`IngredientService`)
- [x] `IngredientAdminPage` – Löschen nur `*appHasRole="adminRole"` + `ConfirmDialogComponent`
- [x] Routen `admin/categories` + `admin/ingredients` mit roleGuard `['chef','admin']`
- [x] `409`-Konflikt (Name vergeben) als Nutzermeldung
- [x] `core/routes.ts` ergänzt

> Navigations-Links zum Admin-Bereich kommen in Phase 14; aktuell per URL
> (`/admin/categories`, `/admin/ingredients`) erreichbar.
