# Acceptance Criteria – Phase 14

- Ein reiner `user` sieht in der Navbar nur erlaubte Links (keine Admin-/Chef-Einträge).
- Direkter Aufruf einer geschützten URL ohne passende Rolle → `/403`.
- Kein Pfad-Literal mehr in Templates/Guards – alles über `core/routes.ts`.
- Navigation zwischen allen Seiten funktioniert; aktiver Link ist markiert.
- `ng build` kompiliert fehlerfrei.
