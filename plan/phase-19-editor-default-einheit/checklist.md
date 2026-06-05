# Checkliste – Phase 19

- [x] Auf Zutat-Auswahl pro Zeile reagieren (`(selectionChange)="applyDefaultUnit(i)"`)
- [x] Passende `Ingredient` aus `ingredients()` nachschlagen
- [x] `defaultUnit` ins Einheit-Feld setzen — **nur wenn Feld leer**
- [x] Manuell eingetippte Einheit wird nicht überschrieben
- [x] Funktioniert auch für inline neu angelegte Zutaten (Phase 18 setzt Default-Einheit beim Anlegen direkt)
- [x] Logik in privater/gekapselter Methode `applyDefaultUnit`, keine Magic Strings
- [x] `npm run build` + `npm run lint` grün

**Offen:** manueller Browser-Test durch Student.
