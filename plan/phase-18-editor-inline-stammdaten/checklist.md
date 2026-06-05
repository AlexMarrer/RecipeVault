# Checkliste – Phase 18

- [x] `IngredientQuickAddDialog` (Name + Standard-Einheit) als Standalone-Komponente
- [x] `CategoryQuickAddDialog` (Name) als Standalone-Komponente
- [x] Button „Neue Zutat" im Rezept-Formular öffnet Dialog
- [x] Button „Neue Kategorie" im Rezept-Formular öffnet Dialog
- [x] Erfolg: neuer Eintrag landet in `ingredients()` bzw. `categories()` (sortiert) und wird ausgewählt
- [x] Neue Zutat wird in einer **neuen, vorausgewählten Zeile** gesetzt (inkl. Default-Einheit) — statt per-Zeile-Trigger, hält die Zeilen schlank
- [x] Neue Kategorie wird zu `categoryIds` hinzugefügt
- [x] Fehler (409 doppelter Name / 403) wird im Dialog angezeigt, Formulardaten bleiben erhalten
- [x] BEM-Styles, `rem`, OnPush/Signals/inject; Dialoge außerhalb des `<form>` (keine verschachtelten Forms)
- [x] `npm run build` + `npm run lint` grün

**Hinweis:** Folgt dem bestehenden Inline-Overlay-Muster (`@if(signal)` + `output()`), NICHT dem
Angular-`MatDialog`-Service — konsistent mit `ConfirmDialog`.

**Offen:** manueller Browser-Test (Anlegen + Auswahl) durch Student.
