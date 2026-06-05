# Checkliste – Phase 11

- [x] `RecipeFormPage` – Create-Modus (`recipes/new`), roleGuard `['chef','admin']`
- [x] `RecipeFormPage` – Edit-Modus (`recipes/:id/edit`), lädt bestehendes Rezept vor
- [x] Dynamische Sektionen hinzufügen/entfernen
- [x] Dynamische Schritte je Sektion hinzufügen/entfernen
- [x] Dynamische Zutatenzeilen (Zutat aus `IngredientService` + Menge + Einheit)
- [x] Mehrfach-Auswahl Kategorien (`categoryIds`)
- [x] Formular-Validierung passend zu den DTO-Regeln, Submit nur bei gültig
- [x] Submit → `create`/`update` → Navigation zur Detailseite
- [x] `MyRecipesPage` – `myRecipes()` mit Edit/Löschen
- [x] Löschen über `ConfirmDialogComponent` → `delete`
- [x] Routen + `core/routes.ts` ergänzt (`recipes/new` **vor** `recipes/:id`)

> Reactive Forms (FormArray) für die verschachtelten Sektionen/Schritte/Zutaten.
> Navigations-Links zu „Meine Rezepte" kommen in Phase 14; aktuell per URL/`/my-recipes` erreichbar.
