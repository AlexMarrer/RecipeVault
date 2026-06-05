# Checkliste – Phase 13

- [x] `RatingListComponent` – `recipeId` (input), lädt `listForRecipe`, Sterne + Kommentar + Autor
- [x] `RatingFormComponent` – interaktives `StarRatingComponent` + Kommentarfeld
- [x] Neue Bewertung → `create`; vorhandene eigene → Vorbelegung + `update`
- [x] Eigene Bewertung löschen (`delete`)
- [x] `409` „bereits bewertet" → eigene Bewertung wird geladen (Edit-Modus)
- [x] Einbindung in `RecipeDetailPage`, Liste + Ø nach Absenden aktualisiert (`refreshToken`)

> Backend-Rating-DTO liefert nur `userId` (keine Usernamen) → Anzeige „Du" vs. „Benutzer" + Datum.
> Reaktiver Reload via `effect()` auf `recipeId`/`refreshToken`.
