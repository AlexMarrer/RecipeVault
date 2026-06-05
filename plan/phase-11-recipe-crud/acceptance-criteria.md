# Acceptance Criteria – Phase 11

- Ein `chef` kann ein Rezept mit ≥ 1 Sektion, ≥ 1 Schritt und ≥ 1 Zutat anlegen; es erscheint
  danach in der Liste und unter „Meine Rezepte".
- Bearbeiten lädt die bestehenden Werte vor und speichert Änderungen über `PUT`.
- Löschen fragt per `ConfirmDialogComponent` nach und entfernt das Rezept (`DELETE`).
- Aufruf von `recipes/new` als reiner `user` → Redirect auf `/403` (roleGuard greift).
- Ungültiges Formular lässt sich nicht absenden; `ng build` kompiliert fehlerfrei.
