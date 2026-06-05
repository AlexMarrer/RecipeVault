# Checkliste – Phase 11

- [ ] `RecipeFormPage` – Create-Modus (`recipes/new`), roleGuard `['chef','admin']`
- [ ] `RecipeFormPage` – Edit-Modus (`recipes/:id/edit`), lädt bestehendes Rezept vor
- [ ] Dynamische Sektionen hinzufügen/entfernen
- [ ] Dynamische Schritte je Sektion hinzufügen/entfernen
- [ ] Dynamische Zutatenzeilen (Zutat aus `IngredientService` + Menge + Einheit)
- [ ] Mehrfach-Auswahl Kategorien (`categoryIds`)
- [ ] Formular-Validierung passend zu den DTO-Regeln, Submit nur bei gültig
- [ ] Submit → `create`/`update` → Navigation zur Detailseite
- [ ] `MyRecipesPage` – `myRecipes()` mit Edit/Löschen
- [ ] Löschen über `ConfirmDialogComponent` → `delete`
- [ ] Routen + `core/routes.ts` ergänzt
