# Acceptance Criteria – Phase 12

- `chef` kann Kategorien/Zutaten anlegen und bearbeiten, sieht aber **keinen** Löschen-Button.
- `admin` sieht zusätzlich den Löschen-Button; Löschen läuft über `ConfirmDialogComponent`.
- Doppelter Name liefert eine verständliche Fehlermeldung (statt stillem Fehler).
- Aufruf der Admin-Routen als reiner `user` → `/403`.
- `ng build` kompiliert fehlerfrei.
