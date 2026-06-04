# Phase 3 – Frontend: Auth + HttpClient

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 2

## Ziel & Anforderungen

Grundlage für jede Backend-Anbindung. `angular-oauth2-oidc` wird installiert und gegen
Keycloak konfiguriert (Authorization-Code-Flow mit PKCE, Realm `recipevault`, Client
`recipevault-frontend`). Nach dem Login wird das JWT bei jedem API-Request automatisch als
`Authorization: Bearer <token>` mitgeschickt.

Basis-URLs (API, Keycloak-Issuer, ClientId) gehören in Environment-Dateien, damit Dev/Prod
sauber trennbar sind und nichts hart codiert ist. Der HttpClient wird mit Interceptor-Support
provided; `provideOAuthClient` begrenzt das Token-Senden auf die API-URL (`allowedUrls`).

## Betroffene Dateien

- `frontend/package.json` (neue Dep)
- `frontend/src/environments/environment.ts` (+ `.development.ts`), `angular.json` (fileReplacements)
- `frontend/src/app/app.auth.ts` (AuthConfig)
- `frontend/src/app/core/auth.interceptor.ts`
- `frontend/src/app/app.config.ts` (Provider)
