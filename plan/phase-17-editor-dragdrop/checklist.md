# Checkliste – Phase 17

- [ ] `DragDropModule` in `RecipeFormPage` importiert
- [ ] Zutaten: `cdkDropList` + `cdkDrag` + `cdkDragHandle`, `drop()`-Handler → `moveItemInArray`
- [ ] Sektionen: `cdkDropList` + `cdkDrag` + `cdkDragHandle`, eigener `drop()`-Handler
- [ ] Schritte: pro Sektion eigene `cdkDropList`, `drop(si, event)`-Handler
- [ ] Reihenfolge wird auf den **FormArray-Controls** geändert (nicht nur visuell)
- [ ] „Schritt N"-Label aktualisiert sich nach dem Verschieben
- [ ] Submit erzeugt korrekte `sortOrder` (Sektion) und `stepNumber` (Schritt) gemäß neuer Reihenfolge
- [ ] BEM-Styles für Handle, Drag-Preview, Placeholder; nur `rem`
- [ ] `npm run build` + `npm run lint` grün
