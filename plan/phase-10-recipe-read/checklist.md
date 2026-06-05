# Checkliste – Phase 10

- [x] `RecipeFilterComponent` – Titel/Kategorie/Schwierigkeit → `filterChange` (output)
- [x] `RecipeListPage` – nutzt `RecipeCardComponent` im Grid + Filterleiste
- [x] `RecipeListPage` – „Neu"-Button nur `*appHasRole="manageRoles"` (chef/admin)
- [x] `RecipeDetailPage` – Route `recipes/:id`, lädt `getById`, zeigt Sektionen/Schritte/Zutaten
- [x] `RecipeDetailPage` – Ø-Bewertung via `StarRatingComponent` (readonly)
- [x] `RecipeDetailPage` – Edit/Delete nur für admin oder Eigentümer-chef sichtbar
- [x] `core/routes.ts` + `app.routes.ts` um Detail-Route erweitert
- [x] Lade-/Fehler-/Leerzustände abgedeckt

> Offen für Phase 11: Route `recipes/new` + `recipes/:id/edit` existieren noch nicht. Der
> „Neu"-Button verlinkt bereits auf `/recipes/new`; bis die Route in Phase 11 **vor** `recipes/:id`
> registriert ist, fängt `RecipeDetailPage` nicht-numerische IDs ab („Rezept nicht gefunden").
