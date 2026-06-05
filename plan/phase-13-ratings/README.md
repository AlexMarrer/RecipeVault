# Phase 13 – Bewertungen im Frontend (Rating-CRUD)

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 9 + 10

## Ziel & Anforderungen

Bewertungen schließen den interaktiven Teil für die Rolle `user` ab: jeder eingeloggte Nutzer
darf pro Rezept **eine** Bewertung abgeben, ändern und löschen. Eingebettet in die
Detailseite.

- **`RatingListComponent`** (`app-rating-list`): `input()` `recipeId`, lädt
  `RatingService.listForRecipe(id)`, zeigt Sterne (`StarRatingComponent` readonly) + Kommentar
  + Autor je Bewertung.
- **`RatingFormComponent`** (`app-rating-form`): interaktives `StarRatingComponent` + Kommentar.
  - Hat der Nutzer noch keine Bewertung → `create`; sonst Vorbelegung der eigenen → `update`.
  - Eigene Bewertung löschen (`delete`, eigene erkannt über `AuthService.getUserId()`).
  - `409` (bereits bewertet) sauber abfangen → in Edit-Modus wechseln.
- Einbindung beider Komponenten in `RecipeDetailPage`; nach Absenden Liste + Ø aktualisieren.

## Betroffene Dateien

- `frontend/src/app/components/rating-list/…` (neu)
- `frontend/src/app/components/rating-form/…` (neu)
- `frontend/src/app/pages/recipe-detail/…` (Einbindung)
