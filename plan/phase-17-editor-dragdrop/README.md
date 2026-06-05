# Phase 17 – Rezept-Editor: Drag & Drop für Reihenfolge

**Ziel:** Im Rezept-Formular lassen sich **Sektionen**, **Schritte** (innerhalb einer Sektion)
und **Zutaten** per Drag & Drop umsortieren. Die neue Reihenfolge wird beim Speichern korrekt
übernommen.

## Hintergrund / Warum kein Backend-Change

`RecipeFormPage.toRequest()` leitet `section.sortOrder` und `step.stepNumber` **aus dem
Array-Index** ab (siehe `recipe-form.ts`). Es genügt also, die Reihenfolge der `FormArray`-
Controls zu ändern — beim Submit ergeben sich `sortOrder`/`stepNumber` automatisch neu. Zutaten
haben keine eigene Reihenfolge im DTO, werden aber zur besseren UX trotzdem sortierbar (rein
visuelle/Eingabe-Reihenfolge).

## Anforderungen

- Angular CDK `DragDropModule` (`cdkDropList`, `cdkDrag`, `cdkDragHandle`, `moveItemInArray`)
  einbinden — CDK ist bereits installiert.
- **Drei Drop-Listen:**
  - Zutaten-Liste (`ingredients` FormArray)
  - Sektionen-Liste (`sections` FormArray)
  - pro Sektion eine eigene Schritte-Liste (`steps` FormArray, verschachtelt)
- **Drag-Handle** (eigenes Icon, z. B. `drag_indicator`) pro Zeile, damit das Ziehen nicht mit
  den Texteingaben/Selects kollidiert. Nur am Handle ziehbar (`cdkDragHandle`).
- Beim Drop die zugehörige `FormArray`-Reihenfolge via `moveItemInArray(array.controls, prev, cur)`
  anpassen und `array.updateValueAndValidity()` / Re-Index sicherstellen.
- Schritt-Nummern-Labels („Schritt N") müssen nach dem Verschieben die **neue** Position zeigen.
- Styling in **BEM**, Drag-Preview/Placeholder über CDK-Klassen sauber gestaltet, `rem`-Einheiten.

## Nicht-Ziele

- Kein Drag & Drop über Sektionsgrenzen hinweg (Schritte bleiben in ihrer Sektion).
- Keine Persistenz einer eigenen Zutaten-Reihenfolge im Backend.
