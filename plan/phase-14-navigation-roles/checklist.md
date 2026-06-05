# Checkliste – Phase 14

- [x] Navbar-Links rollenabhängig via `*appHasRole` (chef/admin sehen Meine Rezepte/Kategorien/Zutaten)
- [x] `routerLinkActive` hebt aktiven Link hervor (Rezepte mit `exact`)
- [x] Alle Routen-Pfade zentral in `core/routes.ts`, keine Magic Strings in Templates
- [x] `roleGuard` über `data.roles` für alle geschützten Routen gesetzt (Phase 11/12)
- [x] `/403` + Wildcard `**` bleiben als letzte Einträge
- [~] (optional) `HomePage` als Einstieg – bewusst weggelassen (Rezeptliste ist Startseite)
- [x] Navbar als `mat-toolbar` umgesetzt
- [x] `ng build` + `ng lint` grün
