# Checkliste – Phase 12

- [ ] `CategoryAdminPage` – Liste + Anlegen + Bearbeiten (`CategoryService`)
- [ ] `CategoryAdminPage` – Löschen nur `*appHasRole="'admin'"` + `ConfirmDialogComponent`
- [ ] `IngredientAdminPage` – Liste + Anlegen + Bearbeiten (`IngredientService`)
- [ ] `IngredientAdminPage` – Löschen nur `*appHasRole="'admin'"` + `ConfirmDialogComponent`
- [ ] Routen `admin/categories` + `admin/ingredients` mit roleGuard `['chef','admin']`
- [ ] `409`-Konflikt (Name vergeben) als Nutzermeldung
- [ ] `core/routes.ts` ergänzt
