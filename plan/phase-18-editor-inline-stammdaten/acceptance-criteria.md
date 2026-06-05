# Acceptance Criteria – Phase 18

- Im Rezept-Formular kann ohne Seitenwechsel eine neue Zutat (Name + optionale Standard-Einheit)
  und eine neue Kategorie (Name) angelegt werden.
- Direkt nach dem Anlegen ist der neue Eintrag im Select sichtbar **und** bereits ausgewählt
  (Zutat in der auslösenden Zeile, Kategorie in der Mehrfachauswahl).
- Die bereits im Formular eingegebenen Rezeptdaten gehen beim Anlegen nicht verloren.
- Ein Konflikt (doppelter Name) bricht den Vorgang sauber mit Meldung ab, ohne das Formular zu
  zerstören.
- Build + Lint laufen grün.
