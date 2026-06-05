# Checkliste – Phase 18

- [ ] `IngredientQuickAddDialog` (Name + Standard-Einheit) als Standalone-Komponente
- [ ] `CategoryQuickAddDialog` (Name) als Standalone-Komponente
- [ ] Button „+ Neue Zutat" im Rezept-Formular öffnet Dialog
- [ ] Button „+ Neue Kategorie" im Rezept-Formular öffnet Dialog
- [ ] Erfolg: neuer Eintrag landet in `ingredients()` bzw. `categories()` und wird ausgewählt
- [ ] Neue Zutat wird in der **auslösenden** Zutaten-Zeile gesetzt
- [ ] Neue Kategorie wird zu `categoryIds` hinzugefügt
- [ ] Fehler (409 doppelter Name / 403) wird im Dialog angezeigt, ohne Datenverlust im Formular
- [ ] BEM-Styles, `rem`, OnPush/Signals/inject
- [ ] `npm run build` + `npm run lint` grün
