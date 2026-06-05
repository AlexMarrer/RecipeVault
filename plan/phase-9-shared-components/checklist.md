# Checkliste – Phase 9

- [x] `StarRatingComponent` – `value` (input), `interactive` (input), `valueChange` (output)
- [x] `StarRatingComponent` – interaktiver Modus: Klick auf Stern setzt Wert + emittiert
- [x] `RecipeCardComponent` – `recipe` (input), zeigt Titel/Bild/Schwierigkeit/Ø-Sterne/Kategorien
- [x] `RecipeCardComponent` – Klick navigiert zu `/recipes/:id`
- [x] `ConfirmDialogComponent` – `title`/`message` (input), `confirmed`/`cancelled` (output)
- [x] Alle drei: Standalone + OnPush + BEM-SCSS, `ng build` fehlerfrei

> Hinweis: Output-Namen `confirmed`/`cancelled` und Input `interactive` statt `readonly`,
> weil ESLint (`no-output-native`, `no-input-rename`) DOM-Event-Namen und Input-Aliase verbietet.
