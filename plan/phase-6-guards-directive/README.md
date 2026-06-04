# Phase 6 – Guards + Directive

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 5

## Ziel & Anforderungen

Routen-Schutz und rollenabhängige UI gemäß Projektdefinition (Kap. 5.5). `authGuard` blockt
nicht angemeldete Nutzer und stößt ggf. den Login-Flow an. `roleGuard` prüft zusätzlich die in
`route.data.roles` geforderten Rollen gegen die Rollen aus dem Token und leitet bei fehlender
Berechtigung auf `/403`. Die `HasRoleDirective` ist eine strukturelle Directive, die
UI-Bereiche nur für Inhaber bestimmter Rollen rendert.

Alle drei greifen auf den `AuthService` (Phase 5) zu, damit die Rollen-Logik an einer Stelle
liegt.

## Betroffene Dateien

- `frontend/src/app/guards/auth.guard.ts`, `role.guard.ts`
- `frontend/src/app/directives/has-role.directive.ts`
