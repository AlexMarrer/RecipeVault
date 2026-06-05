# Checkliste – Phase 17

- [x] `DragDropModule` in `RecipeFormPage` importiert
- [x] Zutaten: `cdkDropList` + `cdkDrag` + `cdkDragHandle`, `drop()`-Handler → `moveItemInArray`
- [x] Sektionen: `cdkDropList` + `cdkDrag` + `cdkDragHandle`, eigener `drop()`-Handler
- [x] Schritte: pro Sektion eigene `cdkDropList`, `drop(si, event)`-Handler
- [x] Reihenfolge wird auf den **FormArray-Controls** geändert (nicht nur visuell) → `reorder()` + `updateValueAndValidity()`
- [x] „Schritt N"-Label aktualisiert sich nach dem Verschieben (Index-basiert via `$index`)
- [x] Submit erzeugt korrekte `sortOrder` (Sektion) und `stepNumber` (Schritt) gemäß neuer Reihenfolge
- [x] BEM-Styles für Handle, Drag-Preview, Placeholder; nur `rem` (Schatten in `px` erlaubt)
- [x] `npm run build` + `npm run lint` grün

**Offen:** manueller Browser-Test (ziehen + speichern + Edit erneut öffnen) durch Student.
