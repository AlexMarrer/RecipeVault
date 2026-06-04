# Checkliste – Phase 6

- [ ] `authGuard` (CanActivateFn) – nicht eingeloggt → Login
- [ ] `roleGuard` – prüft `route.data.roles`, sonst Redirect `/403`
- [ ] `HasRoleDirective` (`*appHasRole="'admin'"`)
