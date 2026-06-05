# Checkliste – Phase 10

- [ ] `RecipeFilterComponent` – Titel/Kategorie/Schwierigkeit → `filterChange` (output)
- [ ] `RecipeListPage` – nutzt `RecipeCardComponent` im Grid + Filterleiste
- [ ] `RecipeListPage` – „Neu"-Button nur `*appHasRole="['chef','admin']"`
- [ ] `RecipeDetailPage` – Route `recipes/:id`, lädt `getById`, zeigt Sektionen/Schritte/Zutaten
- [ ] `RecipeDetailPage` – Ø-Bewertung via `StarRatingComponent` (readonly)
- [ ] `RecipeDetailPage` – Edit/Delete nur für admin oder Eigentümer-chef sichtbar
- [ ] `core/routes.ts` + `app.routes.ts` um Detail-Route erweitert
- [ ] Lade-/Fehler-/Leerzustände abgedeckt
