# Checkliste – Phase 14

- [ ] Navbar-Links rollenabhängig via `*appHasRole` (chef/admin sehen mehr)
- [ ] `routerLinkActive` hebt aktiven Link hervor
- [ ] Alle Routen-Pfade zentral in `core/routes.ts`, keine Magic Strings in Templates
- [ ] `roleGuard` über `data.roles` für alle geschützten Routen gesetzt
- [ ] `/403` + Wildcard `**` bleiben als letzte Einträge
- [ ] (optional) `HomePage` als Einstieg
- [ ] `ng build` fehlerfrei
