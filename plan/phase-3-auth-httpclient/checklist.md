# Checkliste – Phase 3

- [ ] `npm install angular-oauth2-oidc`
- [ ] `environments/environment.ts` + `.development.ts` (apiBaseUrl, issuer, clientId)
- [ ] `fileReplacements` in `angular.json`
- [ ] `app.auth.ts` mit `AuthConfig` (code-Flow, PKCE)
- [ ] `core/auth.interceptor.ts` (Bearer-Token)
- [ ] `app.config.ts`: `provideHttpClient(withInterceptors(...))` + `provideOAuthClient(...)`
