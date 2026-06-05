# Checkliste – Phase 15

- [ ] `app.spec.ts` an aktuelles `App`-Template angepasst (kein „Hello, recipevault" mehr)
- [ ] `recipe.service.spec.ts` – `list()` ohne Filter + je Filter (title/categoryId/difficulty)
- [ ] `recipe.service.spec.ts` – `getById`, `myRecipes`, `create`, `update`, `delete`
- [ ] `recipe.service.spec.ts` – URL/Methode/Body je Aufruf verifiziert, `httpMock.verify()`
- [ ] `recipe-form.spec.ts` – Sektion/Schritt/Zutat add+remove
- [ ] `recipe-form.spec.ts` – Edit-Vorbelegung, Validierung, Submit → create/update (Mock)
- [ ] `recipe-form.spec.ts` – Drag&Drop-Drop-Handler ändern FormArray-Reihenfolge (Phase 17)
- [ ] `recipe-form.spec.ts` – Default-Einheit wird nur bei leerem Feld gesetzt (Phase 19)
- [ ] `recipe-form.spec.ts` – Inline-Anlage: neuer Eintrag landet in Liste + wird ausgewählt (Phase 18, Dialog gemockt)
- [ ] `npm test` läuft grün (alle Tests bestehen)
