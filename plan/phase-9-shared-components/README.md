# Phase 9 – Basis-Komponenten (Shared UI)

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 4 + 5 + 6

## Ziel & Anforderungen

Wiederverwendbare Bausteine, die mehrere Pages teilen. Sie zählen als eigenständige
Komponenten zur geforderten Mindestzahl (≥ 8) und halten die Pages später schlank.

- **`StarRatingComponent`** (`app-star-rating`): zeigt 1–5 Sterne. Zwei Modi über `input()`:
  reiner Anzeige-Modus (`readonly`, z. B. Durchschnitt) und interaktiv (Klick → `output()`
  `valueChange`). Wird in Liste, Detail und Rating-Formular genutzt.
- **`RecipeCardComponent`** (`app-recipe-card`): kompakte Karte für ein Rezept (Titel, Bild,
  Schwierigkeit, Ø-Bewertung, Kategorien). `input()` `recipe`; Klick navigiert zur Detailseite.
- **`ConfirmDialogComponent`** (`app-confirm-dialog`): generischer Bestätigungs-Dialog für
  Löschaktionen. `input()` Titel/Text, `output()` `confirm` / `cancel`.

## Vorgaben (siehe `frontend/CLAUDE.md`)

- Standalone, `ChangeDetectionStrategy.OnPush`, Selektor-Präfix `app-`.
- State über Signals; `input()`/`output()` statt `@Input`/`@Output`; `inject()`.
- SCSS strikt BEM (`block__element--modifier`), Einheiten in `rem`, keine Tag-Selektoren.
- Keine Magic Strings/Numbers (Sterne-Anzahl als Konstante).

## Styling

✅ **Nachhol erledigt (2026-06-05):** Hartkodierte Farben raus, alle Komponenten nutzen jetzt
die cyan/orange-Theme-Variablen (`--mat-sys-*`). Stars in Tertiär-Farbe (orange), Karten mit
Material-Elevation, ConfirmDialog auf `matButton` (Löschen rot via lokaler `--mat-sys-primary`-
Override). Restliche globale Politur (mat-toolbar, mat-card) in [Phase 14b](../phase-14b-styling/).

## Betroffene Dateien

- `frontend/src/app/components/star-rating/…`
- `frontend/src/app/components/recipe-card/…`
- `frontend/src/app/components/confirm-dialog/…`
