# Phase 2 – Frontend: SSR entfernen

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **Blocker:** ja

## Ziel & Anforderungen

Das Projekt wurde versehentlich mit Server-Side-Rendering generiert (`@angular/ssr`,
`@angular/platform-server`, `express`, Server-Dateien, `provideClientHydration`). Die
Projektdefinition (Kap. 4) schließt SSR/SSG ausdrücklich aus.

SSR-Dateien, -Dependencies und die SSR-bezogene `angular.json`-Konfiguration müssen
vollständig entfernt werden, damit ein reines Client-SPA-Build entsteht. Nach dem Umbau darf
kein `server`-Bundle mehr erzeugt werden.

## Betroffene Dateien

- `frontend/src/server.ts`, `main.server.ts`, `app/app.config.server.ts`, `app/app.routes.server.ts` (löschen)
- `frontend/package.json` (Deps + Scripts)
- `frontend/angular.json` (Build-Target)
- `frontend/src/app/app.config.ts` (Hydration raus)
