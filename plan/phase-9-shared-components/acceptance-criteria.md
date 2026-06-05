# Acceptance Criteria – Phase 9

- `StarRatingComponent` zeigt im `readonly`-Modus den Durchschnitt korrekt (z. B. 3.5) und
  emittiert im interaktiven Modus den geklickten Wert über `valueChange`.
- `RecipeCardComponent` rendert ein `Recipe` ohne eigene HTTP-Aufrufe (reine Präsentation,
  Daten kommen per `input()`).
- `ConfirmDialogComponent` ist generisch (kein Rezept-Bezug) und über `input()`/`output()`
  steuerbar.
- Alle Komponenten sind Standalone, `OnPush`, BEM-konform und `ng build` kompiliert fehlerfrei.
